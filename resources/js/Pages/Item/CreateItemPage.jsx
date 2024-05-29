import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Importing AuthenticatedLayout
const CreateItemPage = ({ auth }) => {
    const [formData, setFormData] = useState({
        itemNo: "",
        itemType: "",
        description: "",
        unit: "",
        price: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!", formData);
    };

    return (
        <AuthenticatedLayout user={auth.user}> {/* Wrapping all content in AuthenticatedLayout */}
            <div className="flex">
                <aside className="w-64 bg-gray-800 text-white h-screen">
                    <div className="p-4">
                        <div className="text-2xl font-bold">Apeiron Construction Solutions</div>
                        <nav className="mt-6">
                            <ul>
                                <li className="mt-2">
                                    <Link to="/contract" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded">
                                        Contract
                                    </Link>
                                </li>
                                <li className="mt-2">
                                    <Link to="/job-order" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded">
                                        Job Order
                                    </Link>
                                </li>
                                <li className="mt-2">
                                    <Link to="/item" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded bg-gray-900">
                                        Item
                                    </Link>
                                </li>
                                <li className="mt-2">
                                    <Link to="/progress-report" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded">
                                        Progress Report
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="p-4">
                        <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
                            Log Out
                        </button>
                    </div>
                </aside>
                <main className="flex-1 p-6 bg-gray-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-xl font-semibold">Create Item</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="itemNo" className="block text-sm font-medium text-gray-700">Item No:</label>
                                        <input
                                            id="itemNo"
                                            name="itemNo"
                                            type="text"
                                            required
                                            value={formData.itemNo}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Enter Item No"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="itemType" className="block text-sm font-medium text-gray-700">Item Type:</label>
                                        <select
                                            id="itemType"
                                            name="itemType"
                                            required
                                            value={formData.itemType}
                                            onChange={handleChange}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select Item Type</option>
                                            <option value="Equipment">Equipment</option>
                                            <option value="Material">Material</option>
                                            <option value="Labor">Labor</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                                        <input
                                            id="description"
                                            name="description"
                                            type="text"
                                            required
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Enter Item Description"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unit:</label>
                                        <input
                                            id="unit"
                                            name="unit"
                                            type="text"
                                            required
                                            value={formData.unit}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Enter Item Unit"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                                        <input
                                            id="price"
                                            name="price"
                                            type="text"
                                            required
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Enter Item Price"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateItemPage;
