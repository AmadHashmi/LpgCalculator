import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../styles/theme";

const Button = ({
  title,
  onPress,
  variant = "primary",
  icon,
  iconPosition = "left",
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: disabled ? theme.colors.text.light : theme.colors.primary,
          borderColor: disabled ? theme.colors.text.light : theme.colors.primary,
        };
      case "secondary":
        return {
          backgroundColor: disabled ? theme.colors.text.light : theme.colors.secondary,
          borderColor: disabled ? theme.colors.text.light : theme.colors.secondary,
        };
      case "danger":
        return {
          backgroundColor: disabled ? theme.colors.text.light : theme.colors.danger,
          borderColor: disabled ? theme.colors.text.light : theme.colors.danger,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: disabled ? theme.colors.text.light : theme.colors.primary,
          borderWidth: 2,
        };
      default:
        return {
          backgroundColor: disabled ? theme.colors.text.light : theme.colors.primary,
        };
    }
  };

  const getTextColor = () => {
    if (variant === "outline") {
      return disabled ? theme.colors.text.light : theme.colors.primary;
    }
    return "#ffffff";
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyles(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Ionicons name={icon} size={20} color={getTextColor()} style={styles.iconLeft} />
          )}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
          {icon && iconPosition === "right" && (
            <Ionicons name={icon} size={20} color={getTextColor()} style={styles.iconRight} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    minHeight: 56,
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    ...theme.typography.body,
    fontWeight: "600",
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    lineHeight: 28,
  },
  iconLeft: {
    marginRight: theme.spacing.sm,
  },
  iconRight: {
    marginLeft: theme.spacing.sm,
  },
});

export default Button;

