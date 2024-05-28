import React from "react";
import { FileCheck2 } from "lucide-react";

const SubmitJobOrderModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
                style={{ width: "300px", height: "300px" }}
            >
                <FileCheck2
                    className="mx-auto"
                    style={{
                        width: "120px",
                        height: "120px",
                        color: "rgb(15,23,42)",
                    }}
                />
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
