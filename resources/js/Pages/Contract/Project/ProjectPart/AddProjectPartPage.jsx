import ProjectHeader from "@/Componentss/contract/project/ProjectHeader";
import ProjectPartForm from "@/Componentss/contract/project/ProjectPart/ProjectPartForm";
import ProjectPartTabNavigation from "@/Componentss/contract/project/ProjectPart/ProjectPartTabNavigation";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function AddContractPage({
    auth,
    contract,
    project,
    submittedByEmployee,
    signingAuthorityEmployee,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <ProjectHeader
                    contract={contract}
                    project={project}
                    submittedByEmployee={submittedByEmployee}
                    signingAuthorityEmployee={signingAuthorityEmployee}
                />
            }
        >
            <Head title="Add Project Part" />

            <ProjectPartTabNavigation
                contract_id={contract.id}
                project_id={project.id}
            />

            <section className="mt-4 ml-4">Add Project Part</section>

            <section>
                <ProjectPartForm
                    contract_id={contract.id}
                    project_id={project.id}
                />
            </section>
        </AuthenticatedLayout>
    );
}
