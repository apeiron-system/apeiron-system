import ContractForm from "@/Components/contract/ContractForm";
import ContractTabNavigation from "@/Components/contract/ContractTabNavigation";
import ProjectTabNavigation from "@/Components/contract/project/ProjectTabNavigation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProjectForm from "../../../Components/contract/project/ProjectForm";
import _ from "lodash";
import ProjectHeader from "@/Components/contract/project/ProjectHeader";
import ProjectPartTabNavigation from "@/Components/contract/project/ProjectPart/ProjectPartTabNavigation";

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

            <ProjectPartTabNavigation
                contract_id={contract.id}
                project_id={project.id}
            />

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
