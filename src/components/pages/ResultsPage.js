import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useCalculator } from "../../context/CalculatorContext";
import Card from "../shared/Card";
import Button from "../shared/Button";
import { theme } from "../../styles/theme";
import { formatCurrency } from "../../utils/formatters";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import Toast from "react-native-toast-message";

const ResultsPage = ({ onBack }) => {
  const { t } = useTranslation();
  const { customerName, cylinders, totals, customFields } = useCalculator();
  const [generating, setGenerating] = useState(false);

  const generatePDF = async () => {
    try {
      setGenerating(true);

      Toast.show({
        type: "info",
        text1: t("Generating PDF"),
        text2: t("Please wait..."),
      });

      // Build HTML for PDF
      const html = `
        <html>
          <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
          </head>
          <body>
            <div style="padding: 20px;">
              <h2>LPG Calculator Invoice</h2>
              <h4>Customer: ${customerName || "______"}</h4>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Cylinder Size</th>
                    <th>Rate</th>
                    <th>Fare</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${cylinders
                    .filter((c) => c.quantity > 0)
                    .map(
                      (cyl) => `
                    <tr>
                      <td>${cyl.size} kg</td>
                      <td>${cyl.rate.toFixed(2)}</td>
                      <td>${cyl.fare.toFixed(2)}</td>
                      <td>${cyl.quantity}</td>
                      <td>${cyl.total.toFixed(2)}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
              <div style="margin-top: 20px;">
                <h4>Total Weight: ${totals.weight} kg</h4>
                <h4>Total Amount: Rs. ${formatCurrency(totals.amount)}</h4>
              </div>
            </div>
          </body>
        </html>
      `;

      const file = await printToFileAsync({ html, base64: false });
      await shareAsync(file.uri);

      Toast.show({
        type: "success",
        text1: t("PDF Generated"),
        text2: t("PDF has been generated and is ready to share"),
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("Error"),
        text2: t("Failed to generate PDF. Please try again."),
      });
      console.error("PDF generation error:", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
      {/* Header with Back Button */}
      <View style={styles.header}>
        <Button
          title={t("Back")}
          icon="arrow-back"
          onPress={onBack}
          variant="outline"
          style={styles.backButton}
        />
        <Text style={styles.headerTitle}>{t("Calculation Results")}</Text>
      </View>

      {/* Customer Info */}
      <Card>
        <View style={styles.customerInfo}>
          <Text style={styles.customerLabel}>{t("Customer")}:</Text>
          <Text style={styles.customerName}>{customerName || "______"}</Text>
        </View>
      </Card>

      {/* Summary Card - Highlighted */}
      <Card style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>{t("Summary")}</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{t("Total Weight")}</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(totals.weight)} kg
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{t("Total Amount")}</Text>
            <Text style={[styles.summaryValue, styles.amountValue]}>
              Rs. {formatCurrency(totals.amount)}
            </Text>
          </View>
        </View>
      </Card>

      {/* Detailed Breakdown */}
      <Card title={t("Detailed Breakdown")}>
        {cylinders
          .filter((cyl) => cyl.quantity > 0)
          .map((cylinder) => (
            <View key={cylinder.size} style={styles.breakdownRow}>
              <View style={styles.breakdownInfo}>
                <Text style={styles.breakdownSize}>
                  {cylinder.size.toFixed(1)} kg {t("Cylinder")}
                </Text>
                <Text style={styles.breakdownDetails}>
                  {t("Rate")}: {cylinder.rate.toFixed(2)} | {t("Fare")}:{" "}
                  {cylinder.fare.toFixed(2)} | {t("Quantity")}:{" "}
                  {cylinder.quantity}
                </Text>
              </View>
              <Text style={styles.breakdownTotal}>
                Rs. {cylinder.total.toFixed(2)}
              </Text>
            </View>
          ))}
      </Card>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button
          title={t("Back to Input")}
          icon="arrow-back"
          onPress={onBack}
          variant="outline"
          style={styles.actionButton}
        />
        <Button
          title={t("Generate PDF")}
          icon="document-text"
          onPress={generatePDF}
          variant="primary"
          loading={generating}
          style={styles.actionButton}
          fullWidth
        />
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
    paddingVertical: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  backButton: {
    marginRight: theme.spacing.md,
  },
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    flex: 1,
  },
  customerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  customerLabel: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginRight: theme.spacing.sm,
  },
  customerName: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  summaryCard: {
    backgroundColor: theme.colors.secondary + "10",
    borderWidth: 2,
    borderColor: theme.colors.secondary,
  },
  summaryTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  summaryValue: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    fontWeight: "bold",
  },
  amountValue: {
    color: theme.colors.secondary,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  breakdownInfo: {
    flex: 1,
  },
  breakdownSize: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontWeight: "500",
  },
  breakdownDetails: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs / 2,
  },
  breakdownTotal: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});

export default ResultsPage;

