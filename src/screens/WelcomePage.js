import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import SignButton from "../components/SignButton";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import Logo from "../components/Logo";
const WelcomePage = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1.6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo />
      </View>
      <View style={{ flex: 0.7 }}>
        <Text style={styles.text}>Welcome!</Text>
        <Text style={styles.text}>Sweet Korean Time</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View>
          <SignButton
            title="LOGIN"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <SignButton
            title="SIGN UP"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    color: "#807F82",
    textAlign: "center",
  },
});

export default WelcomePage;
