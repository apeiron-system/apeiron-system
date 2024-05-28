import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ProjectsTable({ projects }) {
    // $table->id();
    // $table->timestamps();

    // $table->string("project_name");
    // $table->enum("status", ["pending", "ongoing", "canceled", "completed"])->default("pending");
    // //for the location
    // $table->string("street_address");
    // $table->string("barangay");
    // $table->string("city");
    // $table->string("province");
    // $table->string("zip_code");
    // $table->string("country");

    // $table->integer("duration_in_days");
    // $table->integer("num_of_units");
    // $table->decimal("abc_value", 15, 2);

    // $table->foreignId("submitted_by_employee_id");
    // $table->foreign("submitted_by_employee_id")->references("id")->on("employee");

    // $table->foreignId("signing_authority_employee_id");
    // $table->foreign("signing_authority_employee_id")->references("id")->on("employee");

    // $table->foreignId("contract_id");
    // $table->foreign("contract_id")->references("id")->on("contract");

    return (
        <div>
            <Table>
                <TableCaption>Projects</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Duration in Days</TableHead>
                        <TableHead>Number of Units</TableHead>
                        <TableHead>ABC Value</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.map((project) => (
                        <TableRow
                            key={"project-" + project.id}
                            onClick={() => {
                                window.location.href = `/contract/${contract.id}/project/${project.id}`;
                            }}
                        >
                            <TableCell>{project.project_name}</TableCell>
                            <TableCell>
                                {project.street_address}, {project.barangay},{" "}
                                {project.city}, {project.province},{" "}
                                {project.zip_code}, {project.country}
                            </TableCell>
                            <TableCell>{project.num_of_units}</TableCell>
                            <TableCell>{project.abc_value}</TableCell>
                            <TableCell>{project.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
