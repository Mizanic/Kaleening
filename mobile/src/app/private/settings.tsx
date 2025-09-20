import React from "react";
import { Stack, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView, Pressable, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacing } from "@/styles";
import { useSettingsStore } from "@/stores/settingStore";
import { Theme } from "@/types/settingsTypes";
import * as Haptics from "expo-haptics";

const Settings: React.FC = () => {
    const router = useRouter();
    const { theme, hapticFeedback, setTheme, setHapticFeedback } = useSettingsStore();
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const themeOptions: { label: string; value: Theme }[] = [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
        { label: "System", value: "system" },
    ];

    const handleThemeChange = (newTheme: Theme) => {
        if (hapticFeedback === "enabled") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        setTheme(newTheme);
    };

    const handleHapticFeedbackChange = (value: boolean) => {
        if (value) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        setHapticFeedback(value ? "enabled" : "disabled");
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View className="flex-1" style={{ backgroundColor: colors.surface.primary }}>
                {/* Custom Header */}
                <View
                    className="flex-row items-center border-b"
                    style={{
                        paddingTop: insets.top,
                        paddingHorizontal: Spacing.md,
                        paddingBottom: Spacing.md,
                        backgroundColor: colors.surface.primary,
                        borderBottomColor: colors.border.secondary,
                    }}
                >
                    <TouchableOpacity className="p-2" onPress={() => router.back()} style={{ marginRight: Spacing.md }} activeOpacity={0.7}>
                        <Ionicons name="arrow-back" size={24} color={colors.content.primary} />
                    </TouchableOpacity>
                    <Text className="flex-1 text-lg font-semibold" style={{ color: colors.content.primary }}>
                        Settings
                    </Text>
                </View>

                {/* Settings Content */}
                <ScrollView className="flex-1" style={{ backgroundColor: colors.surface.primary }}>
                    <View className="p-lg">
                        {/* Theme Setting */}
                        <View className="flex-row justify-between items-center mb-lg">
                            <Text className="text-base flex-1" style={{ color: colors.content.primary }}>
                                Theme
                            </Text>
                            <View className="flex-row rounded-md overflow-hidden" style={{ backgroundColor: colors.surface.secondary }}>
                                {themeOptions.map((option) => (
                                    <Pressable
                                        key={option.value}
                                        className="py-sm px-md"
                                        style={{ backgroundColor: theme === option.value ? colors.palette.primary[500] : "transparent" }}
                                        onPress={() => handleThemeChange(option.value)}
                                    >
                                        <Text style={{ color: theme === option.value ? colors.pure.white : colors.content.primary }}>
                                            {option.label}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        {/* Haptic Feedback Setting */}
                        <View className="flex-row justify-between items-center mb-lg">
                            <Text className="text-base flex-1" style={{ color: colors.content.primary }}>
                                Haptic Feedback
                            </Text>
                            <Switch value={hapticFeedback === "enabled"} onValueChange={handleHapticFeedbackChange} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default Settings;
