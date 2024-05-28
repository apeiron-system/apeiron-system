import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ParContractDetails({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Progress Accomplishment Details
                </h2>
            }
        >
            <Head title="Progress Accomplishment Details" />

            <div className="mx-auto flex max-w-screen-xl">
                <div className="w-1/5 p-6 mr-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-6">Contract Details:</h2>
                    <div className="mb-4">
                        <h3 className="font-bold mb-1">Date</h3>
                        <p>00/00/0000</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold mb-1">Checked By</h3>
                        <p>Employee Name</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold mb-1">Reviewed By</h3>
                        <p>Employee Name</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold mb-1">Approved By</h3>
                        <p>Admin Name</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold mb-1">Prepared By</h3>
                        <p>Employee Name</p>
                    </div>
                </div>
                <div className="w-4/5 bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="flex justify-between gap-6 mb-6">
                        <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-md text-left">
                            <p>PAR Number:</p>
                            <p>Date:</p>
                            <p>Status: <span className="bg-blue-600 text-white px-3 py-1 rounded">On-Going</span></p>
                            <img src="https://via.placeholder.com/300x200" alt="PAR Image" className="mx-auto rounded mt-4" />
                            <div className="text-center mt-4">
                                <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-black">View PAR</button>
                            </div>
                        </div>
                        <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-md text-left">
                            <p>PAR Number:</p>
                            <p>Date:</p>
                            <p>Status: <span className="bg-blue-600 text-white px-3 py-1 rounded">On-Going</span></p>
                            <img src="https://via.placeholder.com/300x200" alt="PAR Image" className="mx-auto rounded mt-4" />
                            <div className="text-center mt-4">
                                <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-black">View PAR</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-md mx-5 my-5 flex items-center">
                        <div className="text-sm mr-5 whitespace-nowrap">Contract Progress</div>
                        <div className="flex-1 bg-gray-200 rounded-full overflow-hidden mr-2">
                            <div className="bg-gray-800 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                        <div className="text-sm whitespace-nowrap">90%</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}