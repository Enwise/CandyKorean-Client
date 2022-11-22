import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CheckedIcon from "../assets/icons/CheckedIcon";
import UnCheckedIcon from "../assets/icons/UnCheckedIcon";

const SurveyItem = ({ checked, item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <View style={styles.button}>
        {checked ? <CheckedIcon /> : <UnCheckedIcon />}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 7,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    borderColor: "#E6E3EA",
    borderWidth: 1,
    borderRadius: 9,
    justifyContent: "center",
    paddingLeft: 25,
    paddingVertical: 10,
  },
  button: {
    justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
});
export default SurveyItem;
