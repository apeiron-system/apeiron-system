import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/Components/ui/button";
import { useState } from "react";

export default function JobOrderContractsPage({ auth, activeContracts, pastContracts }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Function to format the progress bar color based on progress
    const getProgressColor = (progress) => {
        if (progress < 50) return "bg-red-500";
        if (progress < 80) return "bg-yellow-500";
        return "bg-green-500";
    };

    // Filter active contracts based on the search term
    const filteredActiveContracts = activeContracts.filter((contract) =>
        contract.contract_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="pl-9 font-semibold text-xl text-gray-800 leading-tight">
                        Job Order Contracts
                    </h2>
                </div>
            }
        >
            <Head title="Job Order Contracts" />

            {/* Active Contracts Section */}
            <h3 className="pb-4 font-bold text-2xl text-gray-1000 leading-tight">
                Active Contracts
            </h3>
            
            {/* Search Bar Section */}
            <div className="flex items-center mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-1/4 px-3 py-1 mr-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search Contract Name"
                />
                <button
                    className="px-3 py-1 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600"
                    onClick={() => setSearchTerm("")} // Clears search term
                >
                    Clear
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredActiveContracts.length > 0 ? (
                    filteredActiveContracts.map((contract) => (
                        <Card
                            key={contract.id}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-800">
                                    {contract.contract_name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="whitespace-nowrap">Progress</span>
                                    <div className="w-full bg-gray-200 h-3 rounded-lg mx-4">
                                        <div
                                            className={`h-full rounded-lg ${getProgressColor(contract.progress)}`}
                                            style={{ width: `${contract.progress}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm">{contract.progress}%</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Link 
                                    href={route("job-order-projects", {
                                        contract_id: contract.id,
                                    })}
                                >
                                    <Button
                                        variant="primary"
                                        className="w-full bg-slate-600 hover:bg-slate-800 text-white"
                                    >
                                        View
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="text-center col-span-full">
                        <p className="text-gray-500">No active contracts found.</p>
                    </div>
                )}
            </div>

            {/* Past Contracts Section */}
            <h3 className="pb-4 font-bold text-2xl text-gray-1000 leading-tight mt-8">
                Past Contracts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {pastContracts.data.length > 0 ? (
                    pastContracts.data.map((contract) => (
                        <Card
                            key={contract.id}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-800">
                                    {contract.contract_name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="whitespace-nowrap">Progress</span>
                                    <div className="w-full bg-gray-200 h-3 rounded-lg mx-4">
                                        <div
                                            className={`h-full rounded-lg ${getProgressColor(contract.progress)}`}
                                            style={{ width: `${contract.progress}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm">{contract.progress}%</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Link
                                    href={route("job-order-projects", {
                                        contract_id: contract.id,
                                    })}
                                >
                                    <Button
                                        variant="primary"
                                        className="w-full bg-slate-600 hover:bg-slate-800 text-white"
                                    >
                                        View
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="text-center col-span-full">
                        <p className="text-gray-500">No past contracts found.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
