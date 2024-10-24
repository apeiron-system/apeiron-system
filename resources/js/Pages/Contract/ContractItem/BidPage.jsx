import { useState } from "react";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function BidPage({ auth, item, contractId }) {
    const [formData, setFormData] = useState({
        bid_amount: '', // Initialize bid amount as empty
    });

    // Handle input change for the bid amount
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission to store the bid
    const handleSubmit = (e) => {
        e.preventDefault();

        // Post the new bid to the backend route
        router.post(
            route('item.contract.bid.store', [contractId, item.id]), // Post bid to this route
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
                    {/* Bid Amount Field */}
                    <div>
                        <Label>Bid Amount</Label>
                        <Input
                            type="number"
                            name="bid_amount"
                            value={formData.bid_amount}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" className="bg-blue-500 text-white">
                            Submit Bid
                        </Button>
                    </div>
                </form>
            </section>
        </AuthenticatedLayout>
    );
}
