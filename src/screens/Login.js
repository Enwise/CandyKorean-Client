import { useFonts } from "expo-font";
import React from "react";
import Constants from "expo-constants";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import Logo from "../components/Logo";
import SignButton from "../components/SignButton";
const windowWidth = Dimensions.get("window").width;
const Login = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo />
      </View>
      <View style={{ flex: 2 }}>
        <TextInput
          style={styles.input}
          placeholder="Please enter your email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Please enter your password"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={{ flex: 1 }}>
        <SignButton
          title="LOGIN"
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
  input: {
    width: windowWidth - 40,
    padding: 10,
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
  },
});
export default Login;
