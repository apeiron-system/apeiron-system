import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link as InertiaLink, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ParDetailsPage({ auth }) {
    const [contract, setContract] = useState(null);
    const [optionsDropdownOpen, setOptionsDropdownOpen] = useState(null);

    useEffect(() => {
        const contractDetails = sessionStorage.getItem('contractDetails');
        if (contractDetails) {
            setContract(JSON.parse(contractDetails));
            sessionStorage.removeItem('contractDetails');
        }
    }, []);

    // const toggleOptionsDropdown = (index) => {
    //     setOptionsDropdownOpen((prevIndex) => (prevIndex === index ? null : index));
    // };

    const handleViewJobOrder = (jobOrder) => {
        sessionStorage.setItem('joDetails', JSON.stringify(jobOrder));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Progress Accomplishment Report
                </h2>
            }
        >
            <Head title="Progress Report" />

            <div className="flex h-screen">
                <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                    {contract ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">
                                    {contract.name} (ID: {contract.id})
                                </h1>
                                <InertiaLink
                                    href={route('jo-details', { id: contract.id })}
                                    className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-gray-200 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    View Job Order
                                </InertiaLink>
                            </div>

                            <div className="mb-6">
                                <p><strong>Location:</strong> {contract.location}</p>
                                <p><strong>Start Date:</strong> {contract.startDate}</p>
                                <p><strong>End Date:</strong> {contract.endDate}</p>
                            </div>

                            <h2 className="text-xl font-bold mb-4">Progress Accomplishment</h2>

                            <div className="overflow-x-auto" style={{ height: '300px' }}>
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left"></th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Description</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Date</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Checked By</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Reviewed By</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Approved By</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Prepared By</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contract.details?.map((detail, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 border-b border-gray-200">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-left">{detail.description}</td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-left">{detail.date}</td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-left">{detail.checkedBy}</td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-left">{detail.reviewedBy}</td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-left">{detail.approvedBy}</td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-left">{detail.preparedBy}</td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-left">
                                                    <div className="relative inline-block text-left">
                                                        <button
                                                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                            onClick={() => toggleOptionsDropdown(index)}
                                                        >
                                                            ⋮
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="w-full max-w-md mx-5 my-5 flex items-center">
                                <div className="text-sm mr-5 whitespace-nowrap">Contract Progress</div>
                                <div className="flex-1 bg-gray-200 rounded-full overflow-hidden mr-2">
                                    <div className="bg-gray-800 h-2 rounded-full" style={{ width: '90%' }}></div>
                                </div>
                                <div className="text-sm whitespace-nowrap">90%</div>
                            </div>
                        </>
                    ) : (
                        <p>Loading contract progress accomplishment details...</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
