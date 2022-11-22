import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Platform,
  View,
} from "react-native";
import { Shadow } from "react-native-shadow-2";

import { AntDesign } from "@expo/vector-icons";
const CartButton = ({ text, navigation, isMain }) => {
  // DB에서 CART 테이블에 있는 데이터 수 세야됨
  const [cartStatusNum, setCartStatusNum] = React.useState(0);

  return (
    <TouchableOpacity
      style={dstyles(isMain).button}
      onPress={() => {
        navigation.navigate("MyWishList", {
          isAdd: false,
          classInfo: "No ClassInfo",
        });
      }}
    >
      <AntDesign name="heart" size={24} color="red" />
      {/* <View style={styles.circleContainer}>
        <Text style={styles.cartStatusNum}>{cartStatusNum}</Text>
      </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },

  circleContainer: {
    position: "absolute",
    top: 30,
    backgroundColor: "white",
    width: 16,
    height: 16,
    borderRadius: 20,
  },
  cartStatusNum: {
    textAlign: "center",
    fontSize: 11,
    color: "#A160E2",
    fontFamily: "Poppins-Bold",
  },
});

const dstyles = (isMain) =>
  StyleSheet.create({
    button: {
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      width: 70,
      height: 70,
      marginBottom: 30,
      borderRadius: 35,

      position: "absolute",
      bottom: 70,
      right: 30,

      ...Platform.select({
        ios: {
          shadowColor: "rgba(0,0,0,0.2)",
          shadowOpacity: 1,
          shadowOffset: { height: 2, width: 2 },
          shadowRadius: 2,
        },

        android: {
          elevation: 10,
          marginHorizontal: 0,
        },
      }),
    },
  });

export default CartButton;
