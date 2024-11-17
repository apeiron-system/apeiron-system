import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link as InertiaLink } from "@inertiajs/react";
import { useEffect, useState } from "react";

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export default function ProjectPAR({ auth }) {
    const [contract, setContract] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState([]);

    useEffect(() => {
        const savedContract = sessionStorage.getItem("contractDetails");
        if (savedContract) {
            setContract(JSON.parse(savedContract));
        }
    }, []);
    
    useEffect(() => {
        if (contract) {
            sessionStorage.setItem("contractDetails", JSON.stringify(contract));
        }
    }, [contract]);

    const handleAddProject = (newProject) => {
        setContract((prevContract) => {
            const updatedContract = {
                ...prevContract,
                details: [...(prevContract?.details || []), newProject],
            };
            sessionStorage.setItem("contractDetails", JSON.stringify(updatedContract));
            return updatedContract;
        });
    };

    function Modal({ isOpen, onClose, onSubmit }) {
        const [newProject, setNewProject] = useState({
            projectName: "",
            date: "",
            checkedBy: "",
            reviewedBy: "",
            approvedBy: "",
            preparedBy: "",
        });

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setNewProject((prevProject) => ({
                ...prevProject,
                [name]: value,
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(newProject);
            setNewProject({ projectName: ""});
            onClose();
        };

        if (isOpen) {
            return (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
                    <div className="bg-white rounded-lg p-6 z-10 w-1/3">
                        <h2 className="text-lg font-bold mb-4">Add New Project</h2>
                        <form onSubmit={handleSubmit}>
                            {["projectName"].map((field, index) => (
                                <div className="mb-4" key={index}>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">
                                        {field.replace(/([A-Z])/g, " $1")}
                                    </label>
                                    <input
                                        type={field === "date" ? "date" : "text"}
                                        name={field}
                                        value={newProject[field]}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end">
                                <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded-md">
                                    Cancel
                                </button>
                                <button type="submit" className="px-6 py-1 bg-gray-700 text-white rounded-md">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        return null;
    }

    const handleRowClick = (event, detail) => {
        if (event.target.type === "checkbox") {
            return;
        }

        sessionStorage.setItem('selectedDetail', JSON.stringify(detail));
        window.location.href = route('par-details', { id: contract.id, detailId: detail.id });
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
                        Contract Projects
                    </h2>
                </div>
            }
        >
            <Head title="Progress Report" />

            <div className="flex h-screen">
                <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                    {contract && (
                        <>
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h1 className="text-xl font-bold">
                                        {contract.name} (ID: {contract.id})
                                    </h1>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p><strong>Location:</strong> {contract.location}</p>
                                <p><strong>Start Date:</strong> {formatDate(contract.startDate)}</p>
                                <p><strong>End Date:</strong> {formatDate(contract.endDate)}</p>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <div className="flex space-x-2">
                                    {selectedDetails.length > 0 && (
                                        <div className="relative group">
                                            <button
                                                onClick={handleDeleteSelected}
                                                className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 p-2 rounded-full hover:bg-gray-200"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 6v12a2 2 0 002 2h8a2 2 0 002-2V6M10 6V4a2 2 0 114 0v2" />
                                                </svg>
                                            </button>
                                            <span className="absolute left-1/2 bottom-full mb-2 w-max transform -translate-x-1/2 text-xs text-black bg-gray-200 rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Delete
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table-auto w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b border-gray-200 text-center">Projects</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contract.details &&
                                            contract.details.map((detail, index) => (
                                                <tr
                                                    key={index}
                                                    className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                                                    onClick={(event) => handleRowClick(event, detail)}
                                                >
                                                    <td className="px-4 py-2">
                                                        <span className="ml-2">{detail.projectName}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Modal isOpen={showForm} onClose={() => setShowForm(false)} onSubmit={handleAddProject} />
        </AuthenticatedLayout>
    );
}
