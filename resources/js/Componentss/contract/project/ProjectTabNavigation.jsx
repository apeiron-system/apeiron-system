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
                    routeName: "Items",
                    route: route("contract.items", id),
                },
            ]}
        />
    );
}
