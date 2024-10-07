import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function ParDetailsPage({ auth, contract }) {
    const [optionsDropdownOpen, setOptionsDropdownOpen] = useState(null);

    const handleViewClick = (index) => {
        console.log(`View clicked for row ${index}`);
        // Add view logic here
    };

    const handleDeleteClick = (index) => {
        console.log(`Delete clicked for row ${index}`);
        // Add delete logic here
    };

    const toggleOptionsDropdown = (index) => {
        setOptionsDropdownOpen((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Progress Accomplishment Details
                </h2>
            }
        >
            <Head title="Progress Report" />

            <div className="flex h-screen">
                <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">

                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Progress Accomplishment Details Page</h1>
                        <div className="relative inline-block text-left">
                            <div>
                                <select className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-gray-600 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <option>{new Date().toLocaleDateString()}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold mb-4">{contract?.name}</h2>
                    <div className="overflow-x-auto" style={{ height: '300px' }}>
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left"></th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">Description</th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">Date</th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">Checked By</th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">Reviewed By</th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">Approved By</th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">Prepared By</th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border-b border-gray-200">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">Mock Description</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">2024-05-28</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">John Doe</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">Jane Smith</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">Alice Johnson</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">Bob Brown</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">
                                        <div className="relative inline-block text-left">
                                            <button
                                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={() => toggleOptionsDropdown("mock")}
                                            >
                                                ⋮
                                            </button>
                                            {optionsDropdownOpen === "mock" && (
                                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                        <Link
                                                            href={route("par-contract-details")}
                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            role="menuitem"
                                                        >
                                                            View
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteClick("mock")}
                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            role="menuitem"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                {contract?.details?.map((detail, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left">{detail.description}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left">{detail.date}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left">{detail.checkedBy}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left">{detail.reviewedBy}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left">{detail.approvedBy}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left">{detail.preparedBy}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left">
                                            <div className="relative inline-block text-left">
                                                <button
                                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={() => toggleOptionsDropdown(index)}
                                                >
                                                    ⋮
                                                </button>
                                                {optionsDropdownOpen === index && (
                                                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                            <button
                                                                onClick={() => handleViewClick(index)}
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                role="menuitem"
                                                            >
                                                                View
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteClick(index)}
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                role="menuitem"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {/* Empty rows for padding */}
                                {[...Array(5)].map((_, index) => (
                                    <tr key={`empty-${index}`}>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left"></td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left"></td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left"></td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left"></td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left"></td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left"></td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="w-full max-w-md mx-5 my-5 flex items-center">
                        <div className="text-sm mr-5 whitespace-nowrap">Contract Progress</div>
                        <div className="flex-1 bg-gray-200 rounded-full overflow-hidden mr-2">
                            <div className="bg-gray-800 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                        <div className="text-sm whitespace-nowrap">90%</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
