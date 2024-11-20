<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Project;
use App\Models\JobOrder;
use App\Models\BoQ;
use App\Models\BoQPart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class JobOrderDetailsController extends Controller
{
    /**
     * Display the details of a specific job order.
     *
     * @param Request $request
     * @param string $jo_no
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        try {
            // Get project ID from the request (URL parameters)
            $jo_no = $request->query('jo_no');

            // Fetch the job order by jo_no
            $jobOrder = JobOrder::where('jo_no', $jo_no)->firstOrFail();

            // Retrieve the associated project name
            $projectName = Project::where('id', $jobOrder->project_id)->value('description');

            // Retrieve the associated contract name
            $contractName = Contract::where('id', $jobOrder->contract_id)->value('contract_name');

            // Fetch the BOQ table based on jo_no
            $boq = BoQ::where('jo_no', $jo_no)->first();

            // Fetch BOQ parts linked to the BOQ
            $boqParts = $boq ? BoQPart::where('boq_id', $boq->boq_id)->get() : collect();
            
            // Structure the response for the frontend
            return Inertia::render('JobOrder/JobOrderDetailsPage', [
                'auth' => [
                    'user' => $request->user() ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                    ] : null,
                ],
                'jobOrder' => $jobOrder,
                'projectName' => $projectName,
                'contractName' => $contractName,
                'boqParts' => $boqParts,
            ]);

        } catch (\Exception $e) {
            // Log errors
            Log::error('Error in JobOrderDetailsController@index: ' . $e->getMessage(), [
                'jo_no' => $jo_no,
                'trace' => $e->getTraceAsString(),
            ]);

            // Return an error response
            return Inertia::render('JobOrder/JobOrderDetailsPage', [
                'auth' => [
                    'user' => $request->user() ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                    ] : null,
                ],
                'jobOrder' => null,
                'projectName' => null,
                'contractName' => null,
                'boqParts' => [],
                'error' => 'Unable to load job order details. Please try again later.',
            ]);
        }
    }
}
