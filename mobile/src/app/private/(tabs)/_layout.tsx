import React from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ScheduledPosts from "./index";
import Drafts from "./drafts";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

const MainTabs: React.FC = () => {
    const params = useLocalSearchParams();

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
};

export default MainTabs;
