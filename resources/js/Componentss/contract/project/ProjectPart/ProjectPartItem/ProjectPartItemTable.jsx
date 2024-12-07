import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Link, router } from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/Components/ui/alert-dialog";

export default function ProjectPartItemTable({
    type,
    items,
    contract_id,
    project_id,
    project_part_id,
}) {
    const [selectedItem, setSelectedItem] = useState(null); // Track the selected item for deletion
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Track whether the dialog is open

    const handleDelete = () => {
        if (!selectedItem) return; // Ensure a valid selected item exists
        router.delete(
            `/contract/${contract_id}/project/${project_id}/part/${project_part_id}/item/${selectedItem}/delete`
        );
        setIsDialogOpen(false); // Close the dialog after deletion
        setSelectedItem(null); // Reset selected item
    };

    const openDialog = (itemId) => {
        setSelectedItem(itemId); // Set the selected item
        setIsDialogOpen(true); // Open the dialog
    };

    const closeDialog = () => {
        setIsDialogOpen(false); // Close the dialog
        setSelectedItem(null); // Reset the selected item
    };

    return (
        <div className="mt-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Bid Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow
                            key={`${type}-item-${item.id}`}
                            className="group"
                        >
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                                {item.bid_amount ? `${item.bid_amount}` : "N/A"}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                    <AlertDialog open={isDialogOpen}>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    openDialog(item.id)
                                                }
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Confirm Deletion
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to
                                                    delete this item? This
                                                    action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={closeDialog}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={handleDelete}
                                                >
                                                    Delete
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
