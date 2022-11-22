import React from "react";
import Constants from "expo-constants";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import Logo from "../components/Logo";
import GradientButton from "../components/GradientButton";
import LoginInput from "../components/LoginInput";
const windowWidth = Dimensions.get("window").width;
const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // 추후에 email, password 검사 필요
  const handleChange = (type) => {
    return (value) => {
      if (type === "email") {
        setEmail(value);
      } else if (type === "password") {
        setPassword(value);
      }
    };
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo />
      </View>
      <View style={{ flex: 5 }}>
        <LoginInput
          value={email}
          placeholder="Email"
          handleChange={handleChange("email")}
          isValid={true}
        />
        <LoginInput
          value={password}
          placeholder="Password"
          handleChange={handleChange("password")}
          isValid={true}
        />
      </View>
      <View style={{ flex: 2 }}>
        <GradientButton
          title="LOGIN"
          disabled={email === "" || password === ""}
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
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
  },
});
export default Login;
