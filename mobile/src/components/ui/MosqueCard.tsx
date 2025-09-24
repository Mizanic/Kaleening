import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { Typography } from "../../styles/typography";
import { Mosque } from "@/types/mosqueTypes";

interface MosqueCardProps {
    mosque: Mosque;
    onPress?: (mosque: Mosque) => void;
    onViewPress?: (mosque: Mosque) => void;
}

const MosqueCard: React.FC<MosqueCardProps> = ({ mosque, onPress, onViewPress }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.card, { backgroundColor: colors.surface.secondary, borderColor: colors.border.secondary }]}>
            {/* Fixed Height Container for Photo and Details */}
            <View style={styles.contentArea}>
                <Image
                    source={{ uri: mosque.photos[0] }}
                    style={styles.image}
                    onError={() => {
                        // This could be replaced with a fallback image source if desired
                    }}
                />
                <View style={styles.contentContainer}>
                    <Text style={[styles.mosqueName, { color: colors.content.primary }]} numberOfLines={2}>
                        {mosque.name}
                    </Text>
                    <View style={styles.addressContainer}>
                        <Ionicons name="location-sharp" size={14} color={colors.content.secondary} />
                        <View style={styles.addressTextContainer}>
                            <Text style={[styles.addressText, { color: colors.content.secondary }]} numberOfLines={4}>
                                {mosque.address.street}
                            </Text>
                            <View style={styles.spacer} />
                            <Text style={[styles.cityStateText, { color: colors.content.tertiary }]} numberOfLines={1}>
                                {mosque.address.city}, {mosque.address.state} {mosque.address.pinCode}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Fixed Height Button Row */}
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.interactive.secondary.default }]}
                    onPress={() => (onViewPress ? onViewPress(mosque) : onPress?.(mosque))}
                    activeOpacity={0.85}
                >
                    <Ionicons name="eye-outline" size={18} color={colors.content.primary} />
                    <Text style={[styles.buttonText, { color: colors.content.primary }]}>View Mosque</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.interactive.primary.default }]}
                    onPress={() => onPress?.(mosque)}
                    activeOpacity={0.85}
                >
                    <Text style={[styles.buttonText, { color: colors.pure.white }]}>Book Cleaning</Text>
                    <Ionicons name="arrow-forward" size={18} color={colors.pure.white} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 0,
        borderWidth: 0,
        overflow: "hidden",
        flexDirection: "column",
        marginVertical: 8,
        width: "100%",
        alignSelf: "stretch",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    contentArea: {
        flexDirection: "row",
        height: 130, // Fixed height for content area
    },
    image: {
        width: 110,
        height: 130, // Fill entire content area height
        resizeMode: "cover",
        borderRadius: 0,
    },
    contentContainer: {
        flex: 1,
        padding: 12,
        justifyContent: "space-between",
        gap: 8,
    },
    mosqueName: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: "bold",
    },
    addressContainer: {
        flexDirection: "row",
        alignItems: "stretch",
        gap: 8,
        flex: 1,
    },
    addressTextContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    addressText: {
        fontSize: 12,
        lineHeight: 16,
    },
    cityStateText: {
        fontSize: 12,
        lineHeight: 16,
        marginTop: 4,
    },
    spacer: {
        flex: 1,
    },
    buttonRow: {
        flexDirection: "row",
        width: "100%",
    },
    button: {
        width: "50%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 12,
    },
    buttonText: {
        ...Typography.button.medium,
        fontWeight: "600",
    },
});

export default MosqueCard;
