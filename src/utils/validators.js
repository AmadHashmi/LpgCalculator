/**
 * Input validation utilities
 */

/**
 * Validate and sanitize number input
 * Only allows numbers and one decimal point
 * @param {string} value - Input value
 * @returns {string} Sanitized value
 */
export const validateNumber = (value) => {
  // Remove all non-numeric characters except decimal point
  let sanitized = value.replace(/[^0-9.]/g, "");
  
  // Ensure only one decimal point
  const parts = sanitized.split(".");
  if (parts.length > 2) {
    sanitized = parts[0] + "." + parts.slice(1).join("");
  }
  
  // Limit to 2 decimal places
  if (parts.length === 2 && parts[1].length > 2) {
    sanitized = parts[0] + "." + parts[1].substring(0, 2);
  }
  
  return sanitized;
};

/**
 * Validate positive number (prevent negative)
 * @param {string} value - Input value
 * @returns {string} Validated value
 */
export const validatePositive = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "";
  return num >= 0 ? value : "";
};

/**
 * Parse number from string, return 0 if invalid
 * @param {string} value - String value
 * @returns {number} Parsed number
 */
export const parseNumber = (value) => {
  if (!value || value === "") return 0;
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
};

