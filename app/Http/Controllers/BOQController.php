<?php

namespace App\Http\Controllers;

use App\Models\ContractModel;
use App\Models\ProjectModel;
use App\Models\ProjectPartModel;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Support\Facades\View;

class BOQController extends Controller
{
    // Helper method to fetch and prepare data
    private function fetchBOQData($contractId, $projectId)
    {
        // Fetch the contract details
        $contract = ContractModel::with('signingAuthorityEmployee')->findOrFail($contractId);

        // Fetch the project details with necessary relationships
        $project = ProjectModel::with(['submittedByEmployee', 'signingAuthorityEmployee'])->findOrFail($projectId);

        // Fetch all project parts for the project, along with their items
        $projectParts = ProjectPartModel::where('project_id', $projectId)
            ->with(['projectPartItems.item.bids']) // Load associated project part items, items, and bids
            ->get();

        // Prepare the BOQ data
        $boq = [];
        foreach ($projectParts as $part) {
            foreach ($part->projectPartItems as $item) {
                $latestBid = $item->item->getLatestBid();
                $boq[] = [
                    'part_description' => $part->description,
                    'description' => $item->item->description ?? 'N/A',
                    'unit' => $item->item->unit ?? 'N/A',
                    'quantity' => $item->quantity,
                    'unit_cost' => $latestBid ? $latestBid->bid_amount : 0,
                ];
            }
        }

        // Submitted by and Signing Authority
        $submittedBy = $project->submittedByEmployee
            ? $project->submittedByEmployee->first_name . ' ' . $project->submittedByEmployee->last_name
            : 'N/A';
        $signedBy = $project->signingAuthorityEmployee
            ? $project->signingAuthorityEmployee->first_name . ' ' . $project->signingAuthorityEmployee->last_name
            : 'N/A';

        // Return the prepared data
        return [
            'contract' => $contract,
            'project' => $project,
            'projectParts' => $projectParts,
            'boq' => $boq,
            'submittedBy' => $submittedBy,
            'signedBy' => $signedBy,
        ];
    }

    public function view($contractId, $projectId)
    {
        $data = $this->fetchBOQData($contractId, $projectId);
    
        // Explicitly include contractId and projectId in the data array
        $data['contractId'] = $contractId;
        $data['projectId'] = $projectId;
    
        return view('boq.viewboq', $data);
    }
    

    public function download($contractId, $projectId)
    {
        $data = $this->fetchBOQData($contractId, $projectId);
    
        // Render the HTML for the PDF
        $html = View::make('boq.pdf', $data)->render();
    
        // Configure and generate the PDF
        $options = new Options();
        $options->set('isRemoteEnabled', true);
        $dompdf = new Dompdf($options);
    
        $dompdf->loadHtml('<style>@page { margin: 0; } body { margin: 0; }</style>' . $html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
    
        return response()->streamDownload(function () use ($dompdf) {
            echo $dompdf->output();
        }, "boq_contract_{$contractId}_project_{$projectId}.pdf");
    }
    
}


