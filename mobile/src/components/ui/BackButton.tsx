import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { router } from "expo-router";

const BackButton: React.FC = () => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 8, padding: 8 }}>
            <Ionicons name="arrow-back" size={24} color={colors.content.primary} />
        </TouchableOpacity>
    );
};

export default BackButton;
