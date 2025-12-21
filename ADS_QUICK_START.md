# 🚀 Quick Start: Ad Integration Guide

## Step-by-Step Implementation

### Step 1: Install Dependencies
```bash
npm install react-native-google-mobile-ads
```

### Step 2: Update `app.json`
Add the plugin configuration:
```json
{
  "expo": {
    "plugins": [
      "expo-localization",
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": "ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy",
          "iosAppId": "ca-app-pub-xxxxxxxxxxxxxxxx~zzzzzzzzzz"
        }
      ]
    ]
  }
}
```

### Step 3: Create Ad Configuration
Create `src/config/ads.js`:
```javascript
// AdMob Test IDs (use in development)
export const TEST_IDS = {
  BANNER: 'ca-app-pub-3940256099942544/6300978111',
  INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
};

// Your real Ad Unit IDs (replace with your actual IDs)
export const AD_UNITS = {
  BANNER: __DEV__ 
    ? TEST_IDS.BANNER
    : 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy', // Replace with your banner ad unit ID
  
  INTERSTITIAL: __DEV__
    ? TEST_IDS.INTERSTITIAL
    : 'ca-app-pub-xxxxxxxxxxxxxxxx/zzzzzzzzzz', // Replace with your interstitial ad unit ID
};

export const AD_CONFIG = {
  requestNonPersonalizedAdsOnly: false,
};
```

### Step 4: Create Banner Ad Component
Create `src/components/ads/BannerAd.js`:
```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { AD_UNITS, AD_CONFIG } from '../../config/ads';

const AdBanner = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={AD_UNITS.BANNER}
        size={BannerAdSize.BANNER}
        requestOptions={AD_CONFIG}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 8,
  },
});

export default AdBanner;
```

### Step 5: Initialize AdMob in App.js
Update `App.js`:
```javascript
import React, { useEffect } from "react";
import mobileAds from 'react-native-google-mobile-ads';
// ... other imports

export default function App() {
  // Initialize AdMob
  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob initialized');
      })
      .catch(error => {
        console.error('AdMob initialization error:', error);
      });
  }, []);

  // ... rest of your app code
}
```

### Step 6: Add Banner to InputPage
Update `src/components/pages/InputPage.js`:
```javascript
import AdBanner from '../ads/BannerAd';

// Inside your component, add at the bottom:
<ScrollView>
  {/* Your existing content */}
  
  {/* Add banner ad at bottom */}
  <AdBanner style={{ marginTop: 16 }} />
</ScrollView>
```

### Step 7: Add Banner to ResultsPage
Update `src/components/pages/ResultsPage.js`:
```javascript
import AdBanner from '../ads/BannerAd';

// Inside your component, add at the bottom:
<ScrollView>
  {/* Your existing content */}
  
  {/* Add banner ad at bottom */}
  <AdBanner style={{ marginTop: 16 }} />
</ScrollView>
```

### Step 8: Prebuild and Test
```bash
# Prebuild native code
npx expo prebuild --clean

# Test on Android
npx expo run:android

# Test on iOS
npx expo run:ios
```

## 🎯 Minimal Implementation (Just Banners)

If you want the simplest possible implementation:

1. Install: `npm install react-native-google-mobile-ads`
2. Add plugin to `app.json` (Step 2 above)
3. Initialize in `App.js` (Step 5 above)
4. Add `<AdBanner />` component to your pages (Steps 6-7 above)
5. Run `npx expo prebuild --clean`
6. Build and test!

## ⚠️ Important Notes

1. **Test Ads First**: Always use test ad IDs during development
2. **Get Real IDs**: Replace test IDs with your real AdMob ad unit IDs before production
3. **Prebuild Required**: You must run `npx expo prebuild` after adding the plugin
4. **EAS Build**: Use EAS Build for production builds (not Expo Go)

## 🔍 Testing Checklist

- [ ] Test ads show in development (using test IDs)
- [ ] Test on Android device
- [ ] Test on iOS device
- [ ] Test with RTL layout (Urdu)
- [ ] Verify ads don't block UI
- [ ] Check AdMob dashboard for requests

## 📝 Next Steps

1. Get your AdMob App IDs and Ad Unit IDs
2. Replace test IDs with real IDs
3. Submit app for AdMob policy review
4. Monitor performance in AdMob dashboard
