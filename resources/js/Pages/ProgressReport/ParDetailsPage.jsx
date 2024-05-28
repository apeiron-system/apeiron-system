import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ParDetailsPage({ auth }) {
    const contracts = [
        { id: 1, description: 'Contract 1 Description', date: '2023/05/01', checkedBy: 'Alice', reviewedBy: 'Bob', approvedBy: 'Charlie', preparedBy: 'Dave', totalSteps: 4, completedSteps: 2 },
        { id: 2, description: 'Contract 2 Description', date: '2023/05/02', checkedBy: 'Alice', reviewedBy: 'Bob', approvedBy: 'Charlie', preparedBy: 'Dave', totalSteps: 4, completedSteps: 3 },
        { id: 3, description: 'Contract 3 Description', date: '2023/05/03', checkedBy: 'Alice', reviewedBy: 'Bob', approvedBy: 'Charlie', preparedBy: 'Dave', totalSteps: 4, completedSteps: 1 },
        { id: 4, description: 'Contract 4 Description', date: '2023/05/04', checkedBy: 'Alice', reviewedBy: 'Bob', approvedBy: 'Charlie', preparedBy: 'Dave', totalSteps: 4, completedSteps: 4 },
        { id: 5, description: 'Contract 5 Description', date: '2023/05/05', checkedBy: 'Alice', reviewedBy: 'Bob', approvedBy: 'Charlie', preparedBy: 'Dave', totalSteps: 4, completedSteps: 2 },
    ];
    const [showOptions, setShowOptions] = useState(contracts.reduce((acc, contract) => {
        acc[contract.id] = false;
        return acc;
    }, {}));

    const [selectedDate, setSelectedDate] = useState(new Date());

    const toggleOptions = (id) => {
        setShowOptions(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    // Progress percentages for demonstration purposes
    const progressPercentages = [20, 40, 60, 80, 100];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Progress Report
                </h2>
            }
        >
            <Head title="Progress Report" />

            <div className="flex h-full">
            <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Progress Accomplishment Details Page</h1>
                        <div className="relative inline-block text-left">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="yyyy/MM/dd"
                                customInput={
                                    <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        {selectedDate.toLocaleDateString('en-CA')}
                                        <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                }
                                popperClassName="date-picker-popper"
                            />
                        </div>
                    </div>
                    {contracts.map((contract, index) => (
                        <div key={contract.id} className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">{contract.description}</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b border-gray-200">
                                                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600"/>
                                            </th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Description</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Date</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Checked By</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Reviewed By</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Approved By</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left">Prepared By</th>
                                            <th className="px-4 py-2 border-b border-gray-200 text-left relative">
                                                <button onClick={() => toggleOptions(contract.id)} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    ⋮
                                                </button>
                                                {showOptions[contract.id] && (
                                                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View</a>
                                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Delete</a>
                                                        </div>
                                                    </div>
                                                )}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200">{contract.description}</td>
                                            <td className="px-4 py-2 border-b border-gray-200">{contract.date}</td>
                                            <td className="px-4 py-2 border-b border-gray-200">{contract.checkedBy}</td>
                                            <td className="px-4 py-2 border-b border-gray-200">{contract.reviewedBy}</td>
                                            <td className="px-4 py-2 border-b border-gray-200">{contract.approvedBy}</td>
                                            <td className="px-4 py-2 border-b border-gray-200">{contract.preparedBy}</td>
                                            <td className="px-4 py-2 border-b border-gray-200"></td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center mt-4">
                                <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(contract.completedSteps / contract.totalSteps) * 100}%` }}></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-600">Progress</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}