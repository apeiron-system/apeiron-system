import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import SaveJobOrderModal from "@/Components/SaveJobOrderModal";
import CancelJobOrderModal from "@/Components/CancelJobOrderModal";
import SubmitJobOrderModal from "@/Components/SubmitJobOrderModal";
import JobOrderSubmittedModal from "@/Components/JobOrderSubmittedModal";
import { ChevronLeft } from "lucide-react";

export default function CreateJobOrderPage({ auth }) {
    const [formData, setFormData] = useState({
        projectName: "",
        jobOrderNo: "",
        contractId: "",
        location: "",
        itemsWork: "",
        periodCovered: "",
        supplier: "",
        dateNeeded: "",
    });

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCancel = () => {
        setIsCancelModalOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsSaveModalOpen(true);
    };

    const handleConfirmCancel = () => {
        setFormData({
            projectName: "",
            jobOrderNo: "",
            contractId: "",
            location: "",
            itemsWork: "",
            periodCovered: "",
            supplier: "",
            dateNeeded: "",
        });
        setIsCancelModalOpen(false);
    };

    const handleSubmit = () => {
        setIsSubmitModalOpen(true);
        setIsSubmittedModalOpen(false);
    };

    const handleConfirmSubmit = () => {
        console.log("Form submitted!");
        setIsSubmitModalOpen(false);
        setIsSubmittedModalOpen(true);
    };

    const closeModal = () => {
        setIsSaveModalOpen(false);
        setIsCancelModalOpen(false);
        setIsSubmitModalOpen(false);
        setIsSubmittedModalOpen(false);
    };

    const isAnyFieldEmpty = Object.values(formData).some(
        (value) => value === ""
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex">
                    <Link
                        href={route("job-order")}
                        className="text-grey-600 hover:text-grey-900 mr-4"
                    >
                        <button>
                            <ChevronLeft size={25} strokeWidth={1.25} />
                        </button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create Job Order
                    </h2>
                </div>
            }
        >
            <Head title="Create Job Order" />

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="mt-0">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Project Selection
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Choose the project you're creating the job
                                    order for.
                                </p>
                                <select
                                    id="projectName"
                                    name="projectName"
                                    required
                                    value={formData.projectName}
                                    onChange={handleChange}
                                    className="mt-1 inline-block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm rounded-md"
                                >
                                    <option value="">
                                        Select Project Name
                                    </option>
                                    <option value="Project 1">Project 1</option>
                                    <option value="Project 2">Project 2</option>
                                </select>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    New Job Order
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Please provide the required information
                                    below:
                                </p>

                                <form className="mt-6" onSubmit={handleSave}>
                                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                        <div>
                                            <label
                                                htmlFor="jobOrderNo"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Job Order No.
                                            </label>
                                            <select
                                                id="jobOrderNo"
                                                name="jobOrderNo"
                                                required
                                                value={formData.jobOrderNo}
                                                onChange={handleChange}
                                                className="mt-1 w-full inline-block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm rounded-md"
                                            >
                                                <option value="">
                                                    Select Job Order Number
                                                </option>
                                                <option value="Order 1">
                                                    JO-001
                                                </option>
                                                <option value="Order 2">
                                                    JO-002
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="contractId"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Contract ID
                                            </label>
                                            <select
                                                id="contractId"
                                                name="contractId"
                                                required
                                                value={formData.contractId}
                                                onChange={handleChange}
                                                className="mt-1 w-full inline-block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm rounded-md"
                                            >
                                                <option value="">
                                                    Select Contract ID
                                                </option>
                                                <option value="Contract 1">
                                                    C-001
                                                </option>
                                                <option value="Contract 2">
                                                    C-002
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="periodCovered"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Period Covered
                                            </label>
                                            <input
                                                id="periodCovered"
                                                name="periodCovered"
                                                type="text"
                                                required
                                                value={formData.periodCovered}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Period Covered"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="supplier"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Supplier
                                            </label>
                                            <input
                                                id="supplier"
                                                name="supplier"
                                                type="text"
                                                required
                                                value={formData.supplier}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Supplier"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="location"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Location
                                            </label>
                                            <input
                                                id="location"
                                                name="location"
                                                type="text"
                                                required
                                                value={formData.location}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Location"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="dateNeeded"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Date Needed
                                            </label>
                                            <input
                                                id="dateNeeded"
                                                name="dateNeeded"
                                                type="date"
                                                required
                                                value={formData.dateNeeded}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="itemsWork"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Items Work
                                            </label>
                                            <input
                                                id="itemsWork"
                                                name="itemsWork"
                                                type="text"
                                                required
                                                value={formData.itemsWork}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Items Work"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between">
                                        <Button
                                            type="button"
                                            onClick={handleCancel}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                        >
                                            Cancel
                                        </Button>
                                        <div className="flex space-x-4">
                                            <Button
                                                type="submit"
                                                className="bg-[rgb(15,23,42)] hover:bg-[rgb(47,60,78)] text-white font-bold py-2 px-4 rounded"
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={handleSubmit}
                                                disabled={isAnyFieldEmpty}
                                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isSaveModalOpen && (
                <SaveJobOrderModal
                    show={isSaveModalOpen}
                    onClose={closeModal}
                />
            )}
            {isCancelModalOpen && (
                <CancelJobOrderModal
                    show={isCancelModalOpen}
                    onClose={closeModal}
                    onConfirm={handleConfirmCancel}
                />
            )}
            {isSubmitModalOpen && (
                <SubmitJobOrderModal
                    show={isSubmitModalOpen}
                    onClose={closeModal}
                    onConfirm={handleConfirmSubmit}
                />
            )}
            {isSubmittedModalOpen && (
                <JobOrderSubmittedModal
                    show={isSubmittedModalOpen}
                    onClose={closeModal}
                />
            )}
        </AuthenticatedLayout>
    );
}
