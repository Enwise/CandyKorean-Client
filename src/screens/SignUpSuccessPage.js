import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GradientButton from "../components/GradientButton";
import Constants from "expo-constants";

import LogoIcon from "../assets/icons/LogoIcon";

const SignUpSuccessPage = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LogoIcon />
        <Text style={styles.success}>Signed up successfully</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.text}>Start your study with Candy Korean</Text>
        <GradientButton
          title={"SET YOUR GOAL"}
          onPress={() => navigation.navigate("UserInfo", route.params)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
  },
  success: {
    marginTop: 24,
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
  },
  text: {
    fontFamily: "Poppins-Regular",
    color: "#444345",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default SignUpSuccessPage;
