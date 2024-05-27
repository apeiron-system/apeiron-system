//this layout is meant to be wrapped around the authenticated layout to have tab navigation
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@inertiajs/react";

export default function TabNavigation({ routeObject }) {
    //accepts props that is formatted like
    //[{routeName: string, route: string}]
    //this component would generate a tabbed navigation on top of the page
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {routeObject.map((route) => (
                    <NavigationMenuItem key={route.routeName}>
                        <NavigationMenuLink
                            href={route.route}
                            className={navigationMenuTriggerStyle()}
                        >
                            {route.routeName}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
