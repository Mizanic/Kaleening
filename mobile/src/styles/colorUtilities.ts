/**
 * Color System Utilities
 *
 * Helper functions and utility values for the color system.
 * Includes alpha values, color manipulation, and common patterns.
 */

// Common alpha values for overlays and transparency
export const alpha = {
    5: "rgba(0, 0, 0, 0.05)",
    10: "rgba(0, 0, 0, 0.10)",
    20: "rgba(0, 0, 0, 0.20)",
    30: "rgba(0, 0, 0, 0.30)",
    40: "rgba(0, 0, 0, 0.40)",
    50: "rgba(0, 0, 0, 0.50)",
    60: "rgba(0, 0, 0, 0.60)",
    70: "rgba(0, 0, 0, 0.70)",
    80: "rgba(0, 0, 0, 0.80)",
    90: "rgba(0, 0, 0, 0.90)",
} as const;

// Helper to adjust opacity on hex colors
export const withOpacity = (hex: string, opacity: number): string => {
    const cleanHex = hex.replace("#", "");
    const num = parseInt(cleanHex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, opacity))})`;
};

// Convert hex color to RGB values
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const cleanHex = hex.replace("#", "");
    if (cleanHex.length !== 6) return null;

    const num = parseInt(cleanHex, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
    };
};

// Calculate relative luminance according to WCAG guidelines
const getRelativeLuminance = (r: number, g: number, b: number): number => {
    const sRGB = [r, g, b].map((color) => {
        const normalized = color / 255;
        return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
};

// Calculate contrast ratio between two colors
export const calculateContrastRatio = (foreground: string, background: string): number => {
    const fgRgb = hexToRgb(foreground);
    const bgRgb = hexToRgb(background);

    if (!fgRgb || !bgRgb) {
        throw new Error("Invalid color format. Please use hex colors (e.g., #ffffff)");
    }

    const fgLuminance = getRelativeLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
    const bgLuminance = getRelativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

    const lighter = Math.max(fgLuminance, bgLuminance);
    const darker = Math.min(fgLuminance, bgLuminance);

    return (lighter + 0.05) / (darker + 0.05);
};

// Validate contrast according to WCAG AA standards
export const validateContrast = (
    foreground: string,
    background: string,
    level: "AA" | "AAA" = "AA",
    textSize: "normal" | "large" = "normal",
): { passes: boolean; ratio: number; required: number } => {
    const ratio = calculateContrastRatio(foreground, background);

    // WCAG contrast requirements
    const requirements = {
        AA: { normal: 4.5, large: 3.0 },
        AAA: { normal: 7.0, large: 4.5 },
    };

    const required = requirements[level][textSize];

    return {
        passes: ratio >= required,
        ratio: Math.round(ratio * 100) / 100,
        required,
    };
};

// Utility to test a color combination and provide feedback
export const testColorCombination = (foreground: string, background: string, context?: string): string => {
    try {
        const aaResult = validateContrast(foreground, background, "AA", "normal");
        const aaLargeResult = validateContrast(foreground, background, "AA", "large");
        const aaaResult = validateContrast(foreground, background, "AAA", "normal");

        let feedback = `${context ? context + ": " : ""}Contrast ${aaResult.ratio}:1\n`;
        feedback += `✓ WCAG AA Normal Text: ${aaResult.passes ? "PASS" : "FAIL"}\n`;
        feedback += `✓ WCAG AA Large Text: ${aaLargeResult.passes ? "PASS" : "FAIL"}\n`;
        feedback += `✓ WCAG AAA Normal Text: ${aaaResult.passes ? "PASS" : "FAIL"}`;

        return feedback;
    } catch (error) {
        return `Error: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
};

// Theme-aware shadow system
export const createShadows = (isDark: boolean = false) => ({
    none: {
        shadowColor: "transparent",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    xs: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isDark ? 0.3 : 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    sm: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.4 : 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    md: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDark ? 0.5 : 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: isDark ? 0.6 : 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    xl: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: isDark ? 0.7 : 0.25,
        shadowRadius: 24,
        elevation: 12,
    },
});
