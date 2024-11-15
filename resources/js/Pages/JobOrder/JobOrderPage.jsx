import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function JobOrderPage({ auth }) {
    // Hardcoded job order data to match the migration schema
    const jobOrderData = [
        {
            jo_no: 1,
            jo_name: "UNIT 21",
            contract_id: 101,
            project_id: 201,
            location: "Manila",
            period_covered: "2024-01-01 to 2024-12-31",
            supplier: "ABC Corporation",
            dateNeeded: "2024-11-30",
            preparedBy: "John Doe",
            checkedBy: "Jane Smith",
            approvedBy: "Tom Johnson",
            itemWorks: "Design, Development, Testing",
        },
        {
            jo_no: 2,
            jo_name: "UNIT 22",
            contract_id: 102,
            project_id: 202,
            location: "Cebu",
            period_covered: "2024-05-01 to 2024-10-31",
            supplier: "XYZ Solutions",
            dateNeeded: "2024-11-15",
            preparedBy: "Alice Williams",
            checkedBy: "Bob Lee",
            approvedBy: "Chris Brown",
            itemWorks: "Requirement Gathering, Implementation, Deployment",
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <Link href={route("job-order-projects")}>
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
                        <span className="text-2xl font-bold">Project Name</span>
                    </div>
                    <div className="pb-4 flex items-center text-gray-500">
                        <span>Project Location</span>
                    </div>
                </div>

                {/* Search and Sort */}
                <div className="flex items-center mb-4">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search Job Order"
                            className="px-3 py-1 mr-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button className="px-3 py-1 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600">
                            Clear
                        </button>

                        <select className="ml-2 pr-8 px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none">
                            <option value="ON-GOING">On-Going</option>
                            <option value="FINISHED">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Job Orders List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {jobOrderData.map((jobOrder, index) => (
                    <Card
                        key={index}
                        className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        style={{ height: '350px' }} // Fixed height for all cards
                    >
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-800">{jobOrder.jo_name}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-600">
                            <div className="mb-1">
                                <strong>Location:</strong> {jobOrder.location}
                            </div>
                            <div className="mb-1">
                                <strong>Period Covered:</strong> {jobOrder.period_covered}
                            </div>
                            <div className="mb-1">
                                <strong>Supplier:</strong> {jobOrder.supplier}
                            </div>
                            <div className="mb-1">
                                <strong>Date Needed:</strong> {jobOrder.dateNeeded}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link href={route("job-order-details", { job_order_id: jobOrder.jo_no })}>
                                <Button variant="primary" className="w-full bg-slate-600 hover:bg-slate-800 text-white">
                                    View Details
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}

                {/* Add Job Order Button as a Card */}
                <Link href={route("create-job-order")}>
                    <Card
                        className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
                        style={{ height: '350px' }} // Matching height with other cards
                    >
                        <Plus size={48} className="text-gray-500" />
                    </Card>
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
