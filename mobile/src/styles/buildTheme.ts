/**
 * Theme Builder
 *
 * Creates light and dark themes from color primitives.
 * Handles semantic token mapping and ensures proper contrast.
 */

import { ColorScale, Theme, ThemeMode } from "@/types/theme";
import { primary, neutral, success, warning, error, info, pure, accent } from "./primitives";
import { withOpacity } from "./colorUtilities";

// A more systematic helper to create interactive states.
// It moves up/down the color scale for hover/pressed states using array-based logic.
const createInteractiveStates = (colorScale: ColorScale, baseShade: keyof ColorScale, isDark: boolean) => {
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
    const baseIndex = shades.indexOf(baseShade as any);

    // Safely calculate hover and pressed indices
    const hoverIndex = isDark ? Math.max(0, baseIndex - 1) : Math.min(shades.length - 1, baseIndex + 1);
    const pressedIndex = isDark ? Math.max(0, baseIndex - 2) : Math.min(shades.length - 1, baseIndex + 2);

    return {
        default: colorScale[baseShade],
        hover: colorScale[shades[hoverIndex]],
        pressed: colorScale[shades[pressedIndex]],
        disabled: isDark ? neutral[700] : neutral[300],
        selected: isDark ? withOpacity(colorScale[baseShade], 0.25) : withOpacity(colorScale[baseShade], 0.15),
    };
};

export const buildTheme = (mode: ThemeMode): Theme => {
    const isDark = mode === "dark";

    return {
        // SURFACE TOKENS: Clear hierarchy from base to elevated surfaces.
        surface: {
            primary: isDark ? neutral[900] : pure.white, // Base background
            secondary: isDark ? neutral[800] : neutral[50], // Cards, headers
            tertiary: isDark ? neutral[700] : neutral[100], // Subtle backgrounds, inputs
            inverse: isDark ? neutral[100] : neutral[900], // High contrast inverse
            overlay: isDark ? withOpacity(neutral[900], 0.8) : withOpacity(neutral[500], 0.5),
        },

        // CONTENT TOKENS: High contrast for readability.
        content: {
            primary: isDark ? neutral[100] : neutral[800], // High emphasis
            secondary: isDark ? neutral[300] : neutral[600], // Medium emphasis
            tertiary: isDark ? neutral[400] : neutral[500], // Low emphasis
            disabled: isDark ? neutral[600] : neutral[400], // Disabled state
            inverse: isDark ? neutral[900] : pure.white, // Text on inverse surfaces
            accent: isDark ? primary[400] : primary[600], // Brand text
        },

        // BORDER TOKENS: Visible but not distracting. In dark mode, borders must be LIGHTER than the surface.
        border: {
            primary: isDark ? neutral[700] : neutral[300], // Default borders (on secondary surfaces)
            secondary: isDark ? neutral[800] : neutral[200], // Subtle borders (on primary surfaces)
            focus: isDark ? primary[400] : primary[500], // Focus indicators
            accent: isDark ? primary[500] : primary[600], // Brand borders
        },

        // STATUS TOKENS: Clear and accessible status indicators.
        status: {
            success: isDark ? success[300] : success[700],
            warning: isDark ? warning[300] : warning[700],
            error: isDark ? error[300] : error[700],
            info: isDark ? info[300] : info[700],
            successBg: isDark ? withOpacity(success[400], 0.15) : success[100],
            warningBg: isDark ? withOpacity(warning[400], 0.15) : warning[100],
            errorBg: isDark ? withOpacity(error[400], 0.15) : error[100],
            infoBg: isDark ? withOpacity(info[400], 0.15) : info[100],
        },

        // INTERACTIVE TOKENS: Predictable and clear user feedback.
        interactive: {
            primary: createInteractiveStates(primary, isDark ? 500 : 600, isDark),
            // Secondary buttons in dark mode are often lighter gray or outlined. Here we use a lighter gray.
            secondary: createInteractiveStates(neutral, isDark ? 700 : 300, isDark),
            // Neutral is for subtle interactive elements like unselected tabs.
            neutral: createInteractiveStates(neutral, isDark ? 800 : 200, isDark),
        },

        // RAW PALETTE ACCESS
        palette: {
            primary,
            neutral,
            success,
            warning,
            error,
            info,
        },

        pure,
        accent,
    };
};

// Pre-built themes
export const lightTheme = buildTheme("light");
export const darkTheme = buildTheme("dark");
