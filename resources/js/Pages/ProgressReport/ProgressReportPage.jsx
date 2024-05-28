import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link as InertiaLink } from "@inertiajs/react";
import { useState } from "react";

export default function ProgressReport({ auth }) {
    const [contracts, setContracts] = useState([
        { id: 1, name: "Contract 1", startDate: "2023-01-01", endDate: "2023-12-31", dotColor: "blue" },
        { id: 2, name: "Contract 2", startDate: "2022-01-01", endDate: "2022-12-31", dotColor: "yellow" },
        { id: 3, name: "Contract 3", startDate: "2021-01-01", endDate: "2021-12-31", dotColor: "blue" },
        { id: 4, name: "Contract 4", startDate: "2020-01-01", endDate: "2020-12-31", dotColor: "yellow" },
        { id: 5, name: "Contract 5", startDate: "2019-01-01", endDate: "2019-12-31", dotColor: "blue" },
    ]);
    const [sortBy, setSortBy] = useState("Most Recent");

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    };

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
                        <div className="relative">
                            <label htmlFor="sort-by" className="sr-only">Sort By</label>
                            <select 
                                id="sort-by" 
                                className="px-7 py-1 bg-gray-600 text-white rounded appearance-none"
                                value={sortBy}
                                onChange={handleSortByChange}
                            >
                                <option value="Most Recent">Most Recent</option>
                                <option value="Active Contracts">Active Contracts</option>
                                <option value="Pending Contracts">Pending Contracts</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
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
                            {contracts
                                .filter(contract => sortBy === "Active Contracts" ? contract.dotColor === "blue" : sortBy === "Pending Contracts" ? contract.dotColor === "yellow" : true)
                                .map(contract => (
                                    <div key={contract.id} className="bg-white rounded-lg shadow-md p-6 relative">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h2 className="text-lg font-bold">{contract.name}</h2>
                                                <p className="text-gray-500">Contract ID: {contract.id}</p>
                                            </div>
                                            <div className={`w-3 h-3 rounded-full absolute top-2 right-2 ${contract.dotColor === 'blue' ? 'bg-blue-500' : 'bg-yellow-400'}`}></div>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-gray-700"><strong>Location:</strong> <span className="text-gray-500">Panabo, Davao City</span></p>
                                            <p className="text-gray-700"><strong>Duration:</strong> <span className="text-gray-500">12 months</span></p>
                                            <p className="text-gray-700"><strong>Amount:</strong> <span className="text-gray-500">₱1,000,000.00</span></p>
                                        </div>
                                        <div>
                                            <InertiaLink href={route("par-details")}>
                                                <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200">View</button>
                                            </InertiaLink>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-4 mt-8">Contracts History</h2>
                    <div className="bg-white shadow rounded p-4">
                        <table className="w-full">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="text-left p-2 border-b">Contract ID</th>
                                    <th className="text-left p-2 border-b">Contract Name</th>
                                    <th className="text-left p-2 border-b">Start Date</th>
                                    <th className="text-left p-2 border-b">End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contracts.map((contract, index) => (
                                    <tr key={contract.id}>
                                        <td className="p-2 border-b">
                                            <input
                                                type="text"
                                                value={contract.id}
                                                onChange={(e) => handleEdit(index, 'id', e.target.value)}
                                                className="w-full"
                                            />
                                        </td>
                                        <td className="p-2 border-b">
                                            <input
                                                type="text"
                                                value={contract.name}
                                                onChange={(e) => handleEdit(index, 'name', e.target.value)}
                                                className="w-full"
                                            />
                                        </td>
                                        <td className="p-2 border-b">
                                            <input
                                                type="text"
                                                value={contract.startDate}
                                                onChange={(e) => handleEdit(index, 'startDate', e.target.value)}
                                                className="w-full"
                                            />
                                        </td>
                                        <td className="p-2 border-b">
                                            <input
                                                type="text"
                                                value={contract.endDate}
                                                onChange={(e) => handleEdit(index, 'endDate', e.target.value)}
                                                className="w-full"
                                            />
                                        </td>
                                    </tr>
                                ))}
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
