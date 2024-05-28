import ProjectTabNavigation from "@/Componentss/contract/project/ProjectTabNavigation";
import ProjectsTable from "@/Componentss/contract/project/ProjectsTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ContractHeader from "@/Componentss/contract/ContractHeader";

export default function ViewContractPage({
    auth,
    contract,
    projects,
    signingAuthorityEmployee,
}) {
    // $table->id();
    //         $table->timestamps();

    //         $table->string("description")->nullable();
    //         $table->enum("status", ["pending", "ongoing", "canceled", "completed"])->default("pending");
    //         $table->string("contract_name");
    //         $table->string("location");
    //         $table->string("designation")->nullable();
    //         $table->integer("duration_in_days");
    //         $table->decimal("amount");
    //         $table->date("date");

    //         $table->foreignId("authorized_representative_employee_id");
    //         $table->foreign("authorized_representative_employee_id")->references("id")->on("employee");

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
            <Head title={`View Contract - ${contract.contract_name}`} />

            <ProjectTabNavigation id={contract.id} />

            <section className="ml-4 mt-2">
                <h1 className="font-bold text-lg">Projects</h1>
                {projects && (
                    <ProjectsTable projects={projects} contract={contract} />
                )}
            </section>

            <section></section>
        </AuthenticatedLayout>
    );
}
