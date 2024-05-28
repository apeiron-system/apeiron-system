import React from "react";

const Modal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center" style={{ width: '300px', height: '300px' }}>
                <div className="flex justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="120"
                        height="120"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check-check"
                    >
                        <path d="M18 6 7 17l-5-5" />
                        <path d="m22 10-7.5 7.5L13 16" />
                    </svg>
                </div>
                <p className="text-lg mt-4">
                    Form has been successfully saved!
                </p>
                <button
                    onClick={onClose}
                    className="mt-6 bg-[rgb(15,23,42)] hover:bg-[rgb(47,60,78)] text-white py-2 px-4 rounded"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default Modal;
