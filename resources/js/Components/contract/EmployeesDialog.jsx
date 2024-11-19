import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { useState } from "react";

export default function EmployeesDialog({
    employees,
    onSelect,
    selectedEmployee,
}) {
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(
        selectedEmployee ? selectedEmployee : null
    );
    const [addedSelectedEmployeeId, setAddedSelectedEmployeeId] =
        useState(selectedEmployee ? selectedEmployee : null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddEmployee = () => {
        setAddedSelectedEmployeeId(selectedEmployeeId);
        onSelect(selectedEmployeeId);
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)} variant="outline">
                    {addedSelectedEmployeeId
                        ? employees.find(
                              (employee) =>
                                  employee.id === addedSelectedEmployeeId
                          ).first_name +
                          " " +
                          employees.find(
                              (employee) =>
                                  employee.id === addedSelectedEmployeeId
                          ).last_name
                        : employees
                        ? "Select Employee"
                        : "Loading Employees"}
                </Button>
            </DialogTrigger>
            {employees && (
                <DialogContent className="max-w-[900px]">
                    <DialogHeader>
                        <DialogTitle>Select Employee</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-x-auto">
                        <Table className="min-w-full">
                            <TableCaption>Employees</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Select</TableHead>
                                    <TableHead>First Name</TableHead>
                                    <TableHead>Last Name</TableHead>
                                    <TableHead>Phone Number</TableHead>
                                    <TableHead>Email Address</TableHead>
                                    <TableHead>Employee Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>
                                            <input
                                                type="radio"
                                                name="selectedEmployee"
                                                value={employee.id}
                                                checked={
                                                    selectedEmployeeId ===
                                                    employee.id
                                                }
                                                onChange={() =>
                                                    setSelectedEmployeeId(
                                                        employee.id
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {employee.first_name}
                                        </TableCell>
                                        <TableCell>
                                            {employee.last_name}
                                        </TableCell>
                                        <TableCell>
                                            {employee.phone_number}
                                        </TableCell>
                                        <TableCell>
                                            {employee.email_address}
                                        </TableCell>
                                        <TableCell>
                                            {employee.employee_role}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleAddEmployee}>Add</Button>
                    </DialogFooter>
                </DialogContent>
            )}
        </Dialog>
    );
}
