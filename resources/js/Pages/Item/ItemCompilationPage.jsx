import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const ItemListPage = ({ items }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    return (
        <div className="flex">
            <aside className="w-64 bg-gray-800 text-white h-screen">
                <div className="p-4">
                    <div className="text-2xl font-bold">Apeiron Construction Solutions</div>
                    <nav className="mt-6">
                        <ul>
                            <li className="mt-2">
                                <Link to="/contract" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded">
                                    Contract
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link to="/job-order" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded">
                                    Job Order
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link to="/item" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded bg-gray-900">
                                    Item
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link to="/progress-report" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded">
                                    Progress Report
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="p-4">
                    <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
                        Log Out
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-6 bg-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-semibold">Item List</h1>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                                Create Item
                            </button>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Item Name</th>
                                    <th className="py-2 px-4 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b">{item}</td>
                                        <td className="py-2 px-4 border-b text-right relative">
                                            <button onClick={toggleDropdown} className="relative z-10 inline-flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h.01M12 12h.01M18 12h.01" />
                                                </svg>
                                            </button>
                                            {dropdownOpen && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                                                    <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                                        View
                                                    </button>
                                                    <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                                        Update
                                                    </button>
                                                    <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Example usage of the component with a list of items
const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item x", "Item xx", "Item xxx"];
const App = () => <ItemListPage items={items} />;

export default App;
