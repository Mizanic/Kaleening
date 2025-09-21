import React from "react";
import { Drawer } from "expo-router/drawer";
import { useTheme } from "@/hooks/useTheme";

const PrivateLayout: React.FC = () => {
    const { colors } = useTheme();

    return (
        <Drawer
            initialRouteName="(tabs)"
            screenOptions={{
                drawerStyle: {
                    backgroundColor: colors.surface.primary,
                },
                drawerActiveTintColor: colors.interactive.primary.default,
                drawerInactiveTintColor: colors.content.secondary,
                drawerLabelStyle: {
                    color: colors.content.primary,
                },
                headerStyle: {
                    backgroundColor: colors.surface.secondary,
                },
                headerTintColor: colors.content.primary,
                headerTitleStyle: {
                    color: colors.content.primary,
                },
            }}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    drawerLabel: "Dashboard",
                    title: "Dashboard",
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="my-mosques"
                options={{
                    drawerLabel: "My Mosques",
                    title: "My Mosques",
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="all-mosques"
                options={{
                    drawerLabel: "All Mosques",
                    title: "All Mosques",
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="my-profile"
                options={{
                    drawerLabel: "My Profile",
                    title: "My Profile",
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="settings"
                options={{
                    drawerLabel: "Settings",
                    title: "Settings",
                }}
            />
        </Drawer>
    );
};

export default PrivateLayout;
