import React from 'react';

const CancelJobOrderModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p className="text-lg mt-4">Do you really want to cancel the form?</p>
                <div className="mt-6 flex justify-center">
                    <button onClick={onClose} className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">No</button>
                    <button onClick={onConfirm} className="bg-[rgb(15,23,42)] hover:bg-[rgb(47,60,78)] text-white py-2 px-4 rounded">Yes</button>
                </div>
            </div>
        </div>
    );
};

export default CancelJobOrderModal;
