import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import ExitJobOrderModal from "@/Components/ExitJobOrderModal";
import SubmitJobOrderModal from "@/Components/SubmitJobOrderModal";
import JobOrderSubmittedModal from "@/Components/JobOrderSubmittedModal";
import { ChevronLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateJobOrderPage({ auth, project, contract, projectParts }) {
    const [formData, setFormData] = useState({
        contractId: contract.id,
        projectId: project.id,
        jobOrderName: "",
        location: "",
        supplier: "",
        itemWorks: "",
        periodCovered: "",
        dateNeeded: "",
        preparedBy: "",
        checkedBy: "",
        approvedBy: "",
        status: "pending",
    });
    console.log(projectParts);
    // State for handling modals
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false);
    const [selectedParts, setSelectedParts] = useState([]);
    
    // Handle select/deselect all
    const handleSelectAll = () => {
        if (Array.isArray(projectParts) && projectParts.length > 0) {
            if (selectedParts.length === projectParts.length) {
                setSelectedParts([]); // Deselect all
            } else {
                setSelectedParts(projectParts.map((part) => part.id)); // Select all
            }
        }
    };
    
    // Handle selecting/deselecting a single part
    const handleSelectPart = (partId) => {
        if (Array.isArray(projectParts) && projectParts.length > 0) {
            setSelectedParts((prev) =>
                prev.includes(partId)
                    ? prev.filter((id) => id !== partId) // Deselect if already selected
                    : [...prev, partId] // Add to selected parts
            );
        }
    };

    const isProjectPartSelected = selectedParts.length === 0;

    const isAnyFieldEmpty = Object.entries(formData)
        .filter(([key]) => !["contractId", "projectId", "status"].includes(key))
        .some(([_, value]) => value === "");

    const isSubmitDisabled = isAnyFieldEmpty || isProjectPartSelected;

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
            location: "",
            supplier: "",
            itemWorks: "", 
            periodCovered: "",
            dateNeeded: "",
            preparedBy: "", 
            checkedBy: "",
            approvedBy: "",
            status: "pending",
        });
        setIsExitModalOpen(false);
    };

    const handleSubmit = () => {
        setIsSubmitModalOpen(true);
        setIsSubmittedModalOpen(false);
    };

    const handleConfirmSubmit = () => {
        // Add selected project parts to the formData
        const updatedFormData = {
            ...formData,
            projectParts: selectedParts, // Include the selected parts
        };

        console.log("Sending data:", updatedFormData);

        axios
            .post(route("store-job-order"), updatedFormData)
            .then((response) => {
                if (response.data.success) {
                    console.log(
                        "Job order created successfully:",
                        response.data
                    );
                    setIsSubmitModalOpen(false);
                    setIsSubmittedModalOpen(true);
                } else {
                    console.error(
                        "Failed to create job order:",
                        response.data.message
                    );
                    alert(
                        response.data.message || "Failed to create job order"
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
                    alert("Error creating job order: " + error.message);
                }
            });
    };

    const closeModal = () => {
        setIsExitModalOpen(false);
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
                    <button
                        onClick={handleCancel}
                        className="text-slate-500 hover:text-slate-700 mr-4 flex items-center"
                    >
                        <ChevronLeft size={20} strokeWidth={2} />
                    </button>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create Job Order
                    </h2>
                </div>
            }
        >
            <Head title="Create Job Order" />

            <div>
                <div className="grid grid-row-1 mx-12 px-1">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Main Content */}
                        <div className="col-span-2 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="bg-white">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {project.project_name}
                                    </h2>
                                    <p className="mt-1 text-lg text-gray-600">
                                        {contract.contract_name}
                                    </p>
                                    {/* Job Order Form */}
                                    <form className="mt-6" onSubmit={handleExit}>
                                        {/* Form Fields */}
                                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                            <div>
                                                <label
                                                    htmlFor="jobOrderName"
                                                    className="block text-sm font-semibold text-gray-700"
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
                                                    htmlFor="location"
                                                    className="block text-sm font-semibold text-gray-700"
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
                                                    className="block text-sm font-semibold text-gray-700"
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
                                                    className="block text-sm font-semibold text-gray-700"
                                                >
                                                    Item Works
                                                    <span className="text-red-500"> *</span>
                                                </label>
                                                <select
                                                    id="itemWorks"
                                                    name="itemWorks"
                                                    required
                                                    value={formData.itemWorks}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                >
                                                    <option value="" disabled>
                                                        Select Item Works
                                                    </option>
                                                    <option value="material" className="block text-sm">Material</option>
                                                    <option value="labor">Labor</option>
                                                    <option value="equipment">Equipment</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="periodCovered"
                                                    className="block text-sm font-semibold text-gray-700"
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
                                                    className="block text-sm font-semibold text-gray-700"
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
                                                    className="block text-sm font-semibold text-gray-700"
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
                                                    className="block text-sm font-semibold text-gray-700"
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
                                                    className="block text-sm font-semibold text-gray-700"
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

                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar for Project Parts */}
                        <div className="col-span-1 bg-gray-100 overflow-hidden shadow-sm sm:rounded-lg px-4 py-2 mt-20">
                            <h3 className="text-sm font-semibold text-gray-800 mb-4">
                                Select Project Parts <span className="text-red-500">*</span>
                            </h3>

                            {/* Select All Checkbox */}
                            <div className="mb-4">
                                <Checkbox
                                    checked={projectParts.length > 0 && projectParts.every((part) => selectedParts.includes(part.id))}
                                    onCheckedChange={handleSelectAll}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-700">Select All</span>
                            </div>

                            {/* Project Parts List */}
                            <div className="space-y-4">
                                {projectParts.length > 0 ? (
                                    projectParts.map((part) => (
                                        <div key={part.id} className="flex items-center justify-between border-b py-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    checked={selectedParts.includes(part.id)}
                                                    onCheckedChange={() => handleSelectPart(part.id)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-gray-800">{part.description}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-600">No parts available for this project.</p>
                                )}
                            </div>
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
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitDisabled}
                            className="bg-[rgb(15,23,42)] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Submit
                        </Button>
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
