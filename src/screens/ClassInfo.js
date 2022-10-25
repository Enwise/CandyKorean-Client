import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const ClassInfo = ({ props, navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>{route.params.classInfo.className}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ClassInfo;
