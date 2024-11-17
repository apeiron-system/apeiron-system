import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState, useRef, useCallback } from "react";

export default function ParContractDetails({ auth }) {
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [activeTab, setActiveTab] = useState('boq');
    
    // Pagination state for Bill of Quantities
    const [boqPage, setBoqPage] = useState(1);
    const [boqItemsPerPage] = useState(5);

    // Pagination state for Accomplishments
    const [accomPage, setAccomPage] = useState(1);
    const [accomItemsPerPage] = useState(5);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [accomEditData, setAccomEditData] = useState(null);
    const [modalPage, setModalPage] = useState(1);

    useEffect(() => {
        const detail = sessionStorage.getItem('selectedDetail');
        if (detail) {
            setSelectedDetail(JSON.parse(detail));
            sessionStorage.removeItem('selectedDetail');
        }
    }, []);

    const handlePopupToggle = (accomData) => {
        setIsPopupVisible(!isPopupVisible);
        setAccomEditData(accomData);
    };

    const handleInputChange = (e) => {
        setAccomEditData({ ...accomEditData, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = () => {
        const updatedAccomplishments = selectedDetail.accomplishments.map((item) =>
            item.id === accomEditData.id ? accomEditData : item
        );
        setSelectedDetail({ ...selectedDetail, accomplishments: updatedAccomplishments });
        setIsPopupVisible(false);
        setModalPage(1);
    };

    const handleNextPage = () => {
        setModalPage(modalPage + 1);
    };

    const handlePreviousPage = () => {
        setModalPage(modalPage - 1);
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
                    <h2 className="font-bold text-xl text-gray-900 flex-1">
                        Progress Accomplishment Report Details
                    </h2>
                </div>
            }
        >
            <Head title="Progress Accomplishment Report Details" />

            <div className="pb-4 mb-6">
                <div className="flex items-center justify-between ml-12 mr-12">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Project Name (PAR#)
                        </h1>
                        <h2 className="font-semibold">
                            <span className="font-semibold">Contract Name:</span> {selectedDetail?.contractName}
                        </h2>
                    </div>
                </div>

                <div className="flex space-x-8 text-sm ml-12 mr-12">
                    <h2><span className="font-semibold">Contract ID:</span> {selectedDetail?.contractId}</h2>
                    <h2><span className="font-semibold">Location:</span> {selectedDetail?.location}</h2>
                </div>

                <div className="ml-12 mr-12 mt-4 text-sm">
                    <h2>{formatDate(selectedDetail?.date)}</h2>
                </div>

                {/* Tabs for Bill of Quantities and Accomplishments */}
                <div className="tabs mt-6 ml-12 mr-12">
                    <div className="tabs mt-6 flex items-center justify-between">
                        <ul className="flex space-x-4 border-b">
                            <li
                                onClick={() => setActiveTab('boq')}
                                className={`cursor-pointer py-2 px-4 ${activeTab === 'boq' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                            >
                                Bill of Quantities
                            </li>
                            <li
                                onClick={() => setActiveTab('accom')}
                                className={`cursor-pointer py-2 px-4 ${activeTab === 'accom' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                            >
                                Accomplishments
                            </li>
                        </ul>

                        {activeTab === 'accom' && (
                            <div className="relative group">
                                <button onClick={handlePopupToggle} className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                                        <path d="M 40.5 6 C 40.11625 6 39.732453 6.1464531 39.439453 6.4394531 L 21.462891 24.417969 L 20 28 L 23.582031 26.537109 L 41.560547 8.5605469 C 42.145547 7.9745469 42.145547 7.0254531 41.560547 6.4394531 C 41.267547 6.1464531 40.88375 6 40.5 6 z M 12.5 7 C 9.4802259 7 7 9.4802259 7 12.5 L 7 35.5 C 7 38.519774 9.4802259 41 12.5 41 L 35.5 41 C 38.519774 41 41 38.519774 41 35.5 L 41 18.5 A 1.50015 1.50015 0 1 0 38 18.5 L 38 35.5 C 38 36.898226 36.898226 38 35.5 38 L 12.5 38 C 11.101774 38 10 36.898226 10 35.5 L 10 12.5 C 10 11.101774 11.101774 10 12.5 10 L 29.5 10 A 1.50015 1.50015 0 1 0 29.5 7 L 12.5 7 z"></path>
                                    </svg>
                                </button>
                                <span className="absolute left-1/2 bottom-full mb-2 w-max transform -translate-x-1/2 text-xs text-black bg-gray-200 rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Edit
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Bill of Quantities Table */}
                    {activeTab === 'boq' && (
                        <div className="mt-4">
                            <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-1 py-2 text-center">ITEM NO.</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">DESCRIPTION</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">UNIT</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">QTY.</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">UNIT COST (PhP)</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">AMOUNT (PhP)</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">Weight %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedDetail?.billOfQuantities && paginateData(selectedDetail.billOfQuantities, boqPage, boqItemsPerPage).map((item, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2">{item.itemNo}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.unit}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.qty}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.unitCost}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">{item.amount}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">{item.weightPercentage}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Accomplishments Table */}
                    {activeTab === 'accom' && (
                        <div className="mt-4">
                            <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2 text-center" colSpan="4">QUANTITY</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center" colSpan="4">AMOUNT</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center" colSpan="1">TO DATE %</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center" colSpan="2">BALANCE %</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">REMARKS</th>
                                    </tr>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2 text-center">Previous</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">This Period</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">To Date</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">Balance</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">Previous</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">This Period</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">To Date</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">Balance</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">Weight %</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">Weight %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedDetail?.accomplishments && paginateData(selectedDetail.accomplishments, accomPage, accomItemsPerPage).map((item, index) => (
                                        <tr key={index}>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}  
                </div>

                {/* Authorized Representatives Section */}
                <div className="ml-12 mr-12 mt-20">
                    <h3 className="text-md font-bold mb-4">Authorized Representatives:</h3>
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <h4 className="font-bold">Prepared by:</h4>
                        </div>
                        <div>
                            <h4 className="font-bold">Reviewed by:</h4>
                        </div>
                        <div>
                            <h4 className="font-bold">Checked by:</h4>
                        </div>
                        <div>
                            <h4 className="font-bold">Approved by:</h4>
                        </div>
                    </div>
                </div>

                {/* Edit Modal with Pagination */}
                {isPopupVisible && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-md">
                            <h3 className="text-lg font-bold mb-4">Edit Accomplishment</h3>
                            <form>
                                {/* Display form sections categorized by modalPage */}
                                {modalPage === 1 && (
                                    <div>
                                        <h4 className="text-md font-semibold mb-2">QUANTITY</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium">Previous Quantity</label>
                                                <input
                                                    name="prevQty"
                                                    className="w-full border border-gray-300 rounded p-2"
                                                    value={accomEditData?.prevQty || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium">This Period Quantity</label>
                                                <input
                                                    name="thisPeriodQty"
                                                    className="w-full border border-gray-300 rounded p-2"
                                                    value={accomEditData?.thisPeriodQty || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium">To Date Quantity</label>
                                                <input
                                                    name="toDateQty"
                                                    className="w-full border border-gray-300 rounded p-2"
                                                    value={accomEditData?.toDateQty || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium">Balance Quantity</label>
                                                <input
                                                    name="balanceQty"
                                                    className="w-full border border-gray-300 rounded p-2"
                                                    value={accomEditData?.balanceQty || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {modalPage === 2 && (
                                    <div>
                                        <h4 className="text-md font-semibold mb-2">AMMOUNT</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium">Previous Amount</label>
                                                <input
                                                    name="prevAmt"
                                                    className="w-full border border-gray-300 rounded p-2"
                                                    value={accomEditData?.prevAmt || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium">This Period Amount</label>
                                                <input
                                                    name="thisPeriodAmt"
                                                    className="w-full border border-gray-300 rounded p-2"
                                                    value={accomEditData?.thisPeriodAmt || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium">To Date Amount</label>
                                                <input
                                                    name="toDateAmt"
                                                    className="w-full border border-gray-300 rounded p-2"
                                                    value={accomEditData?.toDateAmt || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium">Balance Amount</label>
                                                <input
                                                    name="balanceAmt"
                                                    className="w-full border border-gray-300 rounded p-2"
                                                    value={accomEditData?.balanceAmt || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {modalPage === 3 && (
                                    <div>
                                        <h4 className="text-md font-semibold mb-2">Weight Information</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium">TO DATE % (Weight)</label>
                                                <input
                                                    name="toDateWeight"
                                                    className="w-full border border-gray-300 rounded p-2"
                                                    value={accomEditData?.toDateWeight || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium">BALANCE % (Weight)</label>
                                                <input
                                                    name="balanceWeight"
                                                    className="w-full border border-gray-300 rounded p-2"
                                                    value={accomEditData?.balanceWeight || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {modalPage === 4 && (
                                    <div>
                                        <div>
                                            <label className="block text-sm font-medium">Remarks</label>
                                            <textarea
                                                name="remarks"
                                                className="w-full border border-gray-300 rounded p-2"
                                                value={accomEditData?.remarks || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Pagination Buttons */}
                                <div className="flex justify-between mt-6">
                                    {modalPage > 1 && (
                                        <button
                                            type="button"
                                            onClick={handlePreviousPage}
                                            className="text-gray-600 px-4 py-2 rounded border border-gray-300"
                                        >
                                            Previous
                                        </button>
                                    )}
                                    {modalPage < 4 && (
                                        <button
                                            type="button"
                                            onClick={handleNextPage}
                                            className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
                                        >
                                            Next
                                        </button>
                                    )}
                                    {modalPage === 4 && (
                                        <button
                                            type="button"
                                            onClick={handleSaveChanges}
                                            className="bg-green-500 text-white px-4 py-2 rounded ml-auto"
                                        >
                                            Save Changes
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}
