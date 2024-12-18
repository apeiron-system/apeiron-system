import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import {
    LayoutDashboard,
    LineChart,
    LogOut,
    NotebookPen,
    ScrollText,
    ShoppingBasket,
    User,
    Users,
} from "lucide-react";
import { useState } from "react";

// Permissions Enum
const PermissionsEnum = {
    CONTRACT_MANAGEMENT: "contract_management",
    EMPLOYEE_MANAGEMENT: "employee_management",
    JOB_ORDER_MANAGEMENT: "job_order_management",
    ITEM_MANAGEMENT: "item_management",
    PROGRESS_REPORT_MANAGEMENT: "progress_report_management",
};

// Helper function to check if the user has a specific permission
function hasPermission(user, permission) {
    return (
        user?.permissions?.includes(permission) || user.roles.includes("admin")
    );
}

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Safely handle the current route with optional chaining and a fallback
    const currentRoute = route && route().current ? route().current() : null;

    return (
        <div className="min-h-screen flex">
            <nav className="w-52 bg-white border-r border-gray-100 px-4">
                <div className="flex items-center justify-center border-b border-gray-100 gap-2 p-2">
                    <ApplicationLogo height={50} width={50} />
                    <div className="font-bold text-sm">
                        Apeiron Construction Solutions
                    </div>
                </div>
                <div className="flex flex-col ">
                    <div className="flex-grow pt-4 space-y-1">
                        <NavLink
                            href={route("dashboard")}
                            active={currentRoute === "dashboard"}
                        >
                            <LayoutDashboard className="mr-2" /> Dashboard
                        </NavLink>
                        <NavLink
                            href={
                                hasPermission(
                                    user,
                                    PermissionsEnum.CONTRACT_MANAGEMENT
                                )
                                    ? route("contract")
                                    : "#"
                            }
                            active={currentRoute?.startsWith("contract")}
                            className={
                                !hasPermission(
                                    user,
                                    PermissionsEnum.CONTRACT_MANAGEMENT
                                )
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        >
                            <ScrollText className="mr-2" /> Contract
                        </NavLink>
                        <NavLink
                            href={
                                hasPermission(
                                    user,
                                    PermissionsEnum.JOB_ORDER_MANAGEMENT
                                )
                                    ? route("job-order-contracts")
                                    : "#"
                            }
                            active={currentRoute === "job-order-contracts"}
                            className={
                                !hasPermission(
                                    user,
                                    PermissionsEnum.JOB_ORDER_MANAGEMENT
                                )
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        >
                            <NotebookPen className="mr-2" /> Job Order
                        </NavLink>
                        <NavLink
                            href={
                                hasPermission(
                                    user,
                                    PermissionsEnum.ITEM_MANAGEMENT
                                )
                                    ? route("item")
                                    : "#"
                            }
                            active={currentRoute?.startsWith("item")}
                            className={
                                !hasPermission(
                                    user,
                                    PermissionsEnum.ITEM_MANAGEMENT
                                )
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        >
                            <ShoppingBasket className="mr-2" /> Item Management
                        </NavLink>
                        <NavLink
                            href={
                                hasPermission(
                                    user,
                                    PermissionsEnum.PROGRESS_REPORT_MANAGEMENT
                                )
                                    ? route("progress-report")
                                    : "#"
                            }
                            active={currentRoute === "progress-report"}
                            className={
                                !hasPermission(
                                    user,
                                    PermissionsEnum.PROGRESS_REPORT_MANAGEMENT
                                )
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        >
                            <LineChart className="mr-2" /> Progress Report
                        </NavLink>
                        <NavLink
                            href={
                                hasPermission(
                                    user,
                                    PermissionsEnum.EMPLOYEE_MANAGEMENT
                                )
                                    ? route("employees")
                                    : "#"
                            }
                            active={currentRoute?.startsWith("employee")}
                            className={
                                !hasPermission(
                                    user,
                                    PermissionsEnum.EMPLOYEE_MANAGEMENT
                                )
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        >
                            <Users className="mr-2" /> Employees
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

            <div className="flex-grow">
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}
