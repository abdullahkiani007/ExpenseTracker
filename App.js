import React, { useState } from "react";
import {
  View,
  Text,
  Appearance,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Expense from "./components/Expense";


// App Component
const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const [isdark, setIsDark] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expense, setExpense] = useState(0);
  const [totalExpenditure, setTotalExpenditure] = useState(0);

  const handleEdit = (index) => {
    setExpenseTitle(expenseData[index].title);
    setExpense(expenseData[index].amount);
    console.log("Edit", expenseData[index].amount);
  }

  const handleTotalExpense = ()=>{
    const sum = expenseData.reduce((item,index)=>item.amount+index.amount,0)
    setTotalExpenditure(sum)
  }
  
  const handleDelete = (key)=>{
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
    expenseData.filter((item,index)=>key != index)
  }
  const expenseData = [
    {
      "title": "Groceries savemart",
      "amount": 100,
      "Date": "May 16,2023",
      "Time": "1:29 PM"
    },{
      "title": "Sports Equipment",
      "amount": 200,
      "Date": "May 20,2023",
      "Time": "2:29 PM"
    },{
      "title": "Clothes",
      "amount": 300,
      "Date": "May 30,2023",
      "Time": "3:29 PM"
    },{
      "title": "Food",
      "amount": 400,
      "Date": "May 10,2023",
      "Time": "4:29 PM"
    },{
      "title": "Electronics",
      "amount": 500,
      "Date": "May 12,2023",
      "Time": "5:29 PM"
    },{
      "title": "Furniture",
      "amount": 600,
      "Date": "May 15,2023",
      "Time": "6:29 PM"
    },{
      "title": "Books",
      "amount": 700,
      "Date": "May 17,2023",
      "Time": "7:29 PM"
    },{
      "title": "Stationary",
      "amount": 800,
      "Date": "May 18,2023",
      "Time": "8:29 PM"
    },{
      "title": "Shoes",
      "amount": 900,
      "Date": "May 19,2023",
      "Time": "9:29 PM"
    },{
      "title": "Toys",
      "amount": 1000,
      "Date": "May 21,2023",
      "Time": "10:29 PM"
    }
  ]
  const months = [
    { key: "1", value: "January" },
    { key: "2", value: "February" },
    { key: "3", value: "March" },
    { key: "4", value: "April" },
    { key: "5", value: "May" },
    { key: "6", value: "June" },
    { key: "7", value: "July" },
    { key: "8", value: "August" },
    { key: "9", value: "September" },
    { key: "10", value: "October" },
    { key: "11", value: "November" },
    { key: "12", value: "December" },
  ];


  const getCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 1; i <= 10; i++) {
      years.push({ key: `${i}`, value: `${currentYear + i}` });
    }
    return years;
  };

  const years = getCurrentYear();

  function toggleSwitch() {
    setIsDark(!isdark);
    Appearance.setColorScheme(isdark ? "dark" : "light");
  }

  const handleAddExpense = () => {
    const expenseValue = parseFloat(expense);
    if (!isNaN(expenseValue)) {
      setTotalExpenditure(totalExpenditure + expenseValue);
      setExpense("");
    }
  };

  console.log("Expense Title", expenseTitle);

  return (
    <View style={isdark ? styleSheet.darkStyle : styleSheet.lightStyle}>
      <View style={{}}>
        <Text
          style={{
            marginTop: 60,
            fontSize: 25,
            fontWeight: "bold",
            color: isdark ? "white" : "black",
          }}
        >
          Expenses Log
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
          maxHeight: 30,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: isdark ? "white" : "black",
          }}
        >
          Dark Mode
        </Text>

        <Switch
          trackColor={{ false: "grey", true: "white" }}
          thumbColor={"#135D66"}
          onValueChange={toggleSwitch}
          value={isdark}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          color: "white",
        }}
      >
        <SelectList
          setSelected={(val) => setMonth(val)}
          data={months}
          save="value"
          placeholder="Month"
          inputStyles={isdark ? styleSheet.dark.text : styleSheet.light.text}
          boxStyles={styleSheet.lightDropdown.boxStyles}
          dropdownTextStyles={
            isdark ? styleSheet.dark.text : styleSheet.light.text
          }
          dropdownStyles={
            {
              // position:"absolute",
              // backgroundColor:"white",
              // zIndex:0
            }
          }
        />

        <SelectList
          setSelected={(val) => setYear(val)}
          data={years}
          save="value"
          placeholder="Year"
          inputStyles={isdark ? styleSheet.dark.text : styleSheet.light.text}
          boxStyles={styleSheet.lightDropdown.boxStyles}
          dropdownTextStyles={
            isdark ? styleSheet.dark.text : styleSheet.light.text
          }
        />
      </View>

      <View style={{
        width:"100%",
        margin: 20,
        alignItems:"center"
      }}>
      <View style={{ flexDirection: "row", marginHorizontal: 10 }}>

        {/* Title Input */}

        <TextInput
          editable={true}
          style={{
            height: 40,
            width: "70%",
            color: "#009688",
            borderBottomColor:"#009688",
            borderBottomWidth:1
          }}
          onChangeText={(text) => {
              setExpenseTitle(text)
          }}
          value={expenseTitle}
          placeholder="Title"
          placeholderTextColor={isdark ? "white" : "black"}
        />

        {/* Expense Input */}
        <TextInput
          style={{
            height: 40,
            width: "20%",
            color: "#009688",
            borderBottomColor:"#009688",
            borderBottomWidth:1,
            marginLeft: 10,
          }}
          onChangeText={(text) => {
            setExpense(text);
          }}
          inputMode="numeric"
          value={expense}
          placeholder="00"
          placeholderTextColor="#009688"
        />
      </View>

     

      
      <TouchableOpacity
        style={{
          backgroundColor: "#009688",
          padding: 10,
          borderRadius: 10,
          margin: 10,
          width: "90%",
          alignItems: "center",
        }}
        onPress={()=>{
          console.log("yooo")
        }}
        >
          <Text style={{
            color: "white",
            fontSize: 15,
            fontWeight: "bold",
          
          }}>
            Add Expense
          </Text>
        </TouchableOpacity>

        <View style={{
          flexDirection:"row",
          justifyContent:"space-between",
          width:"90%"
        }}>
          <Text style={{
            color: "#009688",
            fontSize: 15,
            fontWeight: "bold",
          }}>
            Total Expenditure:
          </Text>
          <Text style={{
            color: "#009688",
            fontSize: 15,
            fontWeight: "bold",
          
          }}>
            {totalExpenditure}$
          </Text>
        </View>

        </View>

          {/* show all the expenses */}
          <ScrollView contentContainerStyle={styleSheet.scrollViewContent}>
        <View  style={{
          backgroundColor: "#009688",
          height:"100%",
          width:"90%",
          margin: 10,
          borderRadius: 10,
        }}>
          {
            expenseData.map((data, index) => {
              return (
                <Expense data={data.title} amount={data.amount} date={data.Date} 
                index={index} time={data.Time} key={index} handleEdit={handleEdit} />
              );
            }) 
          }

        </View>
        </ScrollView>
    </View>
  );
};

const styleSheet = StyleSheet.create({
  darkStyle: {
    backgroundColor: "black",
    color: "white",
    minHeight: "100%",
    alignItems: "center",
  },
  lightStyle: {
    backgroundColor: "white",
    color: "black",
    minHeight: "100%",
    alignItems: "center",
  },

  lightDropdown: {
    boxStyles: {
      backgroundColor: "#009688",
      margin: 10,
      width: 150,
    },
  },
  dark: {
    text: {
      color: "white",
    },
  },

  light: {
    text: {
      color: "black",
    },
  },
  scrollViewContent: {
    flexGrow: 1, // Allows content to scroll vertically
    alignItems: 'center' // Align content to center vertically
  }
});

export default App;
