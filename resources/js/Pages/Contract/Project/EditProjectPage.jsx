import ContractForm from "@/Componentss/contract/ContractForm";
import ContractTabNavigation from "@/Componentss/contract/ContractTabNavigation";
import ProjectTabNavigation from "@/Componentss/contract/project/ProjectTabNavigation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProjectForm from "../../../Componentss/contract/project/ProjectForm";
import _ from "lodash";
import ProjectHeader from "@/Componentss/contract/project/ProjectHeader";

export default function EditProjectPage({
    auth,
    contract,
    project,
    employees,
    signingAuthorityEmployee,
    submittedByEmployee,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <ProjectHeader
                    contract={contract}
                    project={project}
                    signingAuthorityEmployee={signingAuthorityEmployee}
                    submittedByEmployee={submittedByEmployee}
                />
            }
        >
            <Head title="Edit Project" />

            <ProjectTabNavigation id={contract.id} employees={employees} />

            <section className="ml-4 mt-2">
                <h1 className="font-bold text-lg">Edit Project</h1>
            </section>

            <section>
                <ProjectForm
                    contract_id={contract.id}
                    employees={employees}
                    project={project}
                />
            </section>
        </AuthenticatedLayout>
    );
}
