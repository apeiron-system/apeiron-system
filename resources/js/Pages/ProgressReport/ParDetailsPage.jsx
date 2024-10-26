import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link as InertiaLink } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ParDetails({ auth }) {
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
        setContract((prevContract) => ({
            ...prevContract,
            details: [...(prevContract?.details || []), newDetail],
        }));
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

        if (isOpen) {
            return (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
                    <div className="bg-white rounded-lg p-6 z-10 w-1/4">
                        <h2 className="text-lg font-bold mb-4">Add New Progress Detail</h2>
                        <form onSubmit={handleSubmit}>
                            {['description', 'date', 'checkedBy', 'reviewedBy', 'approvedBy', 'preparedBy'].map((field, index) => (
                                <div className="mb-4" key={index}>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                                    <input
                                        type={field === 'date' ? 'date' : 'text'}
                                        name={field}
                                        value={newDetail[field]}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end">
                                <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                                <button type="submit" className="px-6 py-1 bg-gray-700 text-white rounded-md">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        return null;
    }

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
                    {contract && (
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
                                        <div className="relative group">
                                            <button
                                                onClick={handleDeleteSelected}
                                                className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 6v12a2 2 0 002 2h8a2 2 0 002-2V6M10 6V4a2 2 0 114 0v2" />
                                                </svg>
                                            </button>
                                            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full text-sm text-gray-600 bg-white p-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">Delete</span>
                                        </div>
                                    )}
                                    <div className="relative group">
                                        <button
                                            onClick={() => setShowForm(true)}
                                            className="inline-flex justify-center items-center p-0"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full text-sm text-gray-600 bg-white p-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">Add</span>
                                    </div>
                                </div>
                            </div>

                            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b border-gray-200 text-left"></th>
                                        <th className="px-4 py-2 border-b border-gray-200 text-left">PAR #</th>
                                        <th className="px-4 py-2 border-b border-gray-200 text-left">Description</th>
                                        <th className="px-4 py-2 border-b border-gray-200 text-left">Date</th>
                                        <th className="px-4 py-2 border-b border-gray-200 text-left">Checked By</th>
                                        <th className="px-4 py-2 border-b border-gray-200 text-left">Reviewed By</th>
                                        <th className="px-4 py-2 border-b border-gray-200 text-left">Approved By</th>
                                        <th className="px-4 py-2 border-b border-gray-200 text-left">Prepared By</th>
                                        <th className="px-4 py-2 border-b border-gray-200 text-left"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contract.details?.map((detail, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="px-4 py-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedDetails.includes(index)}
                                                    onChange={() => handleCheckboxChange(index)}
                                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                />
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200">{index + 1}</td>
                                            <td className="px-4 py-2">{detail.description}</td>
                                            <td className="px-4 py-2">{detail.date}</td>
                                            <td className="px-4 py-2">{detail.checkedBy}</td>
                                            <td className="px-4 py-2">{detail.reviewedBy}</td>
                                            <td className="px-4 py-2">{detail.approvedBy}</td>
                                            <td className="px-4 py-2">{detail.preparedBy}</td>
                                            <td className="px-4 py-2 relative">
                                                    <button
                                                        onClick={() => toggleOptionsDropdown(index)}
                                                        className="text-gray-600 hover:text-gray-900"
                                                    >
                                                        <span className="text-lg">⋮</span>
                                                    </button>
                                                    {optionsDropdownOpen === index && (
                                                        <div className="absolute right-0 mt-2 w-20 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                            <InertiaLink
                                                                href={route('par-contract-details', { id: contract.id, detailId: detail.id })}
                                                                onClick={() => {
                                                                    sessionStorage.setItem('selectedDetail', JSON.stringify(detail));
                                                                }}
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                View
                                                            </InertiaLink>

                                                            <button
                                                                onClick={() => handleDeleteSingleDetail(index)}
                                                                className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
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
                        </>
                    )}
                </div>
            </div>

            <Modal
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleAddDetail}
            />
        </AuthenticatedLayout>
    );
}
