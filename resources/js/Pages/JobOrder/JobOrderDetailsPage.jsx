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

export default function JobOrderDetailsPage({ auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        projectId: "PROJECT-A/B",
        jobOrderNo: "UNIT 21/22",
        contractId: "#00000",
        location: "Panabo City",
        itemsWork: "PHP 1,000,000.00",
        periodCovered: "2022-2026",
        supplier: "Name of Supplier",
        dateNeeded: "2022-2026",
        status: "PENDING", // default status
    });

    const [relatedData, setRelatedData] = useState([]); // Placeholder for related data

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleStatusChange = (status) => {
        setFormData((prevState) => ({ ...prevState, status }));
    };

    const statusColors = {
        "ON-GOING": "bg-blue-500",
        PENDING: "bg-yellow-500",
        COMPLETED: "bg-green-500",
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
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

            {/* JO Details Section */}
            <div className="py-3">
                <div className="max-w-7xl mx-auto">
                    <div className="text-gray-900">
                        <div className="pb-4">
                            <div className="flex justify-between items-center">
                                <div className="text-xl">{formData.projectId}</div>
                                <div className="flex items-center">
                                    <div className="text-sm text-gray-600 pr-2">
                                        Project Status
                                    </div>
                                    <div
                                        className={`text-white text-center w-28 py-1 px-2 rounded-lg ${statusColors[formData.status]}`}
                                    >
                                        {formData.status}
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-gray-500 text-white"
                                >
                                    Edit
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                ["Job Order No", formData.jobOrderNo],
                                ["Contract ID", formData.contractId],
                                ["Location", formData.location],
                                ["Items Work", formData.itemsWork],
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
                    </div>

                    {/* Bill of Quantities */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-4">
                            Bill of Quantities
                        </h3>
                        <div className="bg-white shadow rounded overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {[
                                            "",
                                            "Item No.",
                                            "Description",
                                            "Unit",
                                            "Quantity",
                                            "Unit Cost",
                                            "Amount",
                                            "Actions",
                                        ].map((header, idx) => (
                                            <th
                                                key={idx}
                                                className="px-2 py-2 border-b border-gray-200"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {relatedData.length > 0 ? (
                                        relatedData.map((item, idx) => (
                                            <tr
                                                key={idx}
                                                className="hover:bg-gray-600"
                                            >
                                                <td className="px-2 py-2">
                                                    <Checkbox />
                                                </td>
                                                <td className="px-2 py-2">
                                                    {item.itemNo}
                                                </td>
                                                <td className="px-2 py-2">
                                                    {item.description}
                                                </td>
                                                <td className="px-2 py-2">
                                                    {item.unit}
                                                </td>
                                                <td className="px-2 py-2">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-2 py-2">
                                                    {item.unitCost}
                                                </td>
                                                <td className="px-2 py-2">
                                                    {item.amount}
                                                </td>
                                                <td className="px-2 py-2 text-right">
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
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="px-4 py-4 text-center text-gray-500"
                                            >
                                                No items found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
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
                    <form>
                        {[
                            ["Job Order No", "jobOrderNo"],
                            ["Contract ID", "contractId"],
                            ["Location", "location"],
                            ["Items Work", "itemsWork"],
                            ["Period Covered", "periodCovered"],
                            ["Supplier", "supplier"],
                            ["Date Needed", "dateNeeded", "date"],
                        ].map(([label, name, type = "text"], idx) => (
                            <div
                                className="flex justify-between items-center mb-2"
                                key={idx}
                            >
                                <InputLabel htmlFor={name}>{label}</InputLabel>
                                <TextInput
                                    id={name}
                                    name={name}
                                    type={type}
                                    value={formData[name]}
                                    onChange={handleInputChange}
                                    placeholder={`Enter New ${label}`}
                                    className="w-80"
                                />
                            </div>
                        ))}
                        <div className="col-span-2 flex justify-end mt-4">
                            <Button
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                                className="mr-2"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    // Save changes logic
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
