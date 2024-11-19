import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import _ from "lodash";
import { Link, router } from "@inertiajs/react";

export default function ProjectPartTable({
    projectParts,
    contract_id,
    project_id,
}) {
    router;

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
                            className="group"
                        >
                            <TableCell>{projectPart.description}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                    <Button variant="ghost" size="sm">
                                        <Link
                                            href={`/contract/${contract_id}/project/${project_id}/part/${projectPart.id}/edit`}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            router.delete(
                                                `/contract/${contract_id}/project/${project_id}/part/${projectPart.id}/delete`
                                            );
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
