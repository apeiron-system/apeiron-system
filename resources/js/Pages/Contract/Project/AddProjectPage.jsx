import ContractForm from "@/Componentss/contract/ContractForm";
import ContractTabNavigation from "@/Componentss/contract/ContractTabNavigation";
import ProjectTabNavigation from "@/Componentss/contract/project/ProjectTabNavigation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProjectForm from "../../../Componentss/contract/project/ProjectForm";
import _ from "lodash";

export default function AddProjectPage({
    auth,
    contract,
    employees,
    signingAuthorityEmployee,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <ContractHeader
                    contract={contract}
                    signingAuthorityEmployee={signingAuthorityEmployee}
                />
            }
        >
            <Head title="Add Project" />

            <ProjectTabNavigation id={contract.id} employees={employees} />

            <section className="ml-4 mt-2">
                <h1 className="font-bold text-lg">Add Project</h1>
            </section>

            <section>
                <ProjectForm contract_id={contract.id} employees={employees} />
            </section>
        </AuthenticatedLayout>
    );
}
