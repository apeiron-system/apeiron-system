import { useState } from "react";
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
import { Link, router } from "@inertiajs/react";
import _ from "lodash";

export default function ProjectPartItemTable({
    type,
    items,
    contract_id,
    project_id,
    project_part_id,
}) {


    return (
        <div className="mt-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Bid Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={`${type}-item-${item.id}`} className="group">
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.bid_amount ? `${item.bid_amount}` : 'N/A'}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            router.delete(
                                                `/contract/${contract_id}/project/${project_id}/part/${project_part_id}/item/${item.id}/delete`
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
