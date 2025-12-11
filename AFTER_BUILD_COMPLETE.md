# 📱 What to Do After EAS Build Completes

## Step 1: Download Your AAB File

Once the build finishes, you'll see a message like:
```
✅ Build finished!
📦 Download: https://expo.dev/artifacts/...
```

**Option A: Download from Terminal**
- The build output will show a download URL
- Click it or copy-paste in your browser
- Download the `.aab` file

**Option B: Download from EAS Dashboard**
1. Go to https://expo.dev/accounts/[your-account]/projects/LpgCalculator/builds
2. Find your completed build
3. Click "Download" button
4. Save the `.aab` file to your computer

---

## Step 2: Upload to Google Play Console

### 2.1 Go to Play Console
1. Open https://play.google.com/console
2. Select your **LPG Calculator** app

### 2.2 Navigate to Production
1. Click **"Test and release"** in the left menu
2. Click **"Production"** (or your desired track)
3. Click **"Create new release"** button

### 2.3 Upload the AAB
1. Under **"App bundles"**, click **"Upload"**
2. Select the `.aab` file you downloaded from EAS
3. Wait for upload to complete (may take a few minutes)

### 2.4 Add Release Notes
Fill in the release notes section:

**For users (what they'll see):**
```
- Updated to Android 15 SDK
- Improved app stability and performance
- Fixed data safety compliance
```

**For reviewers (internal notes):**
```
- Updated target SDK to 35 (Android 15)
- Fixed data safety form compliance
- Version 1.0.1 (version code 4)
```

### 2.5 Review and Submit
1. Review all the information
2. Check that version code is **4** (higher than your previous version)
3. Click **"Review"** button
4. Review the summary
5. Click **"Start rollout to Production"**

---

## Step 3: Monitor the Review Process

### 3.1 Check Submission Status
- Go to **"Publishing overview"** in Play Console
- You'll see your submission status:
  - ⏳ **In review** - Google is reviewing
  - ✅ **Published** - Live on Play Store!
  - ❌ **Rejected** - Check issues and fix

### 3.2 Review Timeline
- **First-time submission**: 1-3 days
- **Update submission**: Usually 1-2 days
- **With data safety form**: May take 2-3 days (both reviewed together)

---

## Step 4: Verify Data Safety Form

Before or after uploading, make sure your Data Safety form is submitted:

1. Go to **"Policy and programs"** → **"App content"** → **"Data safety"**
2. Verify all sections are complete:
   - ✅ Data collection: Yes
   - ✅ Device or other IDs: Declared
   - ✅ Encryption: Yes
   - ✅ Privacy policy: Added
3. Click **"Save"** → **"Send for review"**

---

## Step 5: Handle Any Issues

### If Build Fails
- Check the build logs in EAS dashboard
- Fix any errors
- Rebuild: `eas build --platform android --profile production`

### If Upload Fails
- Check file size (should be reasonable)
- Verify version code is higher than previous
- Check Play Console for specific error messages

### If Review Rejected
- Read the rejection reason carefully
- Fix the issues mentioned
- Resubmit with a new version

---

## Step 6: Celebrate! 🎉

Once approved:
- Your app will be live on Google Play Store
- Users can download and update
- Monitor reviews and ratings
- Plan your next update!

---

## Quick Checklist

- [ ] Build completed successfully
- [ ] AAB file downloaded
- [ ] Uploaded to Play Console
- [ ] Release notes added
- [ ] Data Safety form submitted
- [ ] Version code verified (4)
- [ ] Submitted for review
- [ ] Monitoring review status

---

## Need Help?

If you encounter any issues:
1. Check EAS build logs
2. Check Play Console error messages
3. Review the rejection reasons (if any)
4. Make fixes and resubmit

**You're almost there!** 🚀

