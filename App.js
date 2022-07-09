
import { NavigationContainer } from '@react-navigation/native';
import {  Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
const Stack = createNativeStackNavigator();
function HomeScreen() {
  //  unit rates 

  const [defaultValue, setDefaultValue] = useState((0).toFixed(2));
  const [oneKiloValue, setOneKiloValue] = useState((0).toFixed(2));
  const [sixKiloValue, setSixKiloValue] = useState((0).toFixed(2));
  const [fifteenKiloValue, setFifteenKiloValue] = useState((0).toFixed(2));
  const [twentyKiloValue, setTwentyKiloValue] = useState((0).toFixed(2));
  const [fourtyFiveFourKiloValue, setFourtyFiveFourKiloValue] = useState((0).toFixed(2));
  const [elevenKiloValue, setElevenKiloValue] = useState((0).toFixed(2));
  const [fourtyFiveKiloValue, setFourtyFiveKiloValue] = useState((0).toFixed(2));

  // fare values

  const [oneKiloFareValue, setOneKiloFareValue] = useState(0)
  const [sixKiloFareValue, setSixKiloFareValue] = useState(0)
  const [defaultFareValue, setDefaultFareValue] = useState(0)
  const [fifteenKiloFareValue, setFifteenKiloFareValue] = useState(0)
  const [twentyKiloFareValue, setTwentyKiloFareValue] = useState(0)
  const [fourtyFiveFourKiloFareValue, setFourtyFiveFourKiloFareValue] = useState(0)
  const [elevenKiloFareValue, setElevenKiloFareValue] = useState(0)
  const [fourtyFiveKiloFareValue, setFourtyFiveKiloFareValue] = useState(0)

  // quantities 
  const [oneKiloQuantityValue, setOneKiloQuantityValue] = useState(0)
  const [sixKiloQuantityValue, setSixKiloQuantityValue] = useState(0)
  const [defaultQuantityValue, setDefaultQuantityValue] = useState(0)
  const [fifteenKiloQuantityValue, setFifteenKiloQuantityValue] = useState(0)
  const [twentyKiloQuantityValue, setTwentyKiloQuantityValue] = useState(0)
  const [fourtyFiveFourKiloQuantityValue, setFourtyFiveFourKiloQuantityValue] = useState(0)
  const [elevenKiloQuantityValue, setElevenKiloQuantityValue] = useState(0)
  const [fourtyFiveKiloQuantityValue, setFourtyFiveKiloQuantityValue] = useState(0)

  // total Amounts
  const [oneKiloTotalAmount, setOneKiloTotalAmount] = useState(0)
  const [sixKiloTotalAmount, setSixKiloTotalAmount] = useState(0)
  const [defaultTotalAmount, setDefaultTotalAmount] = useState(0)
  const [fifteenKiloTotalAmount, setFifteenKiloTotalAmount] = useState(0)
  const [twentyKiloTotalAmount, setTwentyKiloTotalAmount] = useState(0)
  const [fourtyFiveFourKiloTotalAmount, setFourtyFiveFourKiloTotalAmount] = useState(0)
  const [elevenKiloTotalAmount, setElevenKiloTotalAmount] = useState(0)
  const [fourtyFiveKiloTotalAmount, setFourtyFiveKiloTotalAmount] = useState(0)


  // total and weight
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  // main 11.80 input handler

  const defaultInputHandler = (enteredValue) => {
    var priceOfOneKilo = enteredValue / 11.8;
    setOneKiloValue(priceOfOneKilo.toFixed(2))
    setSixKiloValue((priceOfOneKilo * 6).toFixed(2))
    setFifteenKiloValue((priceOfOneKilo * 15).toFixed(2))
    setTwentyKiloValue((priceOfOneKilo * 20).toFixed(2))
    setFourtyFiveFourKiloValue((priceOfOneKilo * 45.40).toFixed(2))
    setElevenKiloValue((priceOfOneKilo * 11).toFixed(2))
    setFourtyFiveKiloValue((priceOfOneKilo * 45).toFixed(2))
    setDefaultValue(enteredValue);
  }

  // setting fare

  const handleOneKiloFare = (enteredValue) => {
    setOneKiloFareValue(enteredValue);
  }
  const handleSixKiloFare = (enteredValue) => {
    setSixKiloFareValue(enteredValue);
  }
  const handleDefaultKiloFare = (enteredValue) => {
    setDefaultFareValue(enteredValue);
  }

  const handleFifteenKiloFare = (enteredValue) => {
    setFifteenKiloFareValue(enteredValue);
  }
  const handleTwentyKiloFare = (enteredValue) => {
    setTwentyKiloFareValue(enteredValue);
  }
  const handleFourtyFiveFourKiloFare = (enteredValue) => {
    setFourtyFiveFourKiloFareValue(enteredValue);
  }
  const handleElevenKiloFare = (enteredValue) => {
    setElevenKiloFareValue(enteredValue);
  }
  const handleFourtyFiveKiloFare = (enteredValue) => {
    setFourtyFiveKiloFareValue(enteredValue);
  }

  // setting quantity
  const handleOneKiloQuantity = (enteredValue) => {
    setOneKiloQuantityValue(enteredValue);
  }
  const handleSixKiloQuantity = (enteredValue) => {
    setSixKiloQuantityValue(enteredValue);
  }
  const handleDefaultKiloQuantity = (enteredValue) => {
    setDefaultQuantityValuev(enteredValue);
  }

  const handleFifteenKiloQuantity = (enteredValue) => {
    setFifteenKiloQuantityValue(enteredValue);
  }
  const handleTwentyKiloQuantity = (enteredValue) => {
    setTwentyKiloQuantityValue(enteredValue);
  }
  const handleFourtyFiveFourKiloQuantity = (enteredValue) => {
    setFourtyFiveFourKiloQuantityValue(enteredValue);
  }
  const handleElevenKiloQuantity = (enteredValue) => {
    setElevenKiloQuantityValue(enteredValue);
  }
  const handleFourtyFiveKiloQuantity = (enteredValue) => {
    setFourtyFiveKiloQuantityValue(enteredValue);
  }

  const calculateTotal = () =>{
    var oneKiloTotalWeight = 0;
    var oneKiloTotalAmount = 0;
    
    var sixKiloTotalWeight = 0;
    var sixKiloTotalAmount = 0;
    var defaultTotalWeight = 0;
    var defaultTotalAmount = 0;
    var fifteenKiloTotalWeight = 0;
    var fifteenKiloTotalAmount = 0;
    var twentyKiloTotalWeight = 0;
    var twentyKiloTotalAmount = 0;
    var fourtyFiveFourKiloTotalWeight = 0;
    var fourtyFiveFourKiloTotalAmount = 0;
    var elevenKiloTotalWeight = 0;
    var elevenKiloTotalAmount = 0;
    var fourtyFiveKiloTotalWeight = 0;
    var fourtyFiveKiloTotalAmount = 0;

    var calcTotalWeight = 0;
    var calcTotalAmount = 0;
    if(oneKiloQuantityValue != 0){
      oneKiloTotalWeight  = 1 * oneKiloQuantityValue;
      oneKiloTotalAmount = (oneKiloValue * oneKiloQuantityValue) + (oneKiloFareValue * oneKiloQuantityValue)
      setOneKiloTotalAmount(oneKiloTotalAmount.toFixed(2))
    }
    if(sixKiloQuantityValue != 0){
      sixKiloTotalWeight  = 6 * sixKiloQuantityValue;
      sixKiloTotalAmount = (sixKiloValue * sixKiloQuantityValue) + (sixKiloFareValue * sixKiloQuantityValue)
      setSixKiloTotalAmount(sixKiloTotalAmount.toFixed(2))
    }
    if(defaultQuantityValue != 0){
      defaultTotalWeight  = 11.80 * defaultQuantityValue;
      defaultTotalAmount = (defaultValue * defaultQuantityValue) + (defaultFareValue * defaultQuantityValue)
      setDefaultTotalAmount(defaultTotalAmount.toFixed(2))
    }
    if(fifteenKiloQuantityValue != 0){
      fifteenKiloTotalWeight  = 15 * fifteenKiloQuantityValue;
      fifteenKiloTotalAmount = (fifteenKiloValue * fifteenKiloQuantityValue) + (fifteenKiloFareValue * fifteenKiloQuantityValue)
      setFifteenKiloTotalAmount(fifteenKiloTotalAmount.toFixed(2))
    }
    if(twentyKiloQuantityValue != 0){
      twentyKiloTotalWeight  = 20 * twentyKiloQuantityValue;
      twentyKiloTotalAmount = (twentyKiloValue * twentyKiloQuantityValue) + (twentyKiloFareValue * twentyKiloQuantityValue)
      setTwentyKiloTotalAmount(twentyKiloTotalAmount.toFixed(2))
    }
    if(fourtyFiveFourKiloQuantityValue != 0){
      fourtyFiveFourKiloTotalWeight  = 45.40 * fourtyFiveFourKiloQuantityValue;
      fourtyFiveFourKiloTotalAmount = (fourtyFiveFourKiloValue * fourtyFiveFourKiloQuantityValue) + (fourtyFiveFourKiloFareValue * oneKiloQuantityValue)
      setFourtyFiveFourKiloTotalAmount(fourtyFiveFourKiloTotalAmount.toFixed(2))
    }
    if(elevenKiloQuantityValue != 0){
      elevenKiloTotalWeight  = 11 * elevenKiloQuantityValue;
      elevenKiloTotalAmount = (elevenKiloValue * elevenKiloQuantityValue) + (elevenKiloFareValue * elevenKiloQuantityValue)
      setElevenKiloTotalAmount(elevenKiloTotalAmount.toFixed(2))
    }
    if(fourtyFiveKiloQuantityValue != 0){
      fourtyFiveKiloTotalWeight  = 45 * fourtyFiveKiloQuantityValue;
      fourtyFiveKiloTotalAmount = (fourtyFiveKiloValue * fourtyFiveKiloQuantityValue) + (fourtyFiveKiloFareValue * fourtyFiveKiloQuantityValue)
      setFourtyFiveKiloTotalAmount(fourtyFiveKiloTotalAmount.toFixed(2))
    }
    calcTotalWeight = oneKiloTotalWeight + 
    sixKiloTotalWeight + 
    defaultTotalWeight + 
    fifteenKiloTotalWeight +
    twentyKiloTotalWeight + fourtyFiveFourKiloTotalWeight + elevenKiloTotalWeight + fourtyFiveKiloTotalWeight;
    setTotalWeight(calcTotalWeight.toFixed(2))
    calcTotalAmount = oneKiloTotalAmount +
    sixKiloTotalAmount + 
    defaultTotalAmount + 
    fifteenKiloTotalAmount +
    twentyKiloTotalAmount + fourtyFiveFourKiloTotalAmount + elevenKiloTotalAmount + fourtyFiveKiloTotalAmount;
    setTotalAmount(calcTotalAmount.toFixed(2))
    

    
  }

  const resetAll = () => {
    // set values to 0
    setDefaultValue(0);
    setOneKiloValue(0);
    setSixKiloValue(0);
    setFifteenKiloValue(0);
    setTwentyKiloValue(0);
    setFourtyFiveFourKiloValue(0);
    setElevenKiloValue(0);
    setFourtyFiveKiloValue(0);
    // set fare to 0
    setDefaultFareValue(0);
    setOneKiloFareValue(0);
    setSixKiloFareValue(0)
    setFifteenKiloFareValue(0)
    setTwentyKiloFareValue(0)
    setFourtyFiveFourKiloFareValue(0)
    setElevenKiloFareValue(0)
    setFourtyFiveKiloFareValue(0)

    // set quantity to 0
    setDefaultQuantityValue(0);
    setOneKiloQuantityValue(0);
    setSixKiloQuantityValue(0)
    setFifteenKiloQuantityValue(0)
    setTwentyKiloQuantityValue(0)
    setFourtyFiveKiloFareQuantityValue(0)
    setElevenKiloQuantityValue(0)
    setFourtyFiveKiloQuantityValue(0)
    
  }



  return (
    <ScrollView>
<View style={styles.container}>
      
      <View><TextInput value={defaultValue == 0 ? null : defaultValue.toString()} onChangeText={defaultInputHandler} keyboardType='number-pad' style={{ ...styles.textInput, width: '50%', marginLeft: 10, borderWidth:1, borderRadius:10, paddingHorizontal:10}} placeholder="Enter value of (11.80 kilo)" /></View>
      <View style={styles.tableContainer}>

        <View style={styles.firstColumnContainer}>
          <Text style={styles.headText}>Rate</Text>
          <Text numberOfLines={1} style={styles.labelText}>1.00 Kilo Cylinder <Text style={{ fontWeight: 'bold' }}>{oneKiloValue == 0 ? '0.00' : oneKiloValue}</Text></Text>
          <Text numberOfLines={1} style={styles.labelText}>6.00 Kilo Cylinder <Text style={{ fontWeight: 'bold' }}>{sixKiloValue == 0 ? '0.00' : sixKiloValue}</Text></Text>
          <Text numberOfLines={1} style={styles.labelText}>11.80 Kilo Cylinder <Text style={{ fontWeight: 'bold' }}>{defaultValue == 0 ? '0.00' : defaultValue}</Text></Text>
          <Text numberOfLines={1} style={styles.labelText}>15.00 Kilo Cylinder <Text style={{ fontWeight: 'bold' }}>{fifteenKiloValue == 0 ? '0.00' : fifteenKiloValue}</Text></Text>
          <Text numberOfLines={1} style={styles.labelText}>20.00 Kilo Cylinder <Text style={{ fontWeight: 'bold' }}>{twentyKiloValue == 0 ? '0.00' : twentyKiloValue}</Text></Text>
          <Text numberOfLines={1} style={styles.labelText}>45.40 Kilo Cylinder <Text style={{ fontWeight: 'bold' }}>{fourtyFiveFourKiloValue == 0 ? '0.00' : fourtyFiveFourKiloValue}</Text></Text>
          <Text numberOfLines={1} style={styles.labelText}>11.00 Kilo Cylinder <Text style={{ fontWeight: 'bold' }}>{elevenKiloValue == 0 ? '0.00' : elevenKiloValue}</Text></Text>
          <Text numberOfLines={1} style={styles.labelText}>45.00 Kilo Cylinder <Text style={{ fontWeight: 'bold' }}>{fourtyFiveKiloValue == 0 ? '0.00' : fourtyFiveKiloValue}</Text></Text>

        </View>

        <View style={styles.columnContainer}>
          <Text style={styles.headText}>Fare</Text>
          <TextInput value={oneKiloFareValue == 0 ? null : oneKiloFareValue.toString()} onChangeText={handleOneKiloFare} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={sixKiloFareValue == 0 ? null : sixKiloFareValue.toString()} onChangeText={handleSixKiloFare} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={defaultFareValue == 0 ? null : defaultFareValue.toString()} onChangeText={handleDefaultKiloFare} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={fifteenKiloFareValue == 0 ? null : fifteenKiloFareValue.toString()} onChangeText={handleFifteenKiloFare} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={twentyKiloFareValue == 0 ? null : twentyKiloFareValue.toString()} onChangeText={handleTwentyKiloFare} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={fourtyFiveFourKiloFareValue == 0 ? null : fourtyFiveFourKiloFareValue.toString()} onChangeText={handleFourtyFiveFourKiloFare} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={elevenKiloFareValue == 0 ? null : elevenKiloFareValue.toString()} onChangeText={handleElevenKiloFare} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={fourtyFiveKiloFareValue == 0 ? null : fourtyFiveKiloFareValue.toString()} onChangeText={handleFourtyFiveKiloFare} keyboardType='number-pad' style={styles.textInput} />
          
        </View>
        <View style={styles.columnContainer}>
          <Text style={styles.headText}>Quantity</Text>
          <TextInput value={oneKiloQuantityValue == 0 ? null : oneKiloQuantityValue.toString()} onChangeText={handleOneKiloQuantity} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={sixKiloQuantityValue == 0 ? null : sixKiloQuantityValue.toString()} onChangeText={handleSixKiloQuantity} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={defaultQuantityValue == 0 ? null : defaultQuantityValue.toString()} onChangeText={handleDefaultKiloQuantity} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={fifteenKiloQuantityValue == 0 ? null : fifteenKiloQuantityValue.toString()} onChangeText={handleFifteenKiloQuantity} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={twentyKiloQuantityValue == 0 ? null : twentyKiloQuantityValue.toString()} onChangeText={handleTwentyKiloQuantity} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={fourtyFiveFourKiloQuantityValue == 0 ? null : fourtyFiveFourKiloQuantityValue.toString()} onChangeText={handleFourtyFiveFourKiloQuantity} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={elevenKiloQuantityValue == 0 ? null : elevenKiloQuantityValue.toString()} onChangeText={handleElevenKiloQuantity} keyboardType='number-pad' style={styles.textInput} />
          <TextInput value={fourtyFiveKiloQuantityValue == 0 ? null : fourtyFiveKiloQuantityValue.toString()} onChangeText={handleFourtyFiveKiloQuantity} keyboardType='number-pad' style={styles.textInput} />
        </View>
        <View style={styles.columnContainer}>
          <Text style={styles.headText}>Total</Text>
          <TextInput value={oneKiloTotalAmount.toString()} style={styles.textInput} editable={false} />
          <TextInput value={sixKiloTotalAmount.toString()} style={styles.textInput} editable={false} />
          <TextInput value={defaultTotalAmount.toString()} style={styles.textInput} editable={false} />
          <TextInput value={fifteenKiloTotalAmount.toString()} style={styles.textInput} editable={false} />
          <TextInput value={twentyKiloTotalAmount.toString()} style={styles.textInput} editable={false} />
          <TextInput value={fourtyFiveFourKiloTotalAmount.toString()} style={styles.textInput} editable={false} />
          <TextInput value={elevenKiloTotalAmount.toString()} style={styles.textInput} editable={false} />
          <TextInput value={fourtyFiveKiloTotalAmount.toString()} style={styles.textInput} editable={false} />
        </View>
      </View>
      <View style={styles.totalContainer}>
        <View style={styles.totalBox}>
          <Text style={{ ...styles.labelText, fontWeight: 'bold', flex: 1 }}>Total Weight</Text>
          <Text style={{ ...styles.labelText, fontWeight: 'bold', flex: 1 }}>{totalWeight}</Text>
        </View>
        <View style={styles.totalBox}>
          <Text style={{ ...styles.labelText, fontWeight: 'bold', flex: 1 }}>Total Amount</Text>
          <Text style={{ ...styles.labelText, fontWeight: 'bold', flex: 1 }}>{totalAmount}</Text>
        </View>
      </View>
      <View style={styles.totalButtonContainer}>
        <TouchableOpacity onPress={resetAll} style={styles.button}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={calculateTotal} style={styles.button}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailComponent}>
        <View style={styles.detailLogo}>
        <Image style={{width: '100%',
    height: undefined,
    aspectRatio: 1,resizeMode:'contain'}} source={ require('./assets/logo.jpeg') } />
        </View>
        <View style={styles.detailDesc}>
          <Text style={{lineHeight: 20, fontSize:16,fontWeight:'bold'}}>Powered By:{'\n'}
          Global Energy Services (Pvt){'\n'}
          (LPG Gas Traders and Distributers){'\n'}
          03155556077, 03355556077</Text>
        </View>
      </View>
      

    </View>
    </ScrollView>
    
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'LPG Calculator', subTitle: 'Something' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  detailComponent:{
    flex:1,
    flexDirection: 'row',
    paddingVertical: 10
  },
  detailLogo:{
    flex:1,
  },
  detailDesc:{
    flex:2,
    flexDirection:'column',

  },  
  container: {
    flex: 1, flexDirection: 'column',
    paddingTop: 50,
  },
  tableContainer: {
    paddingTop: 50,
    flexDirection: 'row',

  },
  columnContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: "column",
  },
  firstColumnContainer: {
    flex: 2.5,
    display: 'flex',
    flexDirection: "column",
  },
  headText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  labelText: {
    paddingLeft: 5,
    marginTop: 15,
    marginBottom: 5,
    fontSize: 12,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    fontSize: 12,
    marginBottom: 7,
    width: '95%'
  },
  totalContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  totalBox: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start'
  },
  totalButtonContainer:{flexDirection:'row', justifyContent:'space-between', width:'100%'},
  button:{backgroundColor:'#34a4eb',margin:10, borderRadius:10},
  buttonText:{fontSize:25, padding:10, },
})





