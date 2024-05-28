import ContractForm from "@/Componentss/contract/ContractForm";
import ContractTabNavigation from "@/Componentss/contract/ContractTabNavigation";
import ProjectTabNavigation from "@/Componentss/contract/project/ProjectTabNavigation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProjectForm from "../../../Componentss/contract/project/ProjectForm";
import _ from "lodash";

export default function AddProjectPage({ auth, contract, employees, signingAuthorityEmployee }) {
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
                        <h2 className="text-sm text-gray-600 leading-tight mt-2">
                            Date - {contract.date}
                        </h2>
                        <h2 className="text-sm text-gray-600 leading-tight mt-2">
                            Authorized Representative -
                            {signingAuthorityEmployee.first_name +
                                " " +
                                signingAuthorityEmployee.last_name}
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

                        <h2 className="text-sm text-gray-600 leading-tight mt-2">
                            Designation - {contract.designation}
                        </h2>
                    </div>
                </section>
            }
        >
            <Head title="Add Project" />

            <ProjectTabNavigation id={contract.id} employees={employees} />

            <section className="ml-4 mt-2">
                <h1 className="font-bold text-lg">Add Project</h1>
            </section>

            <section>
                <ProjectForm contract_id={contract.id} employees={employees} />
            </section>
        </AuthenticatedLayout>
    );
}
