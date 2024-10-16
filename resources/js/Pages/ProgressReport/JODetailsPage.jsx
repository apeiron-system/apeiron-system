import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link as InertiaLink } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function JODetailsPage({ auth }) {
    const [jo, setJo] = useState(null);

    useEffect(() => {
        const joDetails = sessionStorage.getItem('joDetails');
        if (joDetails) {
            setJo(JSON.parse(joDetails));
            sessionStorage.removeItem('joDetails');
        }
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <button onClick={() => window.location.href = route('par-details')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Job Order Details
                    </h2>
                </div>
            }
        >
            <Head title="Job Order Details" />

            <div className="flex h-screen">
                <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                    {jo ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">
                                    Job Order (ID: {jo.id})
                                </h1>
                                <InertiaLink
                                    href={route('par-details', { id: jo.contractId })}
                                    className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-gray-200 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Back to Progress Report
                                </InertiaLink>
                            </div>

                            <div className="mb-6">
                                <p><strong>Job Order Title:</strong> {jo.title}</p>
                                <p><strong>Contract ID:</strong> {jo.contractId}</p>
                                <p><strong>Description:</strong> {jo.description}</p>
                                <p><strong>Status:</strong> {jo.status}</p>
                                <p><strong>Assigned To:</strong> {jo.assignedTo}</p>
                            </div>

                            <h2 className="text-xl font-bold mb-4">Related Tasks</h2>

                            <div className="overflow-x-auto" style={{ height: '300px' }}>
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Task Description</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Due Date</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Assigned To</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jo.tasks?.map((task, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 border-b border-gray-200 text-left">{task.description}</td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-left">{task.dueDate}</td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-left">{task.assignedTo}</td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-left">{task.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <p>Loading job order details...</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
