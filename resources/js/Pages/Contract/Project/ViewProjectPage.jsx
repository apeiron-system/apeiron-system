import ProjectHeader from "@/Components/contract/project/ProjectHeader";
import ProjectPartTabNavigation from "@/Components/contract/project/ProjectPart/ProjectPartTabNavigation";

import ProjectPartTable from "@/Components/contract/project/ProjectPart/ProjectPartTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ViewProjectPage({
    auth,
    contract,
    project,
    projectParts,
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
            <Head title={`View Project - ${project.project_name}`} />

            <ProjectPartTabNavigation
                contract_id={contract.id}
                project_id={project.id}
            />

            <section>
                <h1>Project Overview</h1>

                <section className="mt-12">
                    <ProjectPartTable
                        projectParts={projectParts}
                        contract_id={contract.id}
                        project_id={project.id}
                    />
                </section>
            </section>
        </AuthenticatedLayout>
    );
}
