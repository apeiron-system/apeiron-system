import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, MapPin } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function JobOrderPage({ auth }) {
    const jobOrderData = [
        {
            name: "UNIT 21",
            status: "pending",
            items: [
                {
                    itemNo: 1,
                    description: "Design Phase",
                    unit: "hours",
                    qty: 120,
                    unitCost: 50,
                    amount: 6000,
                },
                {
                    itemNo: 2,
                    description: "Development Phase",
                    unit: "hours",
                    qty: 300,
                    unitCost: 75,
                    amount: 22500,
                },
                {
                    itemNo: 3,
                    description: "Testing Phase",
                    unit: "hours",
                    qty: 100,
                    unitCost: 60,
                    amount: 6000,
                },
            ],
            progress: 40,
        },
        {
            name: "UNIT 22",
            status: "on-going",
            items: [
                {
                    itemNo: 1,
                    description: "Requirement Gathering",
                    unit: "hours",
                    qty: 80,
                    unitCost: 55,
                    amount: 4400,
                },
                {
                    itemNo: 2,
                    description: "Implementation",
                    unit: "hours",
                    qty: 200,
                    unitCost: 70,
                    amount: 14000,
                },
                {
                    itemNo: 3,
                    description: "Deployment",
                    unit: "hours",
                    qty: 50,
                    unitCost: 65,
                    amount: 3250,
                },
            ],
            progress: 60,
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

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row md:justify-between mb-10">
                <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-0">
                        <span className="text-2xl font-bold">Project Name</span>
                        <select className="w-30 px-7 py-2 block bg-white border rounded-md shadow-sm text-sm">
                            <option value="ON-GOING">On-Going</option>
                            <option value="FINISHED">Completed</option>
                        </select>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <MapPin className="mr-1" strokeWidth={1.5} />
                        <span>Location</span>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <div className="flex items-center mb-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-60 border py-2 px-4 rounded mr-4"
                        />
                        <button className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600">
                            Search
                        </button>
                    </div>
                    <Link href={route("create-job-order")}>
                        <button className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600">
                            Add Job Order
                        </button>
                    </Link>
                </div>
            </div>

            {/* Job Orders List */}
            <div className="space-y-4">
                {jobOrderData.map((jobOrder, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{jobOrder.name}</h3>
                            <div className="relative">
                                <select
                                    className="px-5 py-2 text-sm font-medium bg-white border rounded-md shadow-sm"
                                    defaultValue={jobOrder.status}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="on-going">On-going</option>
                                </select>
                            </div>
                        </div>

                        {/* Table */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item No.</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Unit Cost</TableHead>
                                    <TableHead>Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {jobOrder.items.map((item, itemIndex) => (
                                    <TableRow key={itemIndex}>
                                        <TableCell>{item.itemNo}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                        <TableCell>{item.qty}</TableCell>
                                        <TableCell>{item.unitCost}</TableCell>
                                        <TableCell>{item.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Progress */}
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <span>Total Progress</span>
                                <div className="w-64 bg-gray-200 h-3 rounded mx-4">
                                    <div
                                        className="bg-gray-900 h-full rounded"
                                        style={{ width: `${jobOrder.progress}%` }}
                                    ></div>
                                </div>
                                <span>{jobOrder.progress}%</span>
                            </div>
                            <Link href={route("job-order-details")}>
                                <button className="py-2 px-3 bg-gray-500 text-white rounded hover:bg-gray-600">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
