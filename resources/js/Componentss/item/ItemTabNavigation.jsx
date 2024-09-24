import TabNavigation from "../TabbedNavigation";

export default function ItemContractTabNavigation({ contractId }) {
    return (
        <TabNavigation
            routeObject={[
                {
                    routeName: "View Items",
                    route: route("item.contract", contractId),
                },

                {
                    routeName: "Add Items",
                    route: route("item.contract.create", contractId),
                },
            ]}
        />
    );
}
