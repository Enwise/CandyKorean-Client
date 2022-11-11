import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GradientButton from "../components/GradientButton";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import LogoIcon from "../assets/icons/LogoIcon";

const SurveyCompletePage = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Thank you for your answer!</Text>
        <Text>Let's start sweet Korean!</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <GradientButton
          title={"START"}
          onPress={() => navigation.navigate("MainTab")}
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
});

export default SurveyCompletePage;
