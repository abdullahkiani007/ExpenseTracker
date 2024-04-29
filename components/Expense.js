import React from "react";
import { View, Text, StyleSheet , TouchableOpacity} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Expense = (props) => {
  const { amount, data, date,time , index , handleEdit , handleDelete} = props;
  console.log(props)
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        margin: 10,
        borderBottomColor: "white",
        borderBottomWidth: 1,
      }}
    >
      <Text style={styles.text}>{index}: {data}</Text>
      <View
       
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
              marginRight: 10,
              borderRightColor: "white",
              borderRightWidth: 1,
              paddingRight: 10,
            }}
          >
            ${amount}
          </Text>
          <TouchableOpacity onPress={()=>handleEdit(index)}>
          <Entypo name="edit" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
            handleDelete(index)
          }}>
          <AntDesign name="delete" size={20} color="white" />

          </TouchableOpacity>
        </View>
        <View>
            <Text style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 10,
                opacity: 0.5,
            }}>
                {date} {time}
            </Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontVariant: "bold",
  },
});
export default Expense;



// {
//   "title": "Clothes",
//   "amount": 300,
//   "Date": "May 30,2023",
//   "Time": "3:29 PM"
// },{
//   "title": "Food",
//   "amount": 400,
//   "Date": "May 10,2023",
//   "Time": "4:29 PM"
// },{
//   "title": "Electronics",
//   "amount": 500,
//   "Date": "May 12,2023",
//   "Time": "5:29 PM"
// },{
//   "title": "Furniture",
//   "amount": 600,
//   "Date": "May 15,2023",
//   "Time": "6:29 PM"
// },{
//   "title": "Books",
//   "amount": 700,
//   "Date": "May 17,2023",
//   "Time": "7:29 PM"
// },{
//   "title": "Stationary",
//   "amount": 800,
//   "Date": "May 18,2023",
//   "Time": "8:29 PM"
// },{
//   "title": "Shoes",
//   "amount": 900,
//   "Date": "May 19,2023",
//   "Time": "9:29 PM"
// },{
//   "title": "Toys",
//   "amount": 1000,
//   "Date": "May 21,2023",
//   "Time": "10:29 PM"
// }