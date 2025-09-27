/**
 * App Auth Store (wraps standalone auth library)
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CognitoAuth } from "@/services/auth";

const AWS_REGION = process.env.EXPO_PUBLIC_AWS_REGION || "";
const COGNITO_USER_POOL_CLIENT_ID = process.env.EXPO_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "";

type AppUser = {
    email: string;
    given_name?: string;
    family_name?: string;
};

interface AuthState {
    user: AppUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
}

const auth = new CognitoAuth({
    region: AWS_REGION,
    userPoolClientId: COGNITO_USER_POOL_CLIENT_ID,
    persist: true,
    // Use AsyncStorage persistence beneath our library store
    storage: {
        getItem: (k: string) => AsyncStorage.getItem(k) as unknown as string | null,
        setItem: (k: string, v: string) => {
            void AsyncStorage.setItem(k, v);
        },
        removeItem: (k: string) => {
            void AsyncStorage.removeItem(k);
        },
    },
    storageKey: "@auth/store",
});

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: auth.store.getState().user ?? null,
            isLoading: false,
            isAuthenticated: auth.isAuthenticated(),

            login: async (email: string, password: string) => {
                try {
                    await auth.login(email, password);
                    const { user } = auth.store.getState();
                    set({ user: user ?? null, isAuthenticated: !!user });
                    return true;
                } catch (e) {
                    return false;
                }
            },

            logout: async () => {
                await auth.logout();
                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        },
    ),
);

export const useAuth = () => {
    const { user, isLoading, isAuthenticated, login, logout } = useAuthStore();
    return { user, isLoading, isAuthenticated, login, logout };
};
