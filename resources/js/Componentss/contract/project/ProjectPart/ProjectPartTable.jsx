import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

export default function ProjectPartTable({
    projectParts,
    contract_id,
    project_id,
}) {

    return (
        <div>
            <Table>
                <TableCaption>Project Parts</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {projectParts.map((projectPart) => (
                        <TableRow
                            key={"project-part-" + projectPart.id}
                            className="group cursor-pointer"
                        >
                            <TableCell
                                onClick={() =>
                                    (window.location.href = `/contract/${contract_id}/project/${project_id}/part/${projectPart.id}`)
                                }
                            >
                                {projectPart.description}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
