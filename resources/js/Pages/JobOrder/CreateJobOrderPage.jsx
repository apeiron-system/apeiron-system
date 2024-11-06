import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import ExitJobOrderModal from "@/Components/ExitJobOrderModal";
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

    // State for handling modals
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false);

    // Helper function to check if any field is empty
    const isAnyFieldEmpty = Object.values(formData).some(value => value === "");

    // Check if all input fields are empty
    const areAllFieldsEmpty = Object.values(formData).every(value => value === "");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Exit button (trigger Exit modal if form is incomplete)
    const handleExit = (e) => {
        e.preventDefault();
        if (isAnyFieldEmpty) {
            closeModal();
            setIsExitModalOpen(true);
        }
    };

    // Handle Save button
    const handleSave = () => {
        closeModal();
        setIsSaveModalOpen(true);
    };

    // Handle Cancel button
    const handleCancel = () => {
        closeModal();
        setIsCancelModalOpen(true);
    };

    const resetForm = () => {
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
        setIsExitModalOpen(false);
        setIsSaveModalOpen(false);
        setIsCancelModalOpen(false);
        setIsSubmitModalOpen(false);
        setIsSubmittedModalOpen(false);
    };

    // Handle the Back Button click
    const handleBackButtonClick = (e) => {
        if (areAllFieldsEmpty) {
            handleReturn();
        } else {
            setIsExitModalOpen(true);
        }
    };

    const handleReturn = () => {
        window.location.href = "job-order";
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <button onClick={handleBackButtonClick} className="text-slate-500 hover:text-slate-700 mr-4 flex items-center">
                        <ChevronLeft size={30} strokeWidth={2} />
                    </button>
                    <h2 className="font-bold text-3xl text-gray-1000 leading-tight">
                        Create Job Order
                    </h2>
                </div>
            }
        >
            <Head title="Create Job Order" />

            <div className="p-0">
                <div className="max-w-7xl">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-white border-b border-gray-200">

                            <div className="mt-0">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    New Job Order
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Please provide the required information
                                    below:
                                </p>

                                <div className="mt-6">
                                    <h2 htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                                        Project Name
                                        <span className="text-red-500"> *</span>
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Choose the project you're creating the job order for.
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

                                <form className="mt-6" onSubmit={handleExit}>
                                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                        <div>
                                            <label
                                                htmlFor="jobOrderNo"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Job Order No.
                                                <span className="text-red-500"> *</span>
                                            </label>
                                            <input
                                                id="jobOrderNo"
                                                name="jobOrderNo"
                                                type="text"
                                                required
                                                value={formData.jobOrderNo}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Job Order Number"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="contractId"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Contract ID
                                                <span className="text-red-500"> *</span>
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
                                                <span className="text-red-500"> *</span>
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
                                                <span className="text-red-500"> *</span>
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
                                                <span className="text-red-500"> *</span>
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
                                                <span className="text-red-500"> *</span>
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
                                                <span className="text-red-500"> *</span>
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

                                    <div className="my-4 flex items-center justify-end gap-4">
                                        <Button
                                            type="button"
                                            onClick={handleCancel}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                        >
                                            Cancel
                                        </Button>
                                        <div className="flex space-x-4">
                                            <Button
                                                type="button"
                                                onClick={handleSubmit}
                                                disabled={isAnyFieldEmpty}
                                                className="bg-[rgb(15,23,42)] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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
            {isExitModalOpen && (
                <ExitJobOrderModal
                    show={isExitModalOpen}
                    onClose={closeModal}
                    onSaveDraft={handleSave}
                    onDiscard={handleReturn}
                />
            )}
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
                    onConfirm={resetForm}
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
                    onCreateAnother={resetForm}
                />
            )}
        </AuthenticatedLayout>
    );
}
