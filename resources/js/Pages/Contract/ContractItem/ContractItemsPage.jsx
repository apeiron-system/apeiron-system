import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import ContractItemHeader from "@/Components/contract/contractitem/ContractItemHeader";
import ProjectTabNavigation from "@/Components/contract/project/ProjectTabNavigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { useState } from "react";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button"; // Assuming you have a Button component
import { SlidersHorizontalIcon, History } from "lucide-react";

export default function Index({
    auth,
    contract,
    items,
    filters,
    signingAuthorityEmployee,
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("date_desc");
    const [selectedItems, setSelectedItems] = useState([]);

    const [bids, setBids] = useState({}); // Store bid amounts for each item

    const handleInputChange = (e, itemId) => {
        setBids({
            ...bids,
            [itemId]: e.target.value, // Update bid amount for the specific item
        });
    };

    const handleSubmitBid = (itemId) => {
        const bidAmount = bids[itemId];
        if (bidAmount) {
            // Send the bid to the server
            router.post(`/contracts/${contract.id}/items/${itemId}/bid`, {
                bid_amount: bidAmount,
            });
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        router.get(
            `/contracts/${contract.id}/items`, // Explicit route
            { search: e.target.value, sort: sortOrder },
            { preserveState: true, replace: true }
        );
    };

    // Handle sort change
    const handleSortChange = (value) => {
        setSortOrder(value);
        router.get(
            `/contracts/${contract.id}/items`, // Explicit route
            { search: searchQuery, sort: value },
            { preserveState: true, replace: true }
        );
    };

    // Toggle item selection
    const handleCheckboxChange = (itemId) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(itemId)
                ? prevSelected.filter((id) => id !== itemId)
                : [...prevSelected, itemId]
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <ContractItemHeader
                    contract={contract}
                    signingAuthorityEmployee={signingAuthorityEmployee}
                />
            }
        >
            <Head title="View Items" />

            <div className="flex justify-between m-">
                <ProjectTabNavigation id={contract.id} />
            </div>

            {/* Search and Sort Controls */}
            <section className=" max-w-[1400px]">
                <div className="flex items-center my-4 gap-4">
                    {/* Search */}
                    <Input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="px-4 py-2 border rounded-md w-full max-w-sm"
                    />
                    {/* Sort Options */}
                    <Select
                        className="px-4 py-2 border rounded-md ml-4 w-[200px]"
                        onValueChange={handleSortChange}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SlidersHorizontalIcon />
                            <SelectValue
                                placeholder="Newest First"
                                value={sortOrder}
                                defaultValue={sortOrder}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="date_desc">
                                    Newest First
                                </SelectItem>
                                <SelectItem value="date_asc">
                                    Oldest First
                                </SelectItem>
                                <SelectItem value="az">A-Z</SelectItem>
                                <SelectItem value="za">Z-A</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="py-4 w-full">
                    {/* Table for Items */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">
                                    Description
                                </TableHead>
                                <TableHead className="text-center">
                                    Type
                                </TableHead>
                                <TableHead className="text-center">
                                    Unit
                                </TableHead>
                                <TableHead className="text-center">
                                    Latest Price
                                </TableHead>
                                <TableHead className="text-center">
                                    Bid Price
                                </TableHead>
                                <TableHead className="text-center">
                                    Action{" "}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-center">
                            {items.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.unit}</TableCell>
                                    <TableCell>
                                        {item.prices.length !== 0 &&
                                            (item.prices[item.prices.length - 1]
                                                .unit_cost
                                                ? parseFloat(
                                                      item.prices[
                                                          item.prices.length - 1
                                                      ].unit_cost
                                                  ).toFixed(2)
                                                : "N/A")}
                                    </TableCell>

                                    {/* Bid Column */}
                                    <TableCell>
                                        {/* Display the latest bid if available */}
                                        {item.bids?.length > 0
                                            ? item.bids[item.bids.length - 1]
                                                  .bid_amount
                                            : "No Bids"}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center justify-center gap-2">
                                            <Input
                                                type="number"
                                                placeholder="Enter bid"
                                                value={bids[item.id] || ""}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        item.id
                                                    )
                                                }
                                                className="w-28"
                                            />
                                            <Button
                                                variant="default"
                                                onClick={() =>
                                                    handleSubmitBid(item.id)
                                                }
                                            >
                                                Submit
                                            </Button>
                                            {/* History */}
                                            <Link
                                                href={`/contracts/${contract.id}/items/${item.id}/bid`}
                                            >
                                                <Button variant="outline">
                                                    <History></History>
                                                </Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* Pagination Controls */}
                    <div className="mt-6 flex  gap-3">
                        {items.links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url || "#"}
                                className={`px-4 py-2 border rounded-md ${
                                    link.active
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-500"
                                }`}
                                aria-disabled={!link.url}
                            >
                                {link.label
                                    .replaceAll("&laquo;", "")
                                    .replaceAll("&raquo;", "")}
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
