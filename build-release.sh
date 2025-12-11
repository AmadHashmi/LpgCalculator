#!/bin/bash

# Build Android App Bundle (AAB) for Play Store Release
# This script helps you build the release AAB file

# Use Java 17 for compatibility with Gradle
export JAVA_HOME=$(/usr/libexec/java_home -v 17 2>/dev/null || echo "$JAVA_HOME")

echo "🚀 Building Android App Bundle for Play Store..."
echo "Using Java: $JAVA_HOME"
echo ""

# Check if keystore.properties exists
if [ ! -f "android/keystore.properties" ]; then
    echo "⚠️  WARNING: keystore.properties not found!"
    echo ""
    echo "You need to create android/keystore.properties with your keystore details."
    echo ""
    echo "If you have an existing keystore from previous releases:"
    echo "1. Copy your keystore file to: android/app/release.keystore"
    echo "2. Create android/keystore.properties with:"
    echo "   storeFile=../app/release.keystore"
    echo "   keyAlias=YOUR_KEY_ALIAS"
    echo "   storePassword=YOUR_STORE_PASSWORD"
    echo "   keyPassword=YOUR_KEY_PASSWORD"
    echo ""
    echo "The build will continue but will use debug keystore (not suitable for Play Store)."
    echo ""
    read -p "Press Enter to continue anyway, or Ctrl+C to cancel and set up keystore first..."
fi

# Navigate to android directory
cd android

# Clean previous builds
echo "🧹 Cleaning previous builds..."
./gradlew clean

# Build the AAB
echo "📦 Building App Bundle..."
./gradlew bundleRelease

# Check if build was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📱 Your AAB file is located at:"
    echo "   android/app/build/outputs/bundle/release/app-release.aab"
    echo ""
    echo "📤 Next steps:"
    echo "1. Go to Google Play Console"
    echo "2. Navigate to: Test and release → Production"
    echo "3. Click 'Create new release'"
    echo "4. Upload the AAB file above"
    echo "5. Add release notes and submit"
    echo ""
else
    echo ""
    echo "❌ Build failed! Please check the error messages above."
    exit 1
fi

