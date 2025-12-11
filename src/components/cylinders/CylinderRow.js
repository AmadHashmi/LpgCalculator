import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import Input from "../shared/Input";
import { theme } from "../../styles/theme";
import { getInputValue, getDisplayValue } from "../../utils/formatters";
import { validateNumber, parseNumber } from "../../utils/validators";

const CylinderRow = ({ cylinder, onFareChange, onQuantityChange, t }) => {
  const handleFareChange = (value) => {
    const sanitized = validateNumber(value);
    onFareChange(parseNumber(sanitized));
  };

  const handleQuantityChange = (value) => {
    const sanitized = validateNumber(value);
    onQuantityChange(parseNumber(sanitized));
  };

  return (
    <View style={styles.row}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {cylinder.size.toFixed(1)} kg {t("Cylinder")}
        </Text>
        <Text style={styles.rate}>
          {t("Rate")}: {getDisplayValue(cylinder.rate)}
        </Text>
      </View>
      <View style={styles.inputsContainer}>
        <View style={styles.inputWrapper}>
          <Input
            value={getInputValue(cylinder.fare)}
            onChangeText={handleFareChange}
            placeholder={t("Fare")}
            keyboardType="number-pad"
            containerStyle={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            value={getInputValue(cylinder.quantity)}
            onChangeText={handleQuantityChange}
            placeholder={t("Quantity")}
            keyboardType="number-pad"
            containerStyle={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            value={getDisplayValue(cylinder.total)}
            editable={false}
            placeholder={t("Total")}
            containerStyle={styles.input}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  labelContainer: {
    marginBottom: theme.spacing.xs,
  },
  label: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontWeight: "500",
    flexWrap: "wrap",
    paddingTop: theme.spacing.xs,
    marginTop: theme.spacing.xs,
    lineHeight: 24,
  },
  rate: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
    paddingTop: theme.spacing.xs / 2,
    flexWrap: "wrap",
    lineHeight: 20,
  },
  inputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    marginBottom: 0,
  },
});

export default CylinderRow;

