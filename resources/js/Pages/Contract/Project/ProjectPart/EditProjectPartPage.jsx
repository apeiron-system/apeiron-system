import ContractForm from "@/Componentss/contract/ContractForm";
import ContractTabNavigation from "@/Componentss/contract/ContractTabNavigation";
import ProjectHeader from "@/Componentss/contract/project/ProjectHeader";
import ProjectPartForm from "@/Componentss/contract/project/ProjectPart/ProjectPartForm";
import ProjectPartTabNavigation from "@/Componentss/contract/project/ProjectPart/ProjectPartTabNavigation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft} from "lucide-react";

export default function AddContractPage({
    auth,
    contract,
    project,
    submittedByEmployee,
    signingAuthorityEmployee,
    projectPart
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center w-full justify-between">
                        <div className="flex gap-2">
                            {" "}
                            <Link
                                href={`/contract/${contract.id}/project/${project.id}/part/${projectPart.id}/`}
                            >
                                <button className="text-gray-500">
                                    <ChevronLeft />
                                </button>
                            </Link>
                            <h2>Project Part - {projectPart.description}</h2>
                        </div>

                    </div>
                </div>
            }
        >
            <Head title="Add Project Part" />

            <section className="mt-4 ml-4">Add Project Part</section>

            <section>
                <ProjectPartForm
                    contract_id={contract.id}
                    project_id={project.id}
                    projectPart={projectPart}
                />
            </section>
        </AuthenticatedLayout>
    );
}
