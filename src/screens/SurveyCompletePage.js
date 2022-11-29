import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import WhiteLogo from "../assets/icons/WhiteLogo";

const SurveyCompletePage = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("MainTab");
    }, 2000);
  });

  return (
    <LinearGradient
      colors={["#84E9FF", "#C284FF"]}
      locations={[0, 1]}
      start={[0.025, 0.5]}
      end={[0.975, 0.5]}
      style={styles.container}
    >
      <WhiteLogo />
      <View style={{ marginTop: 24 }}></View>
      <Text style={styles.text}>Thank you for your answer</Text>
      <Text style={styles.text}>Let’s start sweet Korean!</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "white",
  },
});

export default SurveyCompletePage;
