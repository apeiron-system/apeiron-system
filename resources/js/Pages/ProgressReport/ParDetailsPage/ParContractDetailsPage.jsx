import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

export default function ParContractDetails({
    auth,
    progressReport,
    contract,
    project,
    employees,
    items,
    bids,
}) {
    const [activeTab, setActiveTab] = useState("boq");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [accomplishments, setAccomplishments] = useState([]);

    const formatDate = (date) => {
        const parsedDate = new Date(date);
        return parsedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Function to get employee name
    const getEmployeeName = (employeeId) => {
        const employee = employees.find((emp) => emp.id === employeeId);
        return employee
            ? `${employee.first_name} ${employee.last_name}`
            : "N/A";
    };

    // Function to fetch the latest bid amount for an item
    const getLatestBid = (itemId, contractId) => {
        const latestBid = bids
            .filter(
                (bid) =>
                    bid.item_id === itemId && bid.contract_id === contractId
            )
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
        return latestBid?.bid_amount || 0; // Default to 0 if no bid found
    };

    // Function to calculate Amount (Php)
    const calculateAmount = (quantity, unitCost) => {
        return quantity * unitCost;
    };

    // Function to calculate Weight %
    const calculateWeightPercentage = (amount, totalAmount) => {
        return totalAmount > 0
            ? ((amount / totalAmount) * 100).toFixed(2)
            : "0.00";
    };

    // Calculate the total amount for all items
    const getTotalAmount = () => {
        return items.reduce((sum, item) => {
            const unitCost = getLatestBid(item.id, item.contract_id);
            const amount = calculateAmount(item.quantity || 0, unitCost);
            return sum + amount;
        }, 0);
    };

    const totalAmount = getTotalAmount(); // Compute total amount for all items

    // Initialize form using Inertia's useForm hook
    const { data, setData, post, reset } = useForm({
        accomplishment_report_id: progressReport.id,
        contract_part_id: contract.id,
        pay_item_no: null,
        quantity_this_period: "",
        amount_this_period: "",
        to_date_weight_percent: "",
        balance_weight_percent: "",
        remarks: "",
    });

    const fetchAccomplishments = async () => {
        try {
            const response = await fetch(
                `/progress-report/contracts/${contract.id}/project/${project.id}/report/${progressReport.id}/accomplishments`
            );
            if (response.ok) {
                const data = await response.json();
                setAccomplishments(data);
            } else {
                console.error(
                    "Failed to fetch accomplishments:",
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Error fetching accomplishments:", error);
        }
    };

    useEffect(() => {
        fetchAccomplishments(); // Fetch data on initial load
    }, []);

    // Function to open the modal with the selected item's data
    const handleEdit = (item) => {
        const existingAccomplishment = accomplishments.find(
            (accom) => accom.pay_item_no === item.id
        );

        setCurrentItem(item);
        setData({
            accomplishment_report_id: progressReport.id,
            contract_part_id: contract.id,
            pay_item_no: item.id,
            quantity_this_period:
                existingAccomplishment?.quantity_this_period || "",
            amount_this_period:
                existingAccomplishment?.amount_this_period || "",
            to_date_weight_percent:
                existingAccomplishment?.to_date_weight_percent || "",
            balance_weight_percent:
                existingAccomplishment?.balance_weight_percent || "",
            remarks: existingAccomplishment?.remarks || "",
        });
        setIsModalOpen(true);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        post(`/progress-report/contracts/${contract.id}/project/${project.id}/report/${progressReport.id}/edit`, {
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
                fetchAccomplishments(); // Refresh the table after saving
            },
        });
    };

    // Merge accomplishments data with items
    const mergedItems = items.map((item) => {
        const accomplishment = accomplishments.find(
            (accom) => accom.pay_item_no === item.id
        );
        return {
            ...item,
            ...accomplishment, // Merge accomplishment data if it exists
        };
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center space-x-2">
                    <button onClick={() => window.history.back()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <h2 className="font-bold text-xl text-gray-900">
                        Progress Accomplishment Report Details
                    </h2>
                </div>
            }
        >
            <Head title="PAR Details" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">{project.project_name}</h1>
                <p>
                    <strong>Contract:</strong> {contract.description}
                </p>
                <p>
                    <strong>Location:</strong> {contract.location}
                </p>
                <p>
                    <strong>Status:</strong> {contract.status}
                </p>
                <p>
                    <strong>Date:</strong>{" "}
                    {formatDate(progressReport.created_at)}
                </p>

                {/* Tabs */}
                <div className="mt-6">
                    <div className="border-b flex space-x-4">
                        <button
                            className={`pb-2 ${
                                activeTab === "boq"
                                    ? "border-b-2 border-blue-600"
                                    : ""
                            }`}
                            onClick={() => setActiveTab("boq")}
                        >
                            Bill of Quantities
                        </button>
                        <button
                            className={`pb-2 ${
                                activeTab === "accom"
                                    ? "border-b-2 border-blue-600"
                                    : ""
                            }`}
                            onClick={() => setActiveTab("accom")}
                        >
                            Accomplishments
                        </button>
                    </div>

                    {/* Bill of Quantities Tab */}
                    {activeTab === "boq" && (
                        <div className="mt-4">
                            <Table className="table-auto w-full text-sm border border-gray-300">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="px-4 py-2 text-center">
                                            Item
                                        </TableHead>
                                        <TableHead className="px-4 py-2 text-center">
                                            Description
                                        </TableHead>
                                        <TableHead className="px-4 py-2 text-center">
                                            Type
                                        </TableHead>
                                        <TableHead className="px-4 py-2 text-center">
                                            Unit
                                        </TableHead>
                                        <TableHead className="px-4 py-2 text-center">
                                            Quantity
                                        </TableHead>
                                        <TableHead className="px-4 py-2 text-center">
                                            Unit Cost (Php)
                                        </TableHead>
                                        <TableHead className="px-4 py-2 text-center">
                                            Amount (Php)
                                        </TableHead>
                                        <TableHead className="px-4 py-2 text-center">
                                            Weight %
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.map((item, index) => {
                                        const unitCost = getLatestBid(
                                            item.id,
                                            item.contract_id
                                        );
                                        const amount = calculateAmount(
                                            item.quantity || 0,
                                            unitCost
                                        );
                                        const weightPercentage =
                                            calculateWeightPercentage(
                                                amount,
                                                totalAmount
                                            );

                                        return (
                                            <TableRow
                                                key={index}
                                                className="hover:bg-gray-100"
                                            >
                                                <TableCell className="px-4 py-2 text-center">
                                                    {item.id}
                                                </TableCell>
                                                <TableCell className="px-4 py-2 text-center">
                                                    {item.description}
                                                </TableCell>
                                                <TableCell className="px-4 py-2 text-center">
                                                    {item.type}
                                                </TableCell>
                                                <TableCell className="px-4 py-2 text-center">
                                                    {item.unit}
                                                </TableCell>
                                                <TableCell className="px-4 py-2 text-center">
                                                    {item.quantity}
                                                </TableCell>
                                                <TableCell className="px-4 py-2 text-center">
                                                    {unitCost.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="px-4 py-2 text-center">
                                                    {amount.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="px-4 py-2 text-center">
                                                    {weightPercentage} %
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {/* Accomplishment Tab */}
                    {activeTab === "accom" && (
                        <div className="mt-4">
                            <Table className="w-full table-auto border-collapse border border-gray-300 text-sm">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="px-4 py-2 text-center">
                                            ITEM
                                        </TableHead>
                                        <TableHead className="px-4 py-2 text-center">
                                            QUANTITY THIS PERIOD
                                        </TableHead>
                                        <TableHead className="px-4 py-2 text-center">
                                            AMOUNT THIS PERIOD
                                        </TableHead>
                                        <TableHead className="px-4 py-2 text-center">
                                            TO DATE WEIGHT %
                                        </TableHead>
                                        <TableHead className="px-4 py-2 text-center">
                                            BALANCE WEIGHT %
                                        </TableHead>
                                        <TableHead className="px-4 py-2 text-center">
                                            REMARKS
                                        </TableHead>
                                        <TableHead className="px-4 py-2 text-center">
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mergedItems.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="px-4 py-2 text-center">
                                                {item.description}
                                            </TableCell>
                                            <TableCell className="px-4 py-2 text-center">
                                                {item.quantity_this_period ||
                                                    ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-2 text-center">
                                                {item.amount_this_period || ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-2 text-center">
                                                {item.to_date_weight_percent ||
                                                    ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-2 text-center">
                                                {item.balance_weight_percent ||
                                                    ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-2 text-center">
                                                {item.remarks || ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-2 text-center">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                    className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 p-2 rounded-full hover:bg-gray-200"
                                                >
                                                     <svg
                                                        class="feather feather-edit"
                                                        fill="none"
                                                        height="16"
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        viewBox="0 0 24 24"
                                                        width="16"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>

                {/* Popup Form */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-1/2">
                            <h2 className="text-lg font-bold mb-4">
                                Edit Accomplishment for{" "}
                                {currentItem?.description}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label>Quantity This Period</label>
                                        <input
                                            type="number"
                                            value={data.quantity_this_period}
                                            onChange={(e) =>
                                                setData(
                                                    "quantity_this_period",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label>Amount This Period</label>
                                        <input
                                            type="number"
                                            value={data.amount_this_period}
                                            onChange={(e) =>
                                                setData(
                                                    "amount_this_period",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label>To Date Weight %</label>
                                        <input
                                            type="number"
                                            value={data.to_date_weight_percent}
                                            onChange={(e) =>
                                                setData(
                                                    "to_date_weight_percent",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label>Balance Weight %</label>
                                        <input
                                            type="number"
                                            value={data.balance_weight_percent}
                                            onChange={(e) =>
                                                setData(
                                                    "balance_weight_percent",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label>Remarks</label>
                                        <textarea
                                            value={data.remarks}
                                            onChange={(e) =>
                                                setData(
                                                    "remarks",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="mr-2 px-4 py-2 border border-black text-black rounded hover:bg-gray-300 transition duration-150"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-150"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Authorized Representatives */}
                <div className="mt-10">
                    <h3 className="text-lg font-bold mb-4">
                        Authorized Representatives:
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <strong>Prepared by:</strong>{" "}
                            {getEmployeeName(
                                progressReport?.prepared_by_employee_id
                            )}
                        </div>
                        <div>
                            <strong>Reviewed by:</strong>{" "}
                            {getEmployeeName(
                                progressReport?.reviewed_by_employee_id
                            )}
                        </div>
                        <div>
                            <strong>Checked by:</strong>{" "}
                            {getEmployeeName(
                                progressReport?.checked_by_employee_id
                            )}
                        </div>
                        <div>
                            <strong>Approved by:</strong>{" "}
                            {getEmployeeName(
                                progressReport?.approved_by_employee_id
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
