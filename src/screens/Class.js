import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
const Class = () => {
  const [classNameList, setClassNameList] = useState([
    "K-Culture",
    "Standard Korean",
    "TOPIK",
  ]);

  return (
    <View style={styles.container}>{classNameList.map((className) => {})}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Class;
