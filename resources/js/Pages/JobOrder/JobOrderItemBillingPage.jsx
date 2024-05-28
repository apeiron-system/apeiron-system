import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";

const ConfirmPopup = ({ message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">{message}</p>
            <div className="flex justify-center space-x-4">
                <button onClick={onCancel} className="bg-gray-200 text-gray-700 py-2 px-4 rounded">No</button>
                <button onClick={onConfirm} className="bg-blue-600 text-white py-2 px-4 rounded">Yes</button>
            </div>
        </div>
    </div>
);

export default function JobOrderItemBillingPage({ auth }) {
    const [showSavePopup, setShowSavePopup] = useState(false);
    const [showCancelPopup, setShowCancelPopup] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setShowSavePopup(true);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setShowCancelPopup(true);
    };

    const handleCloseSavePopup = () => {
        setShowSavePopup(false);
    };

    const handleCloseCancelPopup = () => {
        setShowCancelPopup(false);
    };

    const handleConfirmCancel = () => {
        setShowCancelPopup(false);
        // Add logic to handle form cancellation if needed
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex">
                    <Link href={route('contract')} className="text-grey-600 hover:text-grey-900 mr-4">
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
                    <div className="bg-white overflow-hidden sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="max-w-3xl mx-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold">New Pay Item</h3>
                                    <button onClick={handleCancel} className="bg-white text-gray-700 border border-black py-2 px-4 rounded">
                                        Cancel
                                    </button>
                                </div>
                                <p className="mb-6">Please insert a pay item and its details</p>
                                <form onSubmit={handleSave}>
                                    <div className="grid grid-cols-2 gap-6 mb-4">
                                        <div>
                                            <label className="block text-gray-700">Job Order No.</label>
                                            <select className="w-full mt-1 p-2 border rounded">
                                                <option>Select</option>
                                                {/* Add more options here */}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700">Quantity</label>
                                            <input type="number" className="w-full mt-1 p-2 border rounded" placeholder="Enter Quantity" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700">Job Order Part</label>
                                            <select className="w-full mt-1 p-2 border rounded">
                                                <option>Select</option>
                                                {/* Add more options here */}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700">Unit Price</label>
                                            <input type="number" step="0.01" className="w-full mt-1 p-2 border rounded" placeholder="Enter Unit Price" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700">Date Modified</label>
                                            <input type="date" className="w-full mt-1 p-2 border rounded" placeholder="Enter Date Needed" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700">Weight</label>
                                            <input type="number" step="0.01" className="w-full mt-1 p-2 border rounded" placeholder="Enter Weight" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Pay Item Number</label>
                                        <input type="text" className="w-full mt-1 p-2 border rounded" placeholder="Enter Pay Item Number" />
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <Button type="submit" className="bg-gray-200 text-gray-700">Save</Button>
                                        <Button className="bg-blue-600 text-white">Submit</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showSavePopup && (
                <ConfirmPopup
                    message="Form have been successfully saved!"
                    onConfirm={handleCloseSavePopup}
                    onCancel={handleCloseSavePopup}
                />
            )}

            {showCancelPopup && (
                <ConfirmPopup
                    message="Are you sure you want to submit this form? Once submitted, it cannot be modified."
                    onConfirm={handleConfirmCancel}
                    onCancel={handleCloseCancelPopup}
                />
            )}
        </AuthenticatedLayout>
    );
}
