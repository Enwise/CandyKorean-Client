import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

const GradientButton = ({ onPress, title, disabled }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      {disabled ? (
        <View style={styles.disabled}>
          <Text style={styles.text}>{title}</Text>
        </View>
      ) : (
        <LinearGradient
          colors={["#84E9FF", "#C284FF"]}
          locations={[0, 1]}
          start={[0.025, 0.5]}
          end={[0.975, 0.5]}
          style={styles.button}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: windowWidth - 40,
    height: 50,
    borderRadius: 57,
    justifyContent: "center",
  },
  text: {
    display: "flex",
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 1.5,
  },
  disabled: {
    width: windowWidth - 40,
    height: 50,
    borderRadius: 57,
    justifyContent: "center",
    backgroundColor: "#B8B5BC",
  },
});
export default GradientButton;
