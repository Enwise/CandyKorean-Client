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
import { useFonts } from "expo-font";
const CartButton = ({ text, navigation, isMain }) => {
  const [cartStatusNum, setCartStatusNum] = React.useState(0);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity
      style={dstyles(isMain).button}
      onPress={() => {
        navigation.navigate("MyCart", {
          isAddToCart: false,
          classInfo: "No ClassInfo",
        });
      }}
    >
      <Image source={require("../assets/img/ic-cart.png")}></Image>
      <View style={styles.circleContainer}>
        <Text style={styles.cartStatusNum}>{cartStatusNum}</Text>
      </View>
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
      bottom: isMain ? 0 : -45,
      right: 20,

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
