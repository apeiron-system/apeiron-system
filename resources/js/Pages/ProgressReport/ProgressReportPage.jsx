import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link as InertiaLink } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

export default function ProgressReport({ auth }) {
    const [contracts, setContracts] = useState([]);
    const [sortBy, setSortBy] = useState("Most Recent");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredContracts, setFilteredContracts] = useState(contracts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] = useState(false);
    const [newContract, setNewContract] = useState({
        name: "",
        location: "",
        startDate: "",
        endDate: "",
        dotColor: "green",
    });
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Load contracts from localStorage on page load
    useEffect(() => {
        const storedContracts = JSON.parse(localStorage.getItem("contracts"));
        if (storedContracts) {
            setContracts(storedContracts);
        }
    }, []);

    // Filter contracts whenever sorting or searching changes
    useEffect(() => {
        applyFilters(sortBy, searchQuery);
    }, [sortBy, searchQuery, contracts]);

    const handleAddContract = () => {
        setIsModalOpen(true);
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

    const applyFilters = (sortBy, searchQuery) => {
        let filtered = [...contracts];

        if (sortBy === "Active Contracts") {
            filtered = filtered.filter(contract => contract.dotColor === "green");
        } else if (sortBy === "Pending Contracts") {
            filtered = filtered.filter(contract => contract.dotColor === "yellow");
        } else if (sortBy === "Complete Contracts") {
            filtered = filtered.filter(contract => contract.dotColor === "red");
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContract({ ...newContract, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newContractData = {
            id: contracts.length + 1,
            ...newContract,
        };
        const updatedContracts = [...contracts, newContractData];
        setContracts(updatedContracts);
        localStorage.setItem("contracts", JSON.stringify(updatedContracts)); // Save to localStorage
        setIsModalOpen(false);
        setNewContract({ name: "", location: "", startDate: "", endDate: "", dotColor: "green" });
        setShowConfirmation(true);

        setTimeout(() => {
            setShowConfirmation(false);
        }, 3000);
    };

    const handleCancel = () => {
        setIsCancelConfirmationOpen(true);
    };

    const confirmCancel = () => {
        setIsModalOpen(false);
        setIsCancelConfirmationOpen(false);
        setNewContract({ name: "", location: "", startDate: "", endDate: "", dotColor: "green" });
    };

    const cancelCancel = () => {
        setIsCancelConfirmationOpen(false);
    };

    const handleContractClick = (contract) => {
        sessionStorage.setItem('contractDetails', JSON.stringify(contract));
        window.location.href = '/par-details';
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

                    {showConfirmation && (
                        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
                            Contract added successfully!
                        </div>
                    )}

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
                                className="px-3 py-1 bg-gray-500 text-white rounded appearance-none"
                                value={sortBy}
                                onChange={handleSortByChange}
                            >
                                <option value="Most Recent">Most Recent</option>
                                <option value="Active Contracts">Active Contracts</option>
                                <option value="Pending Contracts">Complete Contracts</option>
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
                            <div
                                onClick={handleAddContract}
                                className="flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-lg p-12 cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-black"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <title>Add Contract</title>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <p className="mt-2 text-gray-600 hover:text-gray-800">Add Contract</p>
                            </div>

                            {/* Render filtered contracts */}
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
                        </div>
                    </div>

                    {/* Modal for adding a new contract */}
                    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen">
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                            <div className="bg-white rounded-lg shadow-lg p-6 z-20 w-1/3">
                                <h2 className="text-xl font-semibold mb-4">Add New Contract</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Contract Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newContract.name}
                                            onChange={handleInputChange}
                                            required
                                            className="border border-gray-300 rounded w-full p-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={newContract.location}
                                            onChange={handleInputChange}
                                            required
                                            className="border border-gray-300 rounded w-full p-2"
                                        />
                                    </div>
                                    <div className="flex mb-4">
                                        <div className="flex-1 mr-2">
                                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={newContract.startDate}
                                                onChange={handleInputChange}
                                                required
                                                className="border border-gray-300 rounded w-full p-2"
                                            />
                                        </div>
                                        <div className="flex-1 ml-2">
                                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={newContract.endDate}
                                                onChange={handleInputChange}
                                                required
                                                className="border border-gray-300 rounded w-full p-2"
                                            />
                           </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="mr-2 px-4 py-2 border border-black text-black rounded hover:bg-gray-300 transition duration-150"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-150"
                                        >
                                            Add Contract
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Dialog>

                    {/* Cancel Confirmation Modal */}
                    <Dialog open={isCancelConfirmationOpen} onClose={cancelCancel} className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen">
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                                <Dialog.Title className="text-xl font-bold mb-4">Are you sure you want to cancel?</Dialog.Title>
                                <div className="flex justify-between">
                                    <button
                                        onClick={confirmCancel}
                                        className="bg-red-500 text-white px-6 py-2 rounded"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={cancelCancel}
                                        className="bg-gray-500 text-white px-6 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
