import { useState, useEffect } from "react";
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

export default function JobOrderDetailsPage({ auth, jobOrder, projectName, contractName, projectParts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [formData, setFormData] = useState({
        jo_name: jobOrder.jo_name || "",
        location: jobOrder.location || "",
        itemWorks: jobOrder.itemWorks || "",
        periodCovered: jobOrder.period_covered || "",
        supplier: jobOrder.supplier || "",
        dateNeeded: jobOrder.dateNeeded || "",
        preparedBy: jobOrder.preparedBy || "",
        checkedBy: jobOrder.checkedBy || "",
        approvedBy: jobOrder.approvedBy || "",
        status: jobOrder.status || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const calculateAmount = (quantity, unit_cost) => {
        return quantity * unit_cost;
    };

    const calculateGrandTotal = () => {
        return projectParts.reduce((total, part) => {
            // Calculate the subtotal for each project part by summing up the amounts for each item
            const partTotal = part.items.reduce((sum, item) => {
                // Ensure calculateAmount correctly calculates the amount for the item
                return sum + calculateAmount(item.quantity, item.unit_cost);
            }, 0);
    
            // Add the partTotal to the grand total
            return total + partTotal;
        }, 0);
    };

    const formatDate = (date) => {
        if (!date) return "";
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-CA");
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Update form data with new status
            const updatedFormData = {
                ...formData,
            };
    
            // Send a PUT request to update the job order details with status
            const response = await axios.put(`/job-order-details?jo_no=${jobOrder.jo_no}`, updatedFormData);
    
            if (response.data.success) {
                console.log('Job order updated successfully');
                
                // Close the modal and refresh or redirect as necessary
                setIsModalOpen(false);
                window.location.href = `/job-order-details?jo_no=${jobOrder.jo_no}`;
            } else {
                console.error('Failed to update job order:', response.data.message);
                alert('Error updating job order');
            }
        } catch (error) {
            console.error('Error updating job order:', error);
            alert('Failed to update job order');
        }
    };
    
    const handleCancelEditing = () => {
        setIsModalOpen(false);
        window.location.href = `/job-order-details?jo_no=${jobOrder.jo_no}`;
    }

    const handleDelete = async (jobOrderId) => {
        // Log the jobOrderId we're about to delete
        console.log('Deleting job order with ID:', jobOrderId);
    
        // Ask for confirmation before proceeding with deletion
        if (confirm("Are you sure you want to delete this job order?")) {
            try {
                // Send DELETE request to the server to delete the job order
                const response = await axios.delete(`/job-order-details?jo_no=${jobOrderId}`);
                
                // If the delete operation is successful
                if (response.data.success) {
                    console.log('Job order deleted successfully:', response.data);
    
                    // If the delete operation is successful
                    if (response.status === 200 || response.status === 204) {
                        console.log('Job order deleted successfully:', response.data);

                        // Redirect to the "job-order" page after successful deletion
                        window.location.href = `/job-order?project_id=${jobOrder.project_id}`;  // Replace with the correct URL or route if necessary
                    } else {
                        // Handle failure in the delete operation (check if the response isn't 200 or 204)
                        console.error('Failed to delete job order:', response.data.message || response.statusText);
                        alert('Failed to delete job order: ' + (response.data.message || response.statusText));
                    }
    
                    // If you want to show a success modal or message, you can trigger that here as well
                } else {
                    // Handle failure in the delete operation (e.g., if there are business logic issues)
                    console.error('Failed to delete job order:', response.data.message);
                    alert('Failed to delete job order: ' + response.data.message);
                }
            } catch (error) {
                // Handle errors that occur during the delete request
                if (error.response) {
                    // Server responded with an error (e.g., validation issues, unauthorized request)
                    console.error('Server responded with error:', error.response.data);
                    alert('Error: ' + error.response.data.message);
                } else if (error.request) {
                    // No response was received from the server
                    console.error('No response received:', error.request);
                    alert('No response received from server');
                } else {
                    // An error occurred in setting up the request
                    console.error('Error:', error.message);
                    alert('Error deleting job order: ' + error.message);
                }
            }
        }
    };    

    // State to track the visibility of items for each project part
    const [visibleRows, setVisibleRows] = useState(
        projectParts.map(() => 5) // Initially, only the first 5 rows are visible for each part
    );

    const handleToggleRows = (idx) => {
        setVisibleRows((prevState) => {
            const newState = [...prevState];
            const currentVisibleRows = newState[idx];

            // Toggle between showing all rows and showing only the first 5
            if (currentVisibleRows < projectParts[idx].items.length) {
                newState[idx] = projectParts[idx].items.length; // Show all
            } else {
                newState[idx] = 5; // Show only the first 5 rows
            }
            return newState;
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            className="fixed top-0 left-0 right-0 bg-white z-20 shadow-md"
            header={
                <div className="flex items-center">
                    <Link href={route("job-order", { project_id: jobOrder.project_id })}>
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
                    <div className="flex justify-between items-end space-x-4">
                        <div>
                            <h3 className="mt-4 text-2xl font-semibold">Bill of Quantities</h3>
                            <h3 className="text-left text-gray-700 mb-1">
                                Total Estimated Cost: <span className="text-yellow-500 font-semibold">₱{calculateGrandTotal().toLocaleString()}</span>
                            </h3>
                        </div>
                        <Button
                            onClick={() => alert("Manage Billing Progress Clicked")}
                            className="bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-800"
                        >
                            Manage Billing Progress
                        </Button>
                    </div>

                    <h3 className="mt-8 mb-2 text-2xl font-semibold">Project Parts</h3>
                    {projectParts.map((part, idx) => {
                        const partTotal = part.items.reduce((sum, item) => sum + calculateAmount(item.quantity, item.unit_cost), 0);
                        const visibleItemCount = visibleRows[idx];

                        return (
                            <div key={idx}>
                                <h4 className="text-lg">{part.projectPart.description}</h4>
                                <p className="text-gray-700 text-sm mb-2">
                                    Subtotal: <span className="text-yellow-500 font-semibold">₱{partTotal.toLocaleString()}</span>
                                </p>

                                <div className="bg-white shadow rounded overflow-hidden">
                                    <Table className="min-w-full divide-y divide-gray-200">
                                        <TableHeader>
                                            <TableRow>
                                                {["Item No.", "Description", "Unit", "Quantity", "Unit Cost", "Amount"].map((header, idx) => (
                                                    <TableHead key={idx}>{header}</TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {part.items.slice(0, visibleItemCount).map((item, idx) => (
                                                <TableRow key={idx} className="hover:bg-gray-200">
                                                    <TableCell>{item.itemNo}</TableCell>
                                                    <TableCell>{item.description}</TableCell>
                                                    <TableCell>{item.unit}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>₱{item.unit_cost.toLocaleString()}</TableCell>
                                                    <TableCell>₱{calculateAmount(item.quantity, item.unit_cost).toLocaleString()}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="mt-2 flex justify-end">
                                    <button
                                        onClick={() => handleToggleRows(idx)}
                                        className="text-sm text-slate-500 hover:underline"
                                    >
                                        {visibleItemCount < part.items.length ? "Show All" : "Show Less"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="w-full lg:w-2/4 bg-white shadow rounded-md p-4 sticky top-4 self-start">
                    <div className="text-gray-900">
                        <div className="pb-4">
                            <div className="text-2xl font-semibold">{formData.jo_name}</div>
                            <div className="text-lg text-gray-600">{projectName || "No Project"}</div>
                            <div className="text-sm text-gray-500">{contractName|| "No Contract"}</div>
                        </div>
                    </div>

                    <div className="grid grid-rows-5 grid-cols-2 gap-1 mt-2">
                        {[
                            ["Status", formData.status],
                            ["Location", formData.location],
                            ["Item Works", formData.itemWorks],
                            ["Period Covered", formData.periodCovered],
                            ["Supplier", formData.supplier],
                            ["Date Needed", formatDate(formData.dateNeeded)],
                            ["Prepared By", formData.preparedBy],
                            ["Checked By", formData.checkedBy],
                            ["Approved By", formData.approvedBy],
                        ].map(([label, value], idx) => (
                            <div key={idx}>
                                <strong>{label}:</strong>
                                <div className="text-sm text-gray-600">{value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                    <Button
                        onClick={() => handleDelete(jobOrder.jo_no)}
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
                    </div>
                </div>
            </div>

            {/* onClose={() => setIsModalOpen(false)} */}
            <Modal show={isModalOpen} maxWidth="lg">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Edit Job Order Details</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="status">Status:</InputLabel>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <button className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm 
                                        focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                        {formData.status}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() =>
                                        setFormData({ ...formData, status: "on-going" })
                                    }>
                                        On-going
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() =>
                                        setFormData({ ...formData, status: "completed" })
                                    }>
                                        Completed
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
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
                            <InputLabel htmlFor="location">Location:</InputLabel>
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
                            <InputLabel htmlFor="itemsWork">Item Works:</InputLabel>
                            <TextInput
                                id="itemWorks"
                                name="itemWorks"
                                value={formData.itemWorks}
                                onChange={handleInputChange}
                                placeholder="Enter New Item Works"
                                className="w-80"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="periodCovered">Period Covered:</InputLabel>
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
                            <InputLabel htmlFor="supplier">Supplier:</InputLabel>
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
                            <InputLabel htmlFor="dateNeeded">Date Needed:</InputLabel>
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
                            <Button onClick={handleCancelEditing} variant="outline" className="mr-2">
                                Cancel
                            </Button>
                            <Button type="submit">
                                Confirm
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}