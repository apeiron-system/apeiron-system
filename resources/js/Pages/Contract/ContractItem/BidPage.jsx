import { useState } from "react";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function BidPage({ auth, item, contractId }) {
    // Initialize form data with just the unit_cost (price) for the bid
    const [formData, setFormData] = useState({
        unit_cost: item.prices[0].unit_cost, // Use the current price as the default value
    });

    // Handle input change for the price/bid field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission to update the bid (unit cost)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Post the new bid to the backend route
        router.post(
            route("item.contract.update-price", [contractId, item.id]), // Make sure the route exists
            formData
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <Link href={`/contracts/${contractId}/items`}>
                        <button className="text-gray-500">
                            <ArrowLeft />
                        </button>
                    </Link>

                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Place Bid - {item.description}
                    </h2>
                </div>
            }
        >
            <Head title={`Place Bid on ${item.description}`} />

            <section className="py-4 w-full max-w-[600px]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Unit Cost/Bid Price Field */}
                    <div>
                        <Label>Bid Price</Label>
                        <Input
                            type="number"
                            name="unit_cost"
                            value={formData.unit_cost}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-blue-500 text-white"
                        >
                            Submit Bid
                        </Button>
                    </div>
                </form>
            </section>
        </AuthenticatedLayout>
    );
}
