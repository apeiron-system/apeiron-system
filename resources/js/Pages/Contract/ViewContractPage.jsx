import ProjectTabNavigation from "@/Componentss/contract/project/ProjectTabNavigation";
import ProjectsTable from "@/Componentss/contract/project/ProjectsTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ContractHeader from "@/Componentss/contract/ContractHeader";
import ContractTabNavigation from "@/Componentss/contract/ContractTabNavigation";
import AddProjectNavigation from "@/Componentss/contract/project/AddProjectNavigation";

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
                    canEdit={true}
                />
            }
        >
            <Head title={`View Contract - ${contract.contract_name}`} />

            <div className="flex justify-between"> 
                <ProjectTabNavigation id={contract.id} />
                <AddProjectNavigation
                    className="flex justify-end"
                    id={contract.id}
                />
            </div>

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
