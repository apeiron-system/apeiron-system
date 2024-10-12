import React from "react";
import { CheckCheck } from "lucide-react";

const JobOrderSubmittedModal = ({ show, onClose, onCreateAnother }) => {
    if (!show) return null;

    const handleDone = () => {
        window.location.href = "/job-order"; // Adjust the URL as needed
    };

    const handleCreateAnother = () => {
        onCreateAnother();
        onClose();
    };

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
                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        onClick={handleCreateAnother}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                    >
                        Create Another
                    </button>
                    <button
                        onClick={handleDone}
                        className="bg-[rgb(15,23,42)] hover:bg-[rgb(47,60,78)] text-white py-2 px-4 rounded"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobOrderSubmittedModal;
