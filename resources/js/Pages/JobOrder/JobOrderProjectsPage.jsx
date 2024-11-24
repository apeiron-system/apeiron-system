import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function JobOrderProjectsPage({ auth, projects, contractName }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('latest');

    const sortedItems = (items) => {
        let sortedItems = [...items];
        
        sortedItems = sortedItems.filter(project =>
            project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortOrder === 'latest') {
            sortedItems.sort((a, b) => (a.id < b.id ? 1 : -1)); // Using id instead of item_no
        } else if (sortOrder === 'oldest') {
            sortedItems.sort((a, b) => (a.id > b.id ? 1 : -1)); // Using id instead of item_no
        }

        return sortedItems;
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
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
            <div className="pb-4 flex items-center mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-1/4 px-3 py-1 mr-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search Project"
                />
                <button 
                    onClick={handleClearSearch} 
                    className="px-3 py-1 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600"
                >
                    Clear
                </button>
                <select
                    className="ml-2 pr-8 px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none"
                    onChange={handleSortOrderChange}
                    value={sortOrder}
                >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            {/* Projects List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedItems(projects).length > 0 ? (
                    sortedItems(projects).map((project, index) => (
                        <Link 
                            href={route("job-order", { 
                                contract_id: project.contract_id, 
                                project_id: project.id 
                            })}
                            key={index}
                            className="block bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-gray-800">
                                        {project.project_name}
                                    </CardTitle>
                                    <p className="text-gray-600">Project ID: {project.id}</p>
                                    <p className="text-gray-600">Status: {project.status}</p>
                                </CardHeader>
                                <CardContent>
                                    {/* Progress Bar with Color Based on Status */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center w-full">
                                            <span className="whitespace-nowrap">Progress</span>
                                            <div className="w-full bg-gray-200 h-3 rounded-lg mx-4">
                                                <div
                                                    className={`h-full rounded-lg ${
                                                        project.progress < 50
                                                            ? 'bg-red-500'
                                                            : project.status === 'on-going'
                                                            ? 'bg-yellow-500'
                                                            : 'bg-green-500'
                                                    }`}
                                                    style={{ width: `${project.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm">{project.progress}%</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="text-center col-span-full">
                        <p className="text-gray-900">No projects found matching "{searchTerm}".</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
