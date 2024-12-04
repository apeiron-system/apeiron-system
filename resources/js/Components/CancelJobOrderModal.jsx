import React from "react";
import { FileX2 } from "lucide-react";


const CancelJobOrderModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    const handleDone = () => {
        window.location.href = "/job-order";
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-30">
            <div
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
                style={{ width: "300px", height: "300px" }}
            >
                <FileX2
                    className="mx-auto"
                    style={{
                        width: "120px",
                        height: "120px",
                        color: "rgb(15,23,42)",
                    }}
                />
                <p className="text-lg mt-4">
                    Do you really want to cancel the form?
                </p>
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={onClose}
                        className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                    >
                        No
                    </button>
                    <button
                        onClick={handleDone}
                        className="bg-[rgb(15,23,42)] hover:bg-[rgb(47,60,78)] text-white py-2 px-4 rounded"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelJobOrderModal;
