import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    LayoutDashboard,
    LineChart,
    LogOut,
    NotebookPen,
    ScrollText,
    ShoppingBasket,
    User,
} from "lucide-react";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen flex">
            {/* Fixed Sidebar */}
            <nav className="w-52 bg-white border-r border-gray-100 px-4 fixed h-full">
                <div className="flex items-center justify-center border-b border-gray-100 gap-2 p-2">
                    <ApplicationLogo height={50} width={50} />
                    <div className="font-bold text-sm">
                        Apeiron Construction Solutions
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex-grow pt-4 space-y-1">
                        <NavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            <LayoutDashboard className="mr-2" /> Dashboard
                        </NavLink>
                        <NavLink
                            href={route("contract")}
                            active={route().current("contract")}
                        >
                            <ScrollText className="mr-2" /> Contract
                        </NavLink>
                        <NavLink
                            href={route("job-order-contracts")}
                            active={route().current("job-order-contracts")}
                        >
                            <NotebookPen className="mr-2" /> Job Order
                        </NavLink>
                        <NavLink
                            href={route("item")}
                            active={route().current("item")}
                        >
                            <ShoppingBasket className="mr-2" /> Item
                        </NavLink>
                        <NavLink
                            href={route("progress-report")}
                            active={route().current("progress-report")}
                        >
                            <LineChart className="mr-2" /> Progress Report
                        </NavLink>

                        {/* Add more NavLinks here */}
                    </div>

                    <div className="mt-3 border-t text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-full p-2 hover:bg-slate-100">
                                <div className="font-medium text-base text-gray-800">
                                    {user.name}
                                </div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    <div className="font-medium text-sm text-gray-500">
                                        {user.email}
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <Link
                                        href={route("profile.edit")}
                                        className="w-full flex gap-2 items-center"
                                    >
                                        <User /> Profile
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link
                                        className="w-full flex gap-2 items-center"
                                        method="post"
                                        href={route("logout")}
                                    >
                                        <LogOut /> Log Out
                                    </Link>
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>

            {/* Main Content with left margin to prevent overlap with the fixed sidebar */}
            <div className="flex-grow ml-52">
                {header && (
                    <header className="ml-52 bg-white shadow fixed top-0 left-0 right-0 z-20">
                        <div className="max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="px-20 py-4 mt-20">{children}</main>
            </div>
        </div>
    );
}
