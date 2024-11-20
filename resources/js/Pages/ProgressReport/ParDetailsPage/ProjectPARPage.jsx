import EmployeesDialog from "@/Components/contract/EmployeesDialog";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export default function ProjectPARPage({ auth, project, contract, employees }) {
    const [showForm, setShowForm] = useState(false);
    const [progressReports, setProgressReports] = useState([]);

    // Fetch progress accomplishment reports from the backend
    const fetchReports = async () => {
        try {
            const response = await fetch(
                `/progress-report/contracts/${contract.id}/project/${project.id}/show`
            );
            if (response.ok) {
                const reports = await response.json();
                setProgressReports(reports);
            } else {
                console.error(
                    "Failed to fetch progress reports:",
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Error fetching progress reports:", error);
        }
    };

    // Fetch progress accomplishment reports from the backend
    useEffect(() => {
        fetchReports();
    }, [project.id, contract.id]); // Add contract.id to the dependency array

    function Modal({ isOpen, onClose, onSubmit }) {
        const { data, setData, post, processing, reset } = useForm({
            accomplishment_date: "",
            checkedBy: null,
            reviewedBy: null,
            approvedBy: null,
            preparedBy: null,
        });

        async function handleSubmit(e) {
            e.preventDefault();
            // POST request
            await post(
                `/progress-report/contracts/${contract.id}/project/${project.id}/add`,
                {
                    onSuccess: () => {
                        reset();
                        onClose();
                        fetchReports();
                    },
                    onError: (errors) => {
                        console.error(errors);
                    },
                }
            );
            fetchReports();
        }

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div
                    className="fixed inset-0 bg-black opacity-50"
                    onClick={onClose}
                ></div>
                <div
                    role="dialog"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    className="bg-white rounded-lg p-6 z-10 w-1/3"
                >
                    <h2 className="text-lg font-bold mb-4">
                        Add New Progress Accomplishment Report
                    </h2>
                    <p
                        id="modal-description"
                        className="text-sm text-gray-600 mb-4"
                    >
                        Fill in the details below to add a new progress
                        accomplishment report.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={data.accomplishment_date}
                                onChange={(e) =>
                                    setData(
                                        "accomplishment_date",
                                        e.target.value
                                    )
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                        {[
                            { label: "Checked By", field: "checkedBy" },
                            { label: "Reviewed By", field: "reviewedBy" },
                            { label: "Approved By", field: "approvedBy" },
                            { label: "Prepared By", field: "preparedBy" },
                        ].map(({ label, field }) => (
                            <div className="mb-4" key={field}>
                                <label className="block text-sm font-medium text-gray-700">
                                    {label}
                                </label>
                                <EmployeesDialog
                                    selectedEmployee={data[field]}
                                    employees={employees}
                                    onSelect={(employeeId) =>
                                        setData(field, employeeId)
                                    }
                                />
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    reset();
                                    onClose();
                                }}
                                className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-gray-700 text-white rounded-md"
                                disabled={processing}
                            >
                                {processing ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    const getEmployeeName = (id) => {
        const employee = employees.find((emp) => emp.id === id);
        return employee ? `${employee.first_name} ${employee.last_name}` : "N/A";
    };
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <button onClick={() => window.history.back()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Project Details
                    </h2>
                </div>
            }
        >
            <Head title="Project Details" />

            <div className="flex h-screen">
                <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-4">
                            {project.project_name}
                        </h1>
                        <p>
                            <strong>Location:</strong>{" "}
                            {`${project.street_address}, ${project.barangay}, ${project.city}, ${project.province}, ${project.zip_code}, ${project.country}`}
                        </p>
                        <p>
                            <strong>Status:</strong> {project.status}
                        </p>
                        <p>
                            <strong>Duration:</strong>{" "}
                            {project.duration_in_days}
                        </p>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">
                            Progress Accomplishment Reports
                        </h2>
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Add New Report
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">
                                        Date
                                    </th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">
                                        Checked By
                                    </th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">
                                        Reviewed By
                                    </th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">
                                        Approved By
                                    </th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">
                                        Prepared By
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {progressReports.map((report, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="px-4 py-2">
                                            {formatDate(
                                                report.accomplishment_date
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {getEmployeeName(
                                                report.checked_by_employee_id
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {getEmployeeName(
                                                report.reviewed_by_employee_id
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {getEmployeeName(
                                                report.approved_by_employee_id
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {getEmployeeName(
                                                report.prepared_by_employee_id
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal isOpen={showForm} onClose={() => setShowForm(false)} />
        </AuthenticatedLayout>
    );
}
