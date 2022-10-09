import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import BackButton from "../components/BackButton";
import { useFonts } from "expo-font";
import Input from "../components/Input";
import SignButton from "../components/SignButton";

const Register = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.navigate("Welcome")} />
      </View>
      <View style={{ marginLeft: 20, alignContent: "center" }}>
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 20,
            marginBottom: 20,
          }}
        >
          SIGN UP
        </Text>
        <Input placeholder={"Email"} />
        <Input placeholder={"Password"} />
        <Input placeholder={"Confirm Password"} />
        <SignButton title={"SIGN UP"} />
      </View>
      <Text
        style={{
          textDecorationLine: "underline",
          fontFamily: "Poppins-Regular",
          fontSize: 12,
          color: "#444345",
          textAlign: "center",
          marginTop: 10,
        }}
        onPress={() => navigation.navigate("Login")}
      >
        I already have an account
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  header: {
    marginLeft: 20,
    marginTop: Constants.statusBarHeight + 15,
    marginBottom: 42,
  },
});

export default Register;
