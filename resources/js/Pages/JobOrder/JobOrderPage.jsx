import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, Plus } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/Components/ui/card";

export default function JobOrderPage({
    auth,
    contractId,
    projectId,
    jobOrder,
    projectName,
    projectLocation,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const sortedJobOrders = [...(jobOrder || [])].sort((a, b) => {
        if (a.created_at && b.created_at) {
            return new Date(b.created_at) - new Date(a.created_at);
        }
        return b.jo_no - a.jo_no;
    });

    const filteredJobOrders = sortedJobOrders.filter((jobOrder) => {
        const matchesSearch = jobOrder.jo_name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || jobOrder.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleClearSearch = () => {
        setSearchTerm("");
        setStatusFilter("all");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <Link
                        href={route("job-order-projects", {
                            contract_id: contractId,
                        })}
                    >
                        <button className="text-slate-500 hover:text-slate-700 mr-4 flex items-center">
                            <ChevronLeft size={20} strokeWidth={2} />
                        </button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Job Orders
                    </h2>
                </div>
            }
        >
            <Head title="Job Orders" />

            <div className="flex flex-col md:flex-column md:justify-between mb-6">
                <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-0">
                        <span className="text-2xl font-bold">
                            {projectName || "Project Name"}
                        </span>
                    </div>
                    <div className="pb-4 flex items-center text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.3}
                            stroke="currentColor"
                            className="w-4 h-4 "
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 2c3.866 0 7 3.134 7 7 0 3.866-7 13-7 13S5 12.866 5 9c0-3.866 3.134-7 7-7zm0 4a3 3 0 110 6 3 3 0 010-6z"
                            />
                        </svg>
                        <span className="ml-1" > {projectLocation || "Project Location"}</span>
                    </div>
                </div>

                <div className="flex items-center mb-4">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-1 mr-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search Job Order"
                        />

                        <button
                            onClick={handleClearSearch}
                            className="px-3 py-1 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600"
                        >
                            Clear
                        </button>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="ml-2 pr-8 px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none"
                        >
                            <option value="all">All Status</option>
                            <option value="on-going">On-going</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <Link
                    href={route("create-job-order", {
                        project_id: projectId,
                    })}
                >
                    <Card
                        className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center hover:scale-105"
                        style={{ height: "440px" }}
                    >
                        <Plus size={80} className="text-gray-500" />
                    </Card>
                </Link>

                {filteredJobOrders.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 py-8">
                        No job orders found matching your criteria
                    </div>
                ) : (
                    filteredJobOrders.map((jobOrder, index) => (
                        <Link
                            key={index}
                            href={route("job-order-details", {
                                jo_no: jobOrder.jo_no,
                            })}
                        >
                            <Card
                                className="px-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105"
                                style={{ height: "440px" }}
                            >
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-gray-800">
                                        {jobOrder.jo_name}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="text-sm text-gray-600">
                                    <div className="mb-1">
                                        <strong>Status: </strong>
                                        <span
                                            className={`font-medium ${
                                                jobOrder.status === "completed"
                                                    ? "text-green-600"
                                                    : "text-yellow-600"
                                            }`}
                                        >
                                            {jobOrder.status}
                                        </span>
                                    </div>
                                    <div className="mb-1">
                                        <strong>Location:</strong> {jobOrder.location}
                                    </div>
                                    <div className="mb-1">
                                        <strong>Supplier:</strong> {jobOrder.supplier}
                                    </div>
                                    <div className="mb-1">
                                        <strong>Item Works:</strong> {jobOrder.itemWorks}
                                    </div>
                                    <div className="mb-1">
                                        <strong>Period Covered:</strong> {jobOrder.period_covered}
                                    </div>
                                    <div className="mb-1">
                                        <strong>Date Needed:</strong> {jobOrder.dateNeeded}
                                    </div>
                                    <div className="mb-1">
                                        <strong>Prepared By:</strong> {jobOrder.preparedBy}
                                    </div>
                                    <div className="mb-1">
                                        <strong>Checked By:</strong> {jobOrder.checkedBy}
                                    </div>
                                    <div className="mb-1">
                                        <strong>Approved By:</strong> {jobOrder.approvedBy}
                                    </div>
                                </CardContent>

                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </AuthenticatedLayout>
    );
}
