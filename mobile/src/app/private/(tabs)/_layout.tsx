import React from "react";
import { Tabs } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { View } from "react-native";

const MainTabs: React.FC = () => {
    const { colors } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: colors.surface.secondary }}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: colors.accent.green,
                    tabBarStyle: {
                        backgroundColor: colors.surface.secondary,
                        borderColor: colors.border.secondary,
                        borderWidth: 1,
                        margin: 4,
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
                        title: "Dashboard",
                        tabBarIcon: ({ color }) => <MaterialIcons size={28} name="dashboard" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="mosques"
                    options={{
                        title: "Mosques",
                        tabBarIcon: ({ color }) => <MaterialIcons size={28} name="mosque" color={color} />,
                    }}
                />
            </Tabs>
        </View>
    );
};

export default MainTabs;
