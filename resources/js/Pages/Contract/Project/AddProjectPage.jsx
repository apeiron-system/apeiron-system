import ContractForm from "@/Componentss/contract/ContractForm";
import ContractTabNavigation from "@/Componentss/contract/ContractTabNavigation";
import ProjectTabNavigation from "@/Componentss/contract/project/ProjectTabNavigation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProjectForm from "./ProjectForm";

export default function AddProjectPage({ auth, id, employees }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Project
                </h2>
            }
        >
            <Head title="Add Project" />

            <ProjectTabNavigation id={id} employees={employees} />

            <section>
                <ProjectForm contract_id={id} employees={employees} />
            </section>
        </AuthenticatedLayout>
    );
}
