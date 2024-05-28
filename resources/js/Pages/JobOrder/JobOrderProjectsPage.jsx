import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function JobOrderProjectsPage({ auth }) {
    const projectData = [
        {
            name: "Project A",
            status: "pending",
            items: [
                { itemNo: 1, description: "Design Phase", unit: "hours", qty: 120, unitCost: 50, amount: 6000 },
                { itemNo: 2, description: "Development Phase", unit: "hours", qty: 300, unitCost: 75, amount: 22500 },
                { itemNo: 3, description: "Testing Phase", unit: "hours", qty: 100, unitCost: 60, amount: 6000 }
            ],
            progress: 40
        },
        {
            name: "Project B",
            status: "on-going",
            items: [
                { itemNo: 1, description: "Requirement Gathering", unit: "hours", qty: 80, unitCost: 55, amount: 4400 },
                { itemNo: 2, description: "Implementation", unit: "hours", qty: 200, unitCost: 70, amount: 14000 },
                { itemNo: 3, description: "Deployment", unit: "hours", qty: 50, unitCost: 65, amount: 3250 }
            ],
            progress: 60
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <h2 className="font-bold text-3xl text-gray-1000 leading-tight">
                        Projects
                    </h2>
                </div>
            }
        >
            <Head title="Contract" />

            {/* Search */}
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    className="w-1/4 px-4 py-2 mr-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contract Name"
                />
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600">
                    Search
                </button>
                <select className="ml-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none">
                    <option value="most-recent">Previous</option>
                    <option value="previous">Most Recent</option>
                </select>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
                {projectData.map((project, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{project.name}</h3>
                            <div className="relative">
                                <select className="px-5 py-2 text-sm font-medium bg-white border rounded-md shadow-sm focus:outline-none" defaultValue={project.status}>
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
                                        <th className="px-4 py-2">Description</th>
                                        <th className="px-4 py-2">Unit</th>
                                        <th className="px-4 py-2">Qty</th>
                                        <th className="px-4 py-2">Unit Cost</th>
                                        <th className="px-4 py-2">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {project.items.map((item, itemIndex) => (
                                        <tr key={itemIndex}>
                                            <td className="px-4 py-2">{item.itemNo}</td>
                                            <td className="px-4 py-2">{item.description}</td>
                                            <td className="px-4 py-2">{item.unit}</td>
                                            <td className="px-4 py-2">{item.qty}</td>
                                            <td className="px-4 py-2">{item.unitCost}</td>
                                            <td className="px-4 py-2">{item.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                        <div className="flex items-center justify-between mb-4 mr-5">
                <div className="flex items-center mb-4 mr-5">
                    <span className="whitespace-nowrap">Total Progress</span>
                        <div className="w-64 bg-gray-200 h-3 rounded mx-4">
                            <div
                                className="w-64 bg-gray-900 h-full rounded"
                                style={{ width: "90%" }}
                            ></div>
                        </div>
                    <span>90%</span>
                </div>

                    <button className="py-2 px-3 py-2 bg-gray-500 text-white font-weight-bolder hover:bg-gray-600 rounded">
                        View Details
                    </button>

            </div>


                        <div className="flex space-x-2 mt-4">
                            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600">
                                Edit Project
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600">
                                Delete Project
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
