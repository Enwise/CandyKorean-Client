import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../components/BackButton";
import WebView from "react-native-webview";
import Constants from "expo-constants";
const TermsOfUse = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ position: "absolute", left: 20 }}>
          <BackButton onPress={() => navigation.pop()} />
        </View>
        <Text style={styles.headerText}>{route.params.title}</Text>
      </View>

      <WebView source={{ uri: route.params.uri }} style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  header: {

    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    backgroundColor: "white",
  },
  headerText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
});

export default TermsOfUse;
