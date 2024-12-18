import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import Modal from "@/Components/Modal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ChevronLeft } from "lucide-react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function JobOrderProgressBillingPage({ auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hardcoded dummy data
    const jobOrder = {
        jo_name: "Electrical Works",
        location: "Building A",
        itemWorks: "Wiring and lighting installation",
        period_covered: "Jan 2024 - Mar 2024",
        supplier: "ABC Electrical Supplies",
        dateNeeded: "2024-03-15",
        preparedBy: "John Doe",
        checkedBy: "Jane Doe",
        approvedBy: "Jack Smith",
        status: "on-going",
        jo_no: 1,
        project_id: 1,
    };

    const progressBillings = [
        { id: 1, name: "Progress Billing 1" },
        { id: 2, name: "Progress Billing 2" },
        { id: 3, name: "Progress Billing 3" },
    ];

    const projectName = "Project 1";
    const contractName = "Contract 1";
    const projectParts = [
        {
            projectPart: { description: "Electrical Wiring" },
            items: [
                { itemNo: 1, description: "Wire 1", unit: "meter", quantity: 100, unit_cost: 50, actual_cost: 0 },
                { itemNo: 2, description: "Wire 2", unit: "meter", quantity: 200, unit_cost: 40, actual_cost: 0 },
                { itemNo: 3, description: "Wire 3", unit: "meter", quantity: 300, unit_cost: 60, actual_cost: 0 },
            ],
        },
        {
            projectPart: { description: "Lighting Fixtures" },
            items: [
                { itemNo: 1, description: "LED Lights", unit: "unit", quantity: 20, unit_cost: 500, actual_cost: 0 },
                { itemNo: 2, description: "Bulbs", unit: "unit", quantity: 50, unit_cost: 100, actual_cost: 0 },
                { itemNo: 3, description: "Chandeliers", unit: "unit", quantity: 10, unit_cost: 1500, actual_cost: 0 },
                { itemNo: 4, description: "Ceiling Fans", unit: "unit", quantity: 15, unit_cost: 800, actual_cost: 0 },
                { itemNo: 5, description: "Downlights", unit: "unit", quantity: 30, unit_cost: 250, actual_cost: 0 },
                { itemNo: 6, description: "Spotlights", unit: "unit", quantity: 40, unit_cost: 350, actual_cost: 0 },
            ],
        },
    ];

    const [partData, setPartData] = useState(projectParts);
    const [expandedParts, setExpandedParts] = useState(new Array(projectParts.length).fill(false));

    const calculateAmount = (quantity, unit_cost) => quantity * unit_cost;

    const calculateGrandTotal = () =>
        partData.reduce((total, part) => {
            const partTotal = part.items.reduce((sum, item) => sum + calculateAmount(item.quantity, item.unit_cost), 0);
            return total + partTotal;
    }, 0);

    const calculateTotalActualCost = () =>
        partData.reduce((total, part) => {
            const partTotal = part.items.reduce((sum, item) => sum + parseFloat(item.actual_cost || 0), 0);
            return total + partTotal;
    }, 0);

    const calculateProgressPercentage = () => {
        const totalEstimatedCost = calculateGrandTotal();
        const totalActualCost = calculateTotalActualCost();
        return totalEstimatedCost === 0 ? 0 : (totalActualCost / totalEstimatedCost) * 100;
    };

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

    const formatDate = (date) => {
        if (!date) return "";
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-CA");
    };

    const estimatedCostGrandTotal = calculateGrandTotal();
    const actualCostGrandTotal = calculateTotalActualCost();
    const progressPercentage = calculateProgressPercentage();

    const toggleExpand = (partIdx) => {
        setExpandedParts(prev => {
            const newState = [...prev];
            newState[partIdx] = !newState[partIdx];
            return newState;
        });
    };

    const getVisibleItems = (items, partIdx) => {
        if (expandedParts[partIdx]) {
            return items;
        }
        return items.slice(0, 5);
    };

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
                <div className="w-2/6 bg-gray-50 p-6 shadow-lg sticky top-0 h-full mt-6">
                    <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">Progress Billing 1</h3>
                        <p className="text-lg text-gray-500">JO 1</p>
                        <p className="text-md text-gray-600">Location: <span className="font-semibold">[Location]</span></p>
                        <p className="text-md text-gray-600">Start Date: <span className="font-semibold">[Start Date]</span></p>
                        <p className="text-md text-gray-600">End Date: <span className="font-semibold">[End Date]</span></p>
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="w-12 h-12 rounded-full bg-slate-600 text-white hover:bg-blue-700 focus:outline-none"
                    >
                    <span className="text-2xl">+</span>
                    </Button>
                </div>
                    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                        {progressBillings.map((billing) => (
                            <Link
                                href={route("job-order-progress-billing", { id: billing.id })}
                                key={billing.id}
                            >
                                <div className="bg-gray-50 shadow hover:shadow-md transition-all duration-300 transform cursor-pointer rounded-lg">
                                    <p className="py-2 text-slate-600 hover:text-blue-700 hover:bg-gray-200 rounded-sm font-semibold bg-gray-50">{billing.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col space-y-6 mt-6 mx-6">
                    {/* Main Content */}
                    <div className="flex space-x-6">
                        <div className="w-2/4 bg-gray-50 p-4 shadow rounded-lg">
                            <h3 className="text-left text-gray-700 text-xl font-semibold mb-1">Estimated Cost Grand Total</h3>
                            <span className="text-yellow-500 font-semibold">₱{estimatedCostGrandTotal.toLocaleString()}</span>
                        </div>
                        <div className="w-2/5 bg-gray-50 p-4 shadow rounded-lg">
                            <h3 className="text-left text-gray-700 text-xl font-semibold mb-1">Actual Cost Grand Total</h3>
                            <span className="text-yellow-500 font-semibold">₱{actualCostGrandTotal.toLocaleString()}</span>
                        </div>
                        <div className="w-2/5 bg-gray-50 p-4 shadow rounded-lg">
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

                    <div className="flex flex-row-reverse gap-6">
                        <div className="w-full flex flex-col">
                            <h3 className="mt-8 mb-2 text-2xl font-semibold">Project Parts</h3>
                            {partData.map((part, partIdx) => {
                                
                                const partTotal = part.items.reduce(
                                    (sum, item) => sum + calculateAmount(item.quantity, item.unit_cost),
                                    0
                                );

                                const partActualCostTotal = part.items.reduce(
                                    (sum, item) => sum + parseFloat(item.actual_cost || 0),
                                    0
                                );

                                const visibleItems = getVisibleItems(part.items, partIdx);
                                const showToggleButton = part.items.length > 5;

                                return (
                                    <div key={partIdx} className="mb-4 mt-4">
                                        <h4 className="text-lg font-semibold">{part.projectPart.description}</h4>
                                        <p className="text-gray-700 text-sm mb-2">
                                            Estimated Cost Subtotal: <span className="text-yellow-500 font-semibold">₱{partTotal.toLocaleString()}</span>
                                        </p>
                                        <p className="text-gray-700 text-sm mb-2">
                                            Actual Cost Subtotal: <span className="text-yellow-500 font-semibold">₱{partActualCostTotal.toLocaleString()}</span>
                                        </p>

                                        <div className="bg-white shadow rounded overflow-hidden">
                                            <Table className="min-w-full divide-y divide-gray-200">
                                                <TableHeader>
                                                    <TableRow>
                                                        {[
                                                            "Item No.",
                                                            "Description",
                                                            "Unit",
                                                            "Quantity",
                                                            "Unit Cost",
                                                            "Estimated Cost",
                                                            "Actual Cost",
                                                            "Weight %",
                                                        ].map((header, idx) => (
                                                            <TableHead key={idx}>{header}</TableHead>
                                                        ))}
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {visibleItems.map((item, itemIdx) => {
                                                        const amount = calculateAmount(item.quantity, item.unit_cost);
                                                        const weightPercentage = (item.actual_cost / actualCostGrandTotal) * 100;

                                                        return (
                                                            <TableRow key={itemIdx}>
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
                                                                        onChange={(e) =>
                                                                            handleInputChange(partIdx, itemIdx, e.target.value)
                                                                        }
                                                                    />
                                                                </TableCell>
                                                                <TableCell className="w-full">{weightPercentage.toFixed(2)}%</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </div>
                                        {showToggleButton && (
                                            <div className="mt-2 flex justify-end">
                                                <button
                                                    onClick={() => toggleExpand(partIdx)}
                                                    className="text-sm font-semibold text-slate-500 hover:underline"
                                                >
                                                    {expandedParts[partIdx] ? "Show Less" : "Show All"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col">
                    <InputLabel htmlFor="progress_billing_name">Progress Billing Name</InputLabel>
                    <TextInput id="progress_billing_name" name="progress_billing_name" />
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}