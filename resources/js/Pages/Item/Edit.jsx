import { useState } from "react";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import _ from "lodash";
import { Label } from "@/Components/ui/label";

export default function Edit({ auth, item, contractId }) {
    const [formData, setFormData] = useState({
        description: item.description,
        type: item.type,
        unit: item.unit,
        unit_cost: item.prices[0].unit_cost,
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTypeChange = (value) => {
        setFormData({ ...formData, type: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(
            route("item.contract.update", [contractId, item.id]),
            formData
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <Link href={`/item/contracts/${contractId}`}>
                        <Button variant="ghost" className="text-gray-500">
                            <ArrowLeft />
                        </Button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit Item - {item.description}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit ${item.description}`} />

            <section className="py-4 w-full max-w-[600px]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div>
                        <Label>Type</Label>
                        <Select onValueChange={handleTypeChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue
                                    value={item.type}
                                    defaultValue={item.type}
                                    placeholder={_.capitalize(item.type)}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={"material"}>
                                        Material
                                    </SelectItem>
                                    <SelectItem value={"labor"}>
                                        Labor
                                    </SelectItem>
                                    <SelectItem value={"equipment"}>
                                        Equipment
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Unit</Label>
                        <Input
                            type="text"
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label>Unit Cost</Label>
                        <Input
                            type="number"
                            name="unit_cost"
                            value={formData.unit_cost}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-blue-500 text-white"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </section>
        </AuthenticatedLayout>
    );
}
