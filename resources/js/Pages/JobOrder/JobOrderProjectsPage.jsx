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
import { useState } from "react";

export default function JobOrderProjectsPage({ auth, projects, contractName }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('oldest'); // Default to 'oldest' for ascending sort

    const sortedItems = (items) => {
        let sortedItems = [...items];
        
        // Filter by search term
        sortedItems = sortedItems.filter(project =>
            project.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sorting logic based on selected sort order
        if (sortOrder === 'latest') {
            // Sort by item_no in descending order for "Latest" (Latest first)
            sortedItems.sort((a, b) => (a.item_no < b.item_no ? 1 : -1));
        } else if (sortOrder === 'oldest') {
            // Sort by item_no in ascending order for "Oldest" (Oldest first)
            sortedItems.sort((a, b) => (a.item_no > b.item_no ? 1 : -1));
        }

        return sortedItems;
    };

    // Handle change in dropdown for ascending/descending order
    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <Link href={route("job-order-contracts")}>
                        <button className="text-slate-500 hover:text-slate-700 mr-4 flex items-center">
                            <ChevronLeft size={20} strokeWidth={2} />
                        </button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Job Order Projects
                    </h2>
                </div>
            }
        >
            <Head title="Projects" />

            <h2 className="pb-4 font-bold text-2xl text-gray-1000 leading-tight">{contractName}</h2>

            {/* Search and Sort */}
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-1/4 px-3 py-1 mr-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Project Name"
                />
                <button className="px-3 py-1 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600">
                    Search
                </button>
                <select
                    className="ml-2 pr-8 px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none"
                    onChange={handleSortOrderChange}
                    value={sortOrder}
                >
                    <option value="oldest">Oldest</option>
                    <option value="latest">Latest</option>
                </select>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
                {sortedItems(projects).length > 0 ? (
                    sortedItems(projects).map((project, index) => (
                        <div
                            key={index}
                            className="p-4 bg-gray-50 rounded-md shadow-sm transition-opacity duration-300 opacity-100"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">{project.description}</h3>
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

                            <Table>
                                <TableCaption>Project Items for {project.description}</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead onClick={() => requestSort('item_no')}>Item No.</TableHead>
                                        <TableHead onClick={() => requestSort('description')}>Description</TableHead>
                                        <TableHead onClick={() => requestSort('unit')}>Unit</TableHead>
                                        <TableHead onClick={() => requestSort('qty')}>Qty</TableHead>
                                        <TableHead onClick={() => requestSort('unitCost')}>Unit Cost</TableHead>
                                        <TableHead onClick={() => requestSort('budget')}>Budget</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedItems([project]).map((item, itemIndex) => (
                                        <TableRow key={itemIndex}>
                                            <TableCell>{item.item_no}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.unit}</TableCell>
                                            <TableCell>{item.qty}</TableCell>
                                            <TableCell>{item.unit_cost}</TableCell>
                                            <TableCell>{item.budget}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

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
                                <Link href={route("job-order", { project_id: project.id })}>
                                    <button className="py-2 px-3 bg-gray-500 text-white font-weight-bolder hover:bg-gray-600 rounded">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-900">No projects found matching "{searchTerm}".</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
