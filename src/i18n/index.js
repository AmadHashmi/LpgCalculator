import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Enter Name": "Enter Name",
      "Enter value of (11.80 kilo)": "Enter value of (11.80 kilo)",
      Rate: "Rate",
      Fare: "Fare",
      Quantity: "Quantity",
      Total: "Total",
      "1.00 Kilo Cylinder": "1.00 Kilo Cylinder",
      "5.00 Kilo Cylinder": "5.00 Kilo Cylinder",
      "11.80 Kilo Cylinder": "11.80 Kilo Cylinder",
      "15.00 Kilo Cylinder": "15.00 Kilo Cylinder",
      "20.00 Kilo Cylinder": "20.00 Kilo Cylinder",
      "45.40 Kilo Cylinder": "45.40 Kilo Cylinder",
      "11.00 Kilo Cylinder": "11.00 Kilo Cylinder",
      "45.00 Kilo Cylinder": "45.00 Kilo Cylinder",
      "Other Value": "Other Value",
      "Add More (Only 3)": "Add More (Only 3)",
      "Total Amount": "Total Amount",
      "Total Weight": "Total Weight",
      "Generate PDF": "Generate PDF",
      "Powered By": "Powered By",
      "Company Name": "Global Energy Services (Pvt.)",
      "Company Name Next": "(LPG Gas Traders and Distributers)",
      Phone1: "03155556077",
      Phone2: ", 03355556077",
      "Custom Total": "Total",
      "Custom Value": "Kilo",
      "Custom Fare": "Fare",
      "Custom Quantity": "Quantity",
    },
  },
  ur: {
    translation: {
      "Enter Name": "نام درج کریں",
      "Enter value of (11.80 kilo)": "(11.80 کلو) کی قدر درج کریں",
      Rate: "ریٹ",
      Fare: "کرایا",
      Quantity: "مقدار",
      Total: "ٹوٹل",
      "1.00 Kilo Cylinder": "1.00 کلو سلنڈر",
      "5.00 Kilo Cylinder": "5.00 کلو سلنڈر",
      "11.80 Kilo Cylinder": "11.80 کلو سلنڈر",
      "15.00 Kilo Cylinder": "15.00 کلو سلنڈر",
      "20.00 Kilo Cylinder": "20.00 کلو سلنڈر",
      "45.40 Kilo Cylinder": "45.40 کلو سلنڈر",
      "10.00 Kilo Cylinder": "10.00 کلو سلنڈر",
      "35.00 Kilo Cylinder": "35.00 کلو سلنڈر",
      "Other Value": "دوسری قدر",
      "Add More (Only 3)": "مزید شامل کریں (صرف 3)",
      "Total Amount": "کل رقم",
      "Total Weight": "کل وزن",
      "Generate PDF": "پی ڈی ایف بنائیں",
      Calculate: "حساب لگائیں",
      Reset: "دوبارہ ترتیب دیں",
      "Powered By": "Powered By",
      "Company Name": "Global Energy Services (Pvt.)",
      "Company Name Next": "(LPG Gas Traders and Distributers)",
      Phone1: "03155556077",
      Phone2: ", 03355556077",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: "v3",
    resources,
    lng: I18nManager.isRTL ? "ur" : "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
