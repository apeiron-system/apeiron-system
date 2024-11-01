import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { router } from "@inertiajs/react";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";



export default function AddItemSection({contract}) {

    const [items, setItems] = useState([
        {
            description: "",
            type: "material",
            unit: "",
            unit_cost: "",
        },
    ]);
    const [csvFile, setCsvFile] = useState(null);

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...items];
        newItems[index][name] = value;
        setItems(newItems);
    };

    const handleSelectChange = (index, value) => {
        const newItems = [...items];
        newItems[index].type = value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([
            ...items,
            {
                description: "",
                type: "material",
                unit: "",
                unit_cost: "",
                prices: [{ unit_cost: "", is_current: true }],
            },
        ]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleCsvChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData();

        // Append items
        // formData.append("items", JSON.stringify(items));

        // // Append CSV file if exists
        // if (csvFile) {
        //     formData.append("csv", csvFile);
        // }

        // Make the API call to store items
        // Replace 'YOUR_API_URL' with your actual endpoint
        router.post(`/item/contracts/${contract.id}`, items);

        // Optionally reset the form or show success message
        setItems([
            {
                description: "",
                type: "material",
                unit: "",
                unit_cost: "",
            },
        ]);
        setCsvFile(null);
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                {items.map((item, itemIndex) => (
                    <div
                        key={`form-${itemIndex}`}
                        className="mb-4 max-w-[800px] flex gap-1"
                    >
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) => handleItemChange(itemIndex, e)}
                                required
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label>Type</Label>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue
                                        value={item.type}
                                        defaultValue={item.type}
                                        placeholder={"Material"}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem
                                            value={"material"}
                                            onClick={() => {
                                                handleSelectChange(
                                                    itemIndex,
                                                    "material"
                                                );
                                            }}
                                        >
                                            Material
                                        </SelectItem>
                                        <SelectItem
                                            value={"labor"}
                                            onClick={() => {
                                                handleSelectChange(
                                                    itemIndex,
                                                    "labor"
                                                );
                                            }}
                                        >
                                            Labor
                                        </SelectItem>
                                        <SelectItem
                                            value={"equipment"}
                                            onClick={() => {
                                                handleSelectChange(
                                                    itemIndex,
                                                    "equipment"
                                                );
                                            }}
                                        >
                                            Equipment
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label>Unit</Label>
                            <Input
                                type="text"
                                name="unit"
                                placeholder="Unit"
                                value={item.unit}
                                onChange={(e) => handleItemChange(itemIndex, e)}
                                required
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label className="text-xs">
                                Unit Cost (up to 2 decimals)
                            </Label>
                            <Input
                                type="number"
                                name="unit_cost"
                                placeholder="Unit Cost"
                                value={item.unit_cost}
                                onChange={(e) => handleItemChange(itemIndex, e)}
                                required
                            />
                        </div>

                        <Button
                            variant="outline"
                            type="button"
                            className="text-red-700 mt-auto"
                            onClick={() => removeItem(itemIndex)}
                        >
                            <Trash2Icon />
                        </Button>
                    </div>
                ))}
                <div>
                    <Button type="button" variant={"outline"} onClick={addItem}>
                        + Add Another Item
                    </Button>
                </div>
                <div className="my-4">
                    <Button type="submit">Submit Items</Button>
                </div>
            </form>
        </section>
    );
}
