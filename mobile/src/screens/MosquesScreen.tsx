import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Typography } from "../styles/typography";
import MosqueCard from "@/components/ui/MosqueCard";
import { Mosque } from "@/types/mosqueTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMosqueData } from "@/hooks/useMosqueData";

const MosquesScreen: React.FC = () => {
    const { colors } = useTheme();
    const { mosques, loading, error } = useMosqueData();

    const handleMosquePress = (mosque: Mosque) => {
        // TODO: Navigate to mosque details screen
        console.log("Selected mosque:", mosque.name);
    };

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.primary }]}>
                <View style={styles.centerContent}>
                    <Text style={[styles.loadingText, { color: colors.content.primary }]}>Loading mosques...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.primary }]}>
                <View style={styles.centerContent}>
                    <Text style={[styles.errorText, { color: colors.status.error }]}>{error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.primary }]}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text
                        style={[
                            styles.title,
                            {
                                color: colors.content.primary,
                                fontFamily: Typography.heading.h1.fontFamily,
                            },
                        ]}
                    >
                        Nearby Mosques
                    </Text>
                    <Text
                        style={[
                            styles.subtitle,
                            {
                                color: colors.content.secondary,
                                fontFamily: Typography.bodyText.medium.fontFamily,
                            },
                        ]}
                    >
                        Discover mosques in your area
                    </Text>
                </View>

                <View style={styles.mosquesList}>
                    {mosques.map((mosque) => (
                        <View key={mosque.id} style={styles.mosqueCardWrapper}>
                            <MosqueCard mosque={mosque} onPress={handleMosquePress} showMapButton={true} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    centerContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        marginBottom: 24,
        paddingHorizontal: 4,
    },
    title: {
        fontSize: Typography.heading.h1.fontSize,
        lineHeight: Typography.heading.h1.lineHeight,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: Typography.bodyText.medium.fontSize,
        lineHeight: Typography.bodyText.medium.lineHeight,
        opacity: 0.8,
    },
    loadingText: {
        fontSize: Typography.bodyText.large.fontSize,
        lineHeight: Typography.bodyText.large.lineHeight,
        fontFamily: Typography.bodyText.large.fontFamily,
    },
    errorText: {
        fontSize: Typography.bodyText.medium.fontSize,
        lineHeight: Typography.bodyText.medium.lineHeight,
        fontFamily: Typography.bodyText.medium.fontFamily,
        textAlign: "center",
    },
    mosquesList: {
        gap: 16,
    },
    mosqueCardWrapper: {
        alignItems: "center",
    },
});

export default MosquesScreen;
