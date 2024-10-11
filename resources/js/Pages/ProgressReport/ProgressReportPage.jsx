import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link as InertiaLink } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function ProgressReport({ auth }) {
    const [contracts, setContracts] = useState([
        { id: 1, name: "Contract 1", location: "Panabo, Davao City", startDate: "2023-01-01", endDate: "2023-12-31", dotColor: "blue", details: [] },
        { id: 2, name: "Contract 2", location: "Panabo, Davao City", startDate: "2022-01-01", endDate: "2022-12-31", dotColor: "yellow", details: [] },
        { id: 3, name: "Contract 3", location: "Panabo, Davao City", startDate: "2021-01-01", endDate: "2021-12-31", dotColor: "blue", details: [] },
        { id: 4, name: "Contract 4", location: "Tagum City", startDate: "2020-01-01", endDate: "2020-12-31", dotColor: "yellow", details: [] },
        { id: 5, name: "Contract 5", location: "Panabo, Davao City", startDate: "2019-01-01", endDate: "2019-12-31", dotColor: "blue", details: [] },
    ]);

    const [sortBy, setSortBy] = useState("Most Recent");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredContracts, setFilteredContracts] = useState(contracts);

    useEffect(() => {
        applyFilters(sortBy, searchQuery);
    }, [sortBy, searchQuery, contracts]);

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        applyFilters(sortBy, searchQuery);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const applyFilters = (sortBy, searchQuery) => {
        let filtered = [...contracts];

        if (sortBy === "Active Contracts") {
            filtered = filtered.filter(contract => contract.dotColor === "blue");
        } else if (sortBy === "Pending Contracts") {
            filtered = filtered.filter(contract => contract.dotColor === "yellow");
        }

        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(contract =>
                contract.name.toLowerCase().includes(lowercasedQuery) ||
                contract.location.toLowerCase().includes(lowercasedQuery) ||
                contract.startDate.includes(lowercasedQuery) ||
                contract.endDate.includes(lowercasedQuery)
            );
        }

        setFilteredContracts(filtered);
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

            <div className="flex flex-col h-screen overflow-hidden">
                <div className="flex-1 p-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Contract Overview</h1>
                    </div>

                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-2 w-1/3">
                            <input
                                type="text"
                                className="border border-black rounded p-1 w-full"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Search"
                            />
                            <button className="px-5 py-1 bg-gray-800 text-white rounded" onClick={handleSearch}>
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
                            {filteredContracts.map(contract => (
                                <InertiaLink 
                                    href={route("par-details", { id: contract.id })}
                                    key={contract.id}
                                    className="bg-white rounded-lg shadow-md p-6 block"
                                    onClick={() => {
                                        sessionStorage.setItem('contractDetails', JSON.stringify(contract));
                                    }}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center">
                                            <h2 className="text-lg font-bold">{contract.name}</h2>
                                            <div className={`w-3 h-3 rounded-full ml-2 ${contract.dotColor === 'blue' ? 'bg-blue-500' : 'bg-yellow-400'}`}></div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">Contract ID: {contract.id}</p>
                                    <p className="text-gray-600">Location: {contract.location}</p>
                                    <p className="text-gray-600">Duration: {contract.startDate} - {contract.endDate}</p>
                                </InertiaLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
