import React from "react";
import { StyleSheet, Text, View } from "react-native";
const Class = () => {
  return (
    <View style={styles.container}>
      <Text>Class</Text>
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

export default Class;
