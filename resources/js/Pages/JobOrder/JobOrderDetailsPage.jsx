import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import Modal from "@/Components/Modal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ChevronLeft, FileDown } from "lucide-react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import * as XLSX from 'xlsx';

export default function JobOrderDetailsPage({ auth, jobOrder }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        project_desc: "Project A",
        jo_name: "Job Order A1",
        contract_name: "Active Contract 1",
        location: "Panabo City",
        itemWorks: "Labor",
        periodCovered: "2022-2026",
        supplier: "Name of Supplier",
        dateNeeded: "2022-2026",
        status: "on-going",
        progress: 40,
    });

    const [BoQParts, setBoQParts] = useState({
        "Part A": [
            { itemNo: "001", description: "Excavation", unit: "sq.m", quantity: 50, unitCost: 200, amount: 10000, weight: 10 },
            { itemNo: "002", description: "Concrete Pouring", unit: "cu.m", quantity: 30, unitCost: 250, amount: 7500, weight: 15 },
        ],
        "Part B": [
            { itemNo: "003", description: "Steel Rebar", unit: "kg", quantity: 100, unitCost: 150, amount: 15000, weight: 20 },
            { itemNo: "004", description: "Formwork", unit: "sq.m", quantity: 40, unitCost: 180, amount: 7200, weight: 25 },
        ],
        "Part C": [
            { itemNo: "005", description: "Labor", unit: "hours", quantity: 200, unitCost: 120, amount: 24000, weight: 30 },
            { itemNo: "006", description: "Electrical Wiring", unit: "m", quantity: 500, unitCost: 50, amount: 25000, weight: 20 },
        ],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const getProgressBarColor = (progress) => {
        if (progress >= 100) return "bg-green-500";
        if (progress >= 50) return "bg-yellow-500";
        return "bg-red-500";
    };

    const calculateGrandTotal = () => {
        return Object.values(BoQParts).reduce((total, part) => {
            return total + part.reduce((subtotal, item) => subtotal + item.amount, 0);
        }, 0);
    };

    const addDummyPayItem = (part) => {
        setBoQParts((prevBoQParts) => ({
            ...prevBoQParts,
            [part]: [
                ...prevBoQParts[part],
                {
                    itemNo: `00${prevBoQParts[part].length + 1}`,
                    description: "New Dummy Item",
                    unit: "pcs",
                    quantity: 1,
                    unitCost: 100,
                    amount: 100,
                    weight: 0,
                },
            ],
        }));
    };

    const exportToExcel = () => {
        // Create workbook
        const wb = XLSX.utils.book_new();
        
        // Set column widths
        const defaultColWidth = [
            { wch: 15 }, // Default width for columns
            { wch: 40 }, // Description column wider
            { wch: 10 }, // Unit
            { wch: 12 }, // Quantity
            { wch: 15 }, // Unit Cost
            { wch: 15 }, // Amount
            { wch: 12 }  // Weight
        ];
    
        // Styles for cells
        const headerStyle = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4F46E5" } }, // Indigo color
            alignment: { horizontal: "center", vertical: "center" },
            border: {
                top: { style: "thin" },
                right: { style: "thin" },
                bottom: { style: "thin" },
                left: { style: "thin" }
            }
        };
    
        // Create JO Details worksheet
        const joDetailsData = [
            ['JOB ORDER DETAILS', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['Job Order Name:', formData.jo_name, '', '', '', '', ''],
            ['Project Description:', formData.project_desc, '', '', '', '', ''],
            ['Contract Name:', formData.contract_name, '', '', '', '', ''],
            ['Location:', formData.location, '', '', '', '', ''],
            ['Item Works:', formData.itemWorks, '', '', '', '', ''],
            ['Period Covered:', formData.periodCovered, '', '', '', '', ''],
            ['Supplier:', formData.supplier, '', '', '', '', ''],
            ['Date Needed:', formData.dateNeeded, '', '', '', '', ''],
            ['Status:', formData.status, '', '', '', '', ''],
            ['Progress:', `${formData.progress}%`, '', '', '', '', ''],
            ['Total Cost:', `₱${calculateGrandTotal().toLocaleString()}`, '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
        ];
        
        const joDetailsWs = XLSX.utils.aoa_to_sheet(joDetailsData);
        joDetailsWs['!cols'] = defaultColWidth;
        joDetailsWs['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } } // Merge title cells
        ];
        
        // Style the title
        joDetailsWs['A1'] = { 
            v: 'JOB ORDER DETAILS',
            s: {
                font: { bold: true, sz: 16 },
                alignment: { horizontal: "center" }
            }
        };
        
        XLSX.utils.book_append_sheet(wb, joDetailsWs, 'Job Order Details');
    
        // Create BoQ worksheet with enhanced formatting
        let boqData = [];
        
        // Add main header
        boqData.push(['BILL OF QUANTITIES', '', '', '', '', '', '']);
        boqData.push(['', '', '', '', '', '', '']); // Empty row for spacing
        
        Object.entries(BoQParts).forEach(([partName, items]) => {
            // Add part header
            boqData.push([partName.toUpperCase(), '', '', '', '', '', '']);
            
            // Add table headers
            boqData.push([
                'Item No.',
                'Description',
                'Unit',
                'Quantity',
                'Unit Cost',
                'Amount',
                'Weight (%)'
            ]);
            
            // Add items
            items.forEach(item => {
                boqData.push([
                    item.itemNo,
                    item.description,
                    item.unit,
                    item.quantity,
                    item.unitCost,
                    item.amount,
                    item.weight
                ]);
            });
            
            // Add subtotal
            const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
            boqData.push(['', '', '', '', 'Subtotal:', subtotal, '']);
            boqData.push(['', '', '', '', '', '', '']); // Empty row for spacing
        });
        
        // Add grand total
        boqData.push(['', '', '', '', 'GRAND TOTAL:', calculateGrandTotal(), '']);
        
        const boqWs = XLSX.utils.aoa_to_sheet(boqData);
        boqWs['!cols'] = defaultColWidth;
        
        // Add styling to BoQ worksheet
        const range = XLSX.utils.decode_range(boqWs['!ref']);
        for (let R = 0; R <= range.e.r; R++) {
            for (let C = 0; C <= range.e.c; C++) {
                const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
                if (!boqWs[cellRef]) continue;
                
                // Style for headers (Part names and column headers)
                if (R === 0 || boqWs[cellRef].v === 'Item No.' || 
                    (typeof boqWs[cellRef].v === 'string' && 
                    boqWs[cellRef].v.toUpperCase() === boqWs[cellRef].v && 
                    boqWs[cellRef].v.length > 0)) {
                    boqWs[cellRef].s = headerStyle;
                }
                
                // Style for amounts and totals
                if (C === 5 && typeof boqWs[cellRef].v === 'number') {
                    boqWs[cellRef].z = '"₱"#,##0.00'; // Format as currency
                }
            }
        }
        
        XLSX.utils.book_append_sheet(wb, boqWs, 'Bill of Quantities');
    
        // Save the file
        const fileName = `${formData.jo_name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            className="fixed top-0 left-0 right-0 bg-white z-20 shadow-md"
            header={
                <div className="flex items-center">
                    <Link href={route("job-order", {})}>
                        <button className="text-slate-500 hover:text-slate-700 mr-4 flex items-center">
                            <ChevronLeft size={20} />
                        </button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Job Order Details
                    </h2>
                </div>
            }
        >
            <Head title="Job Order Details" />

            <div className="flex flex-row-reverse gap-6">
                <div className="w-full flex flex-col">
                    <h3 className="mt-4 text-2xl font-semibold">Bill of Quantities</h3>
                    <h3 className="text-left text-gray-700 mb-1">
                        Total Job Order Cost: <span className="text-yellow-500">₱{calculateGrandTotal().toLocaleString()}</span>
                    </h3>
                    <div className="w-full h-[calc(100vh-15rem)] lg:w-7/10 bg-white rounded-md py-4 pr-4 overflow-y-auto">
                        {Object.keys(BoQParts).map((part, idx) => {
                            const subtotal = BoQParts[part].reduce((sum, item) => sum + item.amount, 0);

                            return (
                                <div key={idx} className="mb-8">
                                    <h4 className="font-semibold text-lg">{part}</h4>

                                    <div className="text-left text-gray-700 text-sm mb-1">
                                        Subtotal: <span className="text-yellow-500">₱{subtotal.toLocaleString()}</span>
                                    </div>

                                    <div className="bg-white shadow rounded overflow-hidden">
                                        <Table className="min-w-full divide-y divide-gray-200">
                                            <TableHeader>
                                                <TableRow>
                                                    {[
                                                        "Item No.",
                                                        "Description",
                                                        "Unit",
                                                        "Quantity",
                                                        "Unit Cost",
                                                        "Amount",
                                                        "Weight (%)",
                                                    ].map((header, idx) => (
                                                        <TableHead key={idx}>{header}</TableHead>
                                                    ))}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {BoQParts[part].length > 0 ? (
                                                    BoQParts[part].map((item, idx) => (
                                                        <TableRow key={idx} className="hover:bg-gray-200">
                                                            <TableCell>{item.itemNo}</TableCell>
                                                            <TableCell>{item.description}</TableCell>
                                                            <TableCell>{item.unit}</TableCell>
                                                            <TableCell>{item.quantity}</TableCell>
                                                            <TableCell>{item.unitCost}</TableCell>
                                                            <TableCell>{item.amount}</TableCell>
                                                            <TableCell>{item.weight}%</TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={7} className="px-4 py-4 text-center text-gray-500">
                                                            No items found.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className="col-span-2 flex justify-end mt-4">
                                        <button
                                            onClick={() => addDummyPayItem(part)}
                                            className="py-2 px-3 bg-gray-500 text-white font-weight-bolder hover:bg-gray-800 rounded-lg"
                                        >
                                            Add Pay Item
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="w-full lg:w-1/3 bg-white shadow rounded-md p-4 sticky top-4 self-start">
                    <div className="text-gray-900">
                        <div className="pb-4">
                            <div className="text-2xl font-semibold">{formData.jo_name}</div>
                            <div className="text-lg text-gray-600">{formData.project_desc}</div>
                            <div className="text-sm text-gray-500">{formData.contract_name}</div>
                        </div>

                        <div className="flex flex-row items-center">
                            <div className="w-4/5 bg-gray-200 h-3 rounded-lg mr-4 flex flex-row">
                                <div
                                    className={`h-full rounded-full ${getProgressBarColor(formData.progress)}`}
                                    style={{
                                        width: `${formData.progress || 0}%`,
                                    }}
                                ></div>
                            </div>
                            <span className="text-sm">{formData.progress}%</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {[
                            ["Status", formData.status],
                            ["Location", formData.location],
                            ["Item Works", formData.itemWorks],
                            ["Period Covered", formData.periodCovered],
                            ["Supplier", formData.supplier],
                            ["Date Needed", formData.dateNeeded],
                        ].map(([label, value], idx) => (
                            <div key={idx}>
                                <div className="text-sm text-gray-600">{label}:</div>
                                <div>{value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 mt-6">
                        <Button
                            onClick={() => {
                                if (confirm("Are you sure you want to delete this job order?")) {
                                    console.log("Job order deleted.");
                                }
                            }}
                            className="bg-red-500 text-white"
                        >
                            Delete
                        </Button>

                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gray-500 text-white"
                        >
                            Edit
                        </Button>

                        <Button
                            onClick={exportToExcel}
                            className="bg-green-500 text-white flex items-center gap-2"
                        >
                            <FileDown size={16} />
                            Export Job Order
                        </Button>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="lg">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Edit Job Order Details
                    </h3>
                    <div>
                        <div className="flex justify-between items-center">
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <button className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                        {formData.status}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => {}}>
                                        on-going
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {}}>
                                        completed
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <form>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="jo_name">Job Order Name:</InputLabel>
                            <TextInput
                                id="jo_name"
                                name="jo_name"
                                value={formData.jo_name}
                                onChange={handleInputChange}
                                placeholder="Enter New Job Order Name"
                                className="w-80"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="location">Location</InputLabel>
                            <TextInput
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="Enter New Location"
                                className="w-80"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="itemsWork">
                                Items Work
                            </InputLabel>
                            <TextInput
                                id="itemsWork"
                                name="itemsWork"
                                value={formData.itemsWork}
                                onChange={handleInputChange}
                                placeholder="Enter New Items Work"
                                className="w-80"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="periodCovered">
                                Period Covered
                            </InputLabel>
                            <TextInput
                                id="periodCovered"
                                name="periodCovered"
                                value={formData.periodCovered}
                                onChange={handleInputChange}
                                placeholder="Enter New Period Covered"
                                className="w-80"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="supplier">Supplier</InputLabel>
                            <TextInput
                                id="supplier"
                                name="supplier"
                                value={formData.supplier}
                                onChange={handleInputChange}
                                placeholder="Enter New Supplier"
                                className="w-80"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="dateNeeded">
                                Date Needed
                            </InputLabel>
                            <TextInput
                                id="dateNeeded"
                                name="dateNeeded"
                                type="date"
                                value={formData.dateNeeded}
                                onChange={handleInputChange}
                                placeholder="Enter New Date Needed"
                                className="w-80"
                            />
                        </div>
                        <div className="col-span-2 flex justify-end mt-4">
                            <Button
                                onClick={() => setShowModal(false)}
                                variant="outline"
                                className="mr-2"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    /* Save changes logic */
                                }}
                            >
                                Confirm
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
