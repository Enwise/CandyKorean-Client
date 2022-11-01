import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProgressLecture = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity="0.8">
      <View style={styles.thumbnail}>
        <Image
          style={styles.image}
          source={require("../assets/img/sample_class_img1.jpeg")}
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.lectureTitle}>겸손한 표현 배우기</Text>
        <Text style={styles.lectureDescription}>강의 설명</Text>
        <Text style={styles.lectureTeacher}>강사 이름</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 257,
    width: 231,
    ...Platform.select({
      ios: {
        shadowOpacity: 1,
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.07)",
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
    backgroundColor: "white",
    borderRadius: 13,
  },
  thumbnail: {
    height: 165,
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  description: {
    paddingLeft: 16,
  },
  lectureTitle: {
    fontSize: 14,
    marginTop: 9,
  },
  lectureDescription: {
    fontSize: 10,
    color: "#737373",
    marginTop: 5,
  },
  lectureTeacher: {
    fontSize: 10,
    color: "#737373",
    marginTop: 15,
  },
});
export default ProgressLecture;
