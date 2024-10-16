import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link as InertiaLink } from "@inertiajs/react";
import { useEffect, useState } from "react";

function Modal({ isOpen, onClose, onSubmit }) {
    const [newDetail, setNewDetail] = useState({
        description: '',
        date: '',
        checkedBy: '',
        reviewedBy: '',
        approvedBy: '',
        preparedBy: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDetail((prevDetail) => ({
            ...prevDetail,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newDetail);
        setNewDetail({ description: '', date: '', checkedBy: '', reviewedBy: '', approvedBy: '', preparedBy: '' });
        onClose();
    };

    return (
        isOpen ? (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
                <div className="bg-white rounded-lg p-6 z-10">
                    <h2 className="text-lg font-bold mb-4">Add New Detail</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={newDetail.description}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={newDetail.date}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Checked By</label>
                            <input
                                type="text"
                                name="checkedBy"
                                value={newDetail.checkedBy}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Reviewed By</label>
                            <input
                                type="text"
                                name="reviewedBy"
                                value={newDetail.reviewedBy}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Approved By</label>
                            <input
                                type="text"
                                name="approvedBy"
                                value={newDetail.approvedBy}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Prepared By</label>
                            <input
                                type="text"
                                name="preparedBy"
                                value={newDetail.preparedBy}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                            <button type="submit" className="px-6 py-1 bg-gray-700 text-white rounded-md">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        ) : null
    );
}

export default function ParDetailsPage({ auth }) {
    const [contract, setContract] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [optionsDropdownOpen, setOptionsDropdownOpen] = useState(null);
    const [selectedDetails, setSelectedDetails] = useState([]);

    useEffect(() => {
        const contractDetails = sessionStorage.getItem('contractDetails');
        if (contractDetails) {
            setContract(JSON.parse(contractDetails));
            sessionStorage.removeItem('contractDetails');
        }
    }, []);

    const toggleOptionsDropdown = (index) => {
        setOptionsDropdownOpen((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleAddDetail = (newDetail) => {
        if (contract) {
            setContract((prevContract) => ({
                ...prevContract,
                details: [...prevContract.details, newDetail]
            }));
        }
    };

    const handleCheckboxChange = (index) => {
        setSelectedDetails((prevSelected) => {
            if (prevSelected.includes(index)) {
                return prevSelected.filter((i) => i !== index);
            } else {
                return [...prevSelected, index];
            }
        });
    };

    const handleDeleteSelected = () => {
        setContract((prevContract) => {
            const updatedDetails = prevContract.details.filter((_, index) => !selectedDetails.includes(index));
            return { ...prevContract, details: updatedDetails };
        });
        setSelectedDetails([]);
    };

    const handleDeleteSingleDetail = (index) => {
        setContract((prevContract) => {
            const updatedDetails = prevContract.details.filter((_, i) => i !== index);
            return { ...prevContract, details: updatedDetails };
        });
        setOptionsDropdownOpen(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <button onClick={() => window.location.href = route('progress-report')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Contract Progress Accomplishment Report
                    </h2>
                </div>
            }
        >
            <Head title="Progress Report" />

            <div className="flex h-screen">
                <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                    {contract ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">
                                    {contract.name} (ID: {contract.id})
                                </h1>
                                <InertiaLink
                                    href={route('jo-details', { id: contract.id })}
                                    className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-gray-200 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    View Job Order
                                </InertiaLink>
                            </div>

                            <div className="mb-6">
                                <p><strong>Location:</strong> {contract.location}</p>
                                <p><strong>Start Date:</strong> {contract.startDate}</p>
                                <p><strong>End Date:</strong> {contract.endDate}</p>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Progress Accomplishment</h2>
                                <div className="flex space-x-2">
                                    {selectedDetails.length > 0 && (
                                        <button
                                            onClick={handleDeleteSelected}
                                            className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Delete
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-gray-200 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contract.details.map((detail, index) => (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td className="border-b border-gray-200 px-4 py-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedDetails.includes(index)}
                                                        onChange={() => handleCheckboxChange(index)}
                                                    />
                                                </td>
                                                <td className="border-b border-gray-200 px-4 py-2">{detail.description}</td>
                                                <td className="border-b border-gray-200 px-4 py-2">{detail.date}</td>
                                                <td className="border-b border-gray-200 px-4 py-2">{detail.checkedBy}</td>
                                                <td className="border-b border-gray-200 px-4 py-2">{detail.reviewedBy}</td>
                                                <td className="border-b border-gray-200 px-4 py-2">{detail.approvedBy}</td>
                                                <td className="border-b border-gray-200 px-4 py-2">{detail.preparedBy}</td>
                                                <td className="border-b border-gray-200 px-4 py-2 relative">
                                                    <button
                                                        onClick={() => toggleOptionsDropdown(index)}
                                                        className="text-gray-600 hover:text-gray-900"
                                                    >
                                                        <span className="text-lg">⋮</span>
                                                    </button>
                                                    {optionsDropdownOpen === index && (
                                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                            <InertiaLink
                                                                href={route('par-contract-details', { id: contract.id, detailId: detail.id })}
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                View
                                                            </InertiaLink>
                                                            <button
                                                                onClick={() => handleDeleteSingleDetail(index)}
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <p>Loading contract details...</p>
                    )}
                </div>
            </div>

            <Modal isOpen={showForm} onClose={() => setShowForm(false)} onSubmit={handleAddDetail} />
        </AuthenticatedLayout>
    );
}
