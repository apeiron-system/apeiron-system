import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";

export default function AddProjectButton({ id }) {
    return (
        <Button
            onClick={() => window.location.href = route("contract.project.add", id)}
        >
            <Plus color="white" />
        </Button>
    );
}
