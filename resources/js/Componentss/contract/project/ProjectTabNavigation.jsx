import TabNavigation from "../../TabbedNavigation";

export default function ProjectTabNavigation({ id }) {
    return (
        <TabNavigation
            routeObject={[
                {
                    routeName: "Project Overview",
                    route: route("contract.view", id),
                },
                {
                    routeName: "Add Part",
                    route: route("contract.project.add", id),
                },
            ]}
        />
    );
}
