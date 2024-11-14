import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link as InertiaLink } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

export default function ProgressReport({ auth }) {
    const [contracts, setContracts] = useState([]);
    const [sortBy, setSortBy] = useState("Most Recent");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredContracts, setFilteredContracts] = useState([]);
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
    const [selectedContracts, setSelectedContracts] = useState([]);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        const storedContracts = JSON.parse(localStorage.getItem("contracts"));
        if (storedContracts) {
            setContracts(storedContracts);
            setFilteredContracts(storedContracts);
        }
    }, []);

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

    const handleSelectContract = (contractId) => {
        setSelectedContracts((prevSelected) =>
            prevSelected.includes(contractId)
                ? prevSelected.filter(id => id !== contractId)
                : [...prevSelected, contractId]
        );
    };    

    const handleDeleteSelected = () => {
        setContracts((prevContracts) => prevContracts.filter(contract => !selectedContracts.includes(contract.id)));
        setFilteredContracts((prevFiltered) => prevFiltered.filter(contract => !selectedContracts.includes(contract.id)));
        setSelectedContracts([]);
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
                contract.endDate.includes(lowercQuery)
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
        setFilteredContracts(updatedContracts);
        localStorage.setItem("contracts", JSON.stringify(updatedContracts));
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
        localStorage.setItem('contractDetails', JSON.stringify(contract));
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

                        <div className="flex items-center gap-4">
                            {selectedContracts.length > 0 && (
                                <div className="relative group">
                                    <button
                                        onClick={handleDeleteSelected}
                                        className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 p-2 rounded-full hover:bg-gray-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 6v12a2 2 0 002 2h8a2 2 0 002-2V6M10 6V4a2 2 0 114 0v2" />
                                        </svg>
                                    </button>
                                    <span className="absolute left-1/2 bottom-full mb-2 w-max transform -translate-x-1/2 text-xs text-black bg-gray-200 rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Delete
                                    </span>
                                </div>
                            )}

                            <label htmlFor="sort-by" className="sr-only">Sort By</label>
                            <select
                                id="sort-by"
                                className="px-3 py-1 bg-gray-500 text-white rounded appearance-none"
                                value={sortBy}
                                onChange={handleSortByChange}
                            >
                                <option value="Most Recent">Most Recent</option>
                                <option value="Active Contracts">Active Contracts</option>
                                <option value="Pending Contracts">Pending Contracts</option>
                                <option value="Complete Contracts">Complete Contracts</option>
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

                            {filteredContracts.map(contract => (
                                <div
                                    key={contract.id}
                                    className="bg-white rounded-lg shadow-md p-6 block transition-transform transform hover:scale-105 cursor-pointer"
                                    onClick={(e) => {
                                        if (e.target.type !== 'checkbox') {
                                            handleContractClick(contract);
                                        }
                                    }} 
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedContracts.includes(contract.id)}
                                            onChange={(e) => {
                                                handleSelectContract(contract.id);
                                            }}
                                            className="h-4 w-4 text-gray-600"
                                        />
                                        <h2 className="text-lg font-bold">{contract.name}</h2>
                                        <div className={`w-3 h-3 rounded-full ${contract.dotColor === 'green' ? 'bg-green-500' : contract.dotColor === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                    </div>
                                    <p className="text-sm text-gray-600">Contract ID: {contract.id}</p>
                                    <p className="text-sm text-gray-600">Location: {contract.location}</p>
                                    <p className="text-sm text-gray-600">Duration: {formatDate(contract.startDate)} - {formatDate(contract.endDate)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Modal for adding a new contract */}
                    <Dialog
                        open={isModalOpen}
                        onClose={() => {}}
                        className="fixed z-10 inset-0 overflow-y-auto"
                        >
                        <div className="flex items-center justify-center min-h-screen">
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                            <div
                            className="bg-white rounded-lg shadow-lg p-6 z-20 w-1/3"
                            onClick={(e) => e.stopPropagation()}
                            >
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

                    <Dialog open={isCancelConfirmationOpen} onClose={cancelCancel} className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen">
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative text-center">
                                <div className="mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="75"
                                        height="75"
                                        viewBox="0 0 48 48"
                                        className="mx-auto text-red-500"
                                    >
                                        <path fill="#A93C3C" d="M 24 5.0527344 C 22.445544 5.0527344 20.891089 5.8107396 20.050781 7.328125 L 4.5703125 35.294922 C 2.9376946 38.244782 5.1480864 42 8.5195312 42 L 39.482422 42 C 42.853867 42 45.064258 38.244782 43.431641 35.294922 L 27.949219 7.328125 C 27.108911 5.8107396 25.554456 5.0527344 24 5.0527344 z M 24 7.9492188 C 24.508544 7.9492188 25.016527 8.2256354 25.324219 8.78125 L 40.806641 36.748047 C 41.400023 37.820187 40.704977 39 39.482422 39 L 8.5195312 39 C 7.2969763 39 6.6019304 37.820187 7.1953125 36.748047 L 22.675781 8.78125 C 22.983473 8.2256354 23.491456 7.9492187 24 7.9492188 z M 23.976562 15.978516 A 1.50015 1.50015 0 0 0 22.5 17.5 L 22.5 27.5 A 1.50015 1.50015 0 1 0 25.5 27.5 L 25.5 17.5 A 1.50015 1.50015 0 0 0 23.976562 15.978516 z M 24 32 A 2 2 0 0 0 24 36 A 2 2 0 0 0 24 32 z"></path>
                                    </svg>
                                </div>
                                <Dialog.Title className="text-lg mb-5">Are you sure you want to cancel?</Dialog.Title>
                                <div className="flex-right space-x-4">
                                    <button
                                        onClick={cancelCancel}
                                        className="mr-1 px-3 py-1 border border-black text-black rounded hover:bg-gray-300 transition duration-150"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmCancel}
                                        className="bg-gray-600 text-white px-5 py-1 rounded hover:bg-gray-500 transition duration-150"
                                    >
                                        Confirm
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
