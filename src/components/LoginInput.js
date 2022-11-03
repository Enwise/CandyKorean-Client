import { useFonts } from "expo-font";
import React from "react";
import {
  TextInput,
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
} from "react-native";
const windowWidth = Dimensions.get("window").width;

const LoginInput = ({ placeholder, value, handleChange, isValid }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          style={styles.input}
          placeholder={placeholder}
          onChangeText={handleChange}
          secureTextEntry={placeholder === "Password" ? true : false}
        />
      </View>
      {placeholder === "Email" && value && !isValid ? (
        <Text style={styles.text}>Please check your email</Text>
      ) : null}
      {placeholder === "Password" && value && !isValid ? (
        <Text style={styles.text}>Please check yout password</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 40,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderRadius: 9,
    backgroundColor: "white",
    paddingRight: 20,
    paddingLeft: 20,
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
  },
  input: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  text: {
    textAlign: "right",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#E2608F",
    marginTop: 4,
  },
});

export default LoginInput;
