import ProjectTabNavigation from "@/Componentss/contract/project/ProjectTabNavigation";
import ProjectsTable from "@/Componentss/contract/project/ProjectsTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ContractHeader from "@/Componentss/contract/ContractHeader";
import ProjectHeader from "@/Componentss/contract/project/ProjectHeader";

export default function ViewProjectPage({
    auth,
    contract,
    project,
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

            {/* <ProjectTabNavigation projectId={contract.id} contractId={project.id}/> */}

            {/* <section className="ml-4 mt-2">
                <h1 className="font-bold text-lg">Projects</h1>
                {projects && <ProjectsTable projects={projects} />}
            </section> */}

            <section></section>
        </AuthenticatedLayout>
    );
}
