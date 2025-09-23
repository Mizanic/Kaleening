import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { Typography } from "../../styles/typography";
import { Mosque, MosqueAddress } from "@/types/mosqueTypes";

interface MosqueCardProps {
    mosque: Mosque;
    onPress?: (mosque: Mosque) => void;
    showMapButton?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.9;

const MosqueCard: React.FC<MosqueCardProps> = ({ mosque, onPress, showMapButton = true }) => {
    const { colors } = useTheme();
    const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);

    const handlePhotoScroll = (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        setCurrentPhotoIndex(roundIndex);
    };

    const formatCoordinates = (lat: number, lng: number) => {
        return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    };

    const formatAddress = (address: MosqueAddress) => {
        return `${address.street}, ${address.city}, ${address.state} ${address.pinCode}, ${address.country}`;
    };

    return (
        <TouchableOpacity
            style={[
                styles.card,
                {
                    backgroundColor: colors.surface.tertiary,
                    shadowColor: colors.pure.black,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4,
                },
            ]}
            onPress={() => onPress?.(mosque)}
            activeOpacity={0.8}
        >
            {/* Photo Gallery */}
            {mosque.photos.length > 0 && (
                <View style={styles.photoContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handlePhotoScroll}
                        scrollEventThrottle={16}
                        style={styles.photoScrollView}
                    >
                        {mosque.photos.map((photo, index) => (
                            <Image key={index} source={{ uri: photo }} style={styles.photo} resizeMode="cover" />
                        ))}
                    </ScrollView>

                    {/* Photo Indicators */}
                    {mosque.photos.length > 1 && (
                        <View style={styles.photoIndicators}>
                            {mosque.photos.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.indicator,
                                        {
                                            backgroundColor:
                                                index === currentPhotoIndex ? colors.interactive.primary.default : colors.border.secondary,
                                            opacity: index === currentPhotoIndex ? 1 : 0.4,
                                        },
                                    ]}
                                />
                            ))}
                        </View>
                    )}
                </View>
            )}

            {/* Mosque Info */}
            <View style={styles.infoContainer}>
                {/* Name */}
                <View style={styles.nameSection}>
                    <Ionicons name="business" size={24} color={colors.interactive.primary.default} style={styles.mosqueIcon} />
                    <Text
                        style={[
                            styles.mosqueName,
                            {
                                color: colors.content.primary,
                                fontFamily: Typography.heading.h2.fontFamily,
                            },
                        ]}
                        numberOfLines={2}
                    >
                        {mosque.name}
                    </Text>
                </View>

                {/* Address */}
                <View style={styles.addressSection}>
                    <Ionicons name="location" size={20} color={colors.content.secondary} style={styles.addressIcon} />
                    <View style={styles.addressTextContainer}>
                        <Text
                            style={[
                                styles.addressText,
                                {
                                    color: colors.content.secondary,
                                    fontFamily: Typography.bodyText.medium.fontFamily,
                                },
                            ]}
                            numberOfLines={3}
                        >
                            {formatAddress(mosque.address)}
                        </Text>
                    </View>
                </View>

                {/* GPS Coordinates */}
                <View style={styles.coordinatesSection}>
                    <Ionicons name="navigate" size={18} color={colors.interactive.primary.default} style={styles.coordinatesIcon} />
                    <Text
                        style={[
                            styles.coordinatesText,
                            {
                                color: colors.content.tertiary,
                                fontFamily: Typography.captionText.medium.fontFamily,
                            },
                        ]}
                    >
                        {formatCoordinates(mosque.coordinates.latitude, mosque.coordinates.longitude)}
                    </Text>
                </View>

                {/* Additional Info */}
                {mosque.capacity && (
                    <View style={styles.additionalInfo}>
                        <View style={styles.infoItem}>
                            <Ionicons name="people" size={16} color={colors.content.tertiary} />
                            <Text
                                style={[
                                    styles.infoText,
                                    {
                                        color: colors.content.tertiary,
                                        fontFamily: Typography.captionText.small.fontFamily,
                                    },
                                ]}
                            >
                                Capacity: {mosque.capacity}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Action Buttons */}
                {showMapButton && (
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={[
                                styles.mapButton,
                                {
                                    backgroundColor: colors.interactive.primary.default,
                                },
                            ]}
                            onPress={() => {
                                // TODO: Implement map navigation
                                console.log("Navigate to map");
                            }}
                        >
                            <Ionicons name="map" size={16} color={colors.pure.white} />
                            <Text
                                style={[
                                    styles.mapButtonText,
                                    {
                                        color: colors.pure.white,
                                        fontFamily: Typography.button.medium.fontFamily,
                                    },
                                ]}
                            >
                                View on Map
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        borderRadius: 16,
        marginVertical: 8,
        overflow: "hidden",
    },
    photoContainer: {
        height: 200,
        position: "relative",
    },
    photoScrollView: {
        flex: 1,
    },
    photo: {
        width: CARD_WIDTH,
        height: 200,
    },
    photoIndicators: {
        position: "absolute",
        bottom: 12,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    infoContainer: {
        padding: 16,
        gap: 12,
    },
    nameSection: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
    },
    mosqueIcon: {
        marginTop: 2,
        flexShrink: 0,
    },
    mosqueName: {
        flex: 1,
        fontSize: Typography.heading.h2.fontSize,
        lineHeight: Typography.heading.h2.lineHeight,
        fontWeight: "600",
    },
    addressSection: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },
    addressIcon: {
        marginTop: 2,
        flexShrink: 0,
    },
    addressTextContainer: {
        flex: 1,
    },
    addressText: {
        fontSize: Typography.bodyText.medium.fontSize,
        lineHeight: Typography.bodyText.medium.lineHeight,
    },
    coordinatesSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingVertical: 4,
    },
    coordinatesIcon: {
        flexShrink: 0,
    },
    coordinatesText: {
        fontSize: Typography.captionText.medium.fontSize,
        lineHeight: Typography.captionText.medium.lineHeight,
        flex: 1,
    },
    additionalInfo: {
        flexDirection: "row",
        gap: 16,
        paddingTop: 4,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    infoText: {
        fontSize: Typography.captionText.small.fontSize,
        lineHeight: Typography.captionText.small.lineHeight,
    },
    actionButtons: {
        paddingTop: 8,
    },
    mapButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    mapButtonText: {
        fontSize: Typography.button.medium.fontSize,
        lineHeight: Typography.button.medium.lineHeight,
        fontWeight: "600",
    },
});

export default MosqueCard;

// Example usage:
/*
import MosqueCard, { Mosque, MosqueAddress } from './MosqueCard';

const exampleMosque: Mosque = {
    id: "1",
    name: "Masjid Al-Furqan",
    photos: [
        "https://example.com/mosque1.jpg",
        "https://example.com/mosque2.jpg"
    ],
    address: {
        street: "123 Islamic Street",
        city: "Mecca",
        state: "Makkah",
        country: "Saudi Arabia",
        pinCode: "21955"
    },
    coordinates: {
        latitude: 21.4225,
        longitude: 39.8262
    },
    establishedYear: 1985,
    capacity: 5000
};

<MosqueCard
    mosque={exampleMosque}
    onPress={(mosque) => {
        // Handle mosque selection
        console.log('Selected mosque:', mosque.name);
    }}
    showMapButton={true}
/>
*/
