import { useState } from "react";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react"; // Import router
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/Components/ui/dialog"; // Ensure you have the Dialog component

export default function Show({ auth, item, contractId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        setIsModalOpen(true); // Open the modal
    };

    const confirmDelete = () => {
        // Call your delete API here with the selected itemId
        router.post(route("item.contract.destroy", contractId), [item.id]);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <Link href={`/item/contracts/${contractId}`}>
                        <Button variant="ghost" className="text-gray-500">
                            <ArrowLeft />
                        </Button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Item - {item.description}
                    </h2>
                </div>
            }
        >
            <Head title={item.description} />

            <section className=" w-full max-w-[1400px]">
                {/* Item Details */}
                <div className="flex gap-2">
                    {/* Delete Confirmation Modal */}
                    <Link
                        href={`/item/contracts/${contractId}/${item.id}/edit`}
                    >
                        <Button variant="outline">
                            <Pencil />
                        </Button>
                    </Link>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className="mb-2 text-red-600"
                                variant="outline"
                                onClick={handleDelete}
                            >
                                <Trash2 />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Are you sure you want to delete this item?
                                </DialogTitle>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    onClick={confirmDelete}
                                    className="bg-red-500 text-white"
                                >
                                    Confirm
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold">Item Details</h3>
                    <p>
                        <strong>Description:</strong> {item.description}
                    </p>
                    <p>
                        <strong>Type:</strong> {item.type}
                    </p>
                    <p>
                        <strong>Unit:</strong> {item.unit}
                    </p>
                </div>

                {/* Prices Table */}
                <h3 className="text-lg font-semibold mb-2">Prices</h3>
                <Table className="w-full bg-white border border-gray-300">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="py-2 px-4 border-b">
                                Date
                            </TableHead>
                            <TableHead className="py-2 px-4 border-b">
                                Unit Cost
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {item.prices.map((price) => (
                            <TableRow
                                key={price.id}
                                className="hover:bg-gray-100"
                            >
                                <TableCell className="py-2 px-4 border-b">
                                    {new Date(
                                        price.created_at
                                    ).toLocaleString()}
                                </TableCell>
                                <TableCell className="py-2 px-4 border-b">
                                    {price.unit_cost}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </AuthenticatedLayout>
    );
}
