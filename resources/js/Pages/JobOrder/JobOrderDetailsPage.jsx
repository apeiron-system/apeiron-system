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

    const [relatedData, setRelatedData] = useState([]); // Define relatedData state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleStatusChange = (status) => {
        setFormData({ ...formData, status });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <Link href={route("job-order")}>
                        <button className="text-slate-500 hover:text-slate-700 mr-4 flex items-center">
                            <ChevronLeft size={30} strokewidth={2} />
                        </button>
                    </Link>
                    <h2 className="font-bold text-3xl text-gray-1000 leading-tight">
                        Job Order Details
                    </h2>
                </div>
            }
        >
            <Head title="Job Order Details" />

            {/* JO Details Page */}
            <div className="py-3">
                <div className="max-w-7xl mx-auto">
                    <div className="text-gray-900">
                        <div className="pb-4">
                            <div className="flex mb-1">
                                <div className="text-xl">
                                    {formData.projectId}
                                </div>
                            </div>
                            <div className="flex justify-between items-center items-center">
                                <div className="mr-2 flex justify-start">
                                    <div className="text-sm text-gray-600 pr-2">
                                        Project Status
                                    </div>
                                    <div
                                        // bg color should have condition 'if ON-GOING: Blue , if PENDING: yellow'
                                        className={`bg-yellow-500 text-white text-center w-28 py-1 px-2 rounded-lg`}
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
                            <div>
                                <div className="text-sm text-gray-600">
                                    Job Order No:
                                </div>
                                <div>{formData.jobOrderNo}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">
                                    Contract ID:
                                </div>
                                <div>{formData.contractId}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">
                                    Location:
                                </div>
                                <div>{formData.location}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">
                                    Items Work:
                                </div>
                                <div>{formData.itemsWork}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">
                                    Period Covered:
                                </div>
                                <div>{formData.periodCovered}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">
                                    Supplier:
                                </div>
                                <div>{formData.supplier}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">
                                    Date Needed:
                                </div>
                                <div>{formData.dateNeeded}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-4">
                            Bill of Quantites
                        </h3>
                        <div className="bg-white shadow rounded overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-2 py-2 border-b border-gray-200"></th>
                                        <th className="px-2 py-2 border-b border-gray-200">
                                            Item No.
                                        </th>
                                        <th className="px-2 py-2 border-b border-gray-200">
                                            Description
                                        </th>
                                        <th className="px-2 py-2 border-b border-gray-200">
                                            Unit
                                        </th>
                                        <th className="px-2 py-2 border-b border-gray-200">
                                            Quantity
                                        </th>
                                        <th className="px-2 py-2 border-b border-gray-200">
                                            Unit Cost
                                        </th>
                                        <th className="px-2 py-2 border-b border-gray-200">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-600 ">
                                        <td className="px-2 py-2 whitespace-nowrap">
                                            <Checkbox />
                                        </td>
                                        <td className="px-2 py-2 whitespace-nowrap"></td>
                                        <td className="px-2 py-2 whitespace-nowrap"></td>
                                        <td className="px-2 py-2 whitespace-nowrap"></td>
                                        <td className="px-2 py-2 whitespace-nowrap"></td>
                                        <td className="px-2 py-2 whitespace-nowrap"></td>
                                        <td className="px-2 py-2 whitespace-nowrap text-right text-sm font-medium">
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
                                    <tr className="hover:bg-gray-600 ">
                                        <td className="px-2 py-2 whitespace-nowrap">
                                            <Checkbox />
                                        </td>
                                        <td className="px-2 py-2 whitespace-nowrap"></td>
                                        <td className="px-2 py-2 whitespace-nowrap"></td>
                                        <td className="px-2 py-2 whitespace-nowrap"></td>
                                        <td className="px-2 py-2 whitespace-nowrap"></td>
                                        <td className="px-2 py-2 whitespace-nowrap"></td>
                                        <td className="px-2 py-2 whitespace-nowrap text-right text-sm font-medium">
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-span-2 flex justify-end mt-4">
                        <Link href={route("job-order-item-billing")}>
                            <button className="py-2 px-3 py-2 bg-gray-500 text-white font-weight-bolder hover:bg-gray-600 rounded">
                                Add Pay Item
                            </button>
                        </Link>
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
                            <InputLabel htmlFor="jobOrderNo">
                                Job Order No:
                            </InputLabel>
                            <TextInput
                                id="jobOrderNo"
                                name="jobOrderNo"
                                value={formData.jobOrderNo}
                                onChange={handleInputChange}
                                placeholder="Enter New Job Order Name"
                                className="w-80"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="contractId">
                                Contract ID
                            </InputLabel>
                            <TextInput
                                id="contractId"
                                name="contractId"
                                value={formData.contractId}
                                onChange={handleInputChange}
                                placeholder="Enter New Contract ID"
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
