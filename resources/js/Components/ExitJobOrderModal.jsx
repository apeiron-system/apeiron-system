import React from "react";
import { FileX2 } from "lucide-react";

const ExitJobOrderModal = ({ show, onClose, onDiscard, onSaveDraft }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg w-80 overflow-hidden pt-6">
                <div className="p-6 px-4 text-center">
                    <FileX2
                        className="mx-auto mb-4"
                        size={50}
                        color="rgb(15,23,42)"
                    />
                    <h3 className="text-lg font-semibold mt-2 mb-2">
                        Do you really wish to exit without saving?
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                        Your progress will not be saved if you cancel now.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <button
                        onClick={onDiscard}
                        className="text-lg w-full p-4 text-red-500 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Discard
                    </button>
                </div>
                <div className="border-t border-gray-200">
                    <button
                        onClick={onSaveDraft}
                        className="text-lg w-full p-4 text-blue-500 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Save as Draft
                    </button>
                </div>
                <div className="border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="text-lg w-full p-4 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Keep Editing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExitJobOrderModal;
