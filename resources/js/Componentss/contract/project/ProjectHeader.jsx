import { Edit, ArrowLeft } from "lucide-react";

import { Link, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import _ from "lodash";
import DialogDeleteProject from "./DialogDeleteProject";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";

export default function ProjectHeader({
    contract,
    project,
    submittedByEmployee,
    signingAuthorityEmployee,
}) {
    // $project->project_name = $request->project_name;
    //     $project->status = $request->status;
    //     $project->street_address = $request->street_address;
    //     $project->barangay = $request->barangay;
    //     $project->city = $request->city;
    //     $project->province = $request->province;
    //     $project->zip_code = $request->zip_code;
    //     $project->country = $request->country;
    //     $project->duration_in_days = $request->duration_in_days;
    //     $project->num_of_units = $request->num_of_units;
    //     $project->abc_value = $request->abc_value;
    //     $project->submitted_by_employee_id = $request->submitted_by_employee_id;
    //     $project->signing_authority_employee_id = $request->signing_authority_employee_id;
    //     $project->contract_id = $contract_id;

    return (
        <section className="grid grid-cols-3">
            <div>
                <Link href={`/contract/${contract.id}`}>
                    <button className="text-gray-500 flex items-center gap-2 pb-4">
                        <ArrowLeft />
                    </button>
                </Link>

                <h2 className="font-semibold text-sm text-gray-500 leading-tight">
                    Contract - {contract.contract_name}
                </h2>

                <h2 className="font-semibold text-xl text-gray-800 leading-tight mt-2">
                    Project - {project.project_name}
                </h2>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-sm">
                            View Project Details
                        </AccordionTrigger>
                        <AccordionContent>
                            <div>
                                <h2 className="text-sm text-gray-600 leading-tight mt-2">
                                    Status - {_.capitalize(project.status)}
                                </h2>
                                <h2 className="text-sm text-gray-600 leading-tight mt-2">
                                    Duration in days -{" "}
                                    {project.duration_in_days}
                                </h2>
                                <h2 className="text-sm text-gray-600 leading-tight mt-2">
                                    Submitted By -{" "}
                                    {submittedByEmployee.first_name +
                                        " " +
                                        submittedByEmployee.last_name}
                                </h2>
                                <h2 className="text-sm text-gray-600 leading-tight mt-2">
                                    Signing Authority -{" "}
                                    {signingAuthorityEmployee.first_name +
                                        " " +
                                        signingAuthorityEmployee.last_name}
                                </h2>
                                <h2 className="text-sm text-gray-600 leading-tight mt-2">
                                    {/* put project location */}
                                    Location -{" "}
                                    {project.street_address +
                                        ", " +
                                        project.barangay +
                                        ", " +
                                        project.city +
                                        ", " +
                                        project.province +
                                        ", " +
                                        project.zip_code +
                                        ", " +
                                        project.country}
                                </h2>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="w-full text-right">
                <Link
                    href={`/contract/${contract.id}/project/${project.id}/edit`}
                >
                    <Button variant="outline">
                        <Edit />
                    </Button>
                </Link>
                <DialogDeleteProject
                    project={project}
                    onDelete={() => {
                        router.delete(
                            route("contract.project.delete", [
                                contract.id,
                                project.id,
                            ])
                        );
                    }}
                />
            </div>
        </section>
    );
}
