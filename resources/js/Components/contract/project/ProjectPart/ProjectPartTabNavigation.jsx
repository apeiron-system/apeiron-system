import TabNavigation from "../../../TabbedNavigation";

export default function ProjectPartTabNavigation({ contract_id, project_id }) {
    return (
        <TabNavigation
            routeObject={[
                {
                    routeName: "Project Overview",
                    route: route("contract.project.view", [
                        contract_id,
                        project_id,
                    ]),
                },
                {
                    routeName: "Add Part",
                    route: route("contract.project.part.add", [
                        contract_id,
                        project_id,
                    ]),
                },
            ]}
        />
    );
}
