import React from "react";
import { CheckCheck } from "lucide-react";

const JobOrderSubmittedModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
                style={{ width: "300px", height: "300px" }}
            >
                <CheckCheck
                    className="mx-auto"
                    style={{
                        width: "120px",
                        height: "120px",
                        color: "rgb(15,23,42)",
                    }}
                />
                <p className="text-lg mt-4">
                    Job Order has been successfully created!
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

export default JobOrderSubmittedModal;
