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

export default function JobOrderContractsPage({ auth, activeContracts, pastContracts, sortBy }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="pl-10 font-bold text-3xl text-gray-1000 leading-tight">
                        Job Order Contracts
                    </h2>
                </div>
            }
        >
            <Head title="Job Order Contracts" />

            {/* Active Contracts Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="pb-4 font-bold text-2xl text-gray-1000 leading-tight">
                        Active Contracts
                    </h3>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="px-4 py-1 hover:bg-slate-100"
                        >
                            Sort By: {sortBy === 'recent' ? 'Most Recent' : 'Oldest'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleSort('recent')}>
                            Most Recent
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort('oldest')}>
                            Oldest
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="pb-5">
                <div className="max-w-7xl mx-auto">
                    {activeContracts.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            No active contracts found
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            {activeContracts.map((contract) => (
                                <Card
                                    key={contract.id}
                                    className="w-80 bg-white rounded-lg shadow-lg"
                                >
                                    <CardHeader>
                                        <CardTitle className="text-lg font-bold">
                                            {contract.name}
                                        </CardTitle>
                                        <CardDescription>
                                            Contract ID: {contract.contract_id}
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
                                                {formatCurrency(contract.budget)}
                                            </p>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Link
                                            href={route("job-order-projects")}
                                            className="w-full"
                                        >
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
                    )}

                    {/* Past Contracts Section */}
                    <h3 className="font-bold text-2xl text-gray-1000 leading-tight mb-4 mt-8">
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
                            {pastContracts.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center text-gray-500"
                                    >
                                        No past contracts found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                pastContracts.data.map((contract) => (
                                    <TableRow key={contract.id}>
                                        <TableCell>{contract.contract_id}</TableCell>
                                        <TableCell>{contract.name}</TableCell>
                                        <TableCell>
                                            {new Date(contract.start_date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(contract.end_date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost">
                                                        &#8226;&#8226;&#8226;
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route("job-order-projects")}>
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {pastContracts.links && pastContracts.links.length > 3 && (
                        <div className="mt-4 flex justify-center">
                            {/* Add pagination component here */}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}