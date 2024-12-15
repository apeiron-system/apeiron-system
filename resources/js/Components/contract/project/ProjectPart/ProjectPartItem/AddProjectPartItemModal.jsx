import React, { useState } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { X } from "lucide-react";

export default function AddProjectPartItemModal({
    type,
    items,
    onClose,
    contract_id,
    project_id,
    project_part_id,
}) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [invalidQuantities, setInvalidQuantities] = useState([]);
    const [selectAll, setSelectAll] = useState(false); // State for "Select All"

    const handleCheckboxChange = (itemId) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(itemId)
                ? prevSelected.filter((id) => id !== itemId)
                : [...prevSelected, itemId]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]); // Deselect all
        } else {
            setSelectedItems(items.map((item) => item.id)); // Select all
        }
        setSelectAll(!selectAll);
    };

    const handleQuantityChange = (itemId, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [itemId]: value === "" ? "" : parseInt(value) || 1,
        }));
    };

    const handleAddItems = () => {
        const invalidItems = selectedItems.filter(
            (itemId) => !quantities[itemId] || quantities[itemId] <= 0
        );

        if (invalidItems.length > 0) {
            setInvalidQuantities(invalidItems);
            return;
        }

        setInvalidQuantities([]); // Clear invalid states if all is good.

        const selectedWithQuantities = selectedItems.map((itemId) => ({
            item_id: itemId,
            quantity: quantities[itemId],
        }));

        // Send data to the backend for processing
        axios
            .post(
                `/contract/${contract_id}/project/${project_id}/part/${project_part_id}/item/add`,
                {
                    items: selectedWithQuantities,
                }
            )
            .then((response) => {
                console.log("Items added successfully:", response.data);
                onClose(); // Close modal after success
            })
            .catch((error) => {
                console.error("Failed to add items:", error);
            });
    };

    return (
        <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-10 w-full max-w-lg mx-auto relative">
                {/* Close Button */}
                <Button onClick={onClose} className="absolute top-4 right-4 ">
                    <X className="w-6 h-6" />
                </Button>

                <div className="flex justify-between my-8">
                    <h3 className="text-lg font-semibold">
                        Select {type} Items to Add
                    </h3>
                    <Button
                        onClick={handleAddItems}
                        disabled={selectedItems.length === 0}
                    >
                        Add Selected Items
                    </Button>
                </div>

                <div className="overflow-y-auto max-h-96">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedItems.length ===
                                                items.length && items.length > 0
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </TableHead>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Quantity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <TableRow
                                        key={item.id}
                                    >
                                        <TableCell>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(
                                                    item.id
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        item.id
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {item.description}
                                        </TableCell>
                                        <TableCell>
                                            <input
                                                type="number"
                                                min="1"
                                                value={
                                                    quantities[item.id] || ""
                                                }
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                                className={`w-16 border rounded p-1 ${
                                                    invalidQuantities.includes(
                                                        item.id
                                                    )
                                                        ? "border-red-500"
                                                        : ""
                                                }`}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="text-center"
                                    >
                                        No items available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </section>
    );
}
