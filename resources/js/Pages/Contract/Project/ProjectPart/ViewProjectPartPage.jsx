import React, { useState } from "react";
import axios from "axios"; // Ensure axios is imported
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import ProjectPartItemTable from "@/Components/contract/project/ProjectPart/ProjectPartItem/ProjectPartItemTable";
import AddProjectPartItemModal from "@/Components/contract/project/ProjectPart/ProjectPartItem/AddProjectPartItemModal";
import { Link, router } from "@inertiajs/react";
import { ChevronLeft, Plus, Edit, Trash } from "lucide-react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/Components/ui/alert-dialog";

export default function ViewProjectPartPage({
    auth,
    contract,
    project,
    projectParts,
    materials,
    labor,
    equipment,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [modalData, setModalData] = useState([]); // Define modalData state

    const [selectedPart, setSelectedPart] = useState(null); // Track the selected part for deletion
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Track the dialog's open state

    const handleDelete = (partId) => {
        if (!partId) return; // Ensure the part ID is valid
        router.delete(
            `/contract/${contract.id}/project/${project.id}/part/${partId}/delete`
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

    const openModal = async (type) => {
        try {
            const response = await axios.get(
                `/contract/${contract.id}/project/${project.id}/part/${projectParts.id}/item`
            ); // Fetch all items related to the contract

            // Log the response to verify the data structure
            console.log("Fetched items:", response.data);

            // Filter items based on the selected type
            const filteredItems = response.data.filter(
                (item) => item.type === type
            );
            console.log("Filtered items:", filteredItems);

            setModalData(filteredItems); // Set the filtered items in the state
            setSelectedType(type);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Failed to fetch items:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        window.location.reload(); // Basic way to refresh; can be optimized for better UX
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center w-full justify-between">
                        <div className="flex gap-2">
                            {" "}
                            <Link
                                href={`/contract/${contract.id}/project/${project.id}/`}
                            >
                                <button className="text-gray-500">
                                    <ChevronLeft />
                                </button>
                            </Link>
                            <h2>Project Part - {projectParts.description}</h2>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Link
                                    href={`/contract/${contract.id}/project/${project.id}/part/${projectParts.id}/edit`}
                                >
                                    <Edit />
                                </Link>
                            </Button>
                            <div>
                                <AlertDialog open={isDialogOpen}>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent row click
                                                openDialog(projectParts.id); // Open dialog with selected part ID
                                            }}
                                        >
                                            <Trash />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Confirm Deletion
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete
                                                this project part? This action
                                                cannot be undone.
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
                                                    handleDelete(selectedPart); // Delete the selected part
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <section className="mt-6 max-w-7xl">
                <div className="flex flex-col space-y-14">
                    {/* Materials Table */}
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">Materials</h3>
                            <Button onClick={() => openModal("material")}>
                                <Plus />
                            </Button>
                        </div>

                        <ProjectPartItemTable
                            type="material"
                            items={materials}
                            contract_id={contract.id}
                            project_id={project.id}
                            project_part_id={projectParts.id}
                        />
                    </div>

                    <div>
                        {/* Labor Table */}
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">Labor</h3>
                            <Button onClick={() => openModal("labor")}>
                                <Plus />
                            </Button>
                        </div>

                        <ProjectPartItemTable
                            type="labor"
                            items={labor}
                            contract_id={contract.id}
                            project_id={project.id}
                            project_part_id={projectParts.id}
                        />
                    </div>

                    <div>
                        {/* Equipment Table */}
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">Equipment</h3>
                            <Button
                                className=""
                                onClick={() => openModal("equipment")}
                            >
                                <Plus />
                            </Button>
                        </div>

                        <ProjectPartItemTable
                            type="equipment"
                            items={equipment}
                            contract_id={contract.id}
                            project_id={project.id}
                            project_part_id={projectParts.id}
                        />
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <AddProjectPartItemModal
                        onClose={closeModal}
                        items={modalData}
                        type={selectedType}
                        contract_id={contract.id} // Pass contract ID
                        project_id={project.id} // Pass project ID
                        project_part_id={projectParts.id} // Pass project part ID
                    />
                )}
            </section>
        </AuthenticatedLayout>
    );
}
