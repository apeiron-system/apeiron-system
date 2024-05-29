import React from "react";
import { Link } from "react-router-dom"; 

const ItemDetailsPage = () => {
    const itemDetails = {
        itemId: "1",
        itemNo: "8030/1a",
        itemName: "Cement",
        itemType: "Material",
        description: "Plain",
        unit: "2",
        price: "250.00",
    };

    return (
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
                            <h1 className="text-xl font-semibold">Item Details</h1>
                            <div className="space-x-2">
                                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded">
                                    Edit
                                </button>
                                <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded">
                                    View Price History
                                </button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <span className="font-semibold">Item ID:</span> {itemDetails.itemId}
                            </div>
                            <div>
                                <span className="font-semibold">Item No:</span> {itemDetails.itemNo}
                            </div>
                            <div>
                                <span className="font-semibold">Item Name:</span> {itemDetails.itemName}
                            </div>
                            <div>
                                <span className="font-semibold">Item Type:</span> {itemDetails.itemType}
                            </div>
                            <div>
                                <span className="font-semibold">Description:</span> {itemDetails.description}
                            </div>
                            <div>
                                <span className="font-semibold">Unit:</span> {itemDetails.unit}
                            </div>
                            <div>
                                <span className="font-semibold">Price:</span> {itemDetails.price}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const App = () => <ItemDetailsPage />;

export default App;

