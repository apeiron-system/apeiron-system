import TabNavigation from "../TabbedNavigation";

export default function ContractTabNavigation() {
    return (
        <TabNavigation
            routeObject={[
                {
                    routeName: "View Contract",
                    route: route("contract"),
                },
                {
                    routeName: "Add Contract",
                    route: route("contract.add"),
                },
            ]}
        />
    );
}
