import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EmployeesDialog from "./EmployeesDialog";

// Function to format the date as yyyy-MM-dd
const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

const schema = z.object({
    contract_name: z.string().min(1),
    status: z.enum(["pending", "ongoing", "canceled", "completed"]),
    description: z.string().nullable(),
    location: z.string().min(1),
    designation: z.string().min(1).nullable(),
    duration_in_days: z.number(),
    amount: z.number(),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    authorized_representative_employee_id: z.number(),
});

export default function ContractForm({ contract, employees }) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            contract_name: contract?.contract_name || "",
            status: contract?.status || "pending",
            description: contract?.description || "",
            location: contract?.location || "",
            designation: contract?.designation || "",
            duration_in_days: contract?.duration_in_days || 0,
            amount: contract?.amount || 0,
            date: contract?.date ? formatDate(contract.date) : formatDate(new Date()),
            authorized_representative_employee_id: contract?.authorized_representative_employee_id || null,
        },
    });

    const onSubmit = (values) => {
        const parsedValues = {
            ...values,
            duration_in_days: Number(values.duration_in_days),
            amount: Number(values.amount),
            authorized_representative_employee_id: Number(values.authorized_representative_employee_id),
            date: formatDate(values.date), // Ensure the date is in yyyy-MM-dd format
        };

        if (contract && contract.id) {
            // Edit mode
            router.patch(`/contract/${contract.id}/update`, parsedValues);
        } else {
            // Add mode
            router.post("/contract/add", parsedValues);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto"
            >
                <FormField
                    control={form.control}
                    name="contract_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contract Name</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Contract Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <select
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    {...field}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="canceled">Canceled</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <textarea
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Location"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Designation</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Designation"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration_in_days"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration in Days</FormLabel>
                            <FormControl>
                                <input
                                    type="number"
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Duration in Days"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount (PHP)</FormLabel>
                            <FormControl>
                                <input
                                    type="number"
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Amount"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <input
                                    type="date"
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="authorized_representative_employee_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Authorized Representative</FormLabel>
                            <div>
                                <EmployeesDialog
                                    employees={employees}
                                    onSelect={(employeeId) => {
                                        form.setValue(
                                            "authorized_representative_employee_id",
                                            employeeId
                                        );
                                    }}
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="col-span-1 md:col-span-2 flex justify-end">
                    <Button type="submit" className="mt-4">
                        {contract && contract.id ? "Update" : "Add"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
