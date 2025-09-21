import React from "react";
import { Drawer } from "expo-router/drawer";
import { useTheme } from "@/hooks/useTheme";

const PrivateLayout: React.FC = () => {
    const { colors } = useTheme();

    return (
        <Drawer
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
                    drawerLabel: "Home",
                    title: "Home",
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
