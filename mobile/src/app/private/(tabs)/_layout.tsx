import React from "react";
import { Tabs } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "@/hooks/useTheme";

const MainTabs: React.FC = () => {
    const { colors } = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.interactive.primary.default,
                tabBarInactiveTintColor: colors.content.secondary,
                tabBarStyle: {
                    backgroundColor: colors.surface.secondary,
                    borderTopColor: colors.border.secondary,
                },
                headerShown: true,
                headerLeft: () => <DrawerToggleButton tintColor={colors.content.primary} />,
                headerStyle: {
                    backgroundColor: colors.surface.secondary,
                },
                headerTintColor: colors.content.primary,
                headerTitleStyle: {
                    color: colors.content.primary,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="drafts"
                options={{
                    title: "Drafts",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="file-text-o" color={color} />,
                }}
            />
        </Tabs>
    );
};

export default MainTabs;
