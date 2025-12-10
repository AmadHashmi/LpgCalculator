import { NavigationContainer } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  I18nManager,
  DevSettings,
  Button,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { TouchableOpacity, Alert } from "react-native";
import "./src/i18n";
import { useTranslation } from "react-i18next";
import i18n from "./src/i18n";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { getInputValue, getDisplayValue, formatCurrency } from "./src/utils/formatters";
import { validateNumber, parseNumber } from "./src/utils/validators";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
function HomeScreen() {
  // translation variable
  const { t } = useTranslation();

  // user name
  const [name, setName] = useState();

  // custom Fields
  const [customFields, setCustomFields] = useState([]);
  // add custom fields
  const addCustomField = () => {
    setCustomFields([
      ...customFields,
      {
        meta_id: customFields.length + 1,
        meta_val: "",
        meta_fare: "",
        meta_quantity: "",
        meta_total: "",
      },
    ]);
  };
  // remove custom fields
  const removeCustomField = (index) => {
    if (customFields.length != 0) {
      setCustomFields(customFields.filter((item, itemIndex) => itemIndex !== index));
    }
  };

  //  unit rates
  const [defaultValue, setDefaultValue] = useState((0).toFixed(2));
  const [oneKiloValue, setOneKiloValue] = useState((0).toFixed(2));
  const [fiveKiloValue, setFiveKiloValue] = useState((0).toFixed(2));
  const [fifteenKiloValue, setFifteenKiloValue] = useState((0).toFixed(2));
  const [twentyKiloValue, setTwentyKiloValue] = useState((0).toFixed(2));
  const [fourtyFiveFourKiloValue, setFourtyFiveFourKiloValue] = useState(
    (0).toFixed(2)
  );
  const [tenKiloValue, setTenKiloValue] = useState((0).toFixed(2));
  const [thirtyFiveKiloValue, setThirtyFiveKiloValue] = useState(
    (0).toFixed(2)
  );

  // fare values

  const [oneKiloFareValue, setOneKiloFareValue] = useState(0);
  const [fiveKiloFareValue, setFiveKiloFareValue] = useState(0);
  const [defaultFareValue, setDefaultFareValue] = useState(0);
  const [fifteenKiloFareValue, setFifteenKiloFareValue] = useState(0);
  const [twentyKiloFareValue, setTwentyKiloFareValue] = useState(0);
  const [fourtyFiveFourKiloFareValue, setFourtyFiveFourKiloFareValue] =
    useState(0);
  const [tenKiloFareValue, setTenKiloFareValue] = useState(0);
  const [thirtyFiveKiloFareValue, setThirtyFiveKiloFareValue] = useState(0);

  // quantities
  const [oneKiloQuantityValue, setOneKiloQuantityValue] = useState(0);
  const [fiveKiloQuantityValue, setFiveKiloQuantityValue] = useState(0);
  const [defaultQuantityValue, setDefaultQuantityValue] = useState(0);
  const [fifteenKiloQuantityValue, setFifteenKiloQuantityValue] = useState(0);
  const [twentyKiloQuantityValue, setTwentyKiloQuantityValue] = useState(0);
  const [fourtyFiveFourKiloQuantityValue, setFourtyFiveFourKiloQuantityValue] =
    useState(0);
  const [tenKiloQuantityValue, setTenKiloQuantityValue] = useState(0);
  const [thirtyFiveKiloQuantityValue, setThirtyFiveKiloQuantityValue] =
    useState(0);

  // total Amounts
  const [oneKiloTotalAmount, setOneKiloTotalAmount] = useState(0);
  const [fiveKiloTotalAmount, setFiveKiloTotalAmount] = useState(0);
  const [defaultTotalAmount, setDefaultTotalAmount] = useState(0);
  const [fifteenKiloTotalAmount, setFifteenKiloTotalAmount] = useState(0);
  const [twentyKiloTotalAmount, setTwentyKiloTotalAmount] = useState(0);
  const [fourtyFiveFourKiloTotalAmount, setFourtyFiveFourKiloTotalAmount] =
    useState(0);
  const [tenKiloTotalAmount, setTenKiloTotalAmount] = useState(0);
  const [thirtyFiveKiloTotalAmount, setThirtyFiveKiloTotalAmount] = useState(0);

  // total and weight
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  const nameInputHandler = (name) => {
    setName(name);
  };

  // main 11.80 input handler

  const defaultInputHandler = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    const value = parseNumber(sanitized);
    
    if (value > 0) {
      const priceOfOneKilo = value / 11.8;
      setOneKiloValue(priceOfOneKilo.toFixed(2));
      setFiveKiloValue((priceOfOneKilo * 5).toFixed(2));
      setFifteenKiloValue((priceOfOneKilo * 15).toFixed(2));
      setTwentyKiloValue((priceOfOneKilo * 20).toFixed(2));
      setFourtyFiveFourKiloValue((priceOfOneKilo * 45.4).toFixed(2));
      setTenKiloValue((priceOfOneKilo * 10).toFixed(2));
      setThirtyFiveKiloValue((priceOfOneKilo * 35).toFixed(2));
    } else {
      setOneKiloValue((0).toFixed(2));
      setFiveKiloValue((0).toFixed(2));
      setFifteenKiloValue((0).toFixed(2));
      setTwentyKiloValue((0).toFixed(2));
      setFourtyFiveFourKiloValue((0).toFixed(2));
      setTenKiloValue((0).toFixed(2));
      setThirtyFiveKiloValue((0).toFixed(2));
    }
    setDefaultValue(sanitized);
  };

  // setting fare with validation

  const handleOneKiloFare = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setOneKiloFareValue(parseNumber(sanitized));
  };
  const handleFiveKiloFare = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setFiveKiloFareValue(parseNumber(sanitized));
  };
  const handleDefaultKiloFare = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setDefaultFareValue(parseNumber(sanitized));
  };

  const handleFifteenKiloFare = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setFifteenKiloFareValue(parseNumber(sanitized));
  };
  const handleTwentyKiloFare = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setTwentyKiloFareValue(parseNumber(sanitized));
  };
  const handleFourtyFiveFourKiloFare = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setFourtyFiveFourKiloFareValue(parseNumber(sanitized));
  };
  const handleElevenKiloFare = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setTenKiloFareValue(parseNumber(sanitized));
  };
  const handleFourtyFiveKiloFare = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setThirtyFiveKiloFareValue(parseNumber(sanitized));
  };

  // setting quantity with validation
  const handleOneKiloQuantity = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setOneKiloQuantityValue(parseNumber(sanitized));
  };
  const handleFiveKiloQuantity = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setFiveKiloQuantityValue(parseNumber(sanitized));
  };
  const handleDefaultKiloQuantity = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setDefaultQuantityValue(parseNumber(sanitized));
  };

  const handleFifteenKiloQuantity = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setFifteenKiloQuantityValue(parseNumber(sanitized));
  };
  const handleTwentyKiloQuantity = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setTwentyKiloQuantityValue(parseNumber(sanitized));
  };
  const handleFourtyFiveFourKiloQuantity = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setFourtyFiveFourKiloQuantityValue(parseNumber(sanitized));
  };
  const handleElevenKiloQuantity = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setTenKiloQuantityValue(parseNumber(sanitized));
  };
  const handleFourtyFiveKiloQuantity = (enteredValue) => {
    const sanitized = validateNumber(enteredValue);
    setThirtyFiveKiloQuantityValue(parseNumber(sanitized));
  };

  const html = `
  <html>
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
    <div>
    <h4>Name: </h4> <h5>${name == null || "" ? "______" : name}</h5>
  </div>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">Rate(ریٹ)</th>
                <th scope="col">Fare()</th>
                <th scope="col">Quantity()</th>
                <th scope="col">Total()</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1.00 Kilo Cylinder <br>
                (1.00 کلو سلنڈر)</th>
                <td>${oneKiloFareValue}</td>
                <td>${oneKiloQuantityValue}</td>
                <td>${oneKiloTotalAmount}</td>
              </tr>
              <tr>
                <th scope="row">5.00 Kilo Cylinder <br>
                (5.00 کلو سلنڈر)</th>
                <td>${fiveKiloFareValue}</td>
                <td>${fiveKiloQuantityValue}</td>
                <td>${fiveKiloTotalAmount}</td>
              </tr>
              <tr>
                <th scope="row">11.80 Kilo Cylinder <br>
                (11.80 کلو سلنڈر)</th>
                <td>${defaultFareValue}</td>
                <td>${defaultQuantityValue}</td>
                <td>${defaultTotalAmount}</td>
              </tr>
              <tr>
                <th scope="row">15.00 Kilo Cylinder <br>
                (15.00 کلو سلنڈر)</th>
                <td>${fifteenKiloFareValue}</td>
                <td>${fifteenKiloQuantityValue}</td>
                <td>${fifteenKiloTotalAmount}</td>
              </tr>
              <tr>
                <th scope="row">20.00 Kilo Cylinder <br>
                (20.00 کلو سلنڈر)</th>
                <td>${twentyKiloFareValue}</td>
                <td>${twentyKiloQuantityValue}</td>
                <td>${twentyKiloTotalAmount}</td>
              </tr>
              <tr>
                <th scope="row">45.40 Kilo Cylinder <br>
                (45.00 کلو سلنڈر)</th>
                <td>${fourtyFiveFourKiloFareValue}</td>
                <td>${fourtyFiveFourKiloQuantityValue}</td>
                <td>${fourtyFiveFourKiloTotalAmount}</td>
              </tr>
              <tr>
                <th scope="row">10.00 Kilo Cylinder <br>
                (10.00 کلو سلنڈر)</th>
                <td>${tenKiloFareValue}</td>
                <td>${tenKiloQuantityValue}</td>
                <td>${tenKiloTotalAmount}</td>
              </tr>
              <tr>
                <th scope="row">35.00 Kilo Cylinder <br>
                (35.00 کلو سلنڈر)</th>
                <td>${thirtyFiveKiloFareValue}</td>
                <td>${thirtyFiveKiloQuantityValue}</td>
                <td>${thirtyFiveKiloTotalAmount}</td>
              </tr>
            </tbody>
          </table>
          <div>
          <h4>Total Wight: </h4> <h5>${totalWeight}</h5>
        </div>
        <div>
          <h4>Total amount: </h4> <h5>${totalAmount}</h5>
        </div>

    </body>
</html>`;

  const calculateTotal = () => {
    var oneKiloTotalWeight = 0;
    var oneKiloTotalAmount = 0;

    var fiveKiloTotalWeight = 0;
    var fiveKiloTotalAmount = 0;
    var defaultTotalWeight = 0;
    var defaultTotalAmount = 0;
    var fifteenKiloTotalWeight = 0;
    var fifteenKiloTotalAmount = 0;
    var twentyKiloTotalWeight = 0;
    var twentyKiloTotalAmount = 0;
    var fourtyFiveFourKiloTotalWeight = 0;
    var fourtyFiveFourKiloTotalAmount = 0;
    var tenKiloTotalWeight = 0;
    var tenKiloTotalAmount = 0;
    var thirtyFiveKiloTotalWeight = 0;
    var thirtyFiveKiloTotalAmount = 0;

    var calcTotalWeight = 0;
    var calcTotalAmount = 0;
    if (oneKiloQuantityValue != 0) {
      oneKiloTotalWeight = 1 * oneKiloQuantityValue;
      oneKiloTotalAmount =
        oneKiloValue * oneKiloQuantityValue +
        oneKiloFareValue * oneKiloQuantityValue;
      setOneKiloTotalAmount(oneKiloTotalAmount.toFixed(2));
    }
    if (fiveKiloQuantityValue != 0) {
      fiveKiloTotalWeight = 5 * fiveKiloQuantityValue;
      fiveKiloTotalAmount =
        fiveKiloValue * fiveKiloQuantityValue +
        fiveKiloFareValue * fiveKiloQuantityValue;
      setFiveKiloTotalAmount(fiveKiloTotalAmount.toFixed(2));
    }
    if (defaultQuantityValue != 0) {
      defaultTotalWeight = 11.8 * defaultQuantityValue;
      defaultTotalAmount =
        defaultValue * defaultQuantityValue +
        defaultFareValue * defaultQuantityValue;
      setDefaultTotalAmount(defaultTotalAmount.toFixed(2));
    }
    if (fifteenKiloQuantityValue != 0) {
      fifteenKiloTotalWeight = 15 * fifteenKiloQuantityValue;
      fifteenKiloTotalAmount =
        fifteenKiloValue * fifteenKiloQuantityValue +
        fifteenKiloFareValue * fifteenKiloQuantityValue;
      setFifteenKiloTotalAmount(fifteenKiloTotalAmount.toFixed(2));
    }
    if (twentyKiloQuantityValue != 0) {
      twentyKiloTotalWeight = 20 * twentyKiloQuantityValue;
      twentyKiloTotalAmount =
        twentyKiloValue * twentyKiloQuantityValue +
        twentyKiloFareValue * twentyKiloQuantityValue;
      setTwentyKiloTotalAmount(twentyKiloTotalAmount.toFixed(2));
    }
    if (fourtyFiveFourKiloQuantityValue != 0) {
      fourtyFiveFourKiloTotalWeight = 45.4 * fourtyFiveFourKiloQuantityValue;
      fourtyFiveFourKiloTotalAmount =
        fourtyFiveFourKiloValue * fourtyFiveFourKiloQuantityValue +
        fourtyFiveFourKiloFareValue * fourtyFiveFourKiloQuantityValue;
      setFourtyFiveFourKiloTotalAmount(
        fourtyFiveFourKiloTotalAmount.toFixed(2)
      );
    }
    if (tenKiloQuantityValue != 0) {
      tenKiloTotalWeight = 10 * tenKiloQuantityValue;
      tenKiloTotalAmount =
        tenKiloValue * tenKiloQuantityValue +
        tenKiloFareValue * tenKiloQuantityValue;
      setTenKiloTotalAmount(tenKiloTotalAmount.toFixed(2));
    }
    if (thirtyFiveKiloQuantityValue != 0) {
      thirtyFiveKiloTotalWeight = 35 * thirtyFiveKiloQuantityValue;
      thirtyFiveKiloTotalAmount =
        thirtyFiveKiloValue * thirtyFiveKiloQuantityValue +
        thirtyFiveKiloFareValue * thirtyFiveKiloQuantityValue;
      setThirtyFiveKiloTotalAmount(thirtyFiveKiloTotalAmount.toFixed(2));
    }
    calcTotalWeight =
      oneKiloTotalWeight +
      fiveKiloTotalWeight +
      defaultTotalWeight +
      fifteenKiloTotalWeight +
      twentyKiloTotalWeight +
      fourtyFiveFourKiloTotalWeight +
      tenKiloTotalWeight +
      thirtyFiveKiloTotalWeight;
    setTotalWeight(calcTotalWeight.toFixed(2));
    calcTotalAmount =
      oneKiloTotalAmount +
      fiveKiloTotalAmount +
      defaultTotalAmount +
      fifteenKiloTotalAmount +
      twentyKiloTotalAmount +
      fourtyFiveFourKiloTotalAmount +
      tenKiloTotalAmount +
      thirtyFiveKiloTotalAmount;
    setTotalAmount(calcTotalAmount.toFixed(2));

    if (customFields.length > 0) {
      customFields.map((field) => {
        console.log(field.meta_val);
        console.log(field.meta_fare);
      });
    }
  };

  // Auto-calculate when values change
  useEffect(() => {
    calculateTotal();
  }, [
    oneKiloQuantityValue,
    fiveKiloQuantityValue,
    defaultQuantityValue,
    fifteenKiloQuantityValue,
    twentyKiloQuantityValue,
    fourtyFiveFourKiloQuantityValue,
    tenKiloQuantityValue,
    thirtyFiveKiloQuantityValue,
    oneKiloFareValue,
    fiveKiloFareValue,
    defaultFareValue,
    fifteenKiloFareValue,
    twentyKiloFareValue,
    fourtyFiveFourKiloFareValue,
    tenKiloFareValue,
    thirtyFiveKiloFareValue,
    oneKiloValue,
    fiveKiloValue,
    defaultValue,
    fifteenKiloValue,
    twentyKiloValue,
    fourtyFiveFourKiloValue,
    tenKiloValue,
    thirtyFiveKiloValue,
  ]);

  const resetAll = () => {
    Alert.alert(
      t("Reset All Data"),
      t("Are you sure you want to reset all calculations? This action cannot be undone."),
      [
        {
          text: t("Cancel"),
          style: "cancel",
        },
        {
          text: t("Reset"),
          style: "destructive",
          onPress: () => {
            // set values to 0
            setDefaultValue(0);
    setOneKiloValue(0);
    setFiveKiloValue(0);
    setFifteenKiloValue(0);
    setTwentyKiloValue(0);
    setFourtyFiveFourKiloValue(0);
    setTenKiloValue(0);
    setThirtyFiveKiloValue(0);
    // set fare to 0
    setDefaultFareValue(0);
    setOneKiloFareValue(0);
    setFiveKiloFareValue(0);
    setFifteenKiloFareValue(0);
    setTwentyKiloFareValue(0);
    setFourtyFiveFourKiloFareValue(0);
    setTenKiloFareValue(0);
    setThirtyFiveKiloFareValue(0);

    // set quantity to 0
    setDefaultQuantityValue(0);
    setOneKiloQuantityValue(0);
    setFiveKiloQuantityValue(0);
    setFifteenKiloQuantityValue(0);
    setTwentyKiloQuantityValue(0);
    setFourtyFiveFourKiloQuantityValue(0);
    setTenKiloQuantityValue(0);
    setThirtyFiveKiloQuantityValue(0);

    // set totals to  0

    setTotalAmount(0);
    setTotalWeight(0);

    // set amount totals to 0

    setOneKiloTotalAmount(0);
    setFiveKiloTotalAmount(0);
    setDefaultTotalAmount(0);
    setFifteenKiloTotalAmount(0);
    setTwentyKiloTotalAmount(0);
    setFourtyFiveFourKiloTotalAmount(0);
    setTenKiloTotalAmount(0);
    setThirtyFiveKiloTotalAmount(0);
    setCustomFields([]);
    Toast.show({
      type: "success",
      text1: t("Reset Complete"),
      text2: t("All data has been cleared"),
    });
          },
        },
      ]
    );
  };

  const OnCustomInputValueHandler = (value, index) => {
    const updatedFields = [...customFields];
    updatedFields[index].meta_val = value;
    setCustomFields(updatedFields);
  };

  const OnCustomInputFareHandler = (value, index) => {
    const updatedFields = [...customFields];
    updatedFields[index].meta_fare = value;
    setCustomFields(updatedFields);
  };
  
  const OnCustomInputQuantityHandler = (value, index) => {
    const updatedFields = [...customFields];
    updatedFields[index].meta_quantity = value;
    setCustomFields(updatedFields);
  };

  let generatePDF = async () => {
    try {
      if (!name || name.trim() === "") {
        Toast.show({
          type: "error",
          text1: t("Name Required"),
          text2: t("Please enter customer name before generating PDF"),
        });
        return;
      }

      if (totalAmount == 0 && totalWeight == 0) {
        Toast.show({
          type: "error",
          text1: t("No Data"),
          text2: t("Please enter quantities to calculate totals"),
        });
        return;
      }

      Toast.show({
        type: "info",
        text1: t("Generating PDF"),
        text2: t("Please wait..."),
      });

      const file = await printToFileAsync({
        html: html,
        base64: false,
      });
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
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <TextInput
          onChangeText={nameInputHandler}
          style={{
            ...styles.textInput,
            marginTop: i18n.language === "ur" ? hp("0.4%") : hp("0.5%"),
            width: "50%",
            borderBottomWidth: 1,
            paddingHorizontal: 5,
          }}
          placeholder={t("Enter Name")}
        />
      </View>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            value={getInputValue(defaultValue)}
            onChangeText={defaultInputHandler}
            keyboardType="number-pad"
            style={{
              ...styles.textInput,
              width: "50%",
              marginLeft: 10,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
            placeholder={t("Enter value of (11.80 kilo)")}
          />
        </View>

        <View style={styles.container2}>
          <Text style={styles.head2}>{t("Rate")}</Text>
          <Text style={{ ...styles.head2, flex: 2 }}>{t("Fare")}</Text>
          <Text style={{ ...styles.head2, flex: 2 }}>{t("Quantity")}</Text>
          <Text style={{ ...styles.head2, flex: 2 }}>{t("Total")}</Text>
        </View>
        <View style={styles.container2}>
          <Text numberOfLines={1} style={{ ...styles.head2, ...styles.label2 }}>
            {t("1.00 Kilo Cylinder")}
            <Text style={{ fontWeight: "bold" }}>
              {oneKiloValue == 0 ? "0.00" : oneKiloValue}
            </Text>
          </Text>
          <TextInput
            value={getInputValue(oneKiloFareValue)}
            onChangeText={handleOneKiloFare}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getInputValue(oneKiloQuantityValue)}
            onChangeText={handleOneKiloQuantity}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getDisplayValue(oneKiloTotalAmount)}
            editable={false}
            style={{ ...styles.data2 }}
          />
        </View>
        <View style={styles.container2}>
          <Text numberOfLines={1} style={{ ...styles.head2, ...styles.label2 }}>
            {t("5.00 Kilo Cylinder")}
            <Text style={{ fontWeight: "bold" }}>
              {fiveKiloValue == 0 ? "0.00" : fiveKiloValue}
            </Text>
          </Text>
          <TextInput
            value={getInputValue(fiveKiloFareValue)}
            onChangeText={handleFiveKiloFare}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getInputValue(fiveKiloQuantityValue)}
            onChangeText={handleFiveKiloQuantity}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getDisplayValue(fiveKiloTotalAmount)}
            editable={false}
            style={{ ...styles.data2 }}
          />
        </View>
        <View style={styles.container2}>
          <Text numberOfLines={1} style={{ ...styles.head2, ...styles.label2 }}>
            {t("11.80 Kilo Cylinder")}
            <Text style={{ fontWeight: "bold" }}>
              {defaultValue == 0 ? "0.00" : defaultValue}
            </Text>
          </Text>
          <TextInput
            value={getInputValue(defaultFareValue)}
            onChangeText={handleDefaultKiloFare}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getInputValue(defaultQuantityValue)}
            onChangeText={handleDefaultKiloQuantity}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getDisplayValue(defaultTotalAmount)}
            editable={false}
            style={{ ...styles.data2 }}
          />
        </View>
        <View style={styles.container2}>
          <Text numberOfLines={1} style={{ ...styles.head2, ...styles.label2 }}>
            {t("15.00 Kilo Cylinder")}
            <Text style={{ fontWeight: "bold" }}>
              {fifteenKiloValue == 0 ? "0.00" : fifteenKiloValue}
            </Text>
          </Text>
          <TextInput
            value={getInputValue(fifteenKiloFareValue)}
            onChangeText={handleFifteenKiloFare}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getInputValue(fifteenKiloQuantityValue)}
            onChangeText={handleFifteenKiloQuantity}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getDisplayValue(fifteenKiloTotalAmount)}
            editable={false}
            style={{ ...styles.data2 }}
          />
        </View>
        <View style={styles.container2}>
          <Text numberOfLines={1} style={{ ...styles.head2, ...styles.label2 }}>
            {t("20.00 Kilo Cylinder")}
            <Text style={{ fontWeight: "bold" }}>
              {twentyKiloValue == 0 ? "0.00" : twentyKiloValue}
            </Text>
          </Text>
          <TextInput
            value={getInputValue(twentyKiloFareValue)}
            onChangeText={handleTwentyKiloFare}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getInputValue(twentyKiloQuantityValue)}
            onChangeText={handleTwentyKiloQuantity}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getDisplayValue(twentyKiloTotalAmount)}
            editable={false}
            style={{ ...styles.data2 }}
          />
        </View>
        <View style={styles.container2}>
          <Text numberOfLines={1} style={{ ...styles.head2, ...styles.label2 }}>
            {t("45.40 Kilo Cylinder")}
            <Text style={{ fontWeight: "bold" }}>
              {fourtyFiveFourKiloValue == 0 ? "0.00" : fourtyFiveFourKiloValue}
            </Text>
          </Text>
          <TextInput
            value={getInputValue(fourtyFiveFourKiloFareValue)}
            onChangeText={handleFourtyFiveFourKiloFare}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getInputValue(fourtyFiveFourKiloQuantityValue)}
            onChangeText={handleFourtyFiveFourKiloQuantity}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getDisplayValue(fourtyFiveFourKiloTotalAmount)}
            editable={false}
            style={{ ...styles.data2 }}
          />
        </View>
        <View style={styles.container2}>
          <Text numberOfLines={1} style={{ ...styles.head2, ...styles.label2 }}>
            {t("11.00 Kilo Cylinder")}
            <Text style={{ fontWeight: "bold" }}>
              {tenKiloValue == 0 ? "0.00" : tenKiloValue}
            </Text>
          </Text>
          <TextInput
            value={getInputValue(tenKiloFareValue)}
            onChangeText={handleElevenKiloFare}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getInputValue(tenKiloQuantityValue)}
            onChangeText={handleElevenKiloQuantity}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getDisplayValue(tenKiloTotalAmount)}
            editable={false}
            style={{ ...styles.data2 }}
          />
        </View>
        <View style={styles.container2}>
          <Text numberOfLines={1} style={{ ...styles.head2, ...styles.label2 }}>
            {t("45.00 Kilo Cylinder")}
            <Text style={{ fontWeight: "bold" }}>
              {thirtyFiveKiloValue == 0 ? "0.00" : thirtyFiveKiloValue}
            </Text>
          </Text>
          <TextInput
            value={getInputValue(thirtyFiveKiloFareValue)}
            onChangeText={handleFourtyFiveKiloFare}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getInputValue(thirtyFiveKiloQuantityValue)}
            onChangeText={handleFourtyFiveKiloQuantity}
            keyboardType="number-pad"
            style={{ ...styles.data2 }}
          />
          <TextInput
            value={getDisplayValue(thirtyFiveKiloTotalAmount)}
            editable={false}
            style={{ ...styles.data2 }}
          />
        </View>

        {customFields.map((customInput, key) => {
          return (
            <View key={customInput.meta_id} style={styles.container2}>
              <TextInput
                placeholder={t("Custom Value")}
                value={customInput.meta_val || ""}
                onChangeText={(val) => {
                  OnCustomInputValueHandler(val, key);
                }}
                keyboardType="number-pad"
                style={{ ...styles.data2 }}
              />
              <TextInput
                placeholder={t("Custom Fare")}
                value={customInput.meta_fare || ""}
                onChangeText={(fare) => {
                  OnCustomInputFareHandler(fare, key);
                }}
                keyboardType="number-pad"
                style={{ ...styles.data2 }}
              />
              <TextInput
                placeholder={t("Custom Quantity")}
                value={customInput.meta_quantity || ""}
                onChangeText={(quantity) => {
                  OnCustomInputQuantityHandler(quantity, key);
                }}
                keyboardType="number-pad"
                style={{ ...styles.data2 }}
              />
              <TextInput
                placeholder={t("Custom Total")}
                value={customInput.meta_total || ""}
                editable={false}
                style={{ ...styles.data2 }}
              />
              <Button
                color={"#e34f4f"}
                title="X"
                onPress={() => removeCustomField(key)}
              />
            </View>
          );
        })}

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            disabled={customFields.length == 3}
            onPress={addCustomField}
            style={{
              ...styles.button,
              width: wp("60%"),
              backgroundColor: "#5eb2eb",
            }}
          >
            <Text style={{ ...styles.buttonText }}>
              {t("Add More (Only 3)")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.totalContainer}>
          <View style={styles.totalBox}>
            <Text
              style={{
                ...styles.labelText,
                fontSize: wp("5%"),
                fontWeight: "bold",
                flex: 1,
              }}
            >
              {t("Total Weight")}
            </Text>
            <Text
              style={{
                ...styles.labelText,
                fontSize: wp("4,5%"),
                fontWeight: "bold",
                flex: 1,
              }}
            >
              {totalWeight == 0 ? "0.00" : formatCurrency(totalWeight)}
            </Text>
          </View>
          <View style={styles.totalBox}>
            <Text
              style={{
                ...styles.labelText,
                fontSize: wp("5%"),
                fontWeight: "bold",
                flex: 1,
              }}
            >
              {t("Total Amount")}
            </Text>
            <Text
              style={{
                ...styles.labelText,
                fontSize: wp("4.5%"),
                fontWeight: "bold",
                flex: 1,
              }}
            >
              {totalAmount == 0 ? "0.00" : formatCurrency(totalAmount)}
            </Text>
          </View>
        </View>
        <View style={styles.totalButtonContainer}>
          <TouchableOpacity
            onPress={resetAll}
            style={{ ...styles.button, backgroundColor: "#f2f25e" }}
          >
            <Text style={styles.buttonText}>{t("Reset")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={calculateTotal}
            style={{ ...styles.button, backgroundColor: "#80f27e" }}
          >
            <Text style={{ ...styles.buttonText }}>{t("Calculate")}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={generatePDF}
            style={{
              ...styles.button,
              backgroundColor: "#7398f0",
              width: "50%",
            }}
          >
            <Text style={styles.buttonText}>{t("Generate PDF")}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailComponent}>
          <View style={styles.detailLogo}>
            <Image
              style={{
                width: wp("30%"),
                height: undefined,
                aspectRatio: 1,
                resizeMode: "contain",
              }}
              source={require("./assets/logo.jpeg")}
            />
          </View>
          <View style={styles.detailDesc}>
            <Text
              style={{
                lineHeight: hp("3%"),
                fontSize: hp("2%"),
                fontWeight: "bold",
              }}
            >
              {t("Powered By")}:{"\n"}
              {t("Company Name Next")} {"\n"}
              {t("Phone1")}
              {t("Phone2")}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "LPG Calculator",
              headerRight: () => (
                <Button
                  onPress={() => {
                    i18n
                      .changeLanguage(i18n.language === "en" ? "ur" : "en")
                      .then(() => {
                        I18nManager.forceRTL(i18n.language === "ur");
                        //Restart()
                        //RNRestart.Restart();
                        DevSettings.reload();

                        console.log(i18n.language);
                      });
                  }}
                  title={i18n.language === "ur" ? "ENG" : "URD"}
                  color="#000"
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  detailComponent: {
    flex: 1,
    flexDirection: i18n.language === "ur" ? "row-reverse" : "row",
    paddingVertical: hp("2%"),
  },
  detailLogo: {
    flex: 1,
  },
  detailDesc: {
    flex: 2,
    flexDirection: "column",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    // paddingTop: 50,
    paddingTop: hp("2%"),
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp("0.5%"),
  },
  head2: {
    flex: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  data2: {
    color: "#000000",
    textAlign: "center",
    marginHorizontal: wp("1%"),
    flex: 2,
    borderBottomWidth: wp("0.2%"),
    borderBottomColor: "#000000",
    fontSize: i18n.language === "ur" ? wp("4%") : wp("3.5%"),
  },
  label2: {
    fontSize: wp("3.3%"),
    textAlign: "left",
    paddingLeft: wp("1%"),
    alignSelf: "flex-end",
    fontWeight: "normal",
    fontStyle: "normal",
  },
  tableContainer: {
    paddingTop: hp("2%"),
    flexDirection: "row",
  },
  columnContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  firstColumnContainer: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  headText: {
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: wp("3.5%"),
  },
  labelText: {
    paddingLeft: wp("1%"),
    marginBottom: i18n.language === "ur" ? hp("2%") : hp("2.1%"),
    fontSize: i18n.language === "ur" ? wp("3.5%") : wp("3.5%"),
    letterSpacing: i18n.language === "ur" ? wp("0.04%") : 0,
  },
  textInput: {
    borderBottomWidth: wp("0.2%"),
    borderBottomColor: "#000000",
    fontSize: i18n.language === "ur" ? wp("4%") : wp("3.5%"),
    marginBottom: i18n.language === "ur" ? hp("0.4%") : hp("0.5%"),
    width: wp("17%"),
  },
  totalContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  totalBox: {
    flexDirection: "row",
    padding: wp("2%"),
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
  totalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("100%"),
  },
  button: {
    backgroundColor: "#34a4eb",
    margin: wp("4%"),
    borderRadius: wp("3%"),
  },
  buttonText: { fontSize: hp("2.5%"), padding: wp("3%"), textAlign: "center" },
});
