import ProjectTabNavigation from "@/Componentss/contract/project/ProjectTabNavigation";
import ProjectsTable from "@/Componentss/contract/project/ProjectsTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Head, Link } from "@inertiajs/react";
import _ from "lodash";
import { Edit } from "lucide-react";

export default function ViewContractPage({ auth, contract, projects }) {
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
                <section className="grid grid-cols-3">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Contract - {contract.contract_name}
                        </h2>
                        <h2 className="text-sm text-gray-600 leading-tight mt-2">
                            Contract ID - {contract.id}
                        </h2>
                        <h2 className="text-sm text-gray-600 leading-tight mt-2">
                            Status - {_.capitalize(contract.status)}
                        </h2>
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-600 leading-tight mt-2">
                            Location - {contract.location}
                        </h2>
                        <h2 className="text-sm text-gray-600 leading-tight mt-2">
                            Duration in Days - {contract.duration_in_days}
                        </h2>
                        <h2 className="text-sm text-gray-600 leading-tight mt-2">
                            Amount - {contract.amount}
                        </h2>
                    </div>
                    <div className="w-full text-right">
                        <Link href={`/contract/${contract.id}/edit`}>
                            <Button variant="outline">
                                <Edit />
                            </Button>
                        </Link>
                    </div>
                </section>
            }
        >
            <Head title={`View Contract - ${contract.contract_name}`} />

            <ProjectTabNavigation id={contract.id} />

            <section className="ml-4 mt-2">
                <h1 className="font-bold text-lg">Projects</h1>
                {projects && <ProjectsTable projects={projects} />}
            </section>

            <section></section>
        </AuthenticatedLayout>
    );
}
