import { useState } from "react";
import Papa from "papaparse";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { router } from "@inertiajs/react";

export default function AddItemCsv({ contract }) {
    const [csvData, setCsvData] = useState([]);
    const [error, setError] = useState(null);

    // CSV validation logic
    const validateCsv = (data) => {
        const errors = [];
        const validTypes = ["material", "equipment", "labor"];

        data.forEach((row, index) => {
            const { description, type, unit, unit_cost } = row;

            if (!description || typeof description !== "string") {
                errors.push(
                    `Row ${
                        index + 1
                    }: Description is required and must be a string.`
                );
            }

            if (!validTypes.includes(type)) {
                errors.push(
                    `Row ${
                        index + 1
                    }: Type must be one of material, equipment, labor.`
                );
            }

            if (!unit || typeof unit !== "string") {
                errors.push(
                    `Row ${index + 1}: Unit is required and must be a string.`
                );
            }

            if (!unit_cost || isNaN(unit_cost) || !/^\d+(\.\d{1,2})?$/.test(unit_cost)) {
                errors.push(
                    `Row ${
                        index + 1
                    }: unit_cost must be a decimal with two decimal places.`
                );
            }
        });

        return errors;
    };

    // Handle CSV upload and parsing
    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const parsedData = results.data;
                    const validationErrors = validateCsv(parsedData);

                    if (validationErrors.length > 0) {
                        setError(validationErrors);
                    } else {
                        setError(null);
                        setCsvData(parsedData);
                    }
                },
            });
        }
    };

    const handleSubmit = () => {
        if (csvData.length > 0) {
            // Process the data (e.g., send it to the server)
            // TODO: Add the logic for sending data to the server
            router.post(`/item/contracts/${contract.id}`, csvData);
        } else {
            setError(["No valid data to submit"]);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-xl font-semibold mb-4">Add Items from CSV</h2>
            <p>Upload a CSV file with the following format:</p>
            <p className="mb-4">
                <a
                    className="text-blue-500"
                    href="/sampleCsv.csv"
                    target="_blank"
                >
                    Download Sample file
                </a>
            </p>
            <pre className="bg-gray-100 p-4 rounded">
                description,type,unit,unit_cost
                <br />
                "Example item","material","pcs", 100.00
            </pre>

            <Input
                type="file"
                accept=".csv"
                className="mt-4 mb-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                onChange={handleFileUpload}
            />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <ul>
                        {error.map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            {csvData.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        Preview Items
                    </h3>
                    <div className="max-h-[1200px] overflow-y-scroll">
                        <Table className="min-w-full bg-white border border-gray-300">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="py-2 px-4 border-b">
                                        Description
                                    </TableHead>
                                    <TableHead className="py-2 px-4 border-b">
                                        Type
                                    </TableHead>
                                    <TableHead className="py-2 px-4 border-b">
                                        Unit
                                    </TableHead>
                                    <TableHead className="py-2 px-4 border-b">
                                        unit_cost
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {csvData.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        className="hover:bg-gray-100"
                                    >
                                        <TableCell className="py-2 px-4 border-b">
                                            {item.description}
                                        </TableCell>
                                        <TableCell className="py-2 px-4 border-b">
                                            {item.type}
                                        </TableCell>
                                        <TableCell className="py-2 px-4 border-b">
                                            {item.unit}
                                        </TableCell>
                                        <TableCell className="py-2 px-4 border-b">
                                            {item.unit_cost}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                onClick={handleSubmit}
                disabled={csvData.length === 0}
            >
                Add Items
            </button>
        </div>
    );
}
