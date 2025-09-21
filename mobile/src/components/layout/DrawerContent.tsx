import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from "@react-navigation/drawer";
import { router } from "expo-router";

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
    const { colors } = useTheme();

    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: colors.surface.primary }}>
            {/* User Profile Section */}
            <TouchableOpacity style={styles.profileSection} onPress={() => router.push("/private/my-profile")}>
                <View style={styles.profileContent}>
                    <View style={[styles.avatar, { backgroundColor: colors.interactive.primary.default }]}>
                        <Text style={[styles.avatarText, { color: colors.content.inverse }]}>JD</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={[styles.profileName, { color: colors.content.primary }]}>John Doe</Text>
                        <Text style={[styles.profileEmail, { color: colors.content.secondary }]}>john.doe@example.com</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Divider */}
            <View style={[styles.divider, { backgroundColor: colors.border.accent }]} />

            {/* Navigation Items */}
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    profileSection: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        paddingTop: 40, // Extra padding from top to account for status bar
    },
    profileContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    avatarText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 2,
    },
    profileEmail: {
        fontSize: 14,
    },
    divider: {
        height: 1,
    },
});

export default DrawerContent;
