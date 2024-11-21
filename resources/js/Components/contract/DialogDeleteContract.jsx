import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Trash } from "lucide-react";

export default function DialogDeleteContract({ contract, onDelete }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="danger">
                    <Trash />
                </Button>
            </DialogTrigger>
            {contract && (
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Contract</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            {contract.contract_name}?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={onDelete} variant="danger">
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            )}
        </Dialog>
    );
}
