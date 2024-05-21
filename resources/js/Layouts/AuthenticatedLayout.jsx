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
} from "@/components/ui/dropdown-menu";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen flex">
            <nav className="w-64 bg-white border-r border-gray-100 px-4">
                <div className="h-16 flex items-center justify-center border-b border-gray-100">
                    <Link href="/">
                        <ApplicationLogo height={50} width={50} />
                    </Link>
                </div>
                <div className="flex flex-col ">
                    <div className="flex-grow pt-4 space-y-1">
                        <NavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </NavLink>
                        {/* Add more NavLinks here */}
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                        <div className="mt-3 space-y-1">
                            <div className="px-4"></div>

                            <DropdownMenu>
                                <DropdownMenuTrigger>
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
                                        <NavLink href={route("profile.edit")}>
                                            Profile
                                        </NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        {" "}
                                        <NavLink
                                            method="post"
                                            href={route("logout")}
                                            as="button"
                                        >
                                            Log Out
                                        </NavLink>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex-grow">
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}
