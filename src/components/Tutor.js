import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const Tutor = ({ onPress, disabled, tutor }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: tutor.profile_url }} />
      </View>
      <View style={styles.tutorProfile}>
        <Text style={styles.tutorName}>{tutor.name}</Text>
        <Text style={styles.tutorDescription}>{tutor.info}</Text>
      </View>
      <TouchableOpacity
        style={styles.button(disabled)}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>Get tutored</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    width: windowWidth - 40,
    marginBottom: 10,
  },
  imgContainer: {
    borderColor: "#F1EFF4",
    borderWidth: 1,
    backgroundColor: "white",
    width: 51,
    height: 51,
    borderRadius: 51 / 2,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 0.1,
        },
        shadowRadius: 4.63,
        shadowColor: "rgba(0, 0, 0, 0.07)",
      },
      android: {
        elevation: 1,
      },
    }),
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 51 / 2,
  },
  tutorProfile: {
    marginLeft: 16,
    justifyContent: "center",
    flex: 2,
  },
  tutorName: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#444345",
  },
  tutorDescription: {
    fontFamily: "Poppins-Regular",
    color: "#B8B5BC",
    fontSize: 10,
    marginTop: 2,
  },
  button: (disabled) => ({
    backgroundColor: disabled ? "#B8B5BC" : "#A160E2",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    borderRadius: 7,
    height: 26,
  }),
  buttonText: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
  },
});
export default Tutor;
