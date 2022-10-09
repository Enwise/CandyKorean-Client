import { useFonts } from "expo-font";
import React from "react";
import { TextInput, Dimensions, StyleSheet, Platform } from "react-native";
const windowWidth = Dimensions.get("window").width;

const Input = ({ placeholder }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) return null;

  return <TextInput style={styles.input} placeholder={placeholder} />;
};

const styles = StyleSheet.create({
  input: {
    width: windowWidth - 40,
    height: 55,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.1,
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowRadius: 10,
        shadowColor: "black",
      },
      android: {
        elevation: 10,
      },
    }),
    borderRadius: 9,
    backgroundColor: "white",
    paddingLeft: 24,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginBottom: 38,
  },
});

export default Input;
