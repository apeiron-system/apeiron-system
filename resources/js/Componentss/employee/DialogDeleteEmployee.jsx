import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function DialogDeleteEmployee({ employee, onDelete }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="danger">Delete</Button>
            </DialogTrigger>
            {employee && (
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Employee</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            {employee.first_name} {employee.last_name}?
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
