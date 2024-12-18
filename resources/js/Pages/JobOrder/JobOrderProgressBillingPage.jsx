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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [expandedParts, setExpandedParts] = useState(
        projectParts.map(() => false) // All parts are initially collapsed
    );

    // Set the start date automatically when the component is mounted
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
        setStartDate(formattedDate);
    }, []);

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

    // Automatically clean leading zeros when numbers are entered
    useEffect(() => {
        const cleanedPartData = partData.map((part) => ({
            ...part,
            items: part.items.map((item) => {
                if (typeof item.actual_cost === "string" && item.actual_cost.startsWith("0")) {
                    item.actual_cost = item.actual_cost.replace(/^0+(?!$)/, "");
                }
                if (!item.actual_cost) {
                    item.actual_cost = "0";
                }
                return item;
            }),
        }));

        setPartData(cleanedPartData);
    }, [partData]);

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

    // Format date for display
    const formatDate = (date) => {
        if (!date) return "";
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-CA");
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
                    <Link href={route("job-order-details", { jo_no: jobOrder.jo_no })}>
                        <button className="text-slate-500 hover:text-slate-700 mr-4 flex items-center">
                            <ChevronLeft size={20} />
                        </button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Job Order Progress Billing</h2>
                </div>
            }
        >
            <Head title="Job Order Details" />

            <div className="flex">
                {/* Sidebar */}
                <div className={`sticky top-0 h-full mt-6 ${isCollapsed ? "w-2/9" : "w-3/6"} p-3 pl-6 transition-all duration-1500`}>
                    <div className="mb-6 flex justify-between items-start">
                        {!isCollapsed && (
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800">{jobOrder.jo_name}</h3>
                                <p className="text-lg text-gray-500">JO {jobOrder.jo_no}</p>
                                <p className="text-sm text-gray-600">Location: <span className="font-semibold">{projectLocation}</span></p>
                                <p className="text-sm text-gray-600">Start Date: <span className="font-semibold">{startDate}</span></p>
                                <p className="text-sm text-gray-600">End Date: <span className="font-semibold">[End Date]</span></p>
                            </div>
                        )}
                        <div className="flex items-center space-x-2">
                            {!isCollapsed && (
                                <Button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-12 h-12 rounded-full bg-slate-600 text-white hover:bg-blue-700 focus:outline-none"
                                >
                                    <span className="text-2xl">+</span>
                                </Button>
                            )}
                            <Button
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="w-12 h-12 rounded-full bg-slate-600 text-white hover:bg-blue-700 focus:outline-none"
                            >
                                <span className="text-2xl">{isCollapsed ? "→" : "←"}</span>
                            </Button>
                        </div>
                    </div>

                    {!isCollapsed && (
                        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                            {/* Display dynamic progress billings if needed */}
                        </div>
                    )}
                </div>

                <div className="flex flex-col space-y-6 mt-6 mx-6 w-full">
                    {/* Main Content */}
                    <div className="flex space-x-6 sticky">
                        <div className="w-full bg-gray-50 p-4 shadow rounded-lg">
                            <h3 className="text-left text-gray-700 text-xl font-semibold mb-1">Estimated Cost Grand Total</h3>
                            <span className="text-yellow-500 font-semibold">₱{estimatedCostGrandTotal.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-50 p-4 shadow rounded-lg">
                            <h3 className="text-left text-gray-700 text-xl font-semibold mb-1">Actual Cost Grand Total</h3>
                            <span className="text-yellow-500 font-semibold">₱{actualCostGrandTotal.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-50 p-4 shadow rounded-lg">
                            <h3 className="text-left text-gray-700 text-xl font-semibold mb-1">Progress</h3>
                            <div className="h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${Math.min(progressPercentage, 100).toFixed(2)}%` }}
                                />
                            </div>
                            <span className="text-green-500 font-semibold">{progressPercentage.toFixed(2)}%</span>
                        </div>
                    </div>

                    {/* Display project parts and items dynamically */}
                    <div className="space-y-4">
                        <h3 className="mt-8 mb-2 text-2xl font-semibold">Project Parts</h3>
                        {projectParts.map((part, partIdx) => {
                            
                            const partTotal = part.items.reduce(
                                (sum, item) => sum + calculateAmount(item.quantity, item.unit_cost),
                                0
                            );

                            const partActualCostTotal = part.items.reduce(
                                (sum, item) => sum + parseFloat(item.actual_cost || 0),
                                0
                            );

                            return (

                                <div key={part.projectPart.id} className="bg-white p-4 shadow rounded-lg">
                                    <h4 className="text-lg font-semibold">{part.projectPart.description}</h4>
                                    <p className="text-gray-700 text-sm mb-2">
                                        Estimated Cost Subtotal: <span className="text-yellow-500 font-semibold">₱{partTotal.toLocaleString()}</span>
                                    </p>
                                    <p className="text-gray-700 text-sm mb-2">
                                        Actual Cost Subtotal: <span className="text-yellow-500 font-semibold">₱{partActualCostTotal.toLocaleString()}</span>
                                    </p>

                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Item No.</TableHead>
                                                <TableHead>Description</TableHead>
                                                <TableHead>Unit</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead>Unit Cost</TableHead>
                                                <TableHead>Estimated Cost"</TableHead>
                                                <TableHead>Actual Cost</TableHead>
                                                <TableHead>Weight %</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {getVisibleItems(partIdx).map((item, itemIdx) => {
                                                const amount = calculateAmount(item.quantity, item.unit_cost);
                                                const weightPercentage = (item.actual_cost / actualCostGrandTotal) * 100 || 0;

                                                return (
                                                    <TableRow key={item.itemNo}>
                                                        <TableCell>{item.itemNo}</TableCell>
                                                        <TableCell>{item.description}</TableCell>
                                                        <TableCell>{item.unit}</TableCell>
                                                        <TableCell>{item.quantity}</TableCell>
                                                        <TableCell>₱{item.unit_cost.toLocaleString()}</TableCell>
                                                        <TableCell>₱{amount.toLocaleString()}</TableCell>
                                                        <TableCell>
                                                            <TextInput
                                                                    type="number"
                                                                    value={item.actual_cost}
                                                                    onChange={(e) => handleInputChange(partIdx, itemIdx, e.target.value)
                                                                }
                                                            />
                                                            </TableCell>
                                                        <TableCell>{weightPercentage.toFixed(2)}%</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                    {/* Show All / Show Less Button */}
                                    <div className="mt-2 flex justify-end">
                                        {part.items.length > 5 && (
                                            <button
                                                onClick={() => toggleExpand(partIdx)}
                                                className="text-sm font-semibold text-slate-500 hover:underline"
                                            >
                                                {expandedParts[partIdx] ? "Show Less" : "Show All"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
