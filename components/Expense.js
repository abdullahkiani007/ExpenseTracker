import React from "react";
import { View, Text, StyleSheet , TouchableOpacity} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Expense = (props) => {
  const { amount, data, date,time , index , handleEdit , handleDelete , Itemkey} = props;
  // console.log(props)
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        margin: 10,
        borderBottomColor: "white",
        // backgroundColor:'red',
        borderBottomWidth: 1,
      }}
    >
      <Text style={styles.text}>{index}: {data}</Text>

      <View style={{
        // backgroundColor:"green",
      }}>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
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
            handleDelete(Itemkey)
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



