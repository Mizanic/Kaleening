import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { Typography } from "../../styles/typography";
import { Mosque } from "@/types/mosqueTypes";

interface MosqueCardProps {
    mosque: Mosque;
    onPress?: (mosque: Mosque) => void;
}

const MosqueCard: React.FC<MosqueCardProps> = ({ mosque, onPress }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.card, { backgroundColor: colors.surface.secondary, borderColor: colors.border.secondary }]}>
            {/* Row 1: Photo and Details */}
            <View style={styles.topRow}>
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
                            <Text style={[styles.addressText, { color: colors.content.secondary }]} numberOfLines={2}>
                                {mosque.address.street}
                            </Text>
                            <Text style={[styles.cityStateText, { color: colors.content.secondary }]} numberOfLines={1}>
                                {mosque.address.city}, {mosque.address.state}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Row 2: Integrated Button Row */}
            <TouchableOpacity
                style={[styles.buttonRow, { backgroundColor: colors.interactive.primary.default }]}
                onPress={() => onPress?.(mosque)}
                activeOpacity={0.8}
            >
                <Text style={[styles.buttonText, { color: colors.pure.white }]}>Book Appointment</Text>
                <Ionicons name="arrow-forward" size={20} color={colors.pure.white} />
            </TouchableOpacity>
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
    topRow: {
        flexDirection: "row",
    },
    image: {
        width: 110,
        height: 110,
        resizeMode: "cover",
    },
    contentContainer: {
        flex: 1,
        padding: 12,
        justifyContent: "space-between",
    },
    mosqueName: {
        ...Typography.heading.h5,
        fontWeight: "bold",
    },
    addressContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 6,
        gap: 6,
    },
    addressTextContainer: {
        flex: 1,
    },
    addressText: {
        ...Typography.bodyText.small,
        lineHeight: 18,
    },
    cityStateText: {
        ...Typography.captionText.large,
        marginTop: 2,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: "rgba(255, 255, 255, 0.1)",
    },
    buttonText: {
        ...Typography.button.medium,
        fontWeight: "600",
    },
});

export default MosqueCard;
