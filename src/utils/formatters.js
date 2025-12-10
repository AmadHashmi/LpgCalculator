/**
 * Number formatting utilities
 */

/**
 * Format number to currency string with commas
 * @param {number|string} value - Number to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value) => {
  if (!value || value === 0 || value === "0") return "0.00";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0.00";
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Format number with 2 decimal places
 * @param {number|string} value - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (value) => {
  if (!value || value === 0 || value === "0") return "0.00";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0.00";
  return num.toFixed(2);
};

/**
 * Get display value for TextInput (empty string if 0, otherwise formatted)
 * @param {number|string} value - Value to format
 * @returns {string} Display value
 */
export const getInputValue = (value) => {
  if (!value || value === 0 || value === "0") return "";
  return value.toString();
};

/**
 * Get display value for readonly fields (show 0.00 if 0)
 * @param {number|string} value - Value to format
 * @returns {string} Display value
 */
export const getDisplayValue = (value) => {
  if (!value || value === 0 || value === "0") return "0.00";
  return formatNumber(value);
};

