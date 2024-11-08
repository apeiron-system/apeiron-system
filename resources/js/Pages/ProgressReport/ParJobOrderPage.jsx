import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState, useRef } from "react";

export default function ParJobOrder({ auth }) {
    const [jobOrder, setJobOrder] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const buttonRef = useRef(null); // Ref to the button for positioning

    useEffect(() => {
        const savedJobOrder = sessionStorage.getItem('selectedJobOrder');
        if (savedJobOrder) {
            setJobOrder(JSON.parse(savedJobOrder));
        }
    }, []);

    const handlePopupToggle = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center space-x-2">
                    <button onClick={() => window.location.href = route('jo-details')} className="flex items-center text-gray-700 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h2 className="font-bold text-2xl text-gray-900 flex-1">
                        Job Order Progress Accomplishment Details
                    </h2>
                </div>
            }
        >
            <Head title="JO Progress Report" />

            {jobOrder && (
                <>
                    <div className="pb-4 mb-6">
                        <div className="flex items-center justify-between ml-12 mr-12">
                            <h2 className="font-semibold">
                                <span className="font-semibold">Contract Name:</span> {jobOrder.contractName}
                            </h2>
                            <div className="relative group">
                                <button
                                    ref={buttonRef}
                                    onClick={handlePopupToggle}
                                    className="p-2 rounded focus:outline-none"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 5a2 2 0 100-4 2 2 0 000 4zM12 14a2 2 0 100-4 2 2 0 000 4zM12 23a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                                <span className="absolute left-1/2 top-[-20px] transform -translate-x-1/2 text-xs text-black bg-white p-1 rounded shadow-md whitespace-nowrap hidden group-hover:block">
                                    See more details
                                </span>
                            </div>
                        </div>

                        <div className="flex space-x-8 text-sm ml-12 mr-12">
                            <h2><span className="font-semibold">Contract ID:</span> {jobOrder.contractId}</h2>
                            <h2><span className="font-semibold">Location:</span> {jobOrder.location}</h2>
                        </div>
                    </div>

                    {/* Job Order Details Modal */}
                    {isPopupVisible && (
                        <div
                            className="fixed inset-0 z-50 flex justify-center items-center"
                            style={{ top: -360, left: `${buttonRef.current?.getBoundingClientRect().left - 250}px` }}
                        >
                            <div className="bg-white p-6 rounded-lg shadow-lg w-75 relative">
                                <button
                                    onClick={handlePopupToggle}
                                    className="absolute top-2 right-2 p-1 text-gray-700 hover:text-gray-900"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className="space-y-4 text-sm text-gray-700">
                                    <div>
                                        <p className="font-semibold">Date</p>
                                        <p>{jobOrder.date}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Job Order No.</p>
                                        <p>{jobOrder.jobOrderNo}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Period Covered</p>
                                        <p>{jobOrder.periodCovered}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Item Works</p>
                                        <p>{jobOrder.itemWorks}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Supplier</p>
                                        <p>{jobOrder.supplier}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="relative ml-12 mr-12 mt-4">
                        <div className="absolute right-0 top-0 flex space-x-4">
                            {/* Edit Button with Tooltip */}
                            <div className="relative group">
                                <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 3l4 4-10 10H7v-4L17 3z" />
                                    </svg>
                                </button>
                                <span className="absolute left-1/2 top-[-25px] transform -translate-x-1/2 text-xs text-black bg-white p-2 rounded shadow-md whitespace-nowrap hidden group-hover:block">
                                    Edit
                                </span>
                            </div>

                            {/* Add Button with Tooltip */}
                            <div className="relative group">
                                <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                                    </svg>
                                </button>
                                <span className="absolute left-1/2 top-[-25px] transform -translate-x-1/2 text-xs text-black bg-white p-2 rounded shadow-md whitespace-nowrap hidden group-hover:block">
                                    Add
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="ml-12 mr-12 mt-16">
                        <table className="min-w-full border border-gray-200 rounded-lg">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-sm text-gray-600">Item No.</th>
                                    <th className="px-4 py-3 text-left font-semibold text-sm text-gray-600">Description</th>
                                    <th className="px-4 py-3 text-left font-semibold text-sm text-gray-600">Quantity</th>
                                    <th className="px-4 py-3 text-left font-semibold text-sm text-gray-600">Unit</th>
                                    <th className="px-4 py-3 text-left font-semibold text-sm text-gray-600">Unit Price</th>
                                    <th className="px-4 py-3 text-left font-semibold text-sm text-gray-600">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobOrder.details?.map((detail, index) => (
                                    <tr key={index} className="border-b border-gray-200">
                                        <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                                        <td className="px-4 py-3 text-gray-700">{detail.description}</td>
                                        <td className="px-4 py-3 text-gray-700">{detail.quantity}</td>
                                        <td className="px-4 py-3 text-gray-700">{detail.unit}</td>
                                        <td className="px-4 py-3 text-gray-700">{detail.unitPrice}</td>
                                        <td className="px-4 py-3 text-gray-700">{detail.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </AuthenticatedLayout>
    );
}
