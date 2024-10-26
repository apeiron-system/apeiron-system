import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ParContractDetails({ auth }) {
    const [selectedDetail, setSelectedDetail] = useState(null);

    useEffect(() => {
        const detail = sessionStorage.getItem('selectedDetail');
        if (detail) {
            setSelectedDetail(JSON.parse(detail));
            sessionStorage.removeItem('selectedDetail');
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
                        Progress Accomplishment Report
                    </h2>
                </div>
            }
        >
            <Head title="Progress Accomplishment Details" />

            <div className="mx-auto flex max-w-screen-xl">
                <div className="w-1/5 p-6 mr-6 rounded-lg">
                    {selectedDetail && (
                        <>
                            <div className="mb-4">
                                <h3 className="font-bold mb-1">Date</h3>
                                <p>{selectedDetail.date}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-bold mb-1">Checked By</h3>
                                <p>{selectedDetail.checkedBy}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-bold mb-1">Reviewed By</h3>
                                <p>{selectedDetail.reviewedBy}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-bold mb-1">Approved By</h3>
                                <p>{selectedDetail.approvedBy}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-bold mb-1">Prepared By</h3>
                                <p>{selectedDetail.preparedBy}</p>
                            </div>
                        </>
                    )}
                </div>
                <div className="w-4/5 bg-gray-100 p-6 rounded-lg shadow-md">
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
