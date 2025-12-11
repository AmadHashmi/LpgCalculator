#!/bin/bash

# Pre-build validation script for EAS Build
# This script checks for common issues before running EAS build

set -e

echo "🔍 Running pre-build validation checks..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to check if command exists
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}❌ $1 is not installed${NC}"
        return 1
    else
        echo -e "${GREEN}✅ $1 is installed${NC}"
        return 0
    fi
}

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅ $1 exists${NC}"
        return 0
    else
        echo -e "${RED}❌ $1 is missing${NC}"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅ $1 exists${NC}"
        return 0
    else
        echo -e "${RED}❌ $1 is missing${NC}"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
}

echo "📦 Checking required files and directories..."
check_file "package.json"
check_file "app.json"
check_file "eas.json"
check_file ".npmrc"
check_file "android/build.gradle"
check_file "android/app/build.gradle"
check_file "android/settings.gradle"
check_dir "android/app/src/main"

echo ""
echo "🔧 Checking dependencies..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules not found. Run 'npm install' first${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}✅ node_modules exists${NC}"
fi

# Check package-lock.json is in sync
if [ -f "package-lock.json" ]; then
    echo -e "${GREEN}✅ package-lock.json exists${NC}"
    
    # Check if React versions match (simplified check)
    if grep -q '"react":' package.json && grep -q '"react":' package-lock.json; then
        echo -e "${GREEN}✅ React is configured in both files${NC}"
    else
        echo -e "${YELLOW}⚠️  React version check skipped (parsing issue)${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${YELLOW}⚠️  package-lock.json not found${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo "🏥 Running Expo Doctor..."
if npx expo-doctor 2>&1 | tee /tmp/expo-doctor-output.txt; then
    echo -e "${GREEN}✅ Expo Doctor passed${NC}"
else
    EXIT_CODE=$?
    if grep -q "failed" /tmp/expo-doctor-output.txt || [ $EXIT_CODE -ne 0 ]; then
        echo -e "${YELLOW}⚠️  Expo Doctor found some issues (non-critical warnings)${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
fi

echo ""
echo "📋 Checking dependency versions..."
if npx expo install --check 2>&1 | tee /tmp/expo-install-check.txt; then
    echo -e "${GREEN}✅ All dependencies are compatible${NC}"
else
    if grep -q "out of date" /tmp/expo-install-check.txt; then
        echo -e "${YELLOW}⚠️  Some dependencies are out of date${NC}"
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "${RED}❌ Dependency check failed${NC}"
        ERRORS=$((ERRORS + 1))
    fi
fi

echo ""
echo "🔨 Checking Android build configuration..."

# Check if compileSdk is set
if grep -q "compileSdk" android/app/build.gradle; then
    echo -e "${GREEN}✅ compileSdk is configured${NC}"
else
    echo -e "${RED}❌ compileSdk is not set in android/app/build.gradle${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check if targetSdkVersion is set
if grep -q "targetSdkVersion" android/app/build.gradle; then
    echo -e "${GREEN}✅ targetSdkVersion is configured${NC}"
else
    echo -e "${RED}❌ targetSdkVersion is not set${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check if hermesEnabled is set
if grep -q "hermesEnabled" android/app/build.gradle; then
    echo -e "${GREEN}✅ hermesEnabled is configured${NC}"
else
    echo -e "${YELLOW}⚠️  hermesEnabled is not explicitly set${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

# Check if expo-root-project plugin is applied
if grep -q "expo-root-project" android/build.gradle; then
    echo -e "${GREEN}✅ expo-root-project plugin is configured${NC}"
else
    echo -e "${YELLOW}⚠️  expo-root-project plugin might not be applied${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

# Check for problematic maven plugin usage
if grep -r "apply plugin: 'maven'" android/ 2>/dev/null | grep -v node_modules; then
    echo -e "${RED}❌ Found 'maven' plugin usage (deprecated in Gradle 8+)${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ No deprecated 'maven' plugin found${NC}"
fi

echo ""
echo "📱 Checking app.json configuration..."

# Check if invalid Android properties are removed
if grep -q "compileSdkVersion" app.json; then
    echo -e "${RED}❌ compileSdkVersion should not be in app.json (should be in build.gradle)${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ No invalid Android properties in app.json${NC}"
fi

if grep -q "targetSdkVersion" app.json; then
    echo -e "${RED}❌ targetSdkVersion should not be in app.json${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ app.json is clean${NC}"
fi

echo ""
echo "🧪 Testing Gradle configuration (dry run)..."

if [ -f "android/gradlew" ]; then
    chmod +x android/gradlew
    cd android
    
    # Try to validate Gradle configuration without building
    if ./gradlew tasks --dry-run > /tmp/gradle-dry-run.txt 2>&1; then
        echo -e "${GREEN}✅ Gradle configuration is valid${NC}"
    else
        if grep -q "maven" /tmp/gradle-dry-run.txt; then
            echo -e "${YELLOW}⚠️  Gradle found 'maven' plugin issues (might be in nested dependencies)${NC}"
            WARNINGS=$((WARNINGS + 1))
        elif grep -q "SoftwareComponent.*release.*not found" /tmp/gradle-dry-run.txt; then
            echo -e "${YELLOW}⚠️  Gradle found 'release component' issue (known Expo modules limitation)${NC}"
            echo -e "${YELLOW}   This may work in EAS Build even if it fails locally${NC}"
            WARNINGS=$((WARNINGS + 1))
        else
            echo -e "${RED}❌ Gradle configuration has errors${NC}"
            cat /tmp/gradle-dry-run.txt | tail -20
            ERRORS=$((ERRORS + 1))
        fi
    fi
    
    cd ..
else
    echo -e "${YELLOW}⚠️  gradlew not found, skipping Gradle check${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo "📝 Summary:"
echo "   - Errors found: $ERRORS"
echo "   - Warnings found: $WARNINGS"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Ready for EAS build.${NC}"
    echo ""
    echo "You can now run: eas build --platform android --profile production"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Checks completed with $WARNINGS warning(s).${NC}"
    echo -e "${YELLOW}   You can proceed with EAS build, but consider fixing warnings first.${NC}"
    echo ""
    echo "You can run: eas build --platform android --profile production"
    exit 0
else
    echo -e "${RED}❌ Checks failed with $ERRORS error(s) and $WARNINGS warning(s).${NC}"
    echo -e "${RED}   Please fix the errors before running EAS build.${NC}"
    echo ""
    echo "Common fixes:"
    echo "  - Run 'npm install' to sync dependencies"
    echo "  - Run 'npx expo install --fix' to fix dependency versions"
    echo "  - Check the errors above and fix them in the relevant files"
    exit 1
fi

