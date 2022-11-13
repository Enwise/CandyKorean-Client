import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import Sea from "../assets/icons/quiz/Sea";
import Mountain from "../assets/icons/quiz/Mountain";
import City from "../assets/icons/quiz/City";
import Tree from "../assets/icons/quiz/Tree";

const LessonQuiz = ({ route, navigation }) => {
  const [lessonId, setLessonId] = useState(route.params.lessonId);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);

  // lessonId 를 활용한 quiz 정보 가져오기
  const [quizList, setQuizList] = useState([
    {
      quizId: 1,
      quizName: "Translate this sentence",
      quizType: "translation",
      koreanList: ["아니,", "나", "먹을", "생각", "없어."],
      englishList: ["no,", "I", "don't", "have", "any", "idea", "to", "eat"],
      selectList: [
        "no",
        "I",
        "don't",
        "have",
        "any",
        "idea",
        "to",
        "eat",
        "we",
        "are",
        "tired",
        "going",
      ],
      answer: "No, I don't have any idea to eat.",
    },
    {
      quizId: 2,
      quizName: "Select the correct word",
      quizType: "multipleChoice",
      quizWord: "바다",
      selectList: [
        { word: "Sea", imgUrl: <Sea></Sea>, isCorrect: true },
        { word: "Mountain", imgUrl: <Mountain></Mountain>, isCorrect: false },
        { word: "Tree", imgUrl: <Tree></Tree>, isCorrect: false },
        { word: "City", imgUrl: <City></City>, isCorrect: false },
      ],
    },
    // {
    //   quizId: 3,
    //   quizName: "Select the correct word",
    //   quizType: "multipleChoice",
    //   quizWord: "바다",
    //   selectList: [
    //     { word: "Sea", imgUrl: <Sea></Sea>, isCorrect: true },
    //     { word: "Mountain", imgUrl: <Mountain></Mountain>, isCorrect: false },
    //     { word: "Tree", imgUrl: <Tree></Tree>, isCorrect: false },
    //     { word: "City", imgUrl: <City></City>, isCorrect: false },
    //   ],
    // },
  ]);

  console.log(lessonId);
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
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Quiz</Text>
          <View style={styles.backBtn}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.quizStatusContainer}>
        <View style={styles.quizStatusTopContainer}>
          <Text style={styles.quizTitle}>
            {quizList[currentQuizIdx].quizName}
          </Text>
          <Text style={styles.quizNum}>
            {currentQuizIdx + 1}/{quizList.length}
          </Text>
        </View>
        <View
          style={dstyles(currentQuizIdx, quizList.length).quizStatusBar}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    fontFamily: "Poppins-SemiBold",
  },
  titleContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    zIndex: 1,
    backgroundColor: "white",
  },

  backBtn: {
    position: "absolute",
    top: 35,
    left: 25,
  },
  quizStatusContainer: {
    marginTop: 20,
  },
  quizStatusTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quizTitle: {
    paddingLeft: 20,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#A160E2",
  },
  quizNum: {
    paddingRight: 20,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#A160E2",
  },
});

const dstyles = (currentQuizIdx, length) =>
  StyleSheet.create({
    quizStatusBar: {
      backgroundColor: "#A160E2",
      height: 5,
      width: (Dimensions.get("window").width * (currentQuizIdx + 1)) / length,
    },
  });

export default LessonQuiz;
