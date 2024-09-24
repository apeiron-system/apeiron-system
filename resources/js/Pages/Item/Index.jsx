import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ContractCard from "@/Componentss/item/ContractCard";

export default function Index({ auth, contracts }) {
    console.log(contracts);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Item
                </h2>
            }
        >
            <Head title="Item" />

            <div>Choose a contract to manage items.</div>

            <div className="py-12 flex gap-2 flex-wrap">
                {contracts.map((contract) => (
                    <ContractCard
                        key={`contract-${contract.id}`}
                        contract={contract}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
