import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import BackButton from "../components/BackButton";

import SignUpInput from "../components/SignUpInput";
import GradientButton from "../components/GradientButton";
import AuthContext from "../contexts/AuthContext";

const Register = ({ navigation }) => {
  const { signUp, authState } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isVaildEmail, setIsVaildEmail] = React.useState(false);
  const [isVaildPassword, setIsVaildPassword] = React.useState(false);
  const [checkPassword, setCheckPassword] = React.useState(false);
  const [enableButton, setEnableButton] = React.useState(false);
  const handleChange = (type) => {
    return (value) => {
      if (type === "email") {
        setEmail(value);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(value)) setIsVaildEmail(true);
        else setIsVaildEmail(false);
      } else if (type === "password") {
        setPassword(value);
        if (value.length >= 8) setIsVaildPassword(true);
        else setIsVaildPassword(false);
        if (value === confirmPassword) setCheckPassword(true);
        else setCheckPassword(false);
      } else if (type === "confirmPassword") {
        setConfirmPassword(value);
        if (value === password) setCheckPassword(true);
        else setCheckPassword(false);
      }
    };
  };

  const handleSignUp = async () => {
    const isSignUp = await signUp({ login_id: email, password: password });
    if (isSignUp) {
      navigation.reset({
        routes: [
          {
            name: "Success",
            params: {
              email: email,
              password: password,
            },
          },
        ],
      });
    }
  };

  React.useEffect(() => {
    if (isVaildEmail && isVaildPassword && checkPassword) setEnableButton(true);
    else setEnableButton(false);
  }, [isVaildEmail, isVaildPassword, checkPassword]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.pop()} />
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
        <SignUpInput
          value={email}
          placeholder={"Email"}
          handleChange={handleChange("email")}
          isValid={isVaildEmail}
        />
        <SignUpInput
          value={password}
          placeholder={"Password"}
          handleChange={handleChange("password")}
          isValid={isVaildPassword}
        />
        <SignUpInput
          value={confirmPassword}
          placeholder={"Confirm Password"}
          handleChange={handleChange("confirmPassword")}
          isValid={checkPassword}
        />
        <GradientButton
          title={"SIGN UP"}
          onPress={handleSignUp}
          disabled={!enableButton}
        />
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
