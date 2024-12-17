import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import _ from "lodash";
import { useState } from "react";

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const calculateEndDate = (startDate, durationInDays) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + durationInDays);
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
};

export default function ParDetailsPage({ auth, contract, projects }) {
    const [showForm, setShowForm] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState([]);

    const handleCheckboxChange = (index) => {
        setSelectedDetails((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index)
                : [...prevSelected, index]
        );
    };

    const handleRowClick = (event, detail) => {
        if (event.target.type === "checkbox") {
            return;
        }

        // Redirect or perform action when a row is clicked
        window.location.href = `/progress-report/contracts/${contract.id}/details/${detail.id}`;
    };

    const handleDeleteSelected = () => {
        // Handle deletion of selected details
        alert("Delete selected details functionality to be implemented.");
    };

    const endDate = calculateEndDate(contract.date, contract.duration_in_days);

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
                        Contract Progress Accomplishment Report
                    </h2>
                </div>
            }
        >
            <Head title="Progress Report" />

            <div className="flex h-screen">
                <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">
                                {contract.contract_name}
                            </h1>
                            <h3>Contract ID (ID: {contract.id})</h3>
                        </div>
                        <Link
                            href={`/progress-report/contracts/${contract.id}/job-order`}
                            className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-gray-200 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            View Job Order
                        </Link>
                    </div>

                    <div className="mb-6">
                        <p>
                            <strong>Location:</strong> {contract.location}
                        </p>
                        <p>
                            <strong>Start Date:</strong>{" "}
                            {formatDate(contract.date)}
                        </p>
                        <p>
                            <strong>End Date:</strong> {formatDate(endDate)}
                        </p>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Projects</h2>
                        {selectedDetails.length > 0 && (
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
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableCaption>Projects</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project Name</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Duration in Days</TableHead>
                                    <TableHead>Number of Units</TableHead>
                                    <TableHead>ABC Value</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projects.map((projects) => (
                                    <TableRow
                                        key={"project-" + projects.id}
                                        onClick={() => {
                                            window.location.href = `/progress-report/contracts/${contract.id}/project/${projects.id}`;
                                        }}
                                    >
                                        <TableCell className="px-4 py-2">
                                            {projects.project_name}
                                        </TableCell>
                                        <TableCell className="px-4 py-2">
                                            {projects.street_address},{" "}
                                            {projects.barangay}, {projects.city},{" "}
                                            {projects.province},{" "}
                                            {projects.zip_code},{" "}
                                            {projects.country}
                                        </TableCell>
                                        <TableCell className="px-4 py-2">
                                            {projects.duration_in_days}
                                        </TableCell>
                                        <TableCell className="px-4 py-2">
                                            {projects.num_of_units}
                                        </TableCell>
                                        <TableCell className="px-4 py-2">
                                            {projects.abc_value}
                                        </TableCell>
                                        <TableCell className="px-4 py-2">
                                            {_.capitalize(projects.status)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
