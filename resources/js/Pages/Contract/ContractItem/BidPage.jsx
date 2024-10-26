import { useState } from "react";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft, Trash2 } from "lucide-react";
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

export default function BidPage({ auth, item, contractId, bids }) {
    const [formData, setFormData] = useState({
        bid_amount: "", // Initialize bid amount as empty
    });
    const [selectedBids, setSelectedBids] = useState([]); // Track selected bids

    // Handle input change for the bid amount
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission to store the bid
    const handleSubmit = (e) => {
        e.preventDefault();

        // Post the new bid to the backend route
        router.post(
            route("item.contract.bid.store", [contractId, item.id]), // Post bid to this route
            formData
        );
    };

    // Handle checkbox change for individual bid selection
    const handleCheckboxChange = (bidId) => {
        setSelectedBids((prevSelected) =>
            prevSelected.includes(bidId)
                ? prevSelected.filter((id) => id !== bidId)
                : [...prevSelected, bidId]
        );
    };

    // Handle the "select all" checkbox
    const handleSelectAll = () => {
        if (selectedBids.length === bids.length) {
            setSelectedBids([]); // Deselect all if already selected
        } else {
            setSelectedBids(bids.map((bid) => bid.id)); // Select all
        }
    };

    // Handle multiple bid deletion
    const handleDeleteSelected = () => {
        router.delete(
            route("item.contract.bids.delete", [contractId, item.id]),
            {
                data: { bidIds: selectedBids },
                onSuccess: () => setSelectedBids([]), // Clear selected bids on success
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <Link href={`/contracts/${contractId}/items`}>
                        <button className="text-gray-500">
                            <ArrowLeft />
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
                    {/* Bid Amount Field */}
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
                        <Button
                            type="submit"
                            className="bg-primary text-white"
                        >
                            Submit Bid
                        </Button>
                    </div>
                </form>

                {/* Bids Table */}
                <div className="flex justify-between pt-6">
                    <h3 className="mt-8 text-lg font-semibold">
                        Previous Bids
                    </h3>

                    {/* Delete Selected Bids Button */}
                    <div className="flex justify-end my-4">
                        <Button
                            variant="destructive"
                            onClick={handleDeleteSelected}
                            disabled={selectedBids.length === 0}
                        >
                            <Trash2 className="w-4 h-4 " />
                        </Button>
                    </div>
                </div>
                {bids.length > 0 ? (
                    <Table className="w-full bg-white border border-gray-300">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="py-2 px-4 border-b">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={
                                            selectedBids.length === bids.length
                                        }
                                    />
                                </TableHead>
                                <TableHead className="py-2 px-4 border-b">
                                    Bid Amount
                                </TableHead>
                                <TableHead className="py-2 px-4 border-b">
                                    Date Placed
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bids
                                .sort(
                                    (a, b) =>
                                        new Date(b.created_at) -
                                        new Date(a.created_at)
                                ) // Sort bids in descending order by date
                                .map((bid) => (
                                    <TableRow key={bid.id}>
                                        <TableCell className="py-4 px-4 border-b">
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
                                        <TableCell className="py-4 px-4 border-b">
                                            {parseFloat(bid.bid_amount).toFixed(
                                                2
                                            )}
                                        </TableCell>
                                        <TableCell className="py-4 px-4 border-b">
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
