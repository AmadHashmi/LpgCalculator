# 📱 Ad Integration Plan for LPG Calculator App

## 🎯 Overview
This plan outlines the strategy for integrating Google AdMob ads into your LPG Calculator app using Expo SDK 54.

---

## 📋 Table of Contents
1. [Ad Library Selection](#ad-library-selection)
2. [Prerequisites](#prerequisites)
3. [Implementation Phases](#implementation-phases)
4. [Ad Placement Strategy](#ad-placement-strategy)
5. [Technical Implementation](#technical-implementation)
6. [Testing Strategy](#testing-strategy)
7. [Best Practices](#best-practices)
8. [Revenue Optimization](#revenue-optimization)

---

## 🔧 Ad Library Selection

### Recommended: `react-native-google-mobile-ads`
- **Why**: Most actively maintained, better performance, supports latest AdMob features
- **Version**: Latest stable (check compatibility with Expo SDK 54)
- **Alternative**: `expo-ads-admob` (deprecated, but simpler if you need quick setup)

### Decision Matrix:
| Library | Pros | Cons |
|---------|------|------|
| `react-native-google-mobile-ads` | ✅ Active maintenance<br>✅ Better performance<br>✅ More ad formats | ⚠️ Requires prebuild<br>⚠️ May have iOS issues with Expo 54 |
| `expo-ads-admob` | ✅ Expo managed<br>✅ Easier setup | ❌ Deprecated<br>❌ Limited features |

**Recommendation**: Start with `react-native-google-mobile-ads` for better long-term support.

---

## 📝 Prerequisites

### 1. Google AdMob Account Setup
- [ ] Create Google AdMob account at https://admob.google.com
- [ ] Add your app to AdMob dashboard
- [ ] Get your **App IDs**:
  - Android App ID: `ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy`
  - iOS App ID: `ca-app-pub-xxxxxxxxxxxxxxxx~zzzzzzzzzz`
- [ ] Create ad units:
  - Banner Ad Unit (for InputPage)
  - Banner Ad Unit (for ResultsPage)
  - Interstitial Ad Unit (optional, for page transitions)
  - Rewarded Ad Unit (optional, for removing ads)

### 2. Development Environment
- [ ] Ensure you have EAS Build access
- [ ] Test devices ready (Android & iOS)
- [ ] AdMob test ad IDs for development

---

## 🚀 Implementation Phases

### **Phase 1: Setup & Configuration** (Day 1)
**Goal**: Install library and configure basic setup

#### Tasks:
1. Install dependencies
   ```bash
   npm install react-native-google-mobile-ads
   ```

2. Update `app.json` with AdMob configuration
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

3. Create ad configuration file
   - `src/config/ads.js` - Store ad unit IDs and configuration

4. Prebuild native code
   ```bash
   npx expo prebuild --clean
   ```

---

### **Phase 2: Ad Components** (Day 2)
**Goal**: Create reusable ad components

#### Tasks:
1. Create `src/components/ads/BannerAd.js`
   - Reusable banner ad component
   - Handles loading states
   - Error handling
   - RTL support for Urdu

2. Create `src/components/ads/InterstitialAd.js`
   - For full-screen ads
   - Show on specific actions (e.g., after calculation)

3. Create `src/components/ads/RewardedAd.js` (Optional)
   - For premium features
   - Remove ads temporarily

4. Create ad context/hook
   - `src/context/AdContext.js`
   - Manage ad state globally
   - Track ad impressions
   - Handle ad loading

---

### **Phase 3: Integration** (Day 3)
**Goal**: Integrate ads into app pages

#### Tasks:
1. **InputPage Integration**
   - Add banner ad at bottom of screen
   - Non-intrusive placement
   - Ensure it doesn't block input fields

2. **ResultsPage Integration**
   - Add banner ad at bottom
   - Consider interstitial ad after viewing results (optional)
   - Show after user has seen results for 5+ seconds

3. **App.js Updates**
   - Initialize AdMob SDK
   - Set up ad context provider
   - Handle app state changes (pause/resume ads)

---

### **Phase 4: Testing & Optimization** (Day 4-5)
**Goal**: Test ads and optimize placement

#### Tasks:
1. Test with AdMob test ads
2. Test on real devices (Android & iOS)
3. Verify RTL layout with Urdu
4. Performance testing
5. User experience testing
6. A/B test ad placements

---

## 📍 Ad Placement Strategy

### **Recommended Placements:**

#### 1. **InputPage** - Banner Ad
```
┌─────────────────────────┐
│      Header             │
├─────────────────────────┤
│                         │
│   Input Fields          │
│   (Customer Name)       │
│                         │
│   Cylinder Inputs       │
│                         │
│   Custom Fields         │
│                         │
│   Calculate Button      │
│                         │
├─────────────────────────┤
│   [BANNER AD]           │ ← Bottom banner (320x50)
└─────────────────────────┘
```

**Rationale**: 
- Non-intrusive
- Doesn't block input
- Visible but not annoying
- Users see it while entering data

#### 2. **ResultsPage** - Banner Ad
```
┌─────────────────────────┐
│      Header             │
├─────────────────────────┤
│                         │
│   Results Content       │
│   (Scrollable)          │
│                         │
│   - Totals              │
│   - Breakdown           │
│   - PDF/Share buttons   │
│                         │
├─────────────────────────┤
│   [BANNER AD]           │ ← Bottom banner (320x50)
└─────────────────────────┘
```

**Rationale**:
- Users have completed their task
- Less intrusive at this point
- Higher engagement potential

#### 3. **Interstitial Ad** (Optional - Advanced)
- Show after user views results 3+ times in a session
- Show when user generates PDF
- Frequency: Max 1 per 5 minutes

#### 4. **Rewarded Ad** (Optional - Premium Feature)
- Offer: "Remove ads for 1 hour"
- Show after 5+ calculations
- User-initiated only

---

## 💻 Technical Implementation

### **File Structure:**
```
src/
├── components/
│   └── ads/
│       ├── BannerAd.js
│       ├── InterstitialAd.js
│       ├── RewardedAd.js
│       └── AdErrorBoundary.js
├── config/
│   └── ads.js
├── context/
│   └── AdContext.js
└── hooks/
    └── useAdMob.js
```

### **Key Components:**

#### 1. `src/config/ads.js`
```javascript
// Ad Unit IDs
export const AD_UNITS = {
  // Use test IDs in development
  BANNER: __DEV__ 
    ? 'ca-app-pub-3940256099942544/6300978111' // Test ID
    : 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy', // Your real ID
  
  INTERSTITIAL: __DEV__
    ? 'ca-app-pub-3940256099942544/1033173712' // Test ID
    : 'ca-app-pub-xxxxxxxxxxxxxxxx/zzzzzzzzzz', // Your real ID
};

// Ad configuration
export const AD_CONFIG = {
  requestNonPersonalizedAdsOnly: false, // Set to true for GDPR compliance
  keywords: ['calculator', 'lpg', 'gas', 'utility'],
};
```

#### 2. `src/components/ads/BannerAd.js`
```javascript
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { AD_UNITS, AD_CONFIG } from '../../config/ads';
import { useTranslation } from 'react-i18next';

const AdBanner = ({ position = 'bottom' }) => {
  const { i18n } = useTranslation();
  const [adUnitId] = useState(AD_UNITS.BANNER);

  return (
    <View style={[styles.container, position === 'bottom' && styles.bottom]}>
      <BannerAd
        unitId={adUnitId}
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
  },
  bottom: {
    marginTop: 'auto',
  },
});

export default AdBanner;
```

#### 3. `src/context/AdContext.js`
```javascript
import React, { createContext, useContext, useEffect, useState } from 'react';
import mobileAds from 'react-native-google-mobile-ads';

const AdContext = createContext();

export const AdProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize AdMob
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob initialized:', adapterStatuses);
        setIsInitialized(true);
      })
      .catch(error => {
        console.error('AdMob initialization error:', error);
      });
  }, []);

  return (
    <AdContext.Provider value={{ isInitialized }}>
      {children}
    </AdContext.Provider>
  );
};

export const useAdContext = () => useContext(AdContext);
```

---

## 🧪 Testing Strategy

### **1. Development Testing**
- [ ] Use AdMob test ad IDs
- [ ] Test on Android emulator
- [ ] Test on iOS simulator
- [ ] Test with RTL layout (Urdu)

### **2. Real Device Testing**
- [ ] Test on physical Android device
- [ ] Test on physical iOS device
- [ ] Test ad loading times
- [ ] Test ad refresh behavior
- [ ] Test with poor network conditions

### **3. User Experience Testing**
- [ ] Verify ads don't block important UI
- [ ] Test scrolling behavior with ads
- [ ] Verify ads work in both languages
- [ ] Test app performance with ads

### **4. AdMob Dashboard Testing**
- [ ] Verify ad requests are logged
- [ ] Check for any policy violations
- [ ] Monitor fill rates
- [ ] Check revenue (after going live)

---

## ✅ Best Practices

### **1. User Experience**
- ✅ Never block critical functionality with ads
- ✅ Use non-intrusive ad formats (banners)
- ✅ Show ads after user completes actions
- ✅ Provide option to remove ads (premium/rewarded)
- ✅ Respect user's time and attention

### **2. Performance**
- ✅ Lazy load ads (don't load until needed)
- ✅ Cache ad requests
- ✅ Handle ad loading errors gracefully
- ✅ Don't show ads on first app launch (better UX)

### **3. Compliance**
- ✅ Follow AdMob policies
- ✅ Implement GDPR compliance if needed
- ✅ Add privacy policy link
- ✅ Disclose ad usage in app description

### **4. Revenue Optimization**
- ✅ Test different ad placements
- ✅ Monitor fill rates and eCPM
- ✅ Consider ad mediation (multiple networks)
- ✅ A/B test ad positions
- ✅ Optimize ad refresh rates

---

## 💰 Revenue Optimization Tips

### **1. Ad Placement**
- Bottom banners perform better than top banners
- Interstitials have higher eCPM but lower user satisfaction
- Native ads blend better and have higher engagement

### **2. Timing**
- Show ads after user engagement (not immediately)
- Limit interstitial frequency (max 1 per 5 minutes)
- Don't show ads during critical user actions

### **3. Targeting**
- Use relevant keywords in ad requests
- Consider user location for better targeting
- Test different ad sizes

### **4. Mediation**
- Consider using AdMob Mediation
- Add multiple ad networks for better fill rates
- Optimize waterfall for maximum revenue

---

## 📊 Monitoring & Analytics

### **Key Metrics to Track:**
1. **Ad Requests**: Number of ad requests made
2. **Fill Rate**: Percentage of successful ad loads
3. **eCPM**: Effective cost per mille (revenue per 1000 impressions)
4. **CTR**: Click-through rate
5. **Revenue**: Total ad revenue

### **Tools:**
- AdMob Dashboard (primary)
- Firebase Analytics (optional, for user behavior)
- Custom analytics (optional, for app-specific metrics)

---

## 🚨 Common Issues & Solutions

### **Issue 1: Ads Not Showing**
- **Solution**: Check ad unit IDs, verify network connection, check AdMob account status

### **Issue 2: iOS Build Fails**
- **Solution**: Ensure prebuild is run, check Info.plist configuration, verify App ID

### **Issue 3: Ads Block UI**
- **Solution**: Adjust ad placement, use SafeAreaView, test on different screen sizes

### **Issue 4: Low Fill Rate**
- **Solution**: Check ad unit configuration, verify targeting, consider mediation

---

## 📅 Timeline Estimate

| Phase | Duration | Tasks |
|-------|----------|-------|
| Phase 1: Setup | 1 day | Install, configure, prebuild |
| Phase 2: Components | 1 day | Create ad components |
| Phase 3: Integration | 1 day | Integrate into pages |
| Phase 4: Testing | 2 days | Test, optimize, fix issues |
| **Total** | **5 days** | Full implementation |

---

## 🎯 Success Criteria

- [ ] Ads display correctly on both Android and iOS
- [ ] Ads work in both English and Urdu (RTL)
- [ ] No UI blocking or performance issues
- [ ] Ad requests are logged in AdMob dashboard
- [ ] User experience remains positive
- [ ] App passes AdMob policy review

---

## 📚 Resources

- [react-native-google-mobile-ads Docs](https://github.com/invertase/react-native-google-mobile-ads)
- [AdMob Policies](https://support.google.com/admob/answer/6128543)
- [Expo Prebuild Guide](https://docs.expo.dev/workflow/prebuild/)
- [AdMob Best Practices](https://support.google.com/admob/answer/6329638)

---

## 🔄 Next Steps

1. **Immediate**: Create AdMob account and get App IDs
2. **Week 1**: Complete Phase 1-2 (Setup & Components)
3. **Week 2**: Complete Phase 3-4 (Integration & Testing)
4. **Week 3**: Launch with ads, monitor performance
5. **Ongoing**: Optimize based on data

---

**Last Updated**: 2024
**Version**: 1.0
