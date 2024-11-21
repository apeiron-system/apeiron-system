import TabNavigation from "../TabbedNavigation";

export default function EmployeeTabNavigation() {
    return (
        <TabNavigation
            routeObject={[
                {
                    routeName: "View Employees",
                    route: route("employees"),
                },
                {
                    routeName: "Add Employee",
                    route: route("employee.add"),
                },
            ]}
        />
    );
}
