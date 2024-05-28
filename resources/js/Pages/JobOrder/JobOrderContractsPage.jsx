import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Head, Link } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import Checkbox from "@/Components/Checkbox";

export default function JobOrderContractsPage({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Job Order Contracts
                    </h2>
                </div>
            }
        >
            <Head title="Job Order" />
            

            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold pl-10">
                        Active Contracts
                    </h3>
                </div>
                <div className="mt-1 border text-center rounded-lg">
                        <DropdownMenu>
                        <DropdownMenuTrigger className="w-full px-4 py-1 hover:bg-slate-100">
                        <button className="flex items-center">
                            <span className="font-medium text-base text-gray-800">Sort By</span>
                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 13.586l4.293-4.293a1 1 0 0 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L10 13.586z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link
                                        
                                        className="w-full flex gap-2 items-center"
                                    >
                                        Most Recent
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link
                                        className="w-full flex gap-2 items-center"
                                    >
                                        Most Oldest
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
            </div>

            <div className="py-5">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">       
                <div className="flex space-x-4">
                    <div class="bg-white rounded-lg shadow-lg mb-10 p-6 w-80">
                        <div class="flex justify-between items-center">
                            <h2 class="text-lg font-bold">Contract Name</h2>
                            <span class="w-3 h-3 rounded-full bg-blue-600"></span>
                        </div>
                        <p class="text-gray-500 mb-4">Contract ID</p>
                        <div class="mb-4">
                            <p class="text-gray-700">Location:</p>
                            <p class="text-gray-400">Panabo, Davao City</p>
                        </div>
                        <div class="mb-4">
                            <p class="text-gray-700">Duration:</p>
                            <p class="text-gray-400">12 months</p>
                        </div>
                        <div class="mb-6">
                            <p class="text-gray-700">Amount:</p>
                            <p class="text-gray-400">₱ 1,000,000.00</p>
                        </div>
                        <button class="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-800" >View</button>
                    </div>

                    <div class="bg-white rounded-lg shadow-md mb-10 p-6 w-80">
                        <div class="flex justify-between items-center">
                            <h2 class="text-lg font-bold">Contract Name</h2>
                            <span class="w-3 h-3 rounded-full bg-yellow-600"></span>
                        </div>
                        <p class="text-gray-500 mb-4">Contract ID</p>
                        <div class="mb-4">
                            <p class="text-gray-700">Location:</p>
                            <p class="text-gray-400">Panabo, Davao City</p>
                        </div>
                        <div class="mb-4">
                            <p class="text-gray-700">Duration:</p>
                            <p class="text-gray-400">12 months</p>
                        </div>
                        <div class="mb-6">
                            <p class="text-gray-700">Amount:</p>
                            <p class="text-gray-400">₱ 1,000,000.00</p>
                        </div>
                        <button class="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-800">View</button>
                    </div>
                    
                      
            </div>

            <div>
            </div>

 <h3 className="text-xl font-semibold mb-4">Past Contracts</h3>
   <div className="bg-white shadow rounded overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th className="px-2 py-2 text-left text-m font-medium text-gray-800 tracking-wider">
                    <Checkbox />
                </th>
                <th className="px-2 py-2 border-b border-gray-200">Contract ID</th>
                <th className="px-2 py-2 border-b border-gray-200">Contract Name</th>
                <th className="px-2 py-2 border-b border-gray-200">Start Date</th>
                <th className="px-2 py-2 border-b border-gray-200">End Date</th>
            </tr>
        </thead>
        <tbody>
            <tr className="hover:bg-gray-600 ">
                <td className="px-2 py-2 whitespace-nowrap">
                    <Checkbox />
                </td>
                <td className="px-2 py-2 whitespace-nowrap"></td>
                <td className="px-2 py-2 whitespace-nowrap"> </td>
                <td className="px-2 py-2 whitespace-nowrap"></td>
                <td className="px-2 py-2 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-gray-500 hover:text-white">
                            &#8226;&#8226;&#8226;
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link href="#" className="w-full flex gap-2 items-center">
                                    View
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="#" className="w-full flex gap-2 items-center">
                                    Delete
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<div className="flex justify-center mt-4">
    <button className="px-4 py-2 border-2 border-gray-800 text-gray-900 rounded-lg hover:bg-gray-600 hover:text-white">View Table</button>
</div>
</div>
</div>
            
            

        </AuthenticatedLayout>
    );
}
