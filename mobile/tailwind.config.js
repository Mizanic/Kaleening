/**
 * Tailwind Configuration
 *
 * Clean config focused on utility classes for layout and typography.
 * Colors are handled via theme context and inline styles.
 */
const { Spacing, BorderRadius } = require("./src/styles");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            // Layout and spacing utilities
            spacing: Spacing,
            borderRadius: BorderRadius,
            // Typography system
            fontFamily: {
                primary: ["Inter-Regular", "sans-serif"],
                "primary-light": ["Inter-Light", "sans-serif"],
                "primary-medium": ["Inter-Medium", "sans-serif"],
                "primary-semibold": ["Inter-SemiBold", "sans-serif"],
                "primary-bold": ["Inter-Bold", "sans-serif"],
                "primary-extrabold": ["Inter-ExtraBold", "sans-serif"],
                secondary: ["Inter-Regular", "sans-serif"],
                accent: ["Lora-Regular", "serif"],
                "accent-medium": ["Lora-Medium", "serif"],
                "accent-semibold": ["Lora-SemiBold", "serif"],
                "accent-bold": ["Lora-Bold", "serif"],
            },
        },
    },
    plugins: [],
};
