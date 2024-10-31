import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function JobOrderProjectsPage({ auth, projectContracts }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <Link href={route("job-order-contracts")} className="text-grey-600 hover:text-grey-900 mr-4">
                        <button>
                            <ChevronLeft size={30} strokeWidth={2} />
                        </button>
                    </Link>
                    <h2 className="font-bold text-3xl text-gray-1000 leading-tight">
                        Job Order Projects
                    </h2>
                </div>
            }
        >
            <Head title="Projects" />

            {/* Search */}
            <h2 className="py-3 font-bold text-2xl text-gray-1000 leading-tight">Contract Name</h2>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    className="w-1/4 px-3 py-1 mr-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contract Name"
                />
                <button className="px-3 py-1 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600">
                    Search
                </button>
                <select className="ml-2 pr-8 px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none">
                    <option value="most-recent">Latest</option>
                    <option value="previous">Oldest</option>
                </select>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
                {projectContracts.map((project, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{project.name}</h3>
                            <div className="relative">
                                <select
                                    className="pr-8 px-3 py-1 text-sm font-medium bg-white border rounded-md shadow-sm focus:outline-none"
                                    defaultValue={project.status}
                                >
                                    <option value="done">Completed</option>
                                    <option value="on-going">On-going</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* Start of Table Section */}
                        <Table>
                            <TableCaption>Project Items for {project.name}</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item No.</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Unit Cost</TableHead>
                                    <TableHead>Budget</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {project.items.map((item, itemIndex) => (
                                    <TableRow key={itemIndex}>
                                        <TableCell>{item.itemNo}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                        <TableCell>{item.qty}</TableCell>
                                        <TableCell>{item.unitCost}</TableCell>
                                        <TableCell>{item.budget}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* End of Table Section */}

                        {/* Progress Bar and View Details Button */}
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center mb-4">
                                <span className="whitespace-nowrap">Total Progress</span>
                                <div className="w-64 bg-gray-200 h-3 rounded mx-4">
                                    <div
                                        className="bg-gray-900 h-full rounded"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                                <span>{project.progress}%</span>
                            </div>
                            <Link href={route('job-order')}>
                                <button className="py-2 px-3 bg-gray-500 text-white font-weight-bolder hover:bg-gray-600 rounded">
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
