import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { useState } from "react";
import ContractHeader from "@/Componentss/contract/ContractHeader";
import ProjectTabNavigation from "@/Componentss/contract/project/ProjectTabNavigation";

export default function ContractItemsPage({
    auth,
    contract,
    items,
    signingAuthorityEmployee,
}) {
    const [selectedItems, setSelectedItems] = useState([]);

    // Handler to toggle selection of an individual item
    const handleCheckboxChange = (itemId) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(itemId)
                ? prevSelected.filter((id) => id !== itemId)
                : [...prevSelected, itemId]
        );
    };

    // Handler to toggle selection of all items
    const handleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map((item) => item.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <ContractHeader
                    contract={contract}
                    signingAuthorityEmployee={signingAuthorityEmployee}
                />
            }
        >
            <ProjectTabNavigation id={contract.id} />
            
            <h1 className="font-bold text-lg">Items</h1>
            {items.length > 0 ? (
                
                <Table>
                    <TableCaption>A list of the contract's items.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            {/* Select All Checkbox */}
                            <TableHead className="py-2 px-4 border-b">
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedItems.length === items.length
                                    }
                                    onChange={handleSelectAll}
                                    aria-label="Select all items"
                                />
                            </TableHead>
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
                                Latest Price
                            </TableHead>
                            <TableHead className="py-2 px-4 border-b">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow
                                key={item.id}
                                className="hover:bg-gray-100"
                            >
                                {/* Checkbox for individual item */}
                                <TableCell className="py-2 px-4 border-b">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(
                                            item.id
                                        )}
                                        onChange={() =>
                                            handleCheckboxChange(item.id)
                                        }
                                        aria-label={`Select item ${item.description}`}
                                    />
                                </TableCell>
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
                                    {item.prices.length !== 0 &&
                                        (item.prices[item.prices.length - 1]
                                            .unit_cost !== undefined &&
                                        !isNaN(
                                            item.prices[item.prices.length - 1]
                                                .unit_cost
                                        )
                                            ? parseFloat(
                                                  item.prices[
                                                      item.prices.length - 1
                                                  ].unit_cost
                                              ).toFixed(2)
                                            : "N/A")}
                                </TableCell>
                                <TableCell className="py-2 px-4 border-b text-center">
                                    action for bidding
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-gray-500">No items found.</p>
            )}
        </AuthenticatedLayout>
    );
}
