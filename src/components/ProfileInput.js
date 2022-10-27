import { useFonts } from "expo-font";
import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
const windowWidth = Dimensions.get("window").width;
const ProfileInput = ({ title }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <TextInput style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 40,
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    color: "#B8B5BC",
    fontFamily: "Poppins-Regular",
    marginBottom: 10,
  },
  input: {
    fontFamily: "Poppins-Regular",
    height: 40,
    backgroundColor: "white",
    borderColor: "#E6E3EA",
    borderWidth: 1,
    borderRadius: 9,
    paddingLeft: 10,
  },
});
export default ProfileInput;
