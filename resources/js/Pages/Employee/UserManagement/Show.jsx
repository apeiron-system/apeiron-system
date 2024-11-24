import EmployeeTabNavigation from "@/Components/employee/EmployeeTabNavigation";
import EmployeeUserManagementSection from "@/Components/employee/EmployeeUserManagementSection";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, employee, user, permissions }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User Management
                </h2>
            }
        >
            <Head title="Add Employee" />

            <EmployeeTabNavigation />

            <div className="py-12">
                <div>Employee Name: {employee.first_name + " " + employee.last_name}</div>
                <div>Employee Email: {employee.email_address}</div>
                <div>Role: {employee.employee_role}</div>
                <hr className="my-4"/>
                <div className="mt-4">
                    <EmployeeUserManagementSection auth={auth} user={user} employee={employee} permissions={permissions} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
