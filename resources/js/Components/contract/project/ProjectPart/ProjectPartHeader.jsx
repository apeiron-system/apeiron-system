import { Edit, ArrowLeft } from "lucide-react";

import { Link, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import _ from "lodash";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";

export default function ProjectPartHeader({
    projectParts,
    contract,
    project
}) {


    return (
        <section className="grid grid-cols-3">
            <div>
                <Link href={`/contract/${contract.id}/project/${project.id}`}>
                    <button className="text-gray-500 flex items-center gap-2 pb-4">
                        <ArrowLeft />
                    </button>
                </Link>

                <h2 className="font-semibold text-xl text-gray-800 leading-tight mt-2">
                    Part - {projectParts.description}
                </h2>
            </div>

        </section>
    );
}
