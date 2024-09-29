import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none w-full px-4 " +
                (active
                    ? "text-[#0C7FDA] bg-[#E9F5FE]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ") +
                className
            }
        >
            {children}
        </Link>
    );
}
