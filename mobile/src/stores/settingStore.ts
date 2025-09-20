import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";
import { Theme, HapticFeedback } from "@/types/settingsTypes";

const storage = new MMKV();

interface SettingsState {
    theme: Theme;
    hapticFeedback: HapticFeedback;
    setTheme: (theme: Theme) => void;
    setHapticFeedback: (hapticFeedback: HapticFeedback) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set, get) => ({
            theme: "system",
            hapticFeedback: "enabled",
            setTheme: (theme: Theme) => set({ theme }),
            setHapticFeedback: (hapticFeedback: HapticFeedback) => set({ hapticFeedback }),
        }),
        {
            name: "settings-storage",
            storage: createJSONStorage(() => ({
                getItem: (name) => storage.getString(name) ?? null,
                setItem: (name, value) => storage.set(name, value),
                removeItem: (name) => storage.delete(name),
            })),
        },
    ),
);
