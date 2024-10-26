import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link as InertiaLink } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

export default function ParJobOrder({ auth }) {
    const [contracts, setContracts] = useState([]);
    const [sortBy, setSortBy] = useState("Most Recent");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredContracts, setFilteredContracts] = useState(contracts);
    const [isContractModalOpen, setIsContractModalOpen] = useState(false);
    const [isJobOrderModalOpen, setIsJobOrderModalOpen] = useState(false);
    const [newContract, setNewContract] = useState({
        name: "",
        location: "",
        startDate: "",
        endDate: "",
        dotColor: "green",
    });
    const [newJobOrder, setNewJobOrder] = useState({
        contractor: "",
        address: "",
        type: "",
        periodCovered: "",
        projectCode: "",
        projectId: "",
        location: "",
        joNumber: "",
        billNumber: "",
    });
    const [jobOrders, setJobOrders] = useState([]);

    useEffect(() => {
        applyFilters(sortBy, searchQuery);
    }, [sortBy, searchQuery, contracts]);

    const applyFilters = (sortBy, searchQuery) => {
        let filtered = [...contracts];

        if (sortBy === "Active Contracts") {
            filtered = filtered.filter(contract => contract.dotColor === "green");
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

    const handleAddContract = () => {
        setIsContractModalOpen(true);
    };

    const handleAddJobOrder = () => {
        setIsJobOrderModalOpen(true);
    };

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContract({ ...newContract, [name]: value });
    };

    const handleJobOrderInputChange = (e) => {
        const { name, value } = e.target;
        setNewJobOrder({ ...newJobOrder, [name]: value });
    };

    const handleSubmitContract = (e) => {
        e.preventDefault();
        const newContractData = {
            id: contracts.length + 1,
            ...newContract,
        };
        setContracts([...contracts, newContractData]);
        setIsContractModalOpen(false);
        setNewContract({ name: "", location: "", startDate: "", endDate: "", dotColor: "green" });
    };

    const handleSubmitJobOrder = (e) => {
        e.preventDefault();
        const newJobOrderData = {
            id: jobOrders.length + 1,
            ...newJobOrder,
        };
        setJobOrders([...jobOrders, newJobOrderData]);
        setIsJobOrderModalOpen(false);
        setNewJobOrder({
            contractor: "",
            address: "",
            type: "",
            periodCovered: "",
            projectCode: "",
            projectId: "",
            location: "",
            joNumber: "",
            billNumber: "",
        });
    };

    const handleContractClick = (contract) => {
        sessionStorage.setItem('contractDetails', JSON.stringify(contract));
        window.location.href = '/par-details';
    };

    const handleJobOrderClick = (jobOrder) => {
        sessionStorage.setItem('jobOrderDetails', JSON.stringify(jobOrder));
        window.location.href = '/par-job-order';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Contract Progress Accomplishment
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
                            />
                            <button
                                className="px-5 py-1 bg-gray-800 text-white rounded"
                                onClick={handleSearch}
                            >
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
                                <div
                                    key={contract.id}
                                    className="bg-white rounded-lg shadow-md p-6 block transition-transform transform hover:scale-105 cursor-pointer"
                                    onClick={() => handleContractClick(contract)} 
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-bold">{contract.name}</h2>
                                        <div className={`w-3 h-3 rounded-full ${contract.dotColor === 'green' ? 'bg-green-500' : contract.dotColor === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                    </div>
                                    <p className="text-gray-600">Contract ID: {contract.id}</p>
                                    <p className="text-gray-600">Location: {contract.location}</p>
                                    <p className="text-gray-600">Duration: {contract.startDate} - {contract.endDate}</p>
                                </div>
                            ))}

                            {/* Job Orders Section */}
                            {jobOrders.map(jobOrder => (
                                <div
                                    key={jobOrder.id}
                                    className="bg-white rounded-lg shadow-md p-6 block transition-transform transform hover:scale-105 cursor-pointer"
                                    onClick={() => handleJobOrderClick(jobOrder)} // Click handler for job orders
                                >
                                    <h2 className="text-lg font-bold">{jobOrder.contractor}</h2>
                                    <p className="text-gray-600">JO Number: {jobOrder.joNumber}</p>
                                    <p className="text-gray-600">Location: {jobOrder.location}</p>
                                    <p className="text-gray-600">Period Covered: {jobOrder.periodCovered}</p>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Contract Modal */}
                    <Dialog open={isContractModalOpen} onClose={() => setIsContractModalOpen(false)}>
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
                        <div className="fixed inset-0 flex items-center justify-center">
                            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md mx-auto">
                                <Dialog.Title className="text-lg font-bold">Add Contract</Dialog.Title>
                                <form onSubmit={handleSubmitContract}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700" htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="border border-gray-300 rounded p-2 w-full"
                                            value={newContract.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700" htmlFor="location">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            className="border border-gray-300 rounded p-2 w-full"
                                            value={newContract.location}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700" htmlFor="startDate">Start Date</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            className="border border-gray-300 rounded p-2 w-full"
                                            value={newContract.startDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700" htmlFor="endDate">End Date</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            className="border border-gray-300 rounded p-2 w-full"
                                            value={newContract.endDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded">Add Contract</button>
                                </form>
                            </Dialog.Panel>
                        </div>
                    </Dialog>

                    {/* Job Order Modal */}
                    <Dialog open={isJobOrderModalOpen} onClose={() => setIsJobOrderModalOpen(false)}>
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
                        <div className="fixed inset-0 flex items-center justify-center">
                            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md mx-auto">
                                <Dialog.Title className="text-lg font-bold">Add Job Order</Dialog.Title>
                                <form onSubmit={handleSubmitJobOrder}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700" htmlFor="contractor">Contractor</label>
                                        <input
                                            type="text"
                                            name="contractor"
                                            className="border border-gray-300 rounded p-2 w-full"
                                            value={newJobOrder.contractor}
                                            onChange={handleJobOrderInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700" htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="border border-gray-300 rounded p-2 w-full"
                                            value={newJobOrder.address}
                                            onChange={handleJobOrderInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700" htmlFor="type">Type</label>
                                        <input
                                            type="text"
                                            name="type"
                                            className="border border-gray-300 rounded p-2 w-full"
                                            value={newJobOrder.type}
                                            onChange={handleJobOrderInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700" htmlFor="periodCovered">Period Covered</label>
                                        <input
                                            type="text"
                                            name="periodCovered"
                                            className="border border-gray-300 rounded p-2 w-full"
                                            value={newJobOrder.periodCovered}
                                            onChange={handleJobOrderInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700" htmlFor="projectCode">Project Code</label>
                                        <input
                                            type="text"
                                            name="projectCode"
                                            className="border border-gray-300 rounded p-2 w-full"
                                            value={newJobOrder.projectCode}
                                            onChange={handleJobOrderInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700" htmlFor="projectId">Project ID</label>
                                        <input
                                            type="text"
                                            name="projectId"
                                            className="border border-gray-300 rounded p-2 w-full"
                                            value={newJobOrder.projectId}
                                            onChange={handleJobOrderInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700" htmlFor="location">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            className="border border-gray-300 rounded p-2 w-full"
                                            value={newJobOrder.location}
                                            onChange={handleJobOrderInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700" htmlFor="joNumber">JO Number</label>
                                        <input
                                            type="text"
                                            name="joNumber"
                                            className="border border-gray-300 rounded p-2 w-full"
                                            value={newJobOrder.joNumber}
                                            onChange={handleJobOrderInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700" htmlFor="billNumber">Bill Number</label>
                                        <input
                                            type="text"
                                            name="billNumber"
                                            className="border border-gray-300 rounded p-2 w-full"
                                            value={newJobOrder.billNumber}
                                            onChange={handleJobOrderInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded">Add Job Order</button>
                                </form>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
