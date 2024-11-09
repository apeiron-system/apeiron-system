import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState, useRef } from "react";

export default function ParContractDetails({ auth }) {
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        const detail = sessionStorage.getItem('selectedDetail');
        if (detail) {
            setSelectedDetail(JSON.parse(detail));
            sessionStorage.removeItem('selectedDetail');
        }
    }, []);

    const handlePopupToggle = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const getDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return `${start.toLocaleDateString(undefined, options)} - ${end.toLocaleDateString(undefined, options)}`;
    };

    const formatDate = (date) => {
        const parsedDate = new Date(date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <span className="font-bold text-lg">
                {`As of ${parsedDate.toLocaleDateString(undefined, options)}`}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center space-x-2">
                    <button onClick={() => window.location.href = route('par-details')} className="flex items-center text-gray-700 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h2 className="font-bold text-2xl text-gray-900 flex-1">
                        Progress Accomplishment Report Details
                    </h2>
                </div>
            }
        >
            <Head title="Progress Accomplishment Report Details" />

            <div className="pb-4 mb-6">
                <div className="flex items-center justify-between ml-12 mr-12">
                    <h2 className="font-semibold">
                        <span className="font-semibold">Contract Name:</span> {selectedDetail?.contractName}
                    </h2>
                    <div className="relative group">
                        <button
                            ref={buttonRef}
                            onClick={handlePopupToggle}
                            className="p-2 rounded focus:outline-none text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-200"
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
                    <h2><span className="font-semibold">Contract ID:</span> {selectedDetail?.contractId}</h2>
                    <h2><span className="font-semibold">Location:</span> {selectedDetail?.location}</h2>
                </div>

                <div className="ml-12 mr-12 mt-4 text-sm">
                    <h2>{formatDate(selectedDetail?.date)}</h2>
                </div>
            </div>

            {/* Details Modal */}
            {isPopupVisible && selectedDetail && (
                <div
                    className="fixed inset-0 z-50 flex justify-center items-center"
                    style={{ top: -300, left: `${buttonRef.current?.getBoundingClientRect().left - 280}px` }}
                >
                    <div className="bg-white p-5 rounded-lg shadow-lg w-130 relative">
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
                                <p className="font-semibold">Duration</p>
                                <p>{getDuration(selectedDetail.startDate, selectedDetail.endDate)}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Checked By</p>
                                <p>{selectedDetail.checkedBy}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Reviewed By</p>
                                <p>{selectedDetail.reviewedBy}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Approved By</p>
                                <p>{selectedDetail.approvedBy}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Prepared By</p>
                                <p>{selectedDetail.preparedBy}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
