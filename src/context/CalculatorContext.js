import React, { createContext, useContext, useState, useCallback } from "react";
import { calculateTotals } from "../utils/calculations";

const CalculatorContext = createContext();

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error("useCalculator must be used within CalculatorProvider");
  }
  return context;
};

export const CalculatorProvider = ({ children }) => {
  // Customer info
  const [customerName, setCustomerName] = useState("");

  // Base rate (11.80 kg)
  const [baseRate, setBaseRate] = useState("");

  // Cylinder data structure
  const [cylinders, setCylinders] = useState([
    { size: 1, rate: 0, fare: 0, quantity: 0, total: 0 },
    { size: 5, rate: 0, fare: 0, quantity: 0, total: 0 },
    { size: 11.8, rate: 0, fare: 0, quantity: 0, total: 0 },
    { size: 15, rate: 0, fare: 0, quantity: 0, total: 0 },
    { size: 20, rate: 0, fare: 0, quantity: 0, total: 0 },
    { size: 45.4, rate: 0, fare: 0, quantity: 0, total: 0 },
    { size: 10, rate: 0, fare: 0, quantity: 0, total: 0 },
    { size: 35, rate: 0, fare: 0, quantity: 0, total: 0 },
  ]);

  // Custom fields
  const [customFields, setCustomFields] = useState([]);

  // Totals
  const [totals, setTotals] = useState({ weight: 0, amount: 0 });

  // Update base rate and calculate all cylinder rates
  const updateBaseRate = useCallback((value) => {
    setBaseRate(value);
    const numValue = parseFloat(value) || 0;
    if (numValue > 0) {
      const pricePerKilo = numValue / 11.8;
      setCylinders((prev) =>
        prev.map((cyl) => ({
          ...cyl,
          rate: cyl.size === 11.8 ? numValue : pricePerKilo * cyl.size,
        }))
      );
    } else {
      setCylinders((prev) => prev.map((cyl) => ({ ...cyl, rate: 0 })));
    }
  }, []);

  // Update cylinder fare
  const updateCylinderFare = useCallback((index, fare) => {
    setCylinders((prev) => {
      const updated = [...prev];
      updated[index].fare = parseFloat(fare) || 0;
      return updated;
    });
  }, []);

  // Update cylinder quantity
  const updateCylinderQuantity = useCallback((index, quantity) => {
    setCylinders((prev) => {
      const updated = [...prev];
      updated[index].quantity = parseFloat(quantity) || 0;
      return updated;
    });
  }, []);

  // Calculate totals whenever cylinders change
  React.useEffect(() => {
    const { totalWeight, totalAmount, updatedCylinders } = calculateTotals(cylinders);
    setTotals({ weight: parseFloat(totalWeight), amount: parseFloat(totalAmount) });
    // Update cylinders with calculated totals
    // Use a ref or check to prevent infinite loops
    const needsUpdate = updatedCylinders.some(
      (cyl, idx) => Math.abs(cyl.total - (cylinders[idx]?.total || 0)) > 0.01
    );
    if (needsUpdate) {
      setCylinders(updatedCylinders);
    }
  }, [
    JSON.stringify(cylinders.map((c) => ({ q: c.quantity, f: c.fare, r: c.rate }))),
  ]);

  // Add custom field
  const addCustomField = useCallback(() => {
    setCustomFields((prev) => [
      ...prev,
      {
        id: Date.now(),
        rate: "",
        fare: "",
        quantity: "",
        total: 0,
      },
    ]);
  }, []);

  // Remove custom field
  const removeCustomField = useCallback((id) => {
    setCustomFields((prev) => prev.filter((field) => field.id !== id));
  }, []);

  // Update custom field
  const updateCustomField = useCallback((id, field, value) => {
    setCustomFields((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }, []);

  // Reset all
  const resetAll = useCallback(() => {
    setCustomerName("");
    setBaseRate("");
    setCylinders((prev) =>
      prev.map((cyl) => ({ ...cyl, rate: 0, fare: 0, quantity: 0, total: 0 }))
    );
    setCustomFields([]);
    setTotals({ weight: 0, amount: 0 });
  }, []);

  const value = {
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
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};

