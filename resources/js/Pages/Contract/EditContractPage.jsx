import ContractForm from "@/Componentss/contract/ContractForm";
import ContractTabNavigation from "@/Componentss/contract/ContractTabNavigation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function EditContractPage({ auth, contract, employees }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Contract - {contract.contract_name}
                </h2>
            }
        >
            <Head title="Contract" />

            <ContractTabNavigation />

            <section>
                <ContractForm employees={employees} contract={contract} />
            </section>
        </AuthenticatedLayout>
    );
}
