import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function JODetails({ auth }) {
    const [contract, setContract] = useState(() => {
        const savedContract = sessionStorage.getItem('contractDetails');
        return savedContract ? JSON.parse(savedContract) : null;
    });

    const [jobOrders, setJobOrders] = useState([]);
    const [newJobOrder, setNewJobOrder] = useState({
        contractor: "",
        address: "",
        type: "",
        periodCovered: "",
        projectCode: "",
        projectId: "",
        location: contract ? contract.location : "",
        joNumber: "",
        billNumber: ""
    });
    
    const [showForm, setShowForm] = useState(false); 
    const [sortBy, setSortBy] = useState("Most Recent");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (contract) {
            setNewJobOrder((prev) => ({
                ...prev,
                location: contract.location
            }));
        }
    }, [contract]);

    const handleAddJobOrder = () => {
        const jobOrderData = {
            id: jobOrders.length + 1,
            ...newJobOrder,
            startDate: new Date().toISOString().split("T")[0],
            endDate: "2024-12-31",
            dotColor: "green",
            dateAdded: new Date().toLocaleDateString(),
        };
        setJobOrders([...jobOrders, jobOrderData]);
        sessionStorage.setItem('jobOrderDetails', JSON.stringify([...jobOrders, jobOrderData]));

        setNewJobOrder({
            contractor: "",
            address: "",
            type: "",
            periodCovered: "",
            projectCode: "",
            projectId: "",
            location: contract ? contract.location : "",
            joNumber: "",
            billNumber: ""
        });
        setShowForm(false);
    };

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJobOrder((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleJobOrderClick = (jobOrder) => {
        sessionStorage.setItem('selectedJobOrder', JSON.stringify(jobOrder));
        window.location.href = route('par-job-order');
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
                    </div>
                    
                    <div className="scrollable-container">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div
                                onClick={() => setShowForm(true)}
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

                            {jobOrders.map(jobOrder => (
                                <div
                                    key={jobOrder.id}
                                    onClick={() => handleJobOrderClick(jobOrder)}
                                    className="bg-white rounded-lg shadow-md p-6 relative transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                                >
                                    <h2 className="text-lg font-bold">Job Order {jobOrder.id}</h2>
                                    <p className="text-gray-600">Project Code: {jobOrder.projectCode}</p>
                                    <p className="text-gray-600">Contractor: {jobOrder.contractor}</p>
                                    <p className="text-gray-600">Date Added: {jobOrder.dateAdded}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Modal for Adding Job Order */}
                    {showForm && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                                <h2 className="text-lg font-bold mb-4">Add Job Order</h2>
                                <form onSubmit={(e) => { e.preventDefault(); handleAddJobOrder(); }}>
                                    {/* Project Code and Period Covered Fields Side by Side */}
                                    <div className="mb-4 flex gap-4">
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700">Project Code</label>
                                            <input
                                                type="text"
                                                name="projectCode"
                                                value={newJobOrder.projectCode}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded w-full p-2"
                                                required
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700">Period Covered</label>
                                            <input
                                                type="text"
                                                name="periodCovered"
                                                value={newJobOrder.periodCovered}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded w-full p-2"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Type and Bill Number Fields Side by Side */}
                                    <div className="mb-4 flex gap-4">
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700">Type</label>
                                            <input
                                                type="text"
                                                name="type"
                                                value={newJobOrder.type}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded w-full p-2"
                                                // required
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700">Bill Number</label>
                                            <input
                                                type="text"
                                                name="billNumber"
                                                value={newJobOrder.billNumber}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded w-full p-2"
                                                required
                                            />
                                        </div>
                                    </div>

                                     {/* Contractor and Address Fields */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Contractor</label>
                                        <input
                                            type="text"
                                            name="contractor"
                                            value={newJobOrder.contractor}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded w-full p-2"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={newJobOrder.address}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded w-full p-2"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={newJobOrder.location}
                                            readOnly
                                            className="border border-gray-300 rounded w-full p-2"
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="mr-2 px-4 py-2 border border-black text-black rounded hover:bg-gray-300 transition duration-150"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-150"
                                        >
                                            Add Job Order
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}