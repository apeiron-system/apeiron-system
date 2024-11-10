import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button"; // Assuming you have a Button component
import { router } from "@inertiajs/react";
import { DialogDeleteEmployee } from "./DialogDeleteEmployee";

export default function EmployeeTable({ employees }) {
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    if (!employees) {
        return <div>No employees found</div>;
    }

    const handleEdit = () => {
        if (selectedEmployeeId) {
            router.get(`/employees/edit/${selectedEmployeeId}`);
        } else {
            alert("Please select an employee to edit");
        }
    };

    const handleDelete = () => {
        if (selectedEmployeeId) {
            // Perform delete action with selectedEmployeeId
            router.delete(`/employees/delete/${selectedEmployeeId}`);
        } else {
            alert("Please select an employee to delete");
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>Employees</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Select</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Middle Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Street Address</TableHead>
                        <TableHead>Barangay</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Province</TableHead>
                        <TableHead>Zip Code</TableHead>
                        <TableHead>Country</TableHead>
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
                                    checked={selectedEmployeeId === employee.id}
                                    onChange={() =>
                                        setSelectedEmployeeId(employee.id)
                                    }
                                />
                            </TableCell>
                            <TableCell>{employee.first_name}</TableCell>
                            <TableCell>{employee.middle_name}</TableCell>
                            <TableCell>{employee.last_name}</TableCell>
                            <TableCell>{employee.street_address}</TableCell>
                            <TableCell>{employee.barangay}</TableCell>
                            <TableCell>{employee.city}</TableCell>
                            <TableCell>{employee.province}</TableCell>
                            <TableCell>{employee.zip_code}</TableCell>
                            <TableCell>{employee.country}</TableCell>
                            <TableCell>{employee.phone_number}</TableCell>
                            <TableCell>{employee.email_address}</TableCell>
                            <TableCell>{employee.employee_role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {employees.length !== 0 && (
                <div className="flex justify-end mt-4">
                    <Button onClick={handleEdit} className="mr-2">
                        Edit
                    </Button>
                    <DialogDeleteEmployee
                        onDelete={handleDelete}
                        employee={employees.find(
                            (employee) => employee.id === selectedEmployeeId
                        )}
                    />
                </div>
            )}
        </div>
    );
}
