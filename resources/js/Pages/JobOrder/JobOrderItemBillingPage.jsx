import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Head, Link } from "@inertiajs/react";
import SaveJobOrderModal from "@/Components/SaveJobOrderModal";
import CancelJobOrderModal from "@/Components/CancelJobOrderModal";
import SubmitJobOrderModal from "@/Components/SubmitJobOrderModal";
import JobOrderSubmittedModal from "@/Components/JobOrderSubmittedModal";
import { ChevronLeft } from "lucide-react";

export default function JobOrderItemBillingPage({ auth }) {
    const [formData, setFormData] = useState({
        jobOrderNo: "",
        quantity: "",
        jobOrderPart: "",
        unitPrice: "",
        dateModified: "",
        weight: "",
        payItemNumber: "",
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
            jobOrderNo: "",
            quantity: "",
            jobOrderPart: "",
            unitPrice: "",
            dateModified: "",
            weight: "",
            payItemNumber: "",
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
                        href={route("job-order-details")}
                        className="text-grey-600 hover:text-grey-900 mr-4"
                    >
                        <button>
                            <ChevronLeft size={25} strokewidth={1.25} />
                        </button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Item Billing
                    </h2>
                </div>
            }
        >
            <Head title="Job Order" />

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="font-semibold text-2xl text-gray-800 leading-tight">
                                New Pay Item
                            </h1>

                            <div className="mt-0">
                                <p className="mt-1 text-sm text-gray-600">
                                    Please insert a pay item and its details
                                </p>
                                <form className="mt-6" onSubmit={handleSave}>
                                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                        <div>
                                            <label
                                                htmlFor="jobOrderNo"
                                                className="block w-full text-sm font-medium text-gray-700"
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
                                                <option value="">Select Job Order Number</option>
                                                <option value="JO-001">
                                                    JO-001
                                                </option>
                                                <option value="JO-002">
                                                    JO-002
                                                </option>
                                                <option value="JO-003">
                                                    JO-003
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="quantity"
                                                className="block w-full text-sm font-medium text-gray-700"
                                            >
                                                Quantity
                                            </label>
                                            <input
                                                id="quantity"
                                                name="quantity"
                                                type="number"
                                                required
                                                value={formData.quantity}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Quantity"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="jobOrderPart"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Job Order Part
                                            </label>
                                            <select
                                                id="jobOrderPart"
                                                name="jobOrderPart"
                                                required
                                                value={formData.jobOrderPart}
                                                onChange={handleChange}
                                                className="mt-1 w-full inline-block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm rounded-md"
                                            >
                                                <option value="">Select Job Order Part</option>
                                                <option value="Part-A">
                                                    Part-A
                                                </option>
                                                <option value="Part-B">
                                                    Part-B
                                                </option>
                                                <option value="Part-C">
                                                    Part-C
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="unitPrice"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Unit Price
                                            </label>
                                            <input
                                                id="unitPrice"
                                                name="unitPrice"
                                                type="number"
                                                step="0.01"
                                                required
                                                value={formData.unitPrice}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Unit Price"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="dateModified"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Date Modified
                                            </label>
                                            <input
                                                id="dateModified"
                                                name="dateModified"
                                                type="date"
                                                required
                                                value={formData.dateModified}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="weight"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Weight
                                            </label>
                                            <input
                                                id="weight"
                                                name="weight"
                                                type="number"
                                                step="0.01"
                                                required
                                                value={formData.weight}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm"
                                                placeholder="Enter Weight"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="payItemNumber"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Pay Item No.
                                            </label>
                                            <select
                                                id="payItemNumber"
                                                name="payItemNumber"
                                                required
                                                value={formData.payItemNumber}
                                                onChange={handleChange}
                                                className="mt-1 w-full inline-block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[rgb(47,60,78)] focus:border-[rgb(47,60,78)] sm:text-sm rounded-md"
                                            >
                                                <option value="">Select Pay Item Number</option>
                                                <option value="PI-001">
                                                    PI-001
                                                </option>
                                                <option value="PI-002">
                                                    PI-002
                                                </option>
                                                <option value="PI-003">
                                                    PI-003
                                                </option>
                                            </select>
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
