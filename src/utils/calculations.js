/**
 * Calculation utilities
 */

/**
 * Calculate totals for all cylinders
 * @param {Array} cylinders - Array of cylinder objects
 * @returns {Object} { totalWeight, totalAmount, updatedCylinders }
 */
export const calculateTotals = (cylinders) => {
  let totalWeight = 0;
  let totalAmount = 0;

  const updatedCylinders = cylinders.map((cylinder) => {
    if (cylinder.quantity > 0) {
      const weight = cylinder.size * cylinder.quantity;
      const amount =
        (parseFloat(cylinder.rate) || 0) * cylinder.quantity +
        (parseFloat(cylinder.fare) || 0) * cylinder.quantity;

      totalWeight += weight;
      totalAmount += amount;

      return { ...cylinder, total: amount };
    } else {
      return { ...cylinder, total: 0 };
    }
  });

  return {
    totalWeight: totalWeight.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    updatedCylinders,
  };
};

