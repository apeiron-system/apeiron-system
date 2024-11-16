import ContractForm from "@/Componentss/contract/ContractForm";
import ContractTabNavigation from "@/Componentss/contract/ContractTabNavigation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";

export default function EditContractPage({ auth, contract, employees }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <Link href={`/contract/${contract.id}`}>
                        <button className="text-gray-500">
                            <ChevronLeft />
                        </button>
                    </Link>

                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit Contract - {contract.contract_name}
                    </h2>
                </div>
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
