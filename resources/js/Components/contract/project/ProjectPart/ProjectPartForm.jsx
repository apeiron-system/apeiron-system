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
    description: z.string().min(1, "Description is required"),
    project_id: z.number().min(1, "Project ID is required"),
    // parent_id: z.number().nullable(),
});

export default function ProjectPartForm({
    projectPart,
    contract_id,
    project_id,
    projectParts,
}) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            description: projectPart?.description || "",
            project_id: project_id,
            // parent_id: projectPart?.parent_id || null,
        },
    });

    const onSubmit = (values) => {
        try {
            const parsedValues = {
                ...values,
                project_id: Number(values.project_id),
                parent_id: values.parent_id ? Number(values.parent_id) : null,
            };

            if (projectPart && projectPart.id) {
                // Edit mode
                router.patch(
                    `/contract/${contract_id}/project/${project_id}/part/${projectPart.id}/update`,
                    parsedValues
                );
            } else {
                // Add mode
                router.post(
                    `/contract/${contract_id}/project/${project_id}/part/add`,
                    parsedValues
                );
            }
        } catch (e) {
            console.log(e);
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <input
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* <FormField
                    control={form.control}
                    name="parent_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Parent Part (optional)</FormLabel>
                            <FormControl>
                                <select
                                    className="input w-full border border-gray-300 rounded-md p-2"
                                    {...field}
                                >
                                    <option value="">None</option>
                                    {projectParts.map((part) => (
                                        <option key={part.id} value={part.id}>
                                            {part.description}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <div className="col-span-1 md:col-span-2 flex justify-end">
                    <Button type="submit" className="mt-4">
                        {projectPart && projectPart.id ? "Update" : "Add"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
