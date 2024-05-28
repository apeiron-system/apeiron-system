import TabNavigation from "../../TabbedNavigation";

export default function ProjectTabNavigation({ id }) {
    return (
        <TabNavigation
            routeObject={[
                {
                    routeName: "View Projects",
                    route: route("contract.view", id),
                },
                {
                    routeName: "Add Project",
                    route: route("contract.project.add", id),
                },
            ]}
        />
    );
}
