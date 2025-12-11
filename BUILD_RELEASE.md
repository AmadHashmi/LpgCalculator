# Building Android App Bundle (AAB) for Play Store

## Prerequisites

1. **Release Keystore**: You need your release keystore file from previous Play Store releases
   - If you don't have it, you'll need to create a new one (but this means you can't update the existing app)

## Step 1: Set Up Keystore

### Option A: If you have an existing keystore from previous releases

1. Copy your release keystore file to: `android/app/release.keystore`
2. Create `android/keystore.properties` file with this content:

```properties
storeFile=../app/release.keystore
keyAlias=YOUR_KEY_ALIAS
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
```

Replace:
- `YOUR_KEY_ALIAS` - Your keystore key alias
- `YOUR_STORE_PASSWORD` - Your keystore password
- `YOUR_KEY_PASSWORD` - Your key password

### Option B: If you need to create a new keystore (only if this is a new app)

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore -alias release-key -keyalg RSA -keysize 2048 -validity 10000
```

Then create `android/keystore.properties` as shown in Option A.

## Step 2: Build the AAB

Run this command from the project root:

```bash
cd android
./gradlew bundleRelease
```

The AAB file will be created at:
`android/app/build/outputs/bundle/release/app-release.aab`

## Step 3: Upload to Play Store

1. Go to Google Play Console
2. Navigate to: **Test and release** → **Production** (or your desired track)
3. Click **Create new release**
4. Upload the AAB file: `android/app/build/outputs/bundle/release/app-release.aab`
5. Add release notes
6. Review and submit

## Troubleshooting

- If build fails, make sure Java/JDK is installed
- If keystore errors occur, verify the keystore.properties file path and passwords
- Make sure you're using the SAME keystore as previous releases (for app updates)

