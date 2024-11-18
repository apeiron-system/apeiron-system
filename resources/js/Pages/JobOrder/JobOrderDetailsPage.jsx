import { useState } from "react";
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
import Checkbox from "@/Components/Checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import ShadCN Table components

export default function JobOrderDetailsPage({ auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        project_desc: "Project A",
        jo_name: "UNIT 21",
        contract_name: "Active Contract 1",
        location: "Panabo City",
        itemWorks: "Labor",
        periodCovered: "2022-2026",
        supplier: "Name of Supplier",
        dateNeeded: "2022-2026",
        status: "PENDING", // default status
        progress: 40, // Sample progress value (in percentage)
    });

    const [BoQParts, setBoQParts] = useState({
        "Part A": [
            { itemNo: "001", description: "Excavation", unit: "sq.m", quantity: 50, unitCost: 200, amount: 10000 },
            { itemNo: "002", description: "Concrete Pouring", unit: "cu.m", quantity: 30, unitCost: 250, amount: 7500 },
        ],
        "Part B": [
            { itemNo: "003", description: "Steel Rebar", unit: "kg", quantity: 100, unitCost: 150, amount: 15000 },
            { itemNo: "004", description: "Formwork", unit: "sq.m", quantity: 40, unitCost: 180, amount: 7200 },
        ],
        "Part C": [
            { itemNo: "005", description: "Labor", unit: "hours", quantity: 200, unitCost: 120, amount: 24000 },
            { itemNo: "006", description: "Electrical Wiring", unit: "m", quantity: 500, unitCost: 50, amount: 25000 },
        ],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleStatusChange = (status) => {
        setFormData((prevState) => ({ ...prevState, status }));
    };

    const handleAddItem = (part) => {
        const newItem = {
            itemNo: "007",
            description: "Sample Item",
            unit: "pcs",
            quantity: 1,
            unitCost: 100,
            amount: 100,
        };
        setBoQParts((prevParts) => ({
            ...prevParts,
            [part]: [...prevParts[part], newItem],
        }));
    };

    // Function to determine the color of the progress bar based on the progress percentage
    const getProgressBarColor = (progress) => {
        if (progress >= 100) return "bg-green-500"; // Green for 100%
        if (progress >= 50) return "bg-yellow-500"; // Yellow for below 100%
        return "bg-red-500"; // Red for below 50%
    };

    // Calculate grand total
    const calculateGrandTotal = () => {
        return Object.values(BoQParts).reduce((total, part) => {
            return total + part.reduce((subtotal, item) => subtotal + item.amount, 0);
        }, 0);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            className="fixed top-0 left-0 right-0 bg-white z-20 shadow-md"
            header={
                <div className="flex items-center">
                    <Link href={route("job-order")}>
                        <button className="text-slate-500 hover:text-slate-700 mr-4 flex items-center">
                            <ChevronLeft size={20} />
                        </button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Job Order Details
                    </h2>
                </div>
            }
        >
            <Head title="Job Order Details" />

            {/* Flex Container for JO Details and Bill of Quantities */}
            <div className="flex flex-row-reverse gap-6">
                {/* Bill of Quantities - BoQ Parts Section (Left Side - Scrollable) */}
                <div className="w-full flex flex-col">
                    <h3 className="text-xl font-semibold mb-4">Bill of Quantities</h3>
                    <div className="w-full h-[calc(100vh-15rem)] lg:w-7/10 bg-white rounded-md py-4 pr-4 overflow-y-auto">
                        
                    {Object.keys(BoQParts).map((part, idx) => {
                        const subtotal = BoQParts[part].reduce((sum, item) => sum + item.amount, 0);

                        return (
                            <div key={idx} className="mb-8">
                                <h4 className="font-semibold text-lg">{part}</h4>
                                
                                {/* Subtotal displayed below Part Name */}
                                <div className="text-left text-gray-700 text-sm mb-1">
                                    Subtotal: <span className="text-yellow-500">₱{subtotal.toLocaleString()}</span>
                                </div>

                                <div className="bg-white shadow rounded overflow-hidden">
                                    <Table className="min-w-full divide-y divide-gray-200">
                                        <TableHeader>
                                            <TableRow>
                                                {[
                                                    "",
                                                    "Item No.",
                                                    "Description",
                                                    "Unit",
                                                    "Quantity",
                                                    "Unit Cost",
                                                    "Amount",
                                                ].map((header, idx) => (
                                                    <TableHead key={idx}>{header}</TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {BoQParts[part].length > 0 ? (
                                                BoQParts[part].map((item, idx) => (
                                                    <TableRow key={idx} className="hover:bg-gray-600">
                                                        <TableCell>
                                                            <Checkbox />
                                                        </TableCell>
                                                        <TableCell>{item.itemNo}</TableCell>
                                                        <TableCell>{item.description}</TableCell>
                                                        <TableCell>{item.unit}</TableCell>
                                                        <TableCell>{item.quantity}</TableCell>
                                                        <TableCell>{item.unitCost}</TableCell>
                                                        <TableCell>{item.amount}</TableCell>
                                                        <TableCell className="text-right">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger className="text-gray-500 hover:text-white">
                                                                    &#8226;&#8226;&#8226;
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent>
                                                                    <DropdownMenuItem>
                                                                        <Link
                                                                            href="#"
                                                                            className="w-full flex gap-2 items-center"
                                                                        >
                                                                            View
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Link
                                                                            href="#"
                                                                            className="w-full flex gap-2 items-center"
                                                                        >
                                                                            Delete
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={8}
                                                        className="px-4 py-4 text-center text-gray-500"
                                                    >
                                                        No items found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Add Pay Item button */}
                                <div className="col-span-2 flex justify-end mt-4">
                                    <Link href={route("job-order-item-billing")}>
                                        <button className="py-2 px-3 py-2 bg-gray-500 text-white font-weight-bolder hover:bg-gray-600 rounded-lg">
                                            Add Pay Item
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                    {/* Grand Total Display */}
                    <div className="sticky bottom-0 left-0 bg-white shadow-lg p-4 mt-4 rounded-lg flex justify-start items-center">
                            <div className="text-lg font-semibold">
                                Grand Total: <span className="text-yellow-500">₱{calculateGrandTotal().toLocaleString()}</span>
                            </div>
                        </div>
                </div>

                {/* JO Details Section (Right Side - Fixed) */}
                <div className="w-full lg:w-1/3 bg-white shadow rounded-md p-4 sticky top-4 self-start">
                    <div className="text-gray-900">
                        <div className="pb-4">
                            <div className="text-xl font-semibold">{formData.jo_name}</div>
                            <div className="text-sm text-gray-600">{formData.project_desc}</div>
                            <div className="text-sm text-gray-500">{formData.contract_name}</div>
                        </div>

                        <div className="flex flex-row items-center">
                            <div className="w-4/5 bg-gray-200 h-3 rounded-lg mr-4 flex flex-row">
                                <div
                                    className={`h-full rounded-full ${getProgressBarColor(
                                        formData.progress
                                        )}`}
                                    style={{
                                        width: `${formData.progress || 0}%`,
                                    }}
                                ></div>
                            </div>
                            <span className="text-sm">{formData.progress}%</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {[
                            ["Location", formData.location],
                            ["Item Works", formData.itemWorks],
                            ["Period Covered", formData.periodCovered],
                            ["Supplier", formData.supplier],
                            ["Date Needed", formData.dateNeeded],
                            ["Status", formData.status],
                        ].map(([label, value], idx) => (
                            <div key={idx}>
                                <div className="text-sm text-gray-600">{label}:</div>
                                <div>{value}</div>
                            </div>
                        ))}
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-6 bg-gray-500 text-white"
                    >
                        Edit
                    </Button>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                maxWidth="lg"
            >
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Edit Job Order Details
                    </h3>
                    <div>
                        <div className="flex justify-between items-center">
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <button className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                        {formData.status}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            /* Logic to change status to On Going */
                                        }}
                                    >
                                        ON-GOING
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            /* Logic to change status to Pending */
                                        }}
                                    >
                                        PENDING
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <form>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="jo_name">
                                Job Order Name:
                            </InputLabel>
                            <TextInput
                                id="jo_name"
                                name="jo_name"
                                value={formData.jo_name}
                                onChange={handleInputChange}
                                placeholder="Enter New Job Order Name"
                                className="w-80"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="location">Location</InputLabel>
                            <TextInput
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="Enter New Location"
                                className="w-80"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="itemsWork">
                                Items Work
                            </InputLabel>
                            <TextInput
                                id="itemsWork"
                                name="itemsWork"
                                value={formData.itemsWork}
                                onChange={handleInputChange}
                                placeholder="Enter New Items Work"
                                className="w-80"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="periodCovered">
                                Period Covered
                            </InputLabel>
                            <TextInput
                                id="periodCovered"
                                name="periodCovered"
                                value={formData.periodCovered}
                                onChange={handleInputChange}
                                placeholder="Enter New Period Covered"
                                className="w-80"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="supplier">Supplier</InputLabel>
                            <TextInput
                                id="supplier"
                                name="supplier"
                                value={formData.supplier}
                                onChange={handleInputChange}
                                placeholder="Enter New Supplier"
                                className="w-80"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="dateNeeded">
                                Date Needed
                            </InputLabel>
                            <TextInput
                                id="dateNeeded"
                                name="dateNeeded"
                                type="date"
                                value={formData.dateNeeded}
                                onChange={handleInputChange}
                                placeholder="Enter New Date Needed"
                                className="w-80"
                            />
                        </div>
                        <div className="col-span-2 flex justify-end mt-4">
                            <Button
                                onClick={() => setShowModal(false)}
                                variant="outline"
                                className="mr-2"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    /* Save changes logic */
                                }}
                            >
                                Confirm
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
