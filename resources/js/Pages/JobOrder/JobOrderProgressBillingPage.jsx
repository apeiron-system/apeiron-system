import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import Modal from "@/Components/Modal";
import { ChevronLeft } from "lucide-react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function JobOrderProgressBillingPage({ auth, jobOrder, projectLocation, projectParts }) {
    const [PBNameCounter, setPBNameCounter] = useState(1);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [expandedParts, setExpandedParts] = useState(
        projectParts.map(() => false) // All parts are initially collapsed
    );

    // Format date for display
    const formatDate = (date) => {
        if (!date) return "";
        
        // Check if the date string contains "from" and "to"
        const match = date.match(/\d{4}-\d{2}-\d{2}/);
        if (match) {
            return match[0]; // Return the first date match (start date)
        }
        
        // If it's a valid date, return the formatted date
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-CA");
    };
    
    const [progressBillingData, setProgressBillingData] = useState({
            pb_name: `Progress Billing ${PBNameCounter}`,
            start_date: formatDate(jobOrder.period_covered),
            end_date: "",
            actual_costs: [],
    });

    // Set the start date automatically when the component is mounted
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
        setProgressBillingData((prevProgressBillingData) => ({
            ...prevProgressBillingData,
            end_date: formattedDate,
        }));
    }, []);

    function getAllActualCosts(projectParts) {
        // Map over project parts to extract and parse the actual costs of each part's items
        const actualCostsByPart = projectParts.map(part => 
            part.items.map(item => parseFloat(item.actual_cost) || 0)
        );
        
        return actualCostsByPart;
    }

    useEffect(() => {
        const allActualCosts = getAllActualCosts(projectParts);
        setProgressBillingData((prevProgressBillingData) => ({
            ...prevProgressBillingData,
            actual_costs: allActualCosts,
        }));
    }, [projectParts]);

    console.log(progressBillingData);
    const handleRecordProgressBilling = () => {
        const updatedProgressBillingData = {
            ...progressBillingData,
        };
    
        console.log("Sending data:", updatedProgressBillingData);

        setPBNameCounter(PBNameCounter + 1);
    
        axios
            .post(route("store-progress-billing"), updatedProgressBillingData)
            .then((response) => {
                if (response.data.success) {
                    console.log(
                        "Progress Billing has been recorded",
                        response.data
                    );
                } else {
                    console.error(
                        "Failed to create progress billing",
                        response.data.message
                    );
                    alert(
                        response.data.message || "Failed to create progress billing"
                    );
                }
            })
            .catch((error) => {
                console.error("Full error object:", error);
    
                // More comprehensive error handling
                if (error.response) {
                    // Server responded with an error status
                    console.error("Server error details:", error.response);
    
                    // Safely handle different error scenarios
                    const errorMessage =
                        error.response.data?.message ||
                        error.response.data?.error ||
                        "An unexpected server error occurred";
    
                    // Parse and display validation errors if they exist
                    if (error.response.data?.errors) {
                        const errorMessages = Object.entries(
                            error.response.data.errors
                        )
                            .map(
                                ([field, messages]) =>
                                    `${field}: ${
                                        Array.isArray(messages)
                                            ? messages.join(", ")
                                            : messages
                                    }`
                            )
                            .join("\n");
    
                        alert(`Validation Errors:\n${errorMessages}`);
                    } else {
                        alert(`Error: ${errorMessage}`);
                    }
                } else if (error.request) {
                    // Request was made but no response received
                    console.error("No response received:", error.request);
                    alert(
                        "No response received from server. Please check your network connection."
                    );
                } else {
                    // Something happened in setting up the request
                    console.error("Error setting up request:", error.message);
                    alert("Error creating progress billing: " + error.message);
                }
            });
    };
    

    const calculateAmount = (quantity, unit_cost) => quantity * unit_cost;

    const calculateGrandTotal = () =>
        projectParts.reduce((total, part) => {
            const partTotal = part.items.reduce((sum, item) => sum + calculateAmount(item.quantity, item.unit_cost), 0);
            return total + partTotal;
    }, 0);

    const calculateTotalActualCost = () =>
        projectParts.reduce((total, part) => {
            const partTotal = part.items.reduce((sum, item) => sum + parseFloat(item.actual_cost || 0), 0);
            return total + partTotal;
    }, 0);

    const calculateProgressPercentage = () => {
        const totalEstimatedCost = calculateGrandTotal();
        const totalActualCost = calculateTotalActualCost();
        return totalEstimatedCost === 0 ? 0 : (totalActualCost / totalEstimatedCost) * 100;
    };

    const [partData, setPartData] = useState(projectParts);

    const handleInputChange = (partIdx, itemIdx, value) => {
        const updatedPartData = [...partData];
        updatedPartData[partIdx].items[itemIdx].actual_cost = value;
        setPartData(updatedPartData);
        
    };

    // Toggle the expansion state for a project part
    const toggleExpand = (partIdx) => {
        const updatedExpandedParts = [...expandedParts];
        updatedExpandedParts[partIdx] = !updatedExpandedParts[partIdx];
        setExpandedParts(updatedExpandedParts);
    };

    // Get the visible items for each project part
    const getVisibleItems = (partIdx) => {
        return expandedParts[partIdx] ? projectParts[partIdx].items : projectParts[partIdx].items.slice(0, 5);
    };

    const estimatedCostGrandTotal = calculateGrandTotal();
    const actualCostGrandTotal = calculateTotalActualCost();
    const progressPercentage = calculateProgressPercentage();

    return (
        <AuthenticatedLayout
            user={auth.user}
            className="fixed top-0 left-0 right-0 bg-white z-20 shadow-md"
            header={
                <div className="flex items-center">
                    <Link
                        href={route("job-order-details", {
                            jo_no: jobOrder.jo_no,
                        })}
                    >
                        <button className="text-slate-500 hover:text-slate-700 mr-4 flex items-center">
                            <ChevronLeft size={20} />
                        </button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Job Order Progress Billing
                    </h2>
                </div>
            }
        >
            <Head title="Job Order Details" />

            <div className="flex">
                {/* Sidebar */}
                <div
                    className={`sticky top-0 h-full mt-6 ${
                        isCollapsed ? "w-2/9" : "w-3/6"
                    } p-3 pl-6 transition-all duration-1500`}
                >
                    <div className="mb-6 flex justify-between items-start">
                        {!isCollapsed && (
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {jobOrder.jo_name}
                                </h3>
                                <p className="text-lg text-gray-500">
                                    JO {jobOrder.jo_no}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Location:{" "}
                                    <span className="font-semibold">
                                        {projectLocation}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Start Date:{" "}
                                    <span className="font-semibold">
                                        {formatDate(jobOrder.period_covered)}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    End Date:{" "}
                                    <span className="font-semibold">
                                        {progressBillingData.end_date}
                                    </span>
                                </p>
                            </div>
                        )}
                        <div className="flex items-center space-x-2">
                            {!isCollapsed && (
                                <Button
                                    onClick={handleRecordProgressBilling}
                                    className="w-10 h-10 rounded-full bg-slate-600 text-white hover:bg-blue-700 focus:outline-none"
                                >
                                    <span className="text-2xl">+</span>
                                </Button>
                            )}
                            <Button
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="w-w-10 h-10 rounded-full bg-slate-600 text-white hover:bg-blue-700 focus:outline-none"
                            >
                                <span className="text-2xl">
                                    {isCollapsed ? "→" : "←"}
                                </span>
                            </Button>
                        </div>
                    </div>

                    {!isCollapsed && (
                        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                            {/* Ensure progressBillingData is an array */}
                            {Array.isArray(progressBillingData) && progressBillingData.length > 0 ? (
                                progressBillingData.map((billing) => {
                                    const pbId = billing.pb_name.split(" ")[2]; // Extracts the ID
                                    return (
                                        <Link
                                            href={route("job-order-progress-billing", { id: pbId })}
                                            key={pbId}
                                        >
                                            <div className="bg-gray-50 shadow hover:shadow-md transition-all duration-300 transform cursor-pointer rounded-lg">
                                                <p className="py-2 text-slate-600 hover:text-blue-700 hover:bg-gray-200 rounded-sm font-semibold bg-gray-50">
                                                    {billing.pb_name}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })
                            ) : (
                                // Show default progress billing if no records are found
                                <Link
                                    href={route("job-order-progress-billing", { jo_no: jobOrder.jo_no })}
                                    key= { jobOrder.jo_no }
                                >
                                    <div className="bg-gray-50 shadow hover:shadow-md transition-all duration-300 transform cursor-pointer rounded-lg">
                                        <p className="py-2 text-slate-600 hover:text-blue-700 hover:bg-gray-200 rounded-sm font-semibold bg-gray-50">
                                            No progress billing records found.
                                        </p>
                                    </div>
                                </Link>
                            )}
                        </div>                    
                    )}
                </div>

                <div className="flex flex-col space-y-6 mx-6 w-full">
                    {/* Main Content */}
                    <div className="flex flex-row w-full sticky top-0 gap-6 z-50">
                        <div className="w-full bg-gray-50 p-4 shadow rounded-lg z-50">
                            <h3 className="text-left text-gray-700 text-xl font-semibold mb-1">
                                Estimated Cost Grand Total
                            </h3>
                            <span className="text-yellow-500 font-semibold">
                                ₱{estimatedCostGrandTotal.toLocaleString()}
                            </span>
                        </div>
                        <div className="w-full bg-gray-50 p-4 shadow rounded-lg z-50">
                            <h3 className="text-left text-gray-700 text-xl font-semibold mb-1">
                                Actual Cost Grand Total
                            </h3>
                            <span className="text-yellow-500 font-semibold">
                                ₱{actualCostGrandTotal.toLocaleString()}
                            </span>
                        </div>
                        <div className="w-full bg-gray-50 p-4 shadow rounded-lg z-50">
                            <h3 className="text-left text-gray-700 text-xl font-semibold mb-1">
                                Progress
                            </h3>
                            <div className="h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{
                                        width: `${Math.min(
                                            progressPercentage,
                                            100
                                        ).toFixed(2)}%`,
                                    }}
                                />
                            </div>
                            <span className="text-green-500 font-semibold">
                                {progressPercentage.toFixed(2)}%
                            </span>
                        </div>
                    </div>

                    {/* Display project parts and items dynamically */}
                    <div className="space-y-4 z-10">
                        <h3 className="mb-2 text-2xl font-semibold">
                            Project Parts
                        </h3>
                        <div className="overflow-y-auto max-h-[400px]">
                            {" "}
                            {/* Added this div with scroll */}
                            {projectParts.map((part, partIdx) => {
                                const partTotal = part.items.reduce(
                                    (sum, item) =>
                                        sum +
                                        calculateAmount(
                                            item.quantity,
                                            item.unit_cost
                                        ),
                                    0
                                );

                                const partActualCostTotal = part.items.reduce(
                                    (sum, item) =>
                                        sum + parseFloat(item.actual_cost || 0),
                                    0
                                );

                                return (
                                    <div
                                        key={part.projectPart.id}
                                        className="bg-white px-4 shadow rounded-lg"
                                    >
                                        <h4 className="text-lg font-semibold">
                                            {part.projectPart.description}
                                        </h4>
                                        <p className="text-gray-700 text-sm mb-2">
                                            Estimated Cost Subtotal:{" "}
                                            <span className="text-yellow-500 font-semibold">
                                                ₱{partTotal.toLocaleString()}
                                            </span>
                                        </p>
                                        <p className="text-gray-700 text-sm mb-2">
                                            Actual Cost Subtotal:{" "}
                                            <span className="text-yellow-500 font-semibold">
                                                ₱
                                                {partActualCostTotal.toLocaleString()}
                                            </span>
                                        </p>

                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>
                                                        Item No.
                                                    </TableHead>
                                                    <TableHead>
                                                        Description
                                                    </TableHead>
                                                    <TableHead>Unit</TableHead>
                                                    <TableHead>
                                                        Quantity
                                                    </TableHead>
                                                    <TableHead>
                                                        Unit Cost
                                                    </TableHead>
                                                    <TableHead>
                                                        Estimated Cost
                                                    </TableHead>
                                                    <TableHead>
                                                        Actual Cost
                                                    </TableHead>
                                                    <TableHead>
                                                        Weight %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {getVisibleItems(partIdx).map(
                                                    (item, itemIdx) => {
                                                        const amount =
                                                            calculateAmount(
                                                                item.quantity,
                                                                item.unit_cost
                                                            );
                                                        const weightPercentage =
                                                            (item.actual_cost /
                                                                actualCostGrandTotal) *
                                                            100 || 0;

                                                        return (
                                                            <TableRow
                                                                key={
                                                                    item.itemNo
                                                                }
                                                            >
                                                                <TableCell>
                                                                    {
                                                                        item.itemNo
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        item.description
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item.unit}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    ₱
                                                                    {item.unit_cost.toLocaleString()}
                                                                </TableCell>
                                                                <TableCell>
                                                                    ₱
                                                                    {amount.toLocaleString()}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <TextInput
                                                                        type="number"
                                                                        value={
                                                                            item.actual_cost
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleInputChange(
                                                                                partIdx,
                                                                                itemIdx,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    {weightPercentage.toFixed(
                                                                        2
                                                                    )}
                                                                    %
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    }
                                                )}
                                            </TableBody>
                                        </Table>
                                        {/* Show All / Show Less Button */}
                                        <div className="mt-2 flex justify-end">
                                            {part.items.length > 5 && (
                                                <button
                                                    onClick={() =>
                                                        toggleExpand(partIdx)
                                                    }
                                                    className="text-sm font-semibold text-slate-500 hover:underline"
                                                >
                                                    {expandedParts[partIdx]
                                                        ? "Show Less"
                                                        : "Show All"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
