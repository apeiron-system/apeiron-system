import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function JobOrderContractsPage({ auth, activeContracts, pastContracts }) {
    const [searchTermActive, setSearchTermActive] = useState("");
    const [searchTermPast, setSearchTermPast] = useState(""); 

    // Filter active contracts based on the search term
    const filteredActiveContracts = activeContracts.filter((contract) =>
        contract.contract_name.toLowerCase().includes(searchTermActive.toLowerCase())
    );

    // Filter past contracts based on the search term
    const filteredPastContracts = pastContracts.data.filter((contract) =>
        contract.contract_name.toLowerCase().includes(searchTermPast.toLowerCase())
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
            <h3 className="font-bold text-2xl text-gray-1000 leading-tight">
                Active Contracts
            </h3>
            <p className="text-sm text-gray-600 mb-4">
                Select a contract below to view its associated projects.
            </p>
            
            {/* Search Bar Section for Active Contracts*/}
            <div className="flex items-center mb-6">
                <input
                    type="text"
                    value={searchTermActive}
                    onChange={(e) => setSearchTermActive(e.target.value)}
                    className="w-1/4 px-3 py-1 mr-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search Active Contract by Name"
                />
                <button
                    className="px-3 py-1 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600"
                    onClick={() => setSearchTermActive("")} // Clears search term
                >
                    Clear
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredActiveContracts.length > 0 ? (
                filteredActiveContracts.map((contract) => (
                    <Link
                        href={route("job-order-projects", { contract_id: contract.id })}
                        key={contract.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 block"
                        title="Click to view projects associated with this contract"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-800">
                                    {contract.contract_name}
                                </CardTitle>
                                <p className="text-gray-600">Contract ID: {contract.id}</p>
                                <p className="text-gray-600">Status: {contract.status}</p>
                            </CardHeader>
                        </Card>
                    </Link>
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

            {/* Search Bar Section for Past Contracts*/}
            <div className="flex items-center mb-6">
                <input
                    type="text"
                    value={searchTermPast}
                    onChange={(e) => setSearchTermPast(e.target.value)}
                    className="w-1/4 px-3 py-1 mr-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search Past Contract by Name"
                />
                <button
                    className="px-3 py-1 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600"
                    onClick={() => setSearchTermPast("")} // Clears search term for Past Contracts
                >
                    Clear
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Filter past contracts based on the search term */}
                {pastContracts.data.filter((contract) =>
                    contract.contract_name.toLowerCase().includes(searchTermPast.toLowerCase())
                ).length > 0 ? (
                    pastContracts.data.filter((contract) =>
                        contract.contract_name.toLowerCase().includes(searchTermPast.toLowerCase())
                    ).map((contract) => (
                        <Link
                            href={route("job-order-projects", { contract_id: contract.id })}
                            key={contract.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 block"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-gray-800">
                                        {contract.contract_name}
                                    </CardTitle>
                                    <p className="text-gray-600">Contract ID: {contract.id}</p>
                                    <p className="text-gray-600">Status: {contract.status}</p>
                                </CardHeader>
                            </Card>
                        </Link>
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
