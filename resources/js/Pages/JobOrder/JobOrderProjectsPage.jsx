import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card";
import { useState } from "react";

export default function JobOrderProjectsPage({ auth, projects, contractName }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("latest");

    // Sort and filter projects
    const sortedItems = (items) => {
        let filteredItems = [...items];

        // Filter projects by search term
        filteredItems = filteredItems.filter((project) =>
            project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort projects based on sortOrder
        if (sortOrder === "latest") {
            filteredItems.sort((a, b) => (a.id < b.id ? 1 : -1));
        } else if (sortOrder === "oldest") {
            filteredItems.sort((a, b) => (a.id > b.id ? 1 : -1));
        }

        return filteredItems;
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
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

            {/* Instructional Text */}
            <h2 className="font-bold text-2xl text-gray-1000 leading-tight">
                {contractName}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
                Select a project below to view its associated job orders.
            </p>

            {/* Search and Sort Section */}
            <div className="pb-4 flex items-center mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-1/4 px-3 py-1 mr-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search projects by name"
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
                    <option value="latest">Sort by Latest</option>
                    <option value="oldest">Sort by Oldest</option>
                </select>
            </div>

            {/* Projects List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedItems(projects).length > 0 ? (
                    sortedItems(projects).map((project, index) => (
                        <Link
                            href={route("job-order", {
                                contract_id: project.contract_id,
                                project_id: project.id,
                            })}
                            key={index}
                            className="block bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                            title={`Click to view job orders associated with this project`}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-gray-800">
                                        {project.project_name}
                                    </CardTitle>
                                    <p className="text-gray-600">Project ID: {project.id}</p>
                                    <div>
                                        <strong className="text-gray-600">Status: </strong>
                                        <span
                                            className={`font-medium ${
                                                project.status === "completed"
                                                    ? "text-green-600"
                                                    : "text-yellow-600"
                                            }`}
                                        >
                                            {project.status}
                                        </span>
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="text-center col-span-full">
                        <p className="text-gray-900">
                            No projects found matching "{searchTerm}". Try refining your search or
                            adjusting the sort order.
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
