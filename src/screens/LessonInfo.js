import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";

const LessonInfo = ({ navigation, route }) => {
  const [lessonInfo, setLessonInfo] = useState(route.params.lessonInfo);
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.backBtn}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.lessonInfoContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.img}
            source={require("../assets/img/sample_class_img1.jpeg")}
          ></Image>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.todayContainer}>
            <Text style={styles.todayText}>Today's Lecture</Text>
          </View>
          <View style={styles.currentUnitContainer}>
            <Text style={styles.currentUnit}>
              Unit {lessonInfo.currentUnit}
            </Text>
          </View>
          <View style={styles.studyNowBtn}>
            <TouchableOpacity>
              <Image
                source={require("../assets/img/btn-purple-lecture.png")}
              ></Image>
              <Text style={styles.studyNowText}>Study Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quizBtn}>
            <TouchableOpacity>
              <Image
                source={require("../assets/img/btn-purple-lecture.png")}
              ></Image>
              <Text style={styles.quizText}>Today's Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",

    backgroundColor: "#fff",
    position: "relative",
  },

  lessonInfoContainer: {
    flexDirection: "row",
    marginTop: 100,
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  todayContainer: {
    marginBottom: 3,
  },
  todayText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    fontColor: "#000",
  },
  currentUnitContainer: {
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#A160E2",
    borderWidth: 1,
    width: 55,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  currentUnit: {
    fontFamily: "Poppins-Regular",
    color: "#B8B5BC",
    fontSize: 12,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 30,
  },
  studyNowBtn: {
    position: "relative",
    marginBottom: 10,
  },
  studyNowText: {
    position: "absolute",
    top: 4,
    left: 25,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#fff",
  },
  quizBtn: { position: "relative" },
  quizText: {
    position: "absolute",
    top: 4,
    left: 20,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#fff",
  },
});

export default LessonInfo;
