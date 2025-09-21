import React from "react";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useAuth } from "@/stores/authStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/styles/global.css";

const RootLayout: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                    <StatusBar />
                    <Stack screenOptions={{ headerShown: false }}>
                        {/* Public routes - always accessible */}
                        <Stack.Screen name="index" />

                        {/* Private routes - only accessible if NOT authenticated */}
                        <Stack.Protected guard={!isAuthenticated}>
                            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                        </Stack.Protected>

                        {/* Private routes - only accessible if authenticated */}
                        <Stack.Protected guard={isAuthenticated}>
                            <Stack.Screen name="private" options={{ headerShown: false }} />
                        </Stack.Protected>
                    </Stack>
                </SafeAreaProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
};

export default RootLayout;
