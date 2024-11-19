import { useState } from "react";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronLeft, Trash2 } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/Components/ui/alert-dialog";

export default function BidPage({ auth, item, contractId, bids }) {
    const [formData, setFormData] = useState({
        bid_amount: "",
    });
    const [selectedBids, setSelectedBids] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(
            route("item.contract.bid.store", [contractId, item.id]),
            formData
        );
    };

    const handleCheckboxChange = (bidId) => {
        setSelectedBids((prevSelected) =>
            prevSelected.includes(bidId)
                ? prevSelected.filter((id) => id !== bidId)
                : [...prevSelected, bidId]
        );
    };

    const handleSelectAll = () => {
        if (selectedBids.length === bids.length) {
            setSelectedBids([]);
        } else {
            setSelectedBids(bids.map((bid) => bid.id));
        }
    };

    const handleDeleteSelected = () => {
        router.delete(
            route("item.contract.bids.delete", [contractId, item.id]),
            {
                data: { bidIds: selectedBids },
                onSuccess: () => setSelectedBids([]),
            }
        );
        setIsDialogOpen(false); // Close the dialog after deletion
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <Link href={`/contracts/${contractId}/items`}>
                        <button className="text-gray-500">
                            <ChevronLeft />
                        </button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Place Bid - {item.description}
                    </h2>
                </div>
            }
        >
            <Head title={`Place Bid on ${item.description}`} />

            <section className="py-4 w-full max-w-[600px]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Bid Amount</Label>
                        <Input
                            type="number"
                            name="bid_amount"
                            value={formData.bid_amount}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" className="bg-primary text-white">
                            Submit Bid
                        </Button>
                    </div>
                </form>

                <div className="flex justify-between pt-6">
                    <h3 className="mt-8 text-lg font-semibold">
                        Previous Bids
                    </h3>

                    <AlertDialog open={isDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                onClick={() => setIsDialogOpen(true)}
                                disabled={selectedBids.length === 0}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Confirm Deletion
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete the selected
                                    bids? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDeleteSelected}
                                >
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                {bids.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={
                                            selectedBids.length === bids.length
                                        }
                                    />
                                </TableHead>
                                <TableHead>Bid Amount</TableHead>
                                <TableHead>Date Placed</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bids
                                .sort(
                                    (a, b) =>
                                        new Date(b.created_at) -
                                        new Date(a.created_at)
                                )
                                .map((bid) => (
                                    <TableRow key={bid.id}>
                                        <TableCell>
                                            <input
                                                type="checkbox"
                                                checked={selectedBids.includes(
                                                    bid.id
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChange(bid.id)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {parseFloat(bid.bid_amount).toFixed(
                                                2
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                bid.created_at
                                            ).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="mt-4 text-gray-600">
                        No bids have been placed yet.
                    </p>
                )}
            </section>
        </AuthenticatedLayout>
    );
}
