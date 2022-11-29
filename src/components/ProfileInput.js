import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
const windowWidth = Dimensions.get("window").width;
const ProfileInput = ({ title, required, value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {title}
        {required ? <Text style={{ color: "#A160E2" }}> *</Text> : null}
      </Text>
      <TextInput
        style={[styles.input, title === "Email" ? { color: "#B8B5BC" } : null]}
        editable={title === "Email" ? false : true}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 40,
    marginTop: 24,
  },
  text: {
    fontSize: 16,
    color: "#807F82",
    fontFamily: "Poppins-Medium",
    marginBottom: 10,
  },
  input: {
    fontFamily: "Poppins-Regular",
    height: 40,
    backgroundColor: "white",
    borderColor: "#E6E3EA",
    borderWidth: 1,
    borderRadius: 9,
    paddingLeft: 10,
  },
});
export default ProfileInput;
