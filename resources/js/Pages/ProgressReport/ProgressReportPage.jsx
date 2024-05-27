import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ProgressReport({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Progress Report
                </h2>
            }
        >
            <Head title="Progress Report" />

            <div className="flex h-screen">
                <div className="flex-1 p-10 ml-1/4">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Contract Overview</h1>
                        <select className="px-7 py-1 bg-gray-600 text-white rounded">
                            <option>Most recent</option>
                        </select>
                    </div>

                    <div className="mb-6 flex">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border-2 border-black rounded p-1 w-1/3"
                        />
                        <button className="ml-2 px-5 py-1 bg-gray-800 text-white rounded">Search</button>
                    </div>

                    <div className="h-90 overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-lg font-bold">Contract Name</h2>
                                        <p className="text-gray-500">Contract ID</p>
                                    </div>
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-gray-700"><strong>Location:</strong> <span className="text-gray-500">Panabo, Davao City</span></p>
                                    <p className="text-gray-700"><strong>Duration:</strong> <span className="text-gray-500">12 months</span></p>
                                    <p className="text-gray-700"><strong>Amount:</strong> <span className="text-gray-500">₱1,000,000.00</span></p>
                                </div>
                                <div>
                                    <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200">View</button>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-lg font-bold">Contract Name</h2>
                                        <p className="text-gray-500">Contract ID</p>
                                    </div>
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-gray-700"><strong>Location:</strong> <span className="text-gray-500">Panabo, Davao City</span></p>
                                    <p className="text-gray-700"><strong>Duration:</strong> <span className="text-gray-500">12 months</span></p>
                                    <p className="text-gray-700"><strong>Amount:</strong> <span className="text-gray-500">₱1,000,000.00</span></p>
                                </div>
                                <div>
                                    <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200">View</button>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-lg font-bold">Contract Name</h2>
                                        <p className="text-gray-500">Contract ID</p>
                                    </div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-gray-700"><strong>Location:</strong> <span className="text-gray-500">Panabo, Davao City</span></p>
                                    <p className="text-gray-700"><strong>Duration:</strong> <span className="text-gray-500">12 months</span></p>
                                    <p className="text-gray-700"><strong>Amount:</strong> <span className="text-gray-500">₱1,000,000.00</span></p>
                                </div>
                                <div>
                                    <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200">View</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-4 mt-8">Contracts History</h2>
                    <div className="bg-white shadow rounded p-4">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left p-2 border-b">Contract ID</th>
                                    <th className="text-left p-2 border-b">Contract Name</th>
                                    <th className="text-left p-2 border-b">Start Date</th>
                                    <th className="text-left p-2 border-b">End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2 border-b"></td>
                                    <td className="p-2 border-b"></td>
                                    <td className="p-2 border-b"></td>
                                    <td className="p-2 border-b"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded">View table</button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}