import React from "react";
import Constants from "expo-constants";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Logo from "../components/Logo";
import GradientButton from "../components/GradientButton";
import LoginInput from "../components/LoginInput";
import AuthContext from "../contexts/AuthContext";
const windowWidth = Dimensions.get("window").width;
const Login = ({ navigation }) => {
  const { signIn, authState } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoginErr, setIsLoginErr] = React.useState(false);
  // 추후에 email, password 검사 필요
  const handleChange = (type) => {
    return (value) => {
      if (type === "email") {
        setEmail(value);
      } else if (type === "password") {
        setPassword(value);
      }
      setIsLoginErr(false);
    };
  };

  const handleLogin = async () => {
    await signIn({ login_id: email, password: password });
    if (authState.userToken == null) {
      setIsLoginErr(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" && "padding"}
    >
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
          isSuccess={!isLoginErr}
        />
        <LoginInput
          value={password}
          placeholder="Password"
          handleChange={handleChange("password")}
          isSuccess={!isLoginErr}
        />
      </View>
      <View style={{ flex: 2 }}>
        <GradientButton
          title="LOGIN"
          disabled={email === "" || password === ""}
          onPress={() => handleLogin()}
        />
      </View>
    </KeyboardAvoidingView>
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
