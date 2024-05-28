import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import { MapPin } from "lucide-react";

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
                <div className="flex">
                    <Link
                        href={route("job-order-projects")}
                        className="text-grey-600 hover:text-grey-900 mr-4"
                    >
                        <button>
                            <ChevronLeft size={25} strokewidth={1.25} />
                        </button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Job Orders
                    </h2>
                </div>
            }
        >
            <Head title="Job Orders" />

            <div className="flex flex-col md:flex-row md:justify-between mb-10">
                <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-0">
                        <span className="text-2xl font-weight-bolder">
                            Project Name
                        </span>

                        <select className="w-30 px-7 py-2 block bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                            <option value="ON-GOING">ON-GOING</option>
                            <option value="PENDING">PENDING</option>
                            <option value="FINISHED">FINISHED</option>
                        </select>
                    </div>

                    <div className="flex items-center text-gray-500">
                        <MapPin className="mr-1" strokeWidth={1.5} />
                        <span>Location</span>
                    </div>
                </div>

                <div className="flex flex-col items-end mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-60 border py-2 px-4 rounded mr-4"
                        />
                        <button className="py-2 px-4 bg-gray-500 text-black rounded text-white font-weight-bold hover:bg-gray-600">
                            Search
                        </button>
                    </div>

                    <Link href={route("create-job-order")}>
                        <button className="py-2 px-4 bg-gray-500 text-black rounded text-white font-weight-bold hover:bg-gray-600 mt-2">
                            Add Job Order
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex items-end justify-end mb-4">
                <div className="mr-4">
                    <select className="px-5 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-gray-500 text-sm mg-2">
                        <option value="Filter" disabled>
                            Filter
                        </option>
                        <option className="border-0" value="ascending">
                            Ascending
                        </option>
                        <option className="border-0" xvalue="descending">
                            Descending
                        </option>
                    </select>
                </div>

                <div>
                    <select className="px-5 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-gray-500 text-sm mg-2">
                        <option value="delete">Delete</option>
                        <option value="download">Download File</option>
                    </select>
                </div>
            </div>


            {/* Job Orders List */}
            <div className="space-y-4">
                {jobOrderData.map((jobOrder, index) => (
                    <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-md shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">
                                {jobOrder.name}
                            </h3>
                            <div className="relative">
                                <select
                                    className="px-5 py-2 text-sm font-medium bg-white border rounded-md shadow-sm focus:outline-none"
                                    defaultValue={jobOrder.status}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="on-going">On-going</option>
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-2">Item No.</th>
                                        <th className="px-4 py-2">
                                            Description
                                        </th>
                                        <th className="px-4 py-2">Unit</th>
                                        <th className="px-4 py-2">Qty</th>
                                        <th className="px-4 py-2">Unit Cost</th>
                                        <th className="px-4 py-2">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobOrder.items.map((item, itemIndex) => (
                                        <tr key={itemIndex}>
                                            <td className="px-4 py-2">
                                                {item.itemNo}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.description}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.unit}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.qty}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.unitCost}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.amount}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between mb-4 mr-5">
                            <div className="flex items-center mb-4 mr-5">
                                <span className="whitespace-nowrap">
                                    Total Progress
                                </span>
                                <div className="w-64 bg-gray-200 h-3 rounded mx-4">
                                    <div
                                        className="w-64 bg-gray-900 h-full rounded"
                                        style={{ width: "90%" }}
                                    ></div>
                                </div>
                                <span>90%</span>
                            </div>

                            <Link href={route('job-order-details')}>
                                <button className="py-2 px-3 py-2 bg-gray-500 text-white font-weight-bolder hover:bg-gray-600 rounded">
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
