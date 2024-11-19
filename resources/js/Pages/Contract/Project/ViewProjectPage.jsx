import ProjectHeader from "@/Componentss/contract/project/ProjectHeader";
import ProjectPartTabNavigation from "@/Componentss/contract/project/ProjectPart/ProjectPartTabNavigation";

import ProjectPartTable from "@/Componentss/contract/project/ProjectPart/ProjectPartTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

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

            <div className="flex justify-between max-w-7xl">
                <ProjectPartTabNavigation
                    contract_id={contract.id}
                    project_id={project.id}
                />
                <Link
                    href={route("boq.view", {
                        contractId: contract.id,
                        projectId: project.id,
                    })}
                >
                    <Button>View BOQ</Button>
                </Link>
            </div>

            <section className="mt-6">
                <h1>Project Overview</h1>

                <section className="mt-6">
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
