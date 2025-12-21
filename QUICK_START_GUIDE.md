# 🚀 Quick Start Guide - Habit Tracker App

## Share this with any AI to start building immediately!

---

## 📱 Project: Habit Tracker Mobile App

**Goal:** Build a profitable habit tracking app using React Native/Expo
**Timeline:** 2-3 weeks
**Revenue Potential:** $3,000-3,500/month with 20K users

---

## 🎯 What to Build

A mobile app where users can:
- Track daily habits (exercise, reading, meditation, etc.)
- See streaks (consecutive days)
- View statistics and calendar
- Upgrade to premium for unlimited habits + advanced features

---

## 🛠️ Tech Stack

- **Framework:** React Native 0.81.5 + Expo SDK 54
- **Navigation:** React Navigation 7
- **Storage:** AsyncStorage
- **Ads:** Google AdMob (react-native-google-mobile-ads)
- **Payments:** RevenueCat (for subscriptions)

---

## 📋 Core Features (MVP)

1. **Add/Edit/Delete habits** (name, icon, color)
2. **Daily check-in** (mark complete with tap)
3. **Streak counter** (consecutive days)
4. **Calendar view** (see completion history)
5. **Basic statistics** (total days, completion %)
6. **Dark mode** support
7. **Local storage** (data persists)

---

## 💰 Monetization

- **Free:** Max 3-5 habits + banner ads
- **Premium:** $1.99/month = unlimited habits + no ads + advanced stats
- **Revenue:** 20K users → 1,600 premium (8%) = $3,184/month + ads

---

## 📱 Screens Needed

1. **HomeScreen** - List all habits, today's status, streaks
2. **HabitDetailScreen** - View habit details, calendar, stats
3. **AddHabitScreen** - Create new habit (name, icon, color)
4. **StatsScreen** - Overall statistics and charts
5. **SettingsScreen** - Premium, theme, notifications

---

## 🗂️ Project Structure

```
HabitTracker/
├── App.js
├── src/
│   ├── screens/ (Home, Detail, Add, Stats, Settings)
│   ├── components/ (HabitCard, StreakBadge, Calendar)
│   ├── context/ (HabitsContext, PremiumContext)
│   ├── utils/ (storage, dateUtils, calculations)
│   └── styles/ (theme.js)
```

---

## 🚀 Setup Commands

```bash
npx create-expo-app HabitTracker --template blank
cd HabitTracker
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-safe-area-context react-native-screens
npm install @react-native-async-storage/async-storage
npm install react-native-google-mobile-ads
npm install react-native-chart-kit
npm install uuid
```

---

## 💾 Data Structure

```javascript
// Habit object
{
  id: "uuid",
  name: "Exercise",
  icon: "fitness",
  color: "#FF5733",
  createdAt: "2024-01-01",
  completedDates: ["2024-01-01", "2024-01-02"],
  currentStreak: 5,
  longestStreak: 10,
  totalDays: 25
}
```

---

## ✅ Implementation Order

1. **Day 1-2:** Project setup, navigation, basic UI
2. **Day 3-4:** Add/Edit/Delete habits, local storage
3. **Day 5-7:** Streak calculation, calendar, stats
4. **Day 8-10:** Premium features, subscription
5. **Day 11-14:** Ads, polish, testing

---

## 🎨 Design Notes

- Clean, modern card-based UI
- Smooth animations
- Dark mode support
- Primary colors: Blue/Purple gradient
- Success: Green for completed habits

---

## 📝 Key Requirements

- **Free tier:** Limited to 3-5 habits
- **Premium:** Unlimited + no ads + advanced features
- **Ads:** Banner at bottom of home screen
- **Storage:** Local only (free), cloud sync (premium)
- **Charts:** Show completion trends and streaks

---

## 🎯 Success Criteria

- Users can track habits daily
- Streaks calculate correctly
- Data persists after app restart
- Premium subscription works
- Ads display properly
- Smooth, intuitive UX

---

**That's it! Start building with this guide. The full detailed spec is in APP_PROJECT_BRIEF.md**


