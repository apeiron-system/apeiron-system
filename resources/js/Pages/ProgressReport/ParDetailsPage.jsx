import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ParDetailsPage ({ auth }) {
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
                <div class="container mx-auto bg-white p-6 rounded-lg shadow-md">
                    <div class="flex justify-between items-center mb-6">
                        <h1 class="text-2xl font-bold">Progress Accomplishment Details Page</h1>
                        <div class="relative inline-block text-left">
                            <div>
                                <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    {new Date().toLocaleDateString()}
                                </button>
                            </div>
                            <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 1</a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 2</a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 3</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 class="text-xl font-bold mb-4">*Contract Name*</h2>
                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2 border-b border-gray-200">
                                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600"/>
                                    </th>
                                    <th class="px-4 py-2 border-b border-gray-200 text-left">Description</th>
                                    <th class="px-4 py-2 border-b border-gray-200 text-left">Date</th>
                                    <th class="px-4 py-2 border-b border-gray-200 text-left">Checked By</th>
                                    <th class="px-4 py-2 border-b border-gray-200 text-left">Reviewed By</th>
                                    <th class="px-4 py-2 border-b border-gray-200 text-left">Approved By</th>
                                    <th class="px-4 py-2 border-b border-gray-200 text-left">Prepared By</th>
                                    <th class="px-4 py-2 border-b border-gray-200 text-left">
                                        <div class="relative inline-block text-left">
                                            <div>
                                                <button class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    ⋮
                                                </button>
                                            </div>
                                            <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View</a>
                                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="px-4 py-2 border-b border-gray-200">
                                        <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
                                    </td>
                                    <td class="px-4 py-2 border-b border-gray-200"></td>
                                    <td class="px-4 py-2 border-b border-gray-200"></td>
                                    <td class="px-4 py-2 border-b border-gray-200"></td>
                                    <td class="px-4 py-2 border-b border-gray-200"></td>
                                    <td class="px-4 py-2 border-b border-gray-200"></td>
                                    <td class="px-4 py-2 border-b border-gray-200"></td>
                                    <td class="px-4 py-2 border-b border-gray-200">
                                        <div class="relative inline-block text-left">
                                            <div>
                                                <button class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    ⋮
                                                </button>
                                            </div>
                                            <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View</a>
                                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex items-center mt-4">
                        <div class="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                            <div class="bg-blue-600 h-2.5 rounded-full w-90%"></div>
                        </div>
                        <span class="ml-2 text-sm text-gray-600">90%</span>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}