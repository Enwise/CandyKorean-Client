import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StackActions, NavigationActions } from "@react-navigation/native";

// 추천 강의 컴포넌트
const RecommendedClass = ({ navigation, course }) => {
  // 강의 썸네일, 강사 프로필 사진, 강사 이름, 시청자 수
  const { thumbnail, tutor, view_count } = course;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => {
        console.log("클래스 정보로 이동", course);
        navigation.navigate("Class", {
          screen: "ClassInfo",
          params: {
            classInfo: course,
            isMain: false,
            isHome: true,
          },
        });
      }}
    >
      <View style={styles.thumbnail}>
        <Image style={styles.image} source={{ uri: thumbnail }} />
      </View>
      <View style={styles.description}>
        <View style={styles.imgContainer}>
          <Image style={styles.tutorImg} source={{ uri: tutor.profile_url }} />
        </View>
        <Text style={styles.tutorName}>{tutor.name}</Text>
        <Text style={styles.text}>viewers {view_count}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 213,
    backgroundColor: "white",
    marginBottom: 25,
    backgroundColor: "white",
  },
  thumbnail: {
    height: 213,
    backgroundColor: "#D9D9D9",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  description: {
    paddingLeft: 19,
    paddingRight: 14,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
  },
  tutorName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    marginHorizontal: 10,
  },
  imgContainer: {
    borderColor: "#F1EFF4",
    borderWidth: 1,
    backgroundColor: "white",
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  tutorImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 38 / 2,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#8D8D8D",
    marginHorizontal: 10,
  },
});
export default RecommendedClass;
