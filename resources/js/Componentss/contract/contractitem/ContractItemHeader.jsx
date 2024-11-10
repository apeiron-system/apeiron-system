import { Edit, ArrowLeft } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import _ from "lodash";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";

export default function ContractItemHeader({
    contract,
    signingAuthorityEmployee,
}) {
    return (
        <section className="grid grid-cols-3">
            <div>
                <Link href={`/contract/${contract.id}`}>
                    <button className="text-gray-500 flex items-center gap-2 pb-4">
                        <ArrowLeft />
                    </button>
                </Link>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Contract - {contract.contract_name}
                </h2>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            View Contract Details
                        </AccordionTrigger>
                        <AccordionContent>
                            <div>
                                <h2 className="text-sm text-gray-600 leading-tight mt-2">
                                    Contract ID - {contract.id}
                                </h2>
                                <h2 className="text-sm text-gray-600 leading-tight mt-2">
                                    Status - {_.capitalize(contract.status)}
                                </h2>
                                <h2 className="text-sm text-gray-600 leading-tight mt-2">
                                    Date - {contract.date}
                                </h2>
                                {signingAuthorityEmployee && (
                                    <h2 className="text-sm text-gray-600 leading-tight mt-2">
                                        Authorized Representative -{" "}
                                        {signingAuthorityEmployee.first_name +
                                            " " +
                                            signingAuthorityEmployee.last_name}
                                    </h2>
                                )}
                            </div>
                            <div>
                                <h2 className="text-sm text-gray-600 leading-tight mt-2">
                                    Location - {contract.location}
                                </h2>
                                <h2 className="text-sm text-gray-600 leading-tight mt-2">
                                    Duration in Days -{" "}
                                    {contract.duration_in_days}
                                </h2>
                                <h2 className="text-sm text-gray-600 leading-tight mt-2">
                                    Amount - {contract.amount}
                                </h2>
                                <h2 className="text-sm text-gray-600 leading-tight mt-2">
                                    Designation - {contract.designation}
                                </h2>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

        </section>
    );
}
