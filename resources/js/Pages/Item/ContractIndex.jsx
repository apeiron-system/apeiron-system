import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import ContractHeader from "@/Componentss/contract/ContractHeader";
import ItemTabNavigation from "@/Componentss/item/ItemTabNavigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Index({ auth, contract, items, filters }) {
    console.log(filters);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("date_desc");

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
        console.log(value);
        setSortOrder(value);
        router.get(
            route("item.contract", contract.id),
            { search: searchQuery, sort: value },
            { preserveState: true, replace: true }
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

            <div className="py-12 w-full max-w-[1400px]">
                {/* Table for Items */}
                <Table className="w-full bg-white border border-gray-300">
                    <TableHeader>
                        <TableRow>
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
                                    {item.description}
                                </TableCell>
                                <TableCell className="py-2 px-4 border-b">
                                    {item.type}
                                </TableCell>
                                <TableCell className="py-2 px-4 border-b">
                                    {item.unit}
                                </TableCell>
                                <TableCell className="py-2 px-4 border-b">
                                    {item.prices
                                        ? item.prices[item.prices.length - 1]
                                              .unit_cost
                                        : "N/A"}
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
        </AuthenticatedLayout>
    );
}
