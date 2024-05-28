import ApplicationLogo from "@/Componentss/ApplicationLogo";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />

            <main>
                <Card className="w-[300px] absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex justify-center">
                                <ApplicationLogo />
                            </div>
                            <div className="text-center mt-4">
                                Apeiron Construction Solutions
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            {auth.user ? (
                                <Link href={route("dashboard")} className="">
                                    <Button className=" w-full">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <div>
                                        <Link
                                            href={route("login")}
                                            className=""
                                        >
                                            <Button className=" w-full">
                                                Log in
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="mt-2">
                                        <Link
                                            href={route("register")}
                                            className=""
                                        >
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                            >
                                                Register
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </>
    );
}
