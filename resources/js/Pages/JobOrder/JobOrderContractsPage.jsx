import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const activeContracts = [
    {
        id: "ACT001",
        name: "Contract Delta",
        location: "Panabo, Davao City",
        duration: "12 months",
        budget: "₱ 1,500,000.00",
        startDate: "2023-06-01",
        endDate: "2024-06-01",
    },
    {
        id: "ACT002",
        name: "Contract Epsilon",
        location: "Tagum, Davao del Norte",
        duration: "18 months",
        budget: "₱ 2,000,000.00",
        startDate: "2023-02-15",
        endDate: "2024-08-15",
    },
];

const pastContracts = [
    {
        id: "PST001",
        name: "Contract Alpha",
        startDate: "2022-01-10",
        endDate: "2023-01-10",
    },
    {
        id: "PST002",
        name: "Contract Beta",
        startDate: "2022-03-20",
        endDate: "2023-03-20",
    },
    {
        id: "PST003",
        name: "Contract Gamma",
        startDate: "2021-09-01",
        endDate: "2022-09-01",
    },
];

export default function JobOrderContractsPage({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="pl-4 font-bold text-3xl text-gray-1000 leading-tight">
                        Job Order Contracts
                    </h2>
                </div>
            }
        >
            <Head title="Job Order Contracts" />

            {/* Active Contracts Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-semibold pl-10">
                        Active Contracts
                    </h3>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="px-4 py-1 hover:bg-slate-100"
                        >
                            Sort By
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Most Recent</DropdownMenuItem>
                        <DropdownMenuItem>Oldest</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex space-x-4">
                        {activeContracts.map((contract, index) => (
                            <Card
                                key={index}
                                className="w-80 bg-white rounded-lg shadow-lg mb-10"
                            >
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold">
                                        {contract.name}
                                    </CardTitle>
                                    <CardDescription>
                                        Contract ID: {contract.id}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-4">
                                        <p className="text-gray-700">
                                            Location:
                                        </p>
                                        <p className="text-gray-400">
                                            {contract.location}
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-gray-700">
                                            Duration:
                                        </p>
                                        <p className="text-gray-400">
                                            {contract.duration}
                                        </p>
                                    </div>
                                    <div className="mb-6">
                                        <p className="text-gray-700">Budget:</p>
                                        <p className="text-gray-400">
                                            {contract.budget}
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link href={route("job-order-projects")}>
                                        <Button
                                            variant="primary"
                                            className="w-full bg-slate-600 hover:bg-slate-800 text-white"
                                        >
                                            View
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Past Contracts Section */}
                    <h3 className="text-xl font-semibold mb-4">
                        Past Contracts
                    </h3>

                    {/* Table Contents */}
                    <Table>
                        <TableCaption>
                            A list of past job order contracts.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Contract ID</TableHead>
                                <TableHead>Contract Name</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pastContracts.map((contract) => (
                                <TableRow key={contract.id}>
                                    <TableCell>{contract.id}</TableCell>
                                    <TableCell>{contract.name}</TableCell>
                                    <TableCell>{contract.startDate}</TableCell>
                                    <TableCell>{contract.endDate}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost">
                                                    &#8226;&#8226;&#8226;
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem asChild>
                                                    <Link href="#">View</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="#">Delete</Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
