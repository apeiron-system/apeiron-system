import React from "react";
import { FileX2 } from "lucide-react";
import { Link } from "@inertiajs/react";

const ExitJobOrderModal = ({ show, onClose, projectId }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-30">
            <div className="bg-white rounded-2xl shadow-lg w-80 overflow-hidden pt-6">
                <div className="p-6 px-4 text-center">
                    <FileX2
                        className="mx-auto mb-4"
                        size={100}
                        color="rgb(15,23,42)"
                    />
                    <h3 className="text-xl font-semibold mt-2 mb-2">
                        Unsaved Changes
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Are you sure you want to continue?
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <Link href={route("job-order", { 
                            project_id: projectId
                        })}
                    >
                        <button
                            className="text-lg w-full p-4 text-red-500 font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Discard Changes
                        </button>
                    </Link>
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
