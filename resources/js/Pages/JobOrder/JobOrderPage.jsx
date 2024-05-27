import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Head, Link } from "@inertiajs/react";

export default function JobOrderPage({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Job Order Projects
                    </h2>
                    <Link href={route('contract')} className="text-indigo-600 hover:text-indigo-900">
                        <Button className="w-15%">
                            Contracts
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Job Order" />
            

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Under Construction! Please wait. Hello World!
                        </div>
                    </div>
                </div>
            </div>

            

        </AuthenticatedLayout>
    );
}
