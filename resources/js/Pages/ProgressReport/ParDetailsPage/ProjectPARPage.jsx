import EmployeesDialog from "@/Components/contract/EmployeesDialog";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

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
    const [selectedReports, setSelectedReports] = useState([]);

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

    useEffect(() => {
        fetchReports();
    }, [project.id, contract.id]);

    const handleSelectReport = (reportId) => {
        setSelectedReports((prevSelected) =>
            prevSelected.includes(reportId)
                ? prevSelected.filter((id) => id !== reportId)
                : [...prevSelected, reportId]
        );
    };

    const handleCheckboxChange = (reportId) => {
        setSelectedReports((prevSelected) => {
            if (prevSelected.includes(reportId)) {
                return prevSelected.filter((id) => id !== reportId);
            } else {
                return [...prevSelected, reportId];
            }
        });
    };     

    const handleDeleteSelected = async () => {
        if (selectedReports.length === 0) return;
    };    

    function Modal({ isOpen, onClose }) {
        const { data, setData, post, processing, reset } = useForm({
            accomplishment_date: "",
            checkedBy: null,
            reviewedBy: null,
            approvedBy: null,
            preparedBy: null,
        });

        async function handleSubmit(e) {
            e.preventDefault();
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
        }

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div
                    className="fixed inset-0 bg-black opacity-50"
                    onClick={onClose}
                ></div>
                <div className="bg-white rounded-lg p-6 z-10 w-1/3">
                    <h2 className="text-lg font-bold mb-4">
                        Add New Progress Accomplishment Report
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <input
                                type="date"
                                value={data.accomplishment_date}
                                onChange={(e) =>
                                    setData(
                                        "accomplishment_date",
                                        e.target.value
                                    )
                                }
                                className="mt-1 block w-full border rounded-md p-2"
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
        return employee
            ? `${employee.first_name} ${employee.last_name}`
            : "N/A";
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
                        <h2 className="text-xl font-bold">Progress Accomplishment Report</h2>
                        <div className="flex space-x-2">
                            {selectedReports.length > 0 && (
                                <div className="relative group">
                                    <button
                                        onClick={handleDeleteSelected}
                                        className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 p-2 rounded-full hover:bg-gray-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 6h18M6 6v12a2 2 0 002 2h8a2 2 0 002-2V6M10 6V4a2 2 0 114 0v2"
                                            />
                                        </svg>
                                    </button>
                                    <span className="absolute left-1/2 bottom-full mb-2 w-max transform -translate-x-1/2 text-xs text-black bg-gray-200 rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Delete
                                    </span>
                                </div>
                            )}
                            <div className="relative group">
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 p-2 rounded-full hover:bg-gray-200"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-800 hover:text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </button>
                                <span className="absolute left-1/2 bottom-full mb-2 w-max transform -translate-x-1/2 text-xs text-black bg-gray-200 rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Add
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Checked By</TableHead>
                                    <TableHead>Reviewed By</TableHead>
                                    <TableHead>Approved By</TableHead>
                                    <TableHead>Prepared By</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {progressReports.map((report, index) => (
                                    <TableRow
                                        className="hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            console.log(
                                                "Navigating to:",
                                                `/progress-report/contracts/${contract.id}/project/${project.id}/report/${report.id}`
                                            );
                                            window.location.href = `/progress-report/contracts/${contract.id}/project/${project.id}/report/${report.id}`;
                                        }}
                                    >                                       
                                        <TableCell className="px-4 py-2">
                                            <input
                                                type="checkbox"
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={() => handleCheckboxChange(report.id)}
                                                checked={selectedReports.includes(report.id)}
                                                className="form-checkbox h-4 w-4 text-gray-600 transition duration-150 ease-in-out"
                                            />
                                        </TableCell>
                                        <TableCell className="px-4 py-2">
                                            {formatDate(
                                                report.accomplishment_date
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2">
                                            {getEmployeeName(
                                                report.checked_by_employee_id
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2">
                                            {getEmployeeName(
                                                report.reviewed_by_employee_id
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2">
                                            {getEmployeeName(
                                                report.approved_by_employee_id
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2">
                                            {getEmployeeName(
                                                report.prepared_by_employee_id
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            <Modal isOpen={showForm} onClose={() => setShowForm(false)} />
        </AuthenticatedLayout>
    );
}
