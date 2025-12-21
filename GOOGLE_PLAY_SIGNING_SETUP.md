# 🔐 Google Play App Signing Setup Guide

## Current Situation
- **Your EAS Keystore SHA1**: `6D:24:5B:4A:8C:9D:B1:26:46:19:A6:B8:C2:C3:25:9C:23:C6:F1:75`
- **Google Play Expected SHA1**: `55:E8:D6:21:61:CD:F8:57:5E:75:1C:FB:23:E1:AA:13:EE:FF:5C:2B`

## ✅ Solution: Enable Google Play App Signing

### Step 1: Generate Upload Certificate from Your Keystore

You need to extract the certificate from your keystore file.

**If you have the keystore file** (`@amadhashmi179__LpgCalculator.jks`):

```bash
# Extract the certificate (PEM format)
keytool -export -rfc -keystore @amadhashmi179__LpgCalculator.jks \
  -alias "QGFtYWRoYXNobWkxNzkvTHBnQ2FsY3VsYXRvcg==" \
  -file upload_certificate.pem \
  -storepass "a818b029ba7f4845a71fd26f24bbfbd6"
```

**Or if you prefer to use the base64 decoded alias:**
```bash
# First decode the alias (it's base64 encoded)
echo "QGFtYWRoYXNobWkxNzkvTHBnQ2FsY3VsYXRvcg==" | base64 -d
# This will show the actual alias name
```

### Step 2: Enable Google Play App Signing

1. Go to **Google Play Console**
2. Navigate to: **App Integrity** → **App Signing**
3. Click **"Enable Google Play App Signing"**
4. You'll be asked to upload your **upload key certificate**
5. Upload the `upload_certificate.pem` file you generated

### Step 3: Upload Your AAB

After enabling App Signing:
1. Go back to **Production** → **Create release**
2. Upload your AAB file again
3. Google will accept it and re-sign it with the app signing key

---

## 🔄 Alternative: If You Have the Original Keystore

If you previously uploaded with a different key and have that keystore:

1. Use that original keystore for signing
2. Or enable Google Play App Signing and upload the original certificate

---

## 📝 Quick Commands

### Generate Upload Certificate:
```bash
keytool -export -rfc \
  -keystore @amadhashmi179__LpgCalculator.jks \
  -alias "QGFtYWRoYXNobWkxNzkvTHBnQ2FsY3VsYXRvcg==" \
  -file upload_certificate.pem \
  -storepass "a818b029ba7f4845a71fd26f24bbfbd6"
```

### Verify Certificate:
```bash
keytool -printcert -file upload_certificate.pem
```

This should show SHA1: `6D:24:5B:4A:8C:9D:B1:26:46:19:A6:B8:C2:C3:25:9C:23:C6:F1:75`

---

## ⚠️ Important Notes

1. **Keep your keystore safe** - Store it securely (EAS already has it)
2. **Upload certificate** - This is what you upload to Google Play, not the keystore itself
3. **App Signing** - Once enabled, Google manages the signing key
4. **Future builds** - Continue using EAS Build, it will work automatically

---

## 🎯 Next Steps

1. Generate the upload certificate (command above)
2. Enable Google Play App Signing in Play Console
3. Upload the certificate when prompted
4. Re-upload your AAB file
5. Success! 🎉


