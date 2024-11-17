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
        projectId: "Project A",
        jobOrderNo: "UNIT 21",
        contract_name: "Active Contract 1",
        location: "Panabo City",
        itemWorks: "Labor",
        periodCovered: "2022-2026",
        supplier: "Name of Supplier",
        dateNeeded: "2022-2026",
        status: "PENDING", // default status
        progress: 40, // Sample progress value (in percentage)
    });

    const [jobOrderParts, setJobOrderParts] = useState({
        "Part A": [],
        "Part B": [],
        "Part C": [],
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
            itemNo: "001",
            description: "Sample Item",
            unit: "pcs",
            quantity: 1,
            unitCost: 100,
            amount: 100,
        };
        setJobOrderParts((prevParts) => ({
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
            <div className="py-3 flex flex-row-reverse gap-6">
                {/* Bill of Quantities - Job Parts Section (Left Side - 70%) */}
                <div className="w-full lg:w-7/10 bg-white shadow rounded-md p-4">
                    <h3 className="text-xl font-semibold mb-4">
                        Bill of Quantities
                    </h3>
                    {Object.keys(jobOrderParts).map((part, idx) => (
                        <div key={idx} className="mb-8">
                            <h4 className="font-semibold text-lg">{part}</h4>
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
                                                <TableHead key={idx}>
                                                    {header}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {jobOrderParts[part].length > 0 ? (
                                            jobOrderParts[part].map((item, idx) => (
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
                            <div className="col-span-2 flex justify-end mt-4">
                                <Link href={route("job-order-item-billing")}>
                                    <button className="py-2 px-3 py-2 bg-gray-500 text-white font-weight-bolder hover:bg-gray-600 rounded-lg">
                                        Add Pay Item
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* JO Details Section (Right Side - 30%) */}
                <div className="w-full lg:w-1/3 bg-white shadow rounded-md p-4">
                    <div className="text-gray-900">
                        <div className="pb-4">
                            {/* Job Order No - Top Left */}
                            <div className="text-xl font-semibold">{formData.jobOrderNo}</div>
                            {/* Project Name - Slightly smaller font */}
                            <div className="text-sm text-gray-600">{formData.projectId}</div>
                            {/* Contract Name - Even smaller font */}
                            <div className="text-sm text-gray-500">{formData.contract_name}</div>
                        </div>
                        {/* Progress Bar Section */}
                        <div className="pb-4">
                            <div className="w-full bg-gray-200 h-3 rounded-lg">
                                <div
                                    className={`h-full rounded-full ${getProgressBarColor(formData.progress)}`}
                                    style={{ width: `${formData.progress}%` }}
                                ></div>
                            </div>
                            <div className="text-sm mt-2">
                                Progress: {formData.progress}%
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {[ 
                            ["Location", formData.location],
                            ["Item Works", formData.itemWorks],
                            ["Period Covered", formData.periodCovered],
                            ["Supplier", formData.supplier],
                            ["Date Needed", formData.dateNeeded],
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
                    {/* Form Inputs */}
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <select
                        name="status"
                        id="status"
                        value={formData.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="form-select"
                    >
                        <option value="PENDING">Pending</option>
                        <option value="IN PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                    {/* Other Inputs */}
                    {/* Add any other fields you want to be editable */}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
