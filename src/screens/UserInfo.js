import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import BackButton from "../components/BackButton";
import ProfileInput from "../components/ProfileInput";
const UserInfo = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.pop()} />
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 20,
            marginBottom: 22,
          }}
        >
          Profile
        </Text>
        <ProfileInput title={"Email"} />
        <ProfileInput title={"Username"} />
        <ProfileInput title={"Gender"} />
        <ProfileInput title={"Date of Birth"} />
        <ProfileInput title={"Korean Level"} />
      </View>
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

export default UserInfo;
