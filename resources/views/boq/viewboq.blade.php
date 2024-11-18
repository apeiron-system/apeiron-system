<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bill of Quantities</title>
    <style>
        /* General Styles */
        body {
            background-color: #f9fafb; /* Tailwind's bg-gray-50 */
            color: #1f2937; /* Tailwind's text-gray-800 */
            margin: 0;
            font-family: 'DejaVu Sans', Arial, sans-serif
        }

        section {
            display: flex;
            justify-content: center;
            width: 210mm; /* A4 width */
            min-height: 297mm; /* A4 height */
            margin: auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Shadow */
            background-color: none;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            width: 100%;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Tailwind's shadow */
            border-radius: 8px; /* Rounded corners */
            padding: 32px;
        }

        /* Header */
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e5e7eb; /* Tailwind's border-gray-300 */
            padding-bottom: 16px;
            margin-bottom: 16px;
        }

        header h1 {
            font-size: 1.5rem;
            font-weight: bold;
        }

        header a {
            background-color: #0F172A; /* Tailwind's bg-blue-600 */
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            text-decoration: none;
            transition: background-color 0.3s;
        }

        #back {
            background-color: #1d4ed8;
        }

        /* Contract Details */
        .details p {
            margin: 4px 0;
            font-weight: bold;
        }

        table {
            width: 90%; /* Adjust the table width */
            border-collapse: collapse;
            border: 1px solid #e5e7eb; /* Border around the table */
            font-size: 0.85rem; /* Smaller font size for table content */
            margin-top: 20px;
            margin-left: 0; /* Align table to the left */
        }


        th, td {
            border: 1px solid #e5e7eb; /* Cell borders */
            padding: 6px 10px; /* Reduce padding for a smaller look */
            text-align: left;
        }

        th {
            font-weight: bold;
            background-color: #f3f4f6; /* Tailwind's bg-gray-100 */
            text-align: center;
            font-size: 0.9rem; /* Slightly larger font for headers */
        }

        tfoot td {
            font-weight: bold;
            font-size: 0.9rem; /* Keep footer text readable */
        }

        tbody td, tbody th {
            font-size: 0.85rem; /* Compact the table rows */
            white-space: nowrap; /* Prevent text from wrapping excessively */
        }
        /* Utility Classes */
        .text-center {
            text-align: center;
        }

        .font-bold {
            font-weight: bold;
        }

        .text-right {
            text-align: right;
        }

        .bg-gray-50 {
            background-color: #f9fafb;
        }
    </style>
</head>
<body>
    <section>
        <div class="container">
            <!-- Header -->
            <header>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <a id="back" href="{{ route('contract.project.view', ['contract_id' => $contractId, 'project_id' => $projectId]) }}">
                        X
                    </a>
                    <h1>Bill of Quantities</h1>
                </div>
                <a href="{{ route('boq.download', ['contractId' => $contractId, 'projectId' => $projectId]) }}" >
                    Download BOQ
                </a>
            </header>

            <div class="details">
                <p><strong>Contract ID:</strong> {{ $contract->id }}</p>
                <p><strong>Project ID:</strong> {{ $project->id }}</p>
                <p><strong>Contract Name:</strong> {{ $contract->description }}</p>
                <p><strong>Project Name:</strong> {{ $project->project_name ?? 'No name provided' }}</p>
                <p><strong>Location:</strong>
                    {{ 
                        ($project->street_address ?? 'N/A') . ', ' . 
                        ($project->barangay ?? 'N/A') . ', ' . 
                        ($project->city ?? 'N/A') . ', ' . 
                        ($project->province ?? 'N/A') . ', ' . 
                        ($project->zip_code ?? 'N/A') . ', ' . 
                        ($project->country ?? 'N/A') 
                    }}
                </p>
            </div>




            <table>
                <thead>
                    <tr>
                        <th colspan="7">BILL OF QUANTITIES</th>
                    </tr>
                    <tr>
                        <th>ITEM NO.</th>
                        <th>DESCRIPTION</th>
                        <th>UNIT</th>
                        <th>QUANTITY</th>
                        <th>UNIT COST</th>
                        <th>AMOUNT</th>
                        <th>WEIGHT</th>
                    </tr>
                </thead>
                <tbody>
                    @php 
                        $totalCost = $projectParts->sum(fn($part) => 
                            $part->projectPartItems->sum(fn($item) => $item->quantity * ($item->item->getLatestBid()?->bid_amount ?? 0))
                        );
                    @endphp

                    @foreach ($projectParts as $part)
                        @if ($part->projectPartItems->count() > 0)
                            <!-- Part Description -->
                            <tr>
                                <td colspan="7"><strong> {{ $part->description }}</strong></td>
                            </tr>
                            <!-- Items Associated with the Part -->
                            @foreach ($part->projectPartItems as $item)
                                @php
                                    $itemAmount = $item->quantity * ($item->item->getLatestBid()?->bid_amount ?? 0);
                                    $itemWeight = $totalCost > 0 ? ($itemAmount / $totalCost) * 100 : 0;
                                @endphp
                                <tr>
                                    <td class="text-center">{{ $item->item->id ?? 'N/A' }}</td>
                                    <td >{{ $item->item->description ?? 'N/A' }}</td>
                                    <td class="text-center">{{ $item->item->unit ?? 'N/A' }}</td>
                                    <td class="text-center">{{ $item->quantity }}</td>
                                    <td class="text-right">&#8369;{{ number_format($item->item->getLatestBid()?->bid_amount ?? 0, 2) }}</td>
                                    <td class="text-right">&#8369;{{ number_format($itemAmount, 2) }}</td>
                                    <!-- Display Weight as a Percentage -->
                                    <td class="text-center">{{ number_format($itemWeight, 2) }}%</td>
                                </tr>
                            @endforeach
                        @endif
                    @endforeach
                </tbody>

                <tfoot>
                <tr>
                    <td colspan="5" class="text-right font-bold">TOTAL PROJECT COST</td>
                    <td class="text-right font-bold">
                        &#8369;{{ number_format($totalCost, 2) }}
                    </td>
                    <td class="text-center font-bold">100%</td>
                </tr>
                    <tr>
                        <td colspan="7">
                            Submitted by: 
                            {{ 
                                ($project->submittedByEmployee->first_name ?? 'N/A') . ' ' . 
                                ($project->submittedByEmployee->last_name ?? '') 
                            }}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7">
                            Signed by: 
                            {{ 
                                ($project->signingAuthorityEmployee->first_name ?? 'N/A') . ' ' . 
                                ($project->signingAuthorityEmployee->last_name ?? '') 
                            }}
                        </td>
                    </tr>
                </tfoot>
            </table>

        </div>
    </section>
</body>
