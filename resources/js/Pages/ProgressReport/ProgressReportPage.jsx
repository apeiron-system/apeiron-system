import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function ProgressAccomplishmentReport({ auth, contracts }) {
    const [filteredContracts, setFilteredContracts] = useState(contracts);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("All");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    useEffect(() => {
        applyFilters(searchQuery, sortBy);
    }, [searchQuery, sortBy]);

    const applyFilters = (query, sortBy) => {
        let filtered = [...contracts];

        if (query) {
            const lowercasedQuery = query.toLowerCase();
            filtered = filtered.filter(
                (contract) =>
                    contract.contract_name.toLowerCase().includes(lowercasedQuery) ||
                    contract.location.toLowerCase().includes(lowercasedQuery)
            );
        }

        if (sortBy === "Pending") {
            filtered = filtered.filter((contract) => contract.status === "pending");
        } else if (sortBy === "Ongoing") {
            filtered = filtered.filter((contract) => contract.status === "ongoing");
        } else if (sortBy === "Canceled") {
            filtered = filtered.filter((contract) => contract.status === "canceled");
        } else if (sortBy === "Completed") {
            filtered = filtered.filter((contract) => contract.status === "completed");
        }

        setFilteredContracts(filtered);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Progress Accomplishment Report
                </h2>
            }
        >
            <Head title="Progress Accomplishment Report" />
            
            <div className="p-10">
                <div className="text-black">
                    <h1>
                        Contracts for Progress Accomplishment Report
                    </h1>
                </div>

                {/* Search and Filter Section */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 w-1/3">
                        <input
                            type="text"
                            placeholder="Search contracts..."
                            className="border border-gray-300 rounded p-2 w-full"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            className="border border-gray-300 rounded p-2"
                            value={sortBy}
                            onChange={handleSortChange}
                        >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Canceled">Canceled</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>

                {/* Contract Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContracts.map((contract) => (
                        <Link
                            key={contract.id}
                            href={`/progress-report/contracts/${contract.id}`}
                            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 cursor-pointer"
                            onClick={() => handleContractClick(contract)}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold">
                                    {contract.contract_name}
                                </h3>
                                <div
                                    className={`w-4 h-4 rounded-full ${
                                        contract.dotColor === "green"
                                            ? "bg-green-500"
                                            : contract.dotColor === "yellow"
                                            ? "bg-yellow-500"
                                            : contract.dotColor === "red"
                                            ? "bg-red-500"
                                            : "bg-gray-500"
                                    }`}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Location:</strong> {contract.location}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Duration:</strong> {contract.duration_in_days} days
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Status:</strong> {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
