import React from "react";
import { View, Text, ScrollView, StyleSheet, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useCalculator } from "../../context/CalculatorContext";
import Card from "../shared/Card";
import Input from "../shared/Input";
import Button from "../shared/Button";
import Header from "../shared/Header";
import CylinderRow from "../cylinders/CylinderRow";
import { theme } from "../../styles/theme";
import { validateNumber, parseNumber } from "../../utils/validators";
import { getInputValue } from "../../utils/formatters";
import i18n from "../../i18n";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const InputPage = ({ onCalculate }) => {
  const { t } = useTranslation();
  const {
    customerName,
    setCustomerName,
    baseRate,
    updateBaseRate,
    cylinders,
    updateCylinderFare,
    updateCylinderQuantity,
    customFields,
    addCustomField,
    removeCustomField,
    updateCustomField,
    totals,
    resetAll,
  } = useCalculator();

  const handleBaseRateChange = (value) => {
    const sanitized = validateNumber(value);
    updateBaseRate(sanitized);
  };

  const handleCalculate = () => {
    if (!customerName || customerName.trim() === "") {
      Alert.alert(t("Name Required"), t("Please enter customer name"));
      return;
    }

    if (totals.amount == 0 && totals.weight == 0) {
      Alert.alert(t("No Data"), t("Please enter quantities to calculate"));
      return;
    }

    onCalculate();
  };

  const handleReset = () => {
    Alert.alert(
      t("Reset All Data"),
      t("Are you sure you want to reset all calculations?"),
      [
        { text: t("Cancel"), style: "cancel" },
        {
          text: t("Reset"),
          style: "destructive",
          onPress: resetAll,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header title={t("LPG Calculator")} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
      {/* Customer Name */}
      <Card>
        <Input
          label={t("Customer Name")}
          value={customerName}
          onChangeText={setCustomerName}
          placeholder={t("Enter Name")}
          icon="person-outline"
        />
      </Card>

      {/* Base Rate */}
      <Card title={t("Base Rate (11.80 kg)")}>
        <Input
          value={getInputValue(baseRate)}
          onChangeText={handleBaseRateChange}
          placeholder={t("Enter value of (11.80 kilo)")}
          keyboardType="number-pad"
          icon="calculator-outline"
        />
      </Card>

      {/* Cylinders */}
      <Card title={t("Cylinder Details")}>
        {cylinders.map((cylinder, index) => (
          <CylinderRow
            key={cylinder.size}
            cylinder={cylinder}
            onFareChange={(fare) => updateCylinderFare(index, fare)}
            onQuantityChange={(quantity) => updateCylinderQuantity(index, quantity)}
            t={t}
          />
        ))}
      </Card>

      {/* Custom Fields */}
      {customFields.length > 0 && (
        <Card title={t("Custom Fields")}>
          {customFields.map((field) => (
            <View key={field.id} style={styles.customFieldRow}>
              <View style={styles.customFieldInputs}>
                <Input
                  value={getInputValue(field.rate)}
                  onChangeText={(value) => {
                    const sanitized = validateNumber(value);
                    updateCustomField(field.id, "rate", sanitized);
                  }}
                  placeholder={t("Rate")}
                  keyboardType="number-pad"
                  containerStyle={styles.customInput}
                />
                <Input
                  value={getInputValue(field.fare)}
                  onChangeText={(value) => {
                    const sanitized = validateNumber(value);
                    updateCustomField(field.id, "fare", sanitized);
                  }}
                  placeholder={t("Fare")}
                  keyboardType="number-pad"
                  containerStyle={styles.customInput}
                />
                <Input
                  value={getInputValue(field.quantity)}
                  onChangeText={(value) => {
                    const sanitized = validateNumber(value);
                    updateCustomField(field.id, "quantity", sanitized);
                  }}
                  placeholder={t("Quantity")}
                  keyboardType="number-pad"
                  containerStyle={styles.customInput}
                />
              </View>
              <Button
                title=""
                icon="close-circle"
                onPress={() => removeCustomField(field.id)}
                variant="outline"
                style={styles.removeButton}
              />
            </View>
          ))}
        </Card>
      )}

      {/* Add Custom Field Button */}
      {customFields.length < 3 && (
        <View style={styles.addCustomButton}>
          <Button
            title={t("Add Custom Field")}
            icon="add-circle-outline"
            onPress={addCustomField}
            variant="outline"
            fullWidth
          />
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button
          title={t("Reset")}
          icon="refresh-outline"
          onPress={handleReset}
          variant="outline"
          style={styles.resetButton}
        />
        <Button
          title={t("Calculate")}
          icon="calculator"
          onPress={handleCalculate}
          variant="primary"
          style={styles.calculateButton}
          fullWidth
        />
      </View>

      {/* Company Logo and Info */}
      <View style={styles.footer}>
        <Image
          source={require("../../../assets/logo.jpeg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.companyInfo}>
          <Text style={styles.companyText}>
            {t("Powered By")}:{"\n"}
            {t("Company Name Next")}{"\n"}
            {t("Phone1")}
            {t("Phone2")}
          </Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  customFieldRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  customFieldInputs: {
    flex: 1,
    flexDirection: "row",
    gap: theme.spacing.xs,
  },
  customInput: {
    flex: 1,
    marginBottom: 0,
  },
  removeButton: {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.xs,
    minWidth: 40,
  },
  addCustomButton: {
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  actions: {
    flexDirection: "row",
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  resetButton: {
    flex: 1,
  },
  calculateButton: {
    flex: 2,
  },
  footer: {
    flexDirection: i18n.language === "ur" ? "row-reverse" : "row",
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.xl,
    alignItems: "center",
  },
  logo: {
    width: wp("25%"),
    height: wp("25%"),
    marginRight: i18n.language === "ur" ? 0 : theme.spacing.md,
    marginLeft: i18n.language === "ur" ? theme.spacing.md : 0,
  },
  companyInfo: {
    flex: 1,
  },
  companyText: {
    ...theme.typography.body,
    fontWeight: "500",
    color: theme.colors.text.primary,
    lineHeight: 24,
    flexWrap: "wrap",
    flexShrink: 1,
  },
});

export default InputPage;

