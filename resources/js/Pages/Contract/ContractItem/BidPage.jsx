import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronLeft, Trash2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
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
    const [selectedDateRange, setSelectedDateRange] = useState("all");
    const [sortOrder, setSortOrder] = useState("desc");
    const [selectedBids, setSelectedBids] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Automatically apply filters whenever filter or sort order changes
    useEffect(() => {
        // Avoid re-triggering the effect unnecessarily
        router.get(
            route("contract.item.bid", [contractId, item.id]),
            {
                dateRange: selectedDateRange,
                sort: sortOrder,
            },
            { preserveState: true, replace: true } // Prevent URL changes from triggering re-renders
        );
    }, [selectedDateRange, sortOrder, contractId, item.id]);

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
                        Bid History - {item.description}
                    </h2>
                </div>
            }
        >
            <section className="py-4 w-full max-w-[600px]">
                <div className="flex justify-end gap-4 items-center">
                    {/* Date Filter */}
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex items-center gap-4">
                            {/* Date Filter */}
                            <Select
                                value={selectedDateRange}
                                onValueChange={(value) =>
                                    setSelectedDateRange(value)
                                }
                                defaultValue="all"
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Filter by Date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">
                                            All Time
                                        </SelectItem>
                                        <SelectItem value="today">
                                            Today
                                        </SelectItem>
                                        <SelectItem value="this_week">
                                            This Week
                                        </SelectItem>
                                        <SelectItem value="this_month">
                                            This Month
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {/* Sorting */}
                            <Select
                                value={sortOrder}
                                onValueChange={(value) => setSortOrder(value)}
                                defaultValue="desc"
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Sort Order" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="asc">
                                            Ascending
                                        </SelectItem>
                                        <SelectItem value="desc">
                                            Descending
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

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

                <h3 className="mt-8 text-lg font-semibold">Previous Bids</h3>

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
                            {bids.map((bid) => (
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
                                        {parseFloat(bid.bid_amount).toFixed(2)}
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
