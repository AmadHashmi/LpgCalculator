import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { I18nManager, DevSettings } from "react-native";
import i18n from "../../i18n";
import { theme } from "../../styles/theme";

const Header = ({ title, showLanguageSwitcher = true }) => {
  const [currentLang, setCurrentLang] = React.useState(i18n.language);

  React.useEffect(() => {
    // Listen for language changes
    const handleLanguageChange = (lng) => {
      setCurrentLang(lng);
    };
    
    i18n.on("languageChanged", handleLanguageChange);
    
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  const handleLanguageSwitch = () => {
    const newLang = currentLang === "en" ? "ur" : "en";
    const isRTL = newLang === "ur";
    
    // Change language first
    i18n.changeLanguage(newLang).then(() => {
      // Update RTL
      I18nManager.forceRTL(isRTL);
      
      // On web, apply RTL to document
      if (Platform.OS === "web" && typeof document !== "undefined") {
        const html = document.documentElement;
        if (isRTL) {
          html.setAttribute("dir", "rtl");
          html.setAttribute("lang", "ur");
        } else {
          html.setAttribute("dir", "ltr");
          html.setAttribute("lang", "en");
        }
      }
      
      // Update local state
      setCurrentLang(newLang);
      
      // Reload to apply RTL changes (only on native platforms, not web)
      if (Platform.OS !== "web") {
        setTimeout(() => {
          if (DevSettings && DevSettings.reload) {
            DevSettings.reload();
          }
        }, 50);
      }
      // On web, no reload needed - React will re-render automatically
    });
  };

  const isRTL = currentLang === "ur";

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={[styles.header, isRTL && styles.headerRTL]}>
        <Image
          source={require("../../../assets/logo.jpeg")}
          style={[styles.logo, isRTL && styles.logoRTL]}
          resizeMode="contain"
        />
        <Text style={[styles.title, isRTL && styles.titleRTL]} numberOfLines={2}>
          {title}
        </Text>
        {showLanguageSwitcher && (
          <TouchableOpacity
            onPress={handleLanguageSwitch}
            style={[styles.languageButton, isRTL && styles.languageButtonRTL]}
          >
            <Ionicons
              name="language-outline"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={[styles.languageText, isRTL && styles.languageTextRTL]}>
              {currentLang === "ur" ? "ENG" : "URD"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.card,
    paddingTop: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    ...theme.shadows.sm,
    minHeight: 48,
  },
  headerRTL: {
    flexDirection: "row-reverse",
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: theme.spacing.xs,
    marginLeft: 0,
  },
  logoRTL: {
    marginRight: 0,
    marginLeft: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    flex: 1,
    marginRight: theme.spacing.xs,
    marginLeft: 0,
    textAlign: "left",
    flexWrap: "wrap",
    paddingTop: theme.spacing.xs / 2,
    paddingBottom: theme.spacing.xs / 2,
    paddingHorizontal: 0,
    lineHeight: 26,
  },
  titleRTL: {
    marginRight: 0,
    marginLeft: theme.spacing.xs,
    textAlign: "right",
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.xs / 2,
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    minWidth: 50,
  },
  languageButtonRTL: {
    flexDirection: "row-reverse",
  },
  languageText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
    marginRight: 0,
    fontWeight: "600",
  },
  languageTextRTL: {
    marginLeft: 0,
    marginRight: theme.spacing.xs,
  },
});

export default Header;

