import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function EmployeeTable({ employees }) {
    // $table->id();
    //         $table->timestamps();
    //         $table->string("first_name", length: 255);
    //         $table->string("middle_name");
    //         $table->string("last_name", length: 255);

    //         //columns for address, in the philippines
    //         $table->string("street_address");
    //         $table->string("barangay");
    //         $table->string("city");
    //         $table->string("province");
    //         $table->string("zip_code");
    //         $table->string("country");

    //         //columns for contact information
    //         $table->string("phone_number");
    //         $table->string("email_address");

    //         //columns for employee information
    //         $table->string("employee_role");

    if (!employees) {
        return <div>No employees found</div>;
    }

    return (
        <Table>
            <TableCaption>Employee</TableCaption>
            <TableHead>
                <TableRow>
                    <TableHeader>First Name</TableHeader>
                    <TableHeader>Middle Name</TableHeader>
                    <TableHeader>Last Name</TableHeader>
                    <TableHeader>Street Address</TableHeader>
                    <TableHeader>Barangay</TableHeader>
                    <TableHeader>City</TableHeader>
                    <TableHeader>Province</TableHeader>
                    <TableHeader>Zip Code</TableHeader>
                    <TableHeader>Country</TableHeader>
                    <TableHeader>Phone Number</TableHeader>
                    <TableHeader>Email Address</TableHeader>
                    <TableHeader>Employee Role</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {employees.map((employee) => (
                    <TableRow key={employee.id}>
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
    );
}
