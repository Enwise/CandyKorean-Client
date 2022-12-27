import React from "react";
import {
  TextInput,
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
} from "react-native";
import CheckIcon from "../assets/icons/CheckIcon";
import ErrorIcon from "../assets/icons/ErrorIcon";
const windowWidth = Dimensions.get("window").width;

const SignUpInput = ({ placeholder, value, handleChange, isValid }) => {
  return (
    <View style={styles.container(value, isValid)}>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          style={styles.input(value)}
          placeholder={placeholder}
          onChangeText={handleChange}
          secureTextEntry={
            placeholder === "Password" || placeholder === "Confirm Password"
              ? true
              : false
          }
          placeholderTextColor="#B8B5BC"
        />
        {value ? isValid ? <CheckIcon /> : <ErrorIcon /> : null}
      </View>
      {placeholder === "Email" && value && !isValid ? (
        <Text style={styles.text}>Please enter correct email</Text>
      ) : null}
      {placeholder === "Confirm Password" && value && !isValid ? (
        <Text style={styles.text}>Re-enter correct password</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: (value, isValid) => ({
    width: windowWidth - 40,
    marginBottom: value && !isValid ? 16 : 38,
  }),
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
  input: (value) => ({
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: value ? 14 : 16,
  }),
  text: {
    textAlign: "right",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#E2608F",
    marginTop: 4,
  },
});

export default SignUpInput;
