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
import { useState } from "react";

export default function ProjectPartTable({
    projectParts,
    contract_id,
    project_id,
}) {
    const [selectedPart, setSelectedPart] = useState(null); // Track the selected part for deletion
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Track the dialog's open state

    const handleDelete = (partId) => {
        if (!partId) return; // Ensure the part ID is valid
        router.delete(
            `/contract/${contract_id}/project/${project_id}/part/${partId}/delete`
        );
        setSelectedPart(null); // Reset selected part after deletion
        setIsDialogOpen(false); // Close the dialog
    };

    const openDialog = (partId) => {
        setSelectedPart(partId); // Set the selected part ID
        setIsDialogOpen(true); // Open the dialog
    };

    const closeDialog = () => {
        setSelectedPart(null); // Reset selected part
        setIsDialogOpen(false); // Close the dialog
    };

    return (
        <div>
            <Table>
                <TableCaption>Project Parts</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {projectParts.map((projectPart) => (
                        <TableRow
                            key={"project-part-" + projectPart.id}
                            className="group cursor-pointer"
                        >
                            <TableCell
                                onClick={() =>
                                    (window.location.href = `/contract/${contract_id}/project/${project_id}/part/${projectPart.id}`)
                                }
                            >
                                {projectPart.description}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                    <AlertDialog open={isDialogOpen}>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click
                                                    openDialog(projectPart.id); // Open dialog with selected part ID
                                                }}
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
                                                    delete this project part?
                                                    This action cannot be
                                                    undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent row click
                                                        closeDialog(); // Close the dialog
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent row click
                                                        handleDelete(
                                                            selectedPart
                                                        ); // Delete the selected part
                                                    }}
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
