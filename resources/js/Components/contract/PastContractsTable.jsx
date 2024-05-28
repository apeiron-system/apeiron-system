import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function PastContractsTable({ contracts }) {
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
        <div>
            <Table>
                <TableCaption>Past Contracts</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Contract Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Designation</TableHead>
                        <TableHead>Duration in Days</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contracts.map((contract) => (
                        <TableRow key={"contract-" + contract.id}>
                            <TableCell>{contract.contract_name}</TableCell>
                            <TableCell>{contract.location}</TableCell>
                            <TableCell>{contract.designation}</TableCell>
                            <TableCell>{contract.duration_in_days}</TableCell>
                            <TableCell>{contract.amount}</TableCell>
                            <TableCell>{contract.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
