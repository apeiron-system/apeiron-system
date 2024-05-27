import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    first_name: z.string().min(1, { message: "First name is required" }),
    middle_name: z.string().min(1, { message: "Middle name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    street_address: z
        .string()
        .min(1, { message: "Street address is required" }),
    barangay: z.string().min(1, { message: "Barangay is required" }),
    city: z.string().min(1, { message: "City is required" }),
    province: z.string().min(1, { message: "Province is required" }),
    zip_code: z
        .string()
        .regex(/^\d{4,5}$/, { message: "Zip code must be 4-5 digits" }),
    country: z.string().min(1, { message: "Country is required" }),
    phone_number: z
        .string()
        .regex(/^\d{10,11}$/, { message: "Phone number must be 10-11 digits" }),
    email_address: z.string().email({ message: "Invalid email address" }),
    employee_role: z.string().min(1, { message: "Employee role is required" }),
});

export default function EmployeeForm() {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            first_name: "",
            middle_name: "",
            last_name: "",
            street_address: "",
            barangay: "",
            city: "",
            province: "",
            zip_code: "",
            country: "",
            phone_number: "",
            email_address: "",
            employee_role: "",
        },
    });

    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto"
            >
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="John"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="middle_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Middle Name</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Doe"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Smith"
                                    {...field}
                                />
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
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="123 Main St"
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
                            <FormLabel>Barangay</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Barangay 1"
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
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Manila"
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
                            <FormLabel>Province</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Metro Manila"
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
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="1000"
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
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Philippines"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="09123456789"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email_address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="sample@gmail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="employee_role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Employee Role</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Manager"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="col-span-1 md:col-span-2 flex justify-end">
                    <Button type="submit" className="mt-4">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}
