import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Button, I18nManager, DevSettings, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { CalculatorProvider } from "./src/context/CalculatorContext";
import InputPage from "./src/components/pages/InputPage";
import ResultsPage from "./src/components/pages/ResultsPage";
import "./src/i18n";
import i18n from "./src/i18n";
import Toast from "react-native-toast-message";

// Load Noto Nastaliq Urdu font for web using Google Fonts
// Also initialize RTL on web based on current language
if (Platform.OS === "web" && typeof document !== "undefined") {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
  
  // Initialize RTL on web based on i18n language
  const currentLang = i18n.language || "en";
  const html = document.documentElement;
  if (currentLang === "ur") {
    html.setAttribute("dir", "rtl");
    html.setAttribute("lang", "ur");
  } else {
    html.setAttribute("dir", "ltr");
    html.setAttribute("lang", "en");
  }
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const handleCalculate = () => {
    navigation.navigate("Results");
  };

  return <InputPage onCalculate={handleCalculate} />;
}

function ResultsScreen({ navigation }) {
  const handleBack = () => {
    navigation.goBack();
  };

  return <ResultsPage onBack={handleBack} />;
}

export default function App() {
  // Load fonts - app will work even if fonts fail to load
  // Using Noto Nastaliq Urdu - works reliably on all platforms
  // IMPORTANT: The fontFamily name should match the font file name (without extension)
  // Based on: https://medium.com/@aminebenkeroum/how-to-use-arabic-fonts-in-react-native-2ffe7d78097b
  // expo-font works the same on iOS, Android, and Web
  // The font name "NotoNastaliqUrdu-Regular" must match what we use in theme.js
  const [fontsLoaded, fontError] = useFonts({
    "NotoNastaliqUrdu-Regular": require("./assets/fonts/NotoNastaliqUrdu-Regular.ttf"),
  });
  
  // Log font loading status for debugging (remove in production)
  useEffect(() => {
    if (__DEV__) {
      console.log("Font loading status:", { fontsLoaded, fontError, platform: Platform.OS });
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    // Hide splash screen after fonts load, error, or timeout
    const hideSplash = async () => {
      try {
        // Add a minimum display time so users can see the splash screen
        await new Promise(resolve => setTimeout(resolve, 1500)); // Show for at least 1.5 seconds
        await SplashScreen.hideAsync();
      } catch (error) {
        // Ignore errors if splash screen is already hidden
      }
    };

    if (fontsLoaded || fontError) {
      hideSplash();
    }
    
    // Fallback: hide splash screen after 3 seconds even if fonts don't load
    const timeout = setTimeout(() => {
      hideSplash();
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [fontsLoaded, fontError]);

  // Always render the app, even if fonts aren't loaded yet
  return (
    <SafeAreaProvider>
      <CalculatorProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "LPG Calculator",
              }}
            />
            <Stack.Screen
              name="Results"
              component={ResultsScreen}
              options={{
                title: "Results",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
        <Toast />
      </CalculatorProvider>
    </SafeAreaProvider>
  );
}
