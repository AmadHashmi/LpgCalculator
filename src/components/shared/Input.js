import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../styles/theme";

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  icon,
  error,
  editable = true,
  style,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label} numberOfLines={2}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError, !icon && styles.inputContainerNoIcon]}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={theme.colors.text.secondary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[styles.input, style]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.light}
          keyboardType={keyboardType}
          editable={editable}
          multiline={false}
          scrollEnabled={false}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    fontWeight: "500",
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.input.background,
    borderWidth: 1,
    borderColor: theme.colors.input.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    minHeight: 48,
    paddingVertical: 0,
  },
  inputContainerNoIcon: {
    paddingHorizontal: theme.spacing.md,
  },
  inputError: {
    borderColor: theme.colors.danger,
  },
  icon: {
    marginRight: theme.spacing.sm,
    flexShrink: 0,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text.primary,
    paddingVertical: 12,
    paddingHorizontal: 0,
    margin: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
    minHeight: 46,
  },
  errorText: {
    ...theme.typography.small,
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
  },
});

export default Input;

