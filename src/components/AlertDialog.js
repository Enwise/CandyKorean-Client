import { useFonts } from "expo-font";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CloseIcon from "../assets/icons/CloseIcon";
import * as Linking from "expo-linking";

const AlertDialog = ({ visible, setModalVisible, url }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });
  const link = () => {
    Linking.openURL(url);
  };

  if (!fontsLoaded) return null;
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row-reverse", marginBottom: 10 }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <CloseIcon />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>
            Are you sure {"\n"}you want to enter?
          </Text>

          <Text style={styles.text}>
            Once you enter, the remaining number of tutorials will be deducted.
            {"\n"}
            If the schedule with the tutor is not coordinated, only the number
            of times will be deducted and the tutoring may be rejected.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button_n}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.button_text_n}>Next time</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_y} onPress={() => link()}>
              <Text style={styles.button_text_y}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    backgroundColor: "white",
    width: "90%",
    paddingHorizontal: 30,
    paddingBottom: 25,
    paddingTop: 15,
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button_y: {
    backgroundColor: "#444345",
    flex: 1,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  button_n: {
    flex: 1,
    backgroundColor: "#E6E3EA",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  button_text_y: {
    color: "white",
    fontFamily: "Poppins-Medium",
    fontsize: 14,
  },
  button_text_n: {
    color: "#444345",
    fontFamily: "Poppins-Medium",
    fontsize: 14,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  text: {
    fontFamily: "Poppins-Regular",
    color: "#B8B5BC",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 15,
  },
});
export default AlertDialog;
