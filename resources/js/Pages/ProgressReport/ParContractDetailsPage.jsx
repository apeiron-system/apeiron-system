import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ProgressReport({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Progress Accomplishment Details
                </h2>
            }
        >
            <Head title="Progress Accomplishment Details" />

            <h1>Contract Details</h1>
            </AuthenticatedLayout>
    );
}