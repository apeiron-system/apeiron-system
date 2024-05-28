import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ChevronLeft, Link } from "lucide-react";
import { MapPin } from "lucide-react";

export default function JobOrderPage({ auth }) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight flex items-center gap-2">
                    <button>
                        <ChevronLeft size={25} strokeWidth={1.25} />
                    </button>
                    Job Order
                </h2>
            }
        >
            <Head title="Contract" /> {/*Fixed the Title*/}

            <div className="flex flex-col md:flex-row md:justify-between mb-10">

                <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-0">
                            
                            <span className="text-2xl font-weight-bolder">Project Name</span>

                            <select
                                className= "w-30 px-7 py-2 block bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            >
                                <option value="ON-GOING">ON-GOING</option>
                                <option value="PENDING">PENDING</option>
                                <option value="FINISHED">FINISHED</option>
                            </select>

                    </div>


                        <div className="flex items-center text-gray-500">
                            <MapPin className="mr-1" strokeWidth={1.50} /> 
                            <span>Location</span>
                        </div>

                </div>
            
            
                <div className="flex flex-col items-end mb-4 md:mb-0">    
                    <div className="flex items-center mb-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-60 border py-2 px-4 rounded mr-4"
                        />
                        <button className="py-2 px-4 bg-gray-500 text-black rounded text-white font-weight-bold hover:bg-gray-600">
                            Search
                        </button>
                    </div>
                        
                        <button className="py-2 px-4 bg-gray-500 text-black rounded text-white font-weight-bold hover:bg-gray-600 mt-2">
                            Add Job Order
                        </button>
                </div>
            </div>
            

                <div className="flex items-end justify-end mb-4">
                    
                    <div className="mr-4">
                        <select className="px-5 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-gray-500 text-sm mg-2">
                            <option value="Filter" disabled>Filter</option>
                            <option className="border-0" value="ascending">Ascending</option>
                            <option className="border-0" xvalue="descending">Descending</option>
                        </select>
                    </div>
                

                    <div>
                        <select className="px-5 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-gray-500 text-sm mg-2">
                            <option value="delete">Delete</option>
                            <option value="download">Download File</option>
                        </select>
                    </div>

                </div>







            <div className="p-4 bg-gray-50 rounded-md shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">Unit No: </h3>
                    </div>
            </div>

            <div className="border p-4 mb-4 rounded">
                <table className="w-full mb-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border">Item No.</th>
                            <th className="py-2 px-4 border">Description</th>
                            <th className="py-2 px-4 border">Unit</th>
                            <th className="py-2 px-4 border">Qty</th>
                            <th className="py-2 px-4 border">Unit Cost</th>
                            <th className="py-2 px-4 border">Amount</th>
                        </tr>
                    </thead>
                    <tbody>{/* Add rows dynamically if needed */}</tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mb-4 mr-5">
                <div className="flex items-center mb-4 mr-5">
                    <span className="whitespace-nowrap">Total Progress</span>
                        <div className="w-64 bg-gray-200 h-3 rounded mx-4">
                            <div
                                className="w-64 bg-gray-900 h-full rounded"
                                style={{ width: "90%" }}
                            ></div>
                        </div>
                    <span>90%</span>
                </div>

                    <button className="py-2 px-3 py-2 bg-gray-500 text-white font-weight-bolder hover:bg-gray-600 rounded">
                        View Details
                    </button>

            </div>

               



                <div className="p-4 bg-gray-50 rounded-md shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">Unit No: </h3>
                    </div>
                </div>


                <div className="border p-4 mb-4 rounded">
                    <table className="w-full mb-4">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 border">Item No.</th>
                                <th className="py-2 px-4 border">Description</th>
                                <th className="py-2 px-4 border">Unit</th>
                                <th className="py-2 px-4 border">Qty</th>
                                <th className="py-2 px-4 border">Unit Cost</th>
                                <th className="py-2 px-4 border">Amount</th>
                            </tr>
                        </thead>
                        <tbody>{/* Add rows dynamically if needed */}</tbody>
                    </table>
             </div>

            
             <div className="flex items-center justify-between mb-4 mr-5">
                <div className="flex items-center mb-4 mr-5">
                    <span className="whitespace-nowrap">Total Progress</span>
                        <div className="w-64 bg-gray-200 h-3 rounded mx-4">
                            <div
                                className="w-64 bg-gray-900 h-full rounded"
                                style={{ width: "90%" }}
                            ></div>
                        </div>
                    <span>90%</span>
                </div>

                    <button className="py-2 px-3 py-2 bg-gray-500 text-white font-weight-bolder hover:bg-gray-600 rounded">
                        View Details
                    </button>

            </div>



        </AuthenticatedLayout>
    );
}