import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function JODetailsPage({ auth }) {
    const [contracts] = useState([
        { id: 1, name: "Contract 1", location: "Panabo, Davao City", startDate: "2023-01-01", endDate: "2023-12-31", dotColor: "blue" },
        { id: 2, name: "Contract 2", location: "Panabo, Davao City", startDate: "2022-01-01", endDate: "2022-12-31", dotColor: "yellow" },
    ]);

    const [jobOrders, setJobOrders] = useState([]);
    const [sortBy, setSortBy] = useState("Most Recent");
    const [searchQuery, setSearchQuery] = useState("");

    const handleAddJobOrder = () => {
        const newJobOrder = {
            id: jobOrders.length + 1,
            name: `New Job Order ${jobOrders.length + 1}`,
            location: "Sample Location",
            startDate: new Date().toISOString().split("T")[0],
            endDate: "2024-12-31",
            dotColor: "green",
        };
        setJobOrders([...jobOrders, newJobOrder]);
    };

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <button onClick={() => window.location.href = route('par-details')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Job Order Progress Accomplishment
                    </h2>
                </div>
            }
        >
            <Head title="Job Order" />

            <div className="flex flex-col h-screen overflow-hidden">
                <div className="flex-1 p-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Job Order Overview</h1>
                    </div>

                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-2 w-1/3">
                            <input
                                type="text"
                                className="border border-black rounded p-1 w-full"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button className="px-5 py-1 bg-gray-800 text-white rounded">
                                Search
                            </button>
                        </div>

                        <div className="relative">
                            <label htmlFor="sort-by" className="sr-only">Sort By</label>
                            <select
                                id="sort-by"
                                className="px-2 py-1 bg-gray-600 text-white rounded appearance-none"
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
                    
                    <div className="scrollable-container">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobOrders.map(jobOrder => (
                                <div
                                    key={jobOrder.id}
                                    className="bg-white rounded-lg shadow-md p-6 relative"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-bold">{jobOrder.name}</h2>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <p className="text-gray-600">Job Order ID: {jobOrder.id}</p>
                                    <p className="text-gray-600">Location: {jobOrder.location}</p>
                                    <p className="text-gray-600">Duration: {jobOrder.startDate} - {jobOrder.endDate}</p>
                                </div>
                            ))}

                            <div
                                onClick={handleAddJobOrder}
                                className="flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-black"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <title>Add Job Order</title>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <p className="mt-2 text-gray-600 hover:text-gray-800">Add Job Order</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
