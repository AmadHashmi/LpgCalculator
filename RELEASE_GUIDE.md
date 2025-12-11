# 🚀 Release Guide for LPG Calculator

## Step 1: Check Google Play App Signing

**Most important first step!** Check if Google Play is managing your app signing:

1. Go to **Google Play Console**
2. Navigate to: **Release** → **Setup** → **App signing**
3. Look for "App signing by Google Play"

### ✅ If "App Signing by Google Play" is ENABLED:
- **You're all set!** You don't need a local keystore
- Google Play will sign your AAB automatically
- You can build an unsigned AAB and upload it
- **This is the recommended and easiest approach**

### ❌ If "App Signing by Google Play" is DISABLED:
- You need your original keystore from when you first published
- Check these common locations:
  - Your computer's Downloads folder
  - Documents folder
  - A backup drive or cloud storage
  - Email attachments from when you first published
  - Password manager (if you saved the keystore info)

---

## Step 2: Build the AAB

### Option A: If Google Play manages signing (RECOMMENDED)

Just run:
```bash
./build-release.sh
```

Or manually:
```bash
cd android
./gradlew bundleRelease
```

The AAB will be unsigned, but Play Store will sign it automatically.

### Option B: If you have a keystore file

1. Copy your keystore to: `android/app/release.keystore`
2. Create `android/keystore.properties`:
```properties
storeFile=../app/release.keystore
keyAlias=YOUR_KEY_ALIAS
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
```
3. Run: `./build-release.sh`

---

## Step 3: Upload to Play Store

1. Go to **Google Play Console**
2. Navigate to: **Test and release** → **Production**
3. Click **Create new release**
4. Upload: `android/app/build/outputs/bundle/release/app-release.aab`
5. **Release notes** (suggested):
   ```
   - Updated to Android 15 SDK (API 35)
   - Fixed data safety compliance
   - Improved app stability and performance
   ```
6. Click **Review** → **Start rollout to Production**

---

## Step 4: Submit Data Safety Form

Before or after uploading, make sure your Data Safety form is submitted:

1. Go to: **Policy and programs** → **App content** → **Data safety**
2. Review all sections
3. Click **Save** → **Send for review**

---

## Troubleshooting

### "Upload failed: You need to use a different version code"
- Your version code is 4, which should be fine if your last published was 3
- If it fails, increment version code in `android/app/build.gradle` (line 147)

### "App not signed with upload key"
- This means Google Play is NOT managing your signing
- You need to find your original keystore
- Or enable "App Signing by Google Play" in Play Console

### Build errors
- Make sure Java/JDK is installed: `java -version`
- Make sure Android SDK is properly configured
- Try: `cd android && ./gradlew clean` then rebuild

---

## Quick Checklist

- [ ] Checked Google Play App Signing status
- [ ] Built AAB file
- [ ] Data Safety form submitted
- [ ] Uploaded AAB to Play Store
- [ ] Added release notes
- [ ] Submitted for review

---

## Need Help?

If you can't find your keystore and App Signing is disabled:
1. Check Play Console → App signing → see if you can enable it
2. Check your email/backups for the keystore file
3. If all else fails, you may need to create a new app listing (not recommended)

