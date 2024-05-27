import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ParDetailsPage ({ auth, contract }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Progress Report
                </h2>
            }
        >
            <Head title="Progress Report" />

            <div className="flex h-screen">
                <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Progress Accomplishment Details Page</h1>
                        <div className="relative inline-block text-left">
                            <div>
                                <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    {new Date().toLocaleDateString()}
                                </button>
                            </div>
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 1</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 2</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 3</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold mb-4">{contract.name}</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b border-gray-200">
                                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600"/>
                                    </th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">Description</th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">Date</th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">Checked By</th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">Reviewed By</th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">Approved By</th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">Prepared By</th>
                                    <th className="px-4 py-2 border-b border-gray-200 text-left">
                                        <div className="relative inline-block text-left">
                                            <div>
                                                <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    ⋮
                                                </button>
                                            </div>
                                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View</a>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-blue-600 h-2.5 rounded-full" style="width: 90%"></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">90%</span>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}