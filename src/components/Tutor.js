import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const Tutor = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileImg}>
        <Text>이미지</Text>
      </View>
      <View style={styles.tutorProfile}>
        <Text style={styles.tutorName}>강사 이름</Text>
        <Text style={styles.tutorDescription}>강사 소개</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>튜터링 받기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    flexDirection: "row",
    padding: 10,
    width: windowWidth - 40,
    marginBottom: 5,
  },
  profileImg: {
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  tutorProfile: {
    marginLeft: 20,
    justifyContent: "center",
    flex: 2,
  },
  tutorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tutorDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
  },
});
export default Tutor;
