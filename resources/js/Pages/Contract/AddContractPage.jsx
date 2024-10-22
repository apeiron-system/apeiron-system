import ContractForm from "@/Componentss/contract/ContractForm";
import ContractTabNavigation from "@/Componentss/contract/ContractTabNavigation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function AddContractPage({ auth, employees }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Contract
                </h2>
            }
        >
            <Head title="Contract" />

            <ContractTabNavigation />

            <section>
                <ContractForm employees={employees} />
            </section>
        </AuthenticatedLayout>
    );
}
