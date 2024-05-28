import { Edit } from "lucide-react";
import DialogDeleteContract from "./DialogDeleteContract";
import { Link, router } from "@inertiajs/react";
import {Button} from "@/components/ui/button";
import _ from "lodash";

export default function ContractHeader({ contract, signingAuthorityEmployee }) {
    return (
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
                    Authorized Representative -{" "}
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
            <div className="w-full text-right">
                <Link href={`/contract/${contract.id}/edit`}>
                    <Button variant="outline">
                        <Edit />
                    </Button>
                </Link>
                <DialogDeleteContract
                    contract={contract}
                    onDelete={() => {
                        router.delete(route("contract.delete", contract.id));
                    }}
                />
            </div>
        </section>
    );
}
