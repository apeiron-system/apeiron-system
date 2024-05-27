import React from "react";

const SubmitJobOrderModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-green-500 mx-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M13 2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4V0h6v2zM3 4v12h14V4h-2v8H5V4H3z"
                        clipRule="evenodd"
                    />
                </svg>
                <p className="text-lg mt-4">
                    Are you sure you want to submit this form?
                </p>
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={onClose}
                        className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-[rgb(15,23,42)] hover:bg-[rgb(47,60,78)] text-white py-2 px-4 rounded"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubmitJobOrderModal;
