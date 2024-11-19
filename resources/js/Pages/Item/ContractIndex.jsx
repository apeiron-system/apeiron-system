import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import ContractHeader from "@/Components/contract/ContractHeader";
import ItemTabNavigation from "@/Components/item/ItemTabNavigation";
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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"; // Assuming you have a Modal component
import {
    FilterIcon,
    MoveRight,
    SearchIcon,
    SlidersHorizontalIcon,
    Trash2,
} from "lucide-react";

export default function Index({ auth, contract, items, filters }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("date_desc");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        router.get(
            route("item.contract", contract.id),
            { search: e.target.value, sort: sortOrder },
            { preserveState: true, replace: true }
        );
    };

    // Handle sort change
    const handleSortChange = (value) => {
        setSortOrder(value);
        router.get(
            route("item.contract", contract.id),
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

    // Handle Delete action
    const handleDelete = () => {
        setIsModalOpen(true);
    };

    // Confirm deletion
    const confirmDelete = () => {
        // Send a request to delete the selected items

        router.post(
            route("item.contract.destroy", contract.id),
            selectedItems,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSelectedItems([]); // Clear selection after deletion
                    setIsModalOpen(false); // Close modal
                },
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Item
                </h2>
            }
        >
            <Head title="View Items" />
            <ContractHeader contract={contract} />
            <div className="mt-4">
                <ItemTabNavigation contractId={contract.id} />
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
                    {/* Delete Button */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger
                            asChild
                            disabled={selectedItems.length === 0}
                        >
                            <Button
                                variant="outline"
                                onClick={handleDelete}
                                className="text-red-500 ml-auto"
                            >
                                <Trash2 className="mr-2" /> Delete
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Are you sure you want to delete the selected
                                    items?
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
                <div className="py-4 w-full">
                    {/* Table for Items */}
                    <Table className="w-full bg-white border border-gray-300">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="py-2 px-4 border-b">
                                    <input
                                        type="checkbox"
                                        onChange={(e) =>
                                            setSelectedItems(
                                                e.target.checked
                                                    ? items.data.map(
                                                          (item) => item.id
                                                      )
                                                    : []
                                            )
                                        }
                                        checked={
                                            selectedItems.length ===
                                            items.data.length
                                        }
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.data.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="hover:bg-gray-100"
                                >
                                    <TableCell className="py-2 px-4 border-b">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(
                                                item.id
                                            )}
                                            onChange={() =>
                                                handleCheckboxChange(item.id)
                                            }
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
                                                .unit_cost
                                                ? item.prices[
                                                      item.prices.length - 1
                                                  ].unit_cost
                                                : "N/A")}
                                    </TableCell>
                                    <TableCell className=" w-[10px] py-2 px-4">
                                        <Link
                                            href={`/item/contracts/${contract.id}/${item.id}`}
                                        >
                                            <Button variant="outline">
                                                <MoveRight className="text-gray-600" />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* Pagination Controls */}
                    <div className="mt-6 flex justify-end gap-3">
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
