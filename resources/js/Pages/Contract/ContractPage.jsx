import ContractTabNavigation from "@/Components/contract/ContractTabNavigation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import _ from "lodash";
import PastContractsTable from "@/Components/contract/PastContractsTable";
import ContractCard from "@/Components/contract/ContractCard";

export default function ContractPage({ auth, contracts }) {
    const [statusFilter, setStatusFilter] = useState("all");

    const changeStatusFilter = (status) => {
        setStatusFilter(status);
    };

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
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    View Contracts
                </h2>
            }
        >
            <Head title="Contract" />

            <ContractTabNavigation />

            <section className="mt-4">
                <h1 className="font-bold text-lg">Active Contracts</h1>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            variant="outline"
                            className=" flex border rounded-md gap-4 px-4 py-2"
                        >
                            {_.capitalize(statusFilter)} <ChevronDown />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => {
                                    changeStatusFilter("all");
                                }}
                            >
                                All
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    changeStatusFilter("pending");
                                }}
                            >
                                Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    changeStatusFilter("ongoing");
                                }}
                            >
                                Ongoing
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="mt-4">
                    {/* render card here for contracts */}
                    {contracts &&
                        contracts
                            .filter((contract) => {
                                if (statusFilter === "all") {
                                    return true;
                                }

                                return contract.status === statusFilter;
                            })
                            .map((contract) => {
                                return (
                                    <ContractCard
                                        key={"contract-" + contract.id}
                                        contract={contract}
                                    />
                                );
                            })}
                </div>
            </section>

            <section className="mt-4">
                <h1 className="font-bold text-lg">Past Contracts</h1>
                <div className="mt-4">
                    {contracts && (
                        <PastContractsTable
                            contracts={contracts.filter(
                                (contract) => contract.status === "completed"
                            )}
                        />
                    )}
                    {!contracts && <p>No past contracts found.</p>}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
