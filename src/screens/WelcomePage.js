import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import GradientButton from "../components/GradientButton";
import Constants from "expo-constants";

import Logo from "../components/Logo";
const WelcomePage = ({ navigation }) => {
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
          <GradientButton
            title="LOGIN"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <GradientButton
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
