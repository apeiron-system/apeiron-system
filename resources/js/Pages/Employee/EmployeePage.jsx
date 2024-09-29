import TabNavigation from "@/Componentss/TabbedNavigation";
import EmployeeTabNavigation from "@/Componentss/employee/EmployeeTabNavigation";
import EmployeeTable from "@/Componentss/employee/EmployeeTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Page({ auth, employees }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    View Employee
                </h2>
            }
        >
            <Head title="Employee" />

            <EmployeeTabNavigation />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* make a table */}
                            <EmployeeTable employees={employees} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
