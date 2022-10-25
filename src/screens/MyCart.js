import React from "react";
import { StyleSheet, Text, View } from "react-native";
const MyCart = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>MyCart</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    marginTop: 50,
    marginLeft: 35,
  },
});
export default MyCart;
