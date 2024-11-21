import EmployeesDialog from "@/Components/contract/EmployeesDialog";
import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Function to format the date as yyyy-MM-dd
const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
};

const schema = z.object({
    project_name: z.string().min(1),
    status: z.enum(["pending", "ongoing", "canceled", "completed"]),
    street_address: z.string().min(1),
    barangay: z.string().min(1),
    city: z.string().min(1),
    province: z.string().min(1),
    zip_code: z.string().min(1),
    country: z.string().min(1),
    duration_in_days: z.coerce.number(),
    num_of_units: z.coerce.number(),
    abc_value: z.coerce.number(),
    submitted_by_employee_id: z.coerce.number(),
    signing_authority_employee_id: z.coerce.number(),
    contract_id: z.coerce.number(),
});

export default function ProjectForm({ project, employees, contract_id }) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            project_name: project?.project_name || "",
            status: project?.status || "pending",
            street_address: project?.street_address || "",
            barangay: project?.barangay || "",
            city: project?.city || "",
            province: project?.province || "",
            zip_code: project?.zip_code || "",
            country: project?.country || "",
            duration_in_days: project?.duration_in_days || 0,
            num_of_units: project?.num_of_units || 0,
            abc_value: project?.abc_value || 0,
            submitted_by_employee_id: project?.submitted_by_employee_id || null,
            signing_authority_employee_id:
                project?.signing_authority_employee_id || null,
            contract_id: project?.contract_id || null,
        },
    });

    const onSubmit = async (values) => {
        try {
            if (project && project.id) {
                // Edit mode
                await router.patch(
                    `/contract/${contract_id}/project/${project.id}/update`,
                    values
                );
            } else {
                // Add mode
                await router.post(
                    `/contract/${contract_id}/project/add`,
                    values
                );
            }
            console.log("Form submitted successfully");
        } catch (error) {
            console.error("Error submitting form:", error);
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
                    name="project_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Project Name
                                <div className="text-stone-500 text-xs">
                                    (required)
                                </div>
                            </FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Project Name"
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
                            <FormLabel>
                                Status
                                <div className="text-stone-500 text-xs">
                                    (required)
                                </div>
                            </FormLabel>
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
                    name="street_address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Street Address
                                <div className="text-stone-500 text-xs">
                                    (required)
                                </div>
                            </FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Street Address"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="barangay"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Barangay
                                <div className="text-stone-500 text-xs">
                                    (required)
                                </div>
                            </FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Barangay"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                City
                                <div className="text-stone-500 text-xs">
                                    (required)
                                </div>
                            </FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="City"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Province
                                <div className="text-stone-500 text-xs">
                                    (required)
                                </div>
                            </FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Province"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="zip_code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Zip Code
                                <div className="text-stone-500 text-xs">
                                    (required)
                                </div>
                            </FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Zip Code"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Country
                                <div className="text-stone-500 text-xs">
                                    (required)
                                </div>
                            </FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Country"
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
                            <FormLabel>
                                Duration in Days
                                <div className="text-stone-500 text-xs">
                                    (required)
                                </div>
                            </FormLabel>
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
                    name="num_of_units"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Number of Units
                                <div className="text-stone-500 text-xs">
                                    (required)
                                </div>
                            </FormLabel>
                            <FormControl>
                                <input
                                    type="number"
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Number of Units"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="abc_value"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                ABC Value (PHP)
                                <div className="text-stone-500 text-xs">
                                    (required)
                                </div>
                            </FormLabel>
                            <FormControl>
                                <input
                                    type="number"
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="ABC Value"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="submitted_by_employee_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Submitted By
                                <div className="text-stone-500 text-xs">
                                    (required)
                                </div>
                            </FormLabel>
                            <div>
                                <EmployeesDialog
                                    selectedEmployee={
                                        project
                                            ? project.submitted_by_employee_id
                                            : null
                                    }
                                    employees={employees}
                                    onSelect={(employeeId) => {
                                        form.setValue(
                                            "submitted_by_employee_id",
                                            employeeId
                                        );
                                    }}
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="signing_authority_employee_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Signing Authority
                                <div className="text-stone-500 text-xs">
                                    (required)
                                </div>
                            </FormLabel>
                            <div>
                                <EmployeesDialog
                                    selectedEmployee={
                                        project
                                            ? project.signing_authority_employee_id
                                            : null
                                    }
                                    employees={employees}
                                    onSelect={(employeeId) => {
                                        form.setValue(
                                            "signing_authority_employee_id",
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
                        {project && project.id ? "Update" : "Add"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
