import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import ExitJobOrderModal from "@/Components/ExitJobOrderModal";
import SaveJobOrderModal from "@/Components/SaveJobOrderModal";
import SubmitJobOrderModal from "@/Components/SubmitJobOrderModal";
import JobOrderSubmittedModal from "@/Components/JobOrderSubmittedModal";
import { ChevronLeft } from "lucide-react";

export default function CreateJobOrderPage({ auth, project, contract }) {
    const [formData, setFormData] = useState({
        contractId: contract.id,
        projectId: project.id,
        jobOrderName: "",
        budget: "",
        location: "",
        supplier: "",
        itemWorks: "", 
        periodCovered: "",
        dateNeeded: "",
        preparedBy: "", 
        checkedBy: "",
        approvedBy: "",
        status: "on-going",
    });

    // State for handling modals
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false);

    // Helper function to check if any field is empty
    // const isAnyFieldEmpty = Object.values(formData).some(value => value === "");

    const isAnyFieldEmpty = Object.entries(formData)
        .filter(([key]) => !["contractId", "projectId", "status"].includes(key))
        .some(([_, value]) => value === "");

    // Check if all input fields are empty
    // const areAllFieldsEmpty = Object.values(formData).every(value => value === "");

    const areAllFieldsEmpty = Object.entries(formData)
        .filter(([key]) => !["contractId", "projectId", "status"].includes(key))
        .every(([_, value]) => value === "");

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

    const resetForm = () => {
        setFormData({
            contractId: contract.id,
            projectId: project.id,
            jobOrderName: "",
            budget: "",
            location: "",
            supplier: "",
            itemWorks: "", 
            periodCovered: "",
            dateNeeded: "",
            preparedBy: "", 
            checkedBy: "",
            approvedBy: "",
            status: "on-going",
        });
        setIsExitModalOpen(false);
    };

    const handleSubmit = () => {
        setIsSubmitModalOpen(true);
        setIsSubmittedModalOpen(false);
    };

    const handleConfirmSubmit = () => {
        // First log what we're sending
        console.log('Sending data:', formData);
    
        axios.post(route('store-job-order'), formData)
            .then(response => {
                if (response.data.success) {
                    console.log('Job order created successfully:', response.data);
                    setIsSubmitModalOpen(false);
                    setIsSubmittedModalOpen(true);
                } else {
                    console.error('Failed to create job order:', response.data.message);
                }
            })
            .catch(error => {
                if (error.response) {
                    // The server responded with a status code outside of 2xx
                    console.error('Validation errors:', error.response.data.errors);
                    
                    // You could set these errors in state to display them to the user
                    const errorMessages = Object.values(error.response.data.errors)
                        .flat()
                        .join('\n');
                        
                    alert('Validation failed:\n' + errorMessages);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                    alert('No response received from server');
                } else {
                    // Something happened in setting up the request
                    console.error('Error:', error.message);
                    alert('Error creating job order: ' + error.message);
                }
            });
    };
    

    const closeModal = () => {
        setIsExitModalOpen(false);
        setIsSaveModalOpen(false);
        setIsSubmitModalOpen(false);
        setIsSubmittedModalOpen(false);
    };

    // Handle the Return Button or Cancel Button click
    const handleCancel = (e) => {
        if (areAllFieldsEmpty) {
            window.location.href = route("job-order", { project_id: project.id });
        } else {
            setIsExitModalOpen(true);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                        <button onClick={handleCancel} className="text-slate-500 hover:text-slate-700 mr-4 flex items-center">
                            <ChevronLeft size={20} strokeWidth={2} />
                        </button>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create Job Order
                    </h2>
                </div>
            }
        >
            <Head title="Create Job Order" />

            <div className="p-0">
                <div className="max-w-7xl">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-white">

                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {project.description}
                                </h2>
                                <p className="mt-1 text-lg text-gray-600">
                                    {contract.contract_name}
                                </p>

                                <form className="mt-6" onSubmit={handleExit}>
                                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                        <div>
                                            <label
                                                htmlFor="jobOrderName"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Job Order Name
                                                <span className="text-red-500"> *</span>
                                            </label>
                                            <input
                                                id="jobOrderName"
                                                name="jobOrderName"
                                                type="text"
                                                required
                                                value={formData.jobOrderName}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Job Order Name"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="budget"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Budget
                                                <span className="text-red-500"> *</span>
                                            </label>
                                            <input
                                                id="budget"
                                                name="budget"
                                                type="number"
                                                min="0"
                                                required
                                                value={formData.budget}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Budget Amount"
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
                                                htmlFor="itemWorks"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Item Works
                                                <span className="text-red-500"> *</span>
                                            </label>
                                            <input
                                                id="itemWorks"
                                                name="itemWorks"
                                                type="text"
                                                required
                                                value={formData.itemWorks}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Item Works"
                                            />
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

                                        <div>
                                            <label
                                                htmlFor="preparedBy"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Prepared By
                                                <span className="text-red-500"> *</span>
                                            </label>
                                            <input
                                                id="preparedBy"
                                                name="preparedBy"
                                                type="text"
                                                required
                                                value={formData.preparedBy}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Name Here"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="checkedBy"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Checked By
                                                <span className="text-red-500"> *</span>
                                            </label>
                                            <input
                                                id="checkedBy"
                                                name="checkedBy"
                                                type="text"
                                                required
                                                value={formData.checkedBy}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Name Here"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="approvedBy"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Approved By
                                                <span className="text-red-500"> *</span>
                                            </label>
                                            <input
                                                id="approvedBy"
                                                name="approvedBy"
                                                type="text"
                                                required
                                                value={formData.approvedBy}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Name Here"
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
                    projectId={project.id}
                />
            )}
            {isSaveModalOpen && (
                <SaveJobOrderModal
                    show={isSaveModalOpen}
                    onClose={closeModal}
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
                    projectId={project.id}
                />
            )}
        </AuthenticatedLayout>
    );
}
