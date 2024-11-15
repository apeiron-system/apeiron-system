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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function JobOrderPage({
    auth,
    contractId,
    jobOrders,
    projectName,
    projectLocation,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Filtered Job Orders based on search term and status
    const filteredJobOrders = (jobOrders || []).filter((jobOrder) =>
        jobOrder.jo_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClearSearch = () => {
        setSearchTerm("");
    };

    // Function to determine the color of the progress bar based on the progress percentage
    const getProgressBarColor = (progress) => {
        if (progress >= 100) return "bg-green-500"; // Green for 100%
        if (progress >= 50) return "bg-yellow-500"; // Yellow for below 100%
        return "bg-red-500"; // Red for below 50%
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

            <div className="flex flex-col md:flex-column md:justify-between mb-10">
                <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-0">
                        <span className="text-2xl font-bold">
                            {projectName || "Project Name"}
                        </span>
                    </div>
                    <div className="pb-4 flex items-center text-gray-500">
                        <span>{projectLocation || "Project Location"}</span>
                    </div>
                </div>

                {/* Search and Sort */}
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
                            <option value="">All Status</option>
                            <option value="ON-GOING">On-Going</option>
                            <option value="FINISHED">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Job Orders List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredJobOrders.map((jobOrder, index) => (
                    <Card
                        key={index}
                        className="px-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        style={{ height: "290px" }} // Adjusted height for card to fit progress bar
                    >
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-gray-800">
                                {jobOrder.jo_name}
                            </CardTitle>

                            {/* Wrap progress bar and percentage in a flex container */}
                            <div className="w-full flex justify-between items-center mt-2">
                                <div className="w-full bg-gray-200 h-3 rounded-lg mr-4">
                                    <div
                                        className={`h-full rounded-full ${getProgressBarColor(
                                            jobOrder.progress
                                        )}`}
                                        style={{
                                            width: `${jobOrder.progress || 0}%`,
                                        }}
                                    ></div>
                                </div>
                                <span className="text-sm ml-2">{jobOrder.progress}%</span> {/* Added margin to the right of the percentage */}
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-600">
                            <div className="mb-1">
                                <strong>Location:</strong> {jobOrder.location}
                            </div>
                            <div className="mb-1">
                                <strong>Period Covered:</strong>{" "}
                                {jobOrder.period_covered}
                            </div>
                            <div className="mb-1">
                                <strong>Supplier:</strong> {jobOrder.supplier}
                            </div>
                            <div>
                                <strong>Date Needed:</strong>{" "}
                                {jobOrder.dateNeeded}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link
                                href={route("job-order-details", {
                                    job_order_id: jobOrder.jo_no,
                                })}
                            >
                                <Button
                                    variant="primary"
                                    className="w-full bg-slate-600 hover:bg-slate-800 text-white"
                                >
                                    View Details
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}

                {/* Add Job Order Button as a Card */}
                <Link
                    href={route("create-job-order", {
                        contract_id: contractId,
                    })}
                >
                    <Card
                        className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
                        style={{ height: "290px" }} // Matching height with other cards
                    >
                        <Plus size={48} className="text-gray-500" />
                    </Card>
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
