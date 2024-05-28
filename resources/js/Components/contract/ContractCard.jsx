import React from "react";
import { Button } from "@/components/ui/button"; // Ensure you have the Button component in your project
import _ from "lodash";

const ContractCard = ({ contract }) => {
    return (
        <div className="border rounded-lg p-4 shadow-lg max-w-xs">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{contract.contract_name}</h2>
            </div>
            <p className="text-sm text-gray-500">Contract ID: {contract.id}</p>
            <div className="mt-2">
                <p className="text-gray-700">
                    <strong>Location:</strong> {contract.location}
                </p>
                <p className="text-gray-700">
                    <strong>Duration in Days:</strong>{" "}
                    {contract.duration_in_days}
                </p>
                <p className="text-gray-700">
                    <strong>Amount:</strong> {contract.amount}
                </p>
                <p className="text-gray-700">
                    <strong>Status:</strong> {_.capitalize(contract.status)}
                </p>
            </div>
            <Button className="mt-4 w-full bg-gray-600 text-white rounded-md">
                View
            </Button>
        </div>
    );
};

export default ContractCard;
