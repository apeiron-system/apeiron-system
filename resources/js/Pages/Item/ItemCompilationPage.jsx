import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function ItemPage({ auth }) {
    const itemListData = [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
        "Item 7",
        "Item 8",
        "Item 9",
        "Item x",
        "Item xx",
        "Item xxx",
    ];

    const [showDropdown, setShowDropdown] = useState(null);

    const handleDropdownToggle = (index) => {
        setShowDropdown(showDropdown === index ? null : index);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <Link href={route("dashboard")} className="text-gray-600 hover:text-gray-900 mr-4">
                        <button>
                            <ChevronLeft size={25} strokeWidth={1.25} />
                        </button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Item List
                    </h2>
                </div>
            }
        >
            <Head title="Item List" />

            <div className="mb-4 flex justify-between">
                <input
                    type="text"
                    placeholder="Search"
                    clas
