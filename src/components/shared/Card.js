import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

const Card = ({ children, title, style, titleStyle }) => {
  return (
    <View style={[styles.card, style]}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    paddingTop: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
    ...theme.shadows.md,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    paddingBottom: 0,
    lineHeight: 26,
  },
});

export default Card;

