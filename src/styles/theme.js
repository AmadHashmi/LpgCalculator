/**
 * Design System - Theme
 * Modern color palette and spacing
 */

import i18n from "../i18n";
import { Platform } from "react-native";

// Get the appropriate font family based on language and platform
// Using Noto Nastaliq Urdu - reliable and works on all platforms
// IMPORTANT: The font name must match exactly what we use in useFonts() in App.js
// Based on: https://medium.com/@aminebenkeroum/how-to-use-arabic-fonts-in-react-native-2ffe7d78097b
// The fontFamily should match the font file name (without .ttf extension)
export const getFontFamily = () => {
  const lang = i18n.language || "en";
  if (lang === "ur") {
    // Use font file name for iOS and Android (matches useFonts key)
    // For web, use Google Fonts name
    if (Platform.OS === "web") {
      return "'Noto Nastaliq Urdu', serif";
    }
    // Match the key used in useFonts() - should be the font file name without extension
    return "NotoNastaliqUrdu-Regular";
  }
  return undefined; // Use system default for English
};

const fontFamily = getFontFamily();

export const theme = {
  colors: {
    primary: "#2563eb",        // Professional blue
    primaryDark: "#1e40af",    // Darker blue
    secondary: "#10b981",      // Success green
    danger: "#ef4444",          // Error red
    warning: "#f59e0b",         // Warning orange
    info: "#3b82f6",           // Info blue
    background: "#f8fafc",     // Light gray background
    card: "#ffffff",           // White cards
    text: {
      primary: "#1e293b",      // Dark gray
      secondary: "#64748b",    // Medium gray
      light: "#94a3b8",        // Light gray
    },
    border: "#e2e8f0",         // Light border
    input: {
      background: "#ffffff",
      border: "#cbd5e1",
      focus: "#2563eb",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: "bold",
      lineHeight: 36,
      ...(fontFamily && { fontFamily }),
    },
    h2: {
      fontSize: 22,
      fontWeight: "600",
      lineHeight: 30,
      ...(fontFamily && { fontFamily }),
    },
    h3: {
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 26,
      ...(fontFamily && { fontFamily }),
    },
    body: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
      ...(fontFamily && { fontFamily }),
    },
    caption: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
      ...(fontFamily && { fontFamily }),
    },
    small: {
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 18,
      ...(fontFamily && { fontFamily }),
    },
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

export default theme;
