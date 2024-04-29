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

import data from "./expense.json";




// App Component
const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const [isdark, setIsDark] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expense, setExpense] = useState(0);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  const handleEdit = (index) => {
    setExpenseTitle(expenseData[index].title);
    setExpense(expenseData[index].amount);
    setEditIndex(index);

  }

//  const handleTotalExpense = () => {
//   const sum = expenseData.reduce((total, item) => total + item.amount, 0);
//   setTotalExpenditure(sum);
// };

const handleTotalExpense = () => {
  let sum = 0;
  expenseData.forEach((item) => {
    sum += item.amount;
  });
  setTotalExpenditure(sum);
};

  
  const handleDelete = (key)=>{
    Alert.alert('Delete Expense', 'Are you sure ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        const newExpenseData = expenseData.filter((item,index)=>key != index)
        setExpenseData(newExpenseData);
        handleTotalExpense();
      }},
    ]);
   
  }

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

  console.log('data' , data)

  const getCurrentYear = () => {
    const currentYear = new Date().getFullYear()-1;
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
  
    if(editIndex !== null){
      const newExpenseData = expenseData.map((item,index)=>{
        if(index === editIndex){
          return {
            title: expenseTitle,
            amount: expenseValue,
            Date: month+" "+year,
            Time: new Date().toLocaleTimeString()
          }
        }
        return item;
      })
      setExpenseData(newExpenseData);
      setTotalExpenditure(totalExpenditure - expenseData[editIndex].amount + expenseValue);
      setExpense(0);
      setExpenseTitle("");
      setEditIndex(null);
      
    }else{
      setExpenseData((data)=>{
        return [...data,{
          title: expenseTitle,
          amount: expenseValue,
          Date: month+" "+year,
          Time: new Date().toLocaleTimeString()
        }]
      })
      setTotalExpenditure(totalExpenditure + expenseValue);
      setExpense(0);
      setExpenseTitle("");
    
    
    console.log("Expense Data", expenseData);
    }
  };



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
        disabled={expenseTitle === '' || expense === 0}
        onPress = {()=>handleAddExpense()}
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
          minWidth:"90%",
          margin: 10,
          borderRadius: 10,
        }}>
          
          {
          expenseData.length != 0 ?
            expenseData.map((data, index) => {
              return (
                <Expense data={data.title} amount={data.amount} date={data.Date} 
                index={index} time={data.Time} key={index} handleEdit={handleEdit} handleDelete= {handleDelete} />
              );
            }) 
          :
          <Text style={{
            color:"white",
            fontSize:20,
            fontWeight:"bold",
            textAlign:"center",
            margin: 20
          
          }}> No Expense</Text>
          
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
