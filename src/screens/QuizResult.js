import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import QuizNextButton from "../assets/icons/quiz/QuizNextButton";
import QuizPerfect from "../assets/icons/quiz/QuizPerfect";
import QuizSuccess from "../assets/icons/quiz/QuizSuccess";
import QuizFail from "../assets/icons/quiz/QuizFail";

const QuizResult = ({ navigation, route }) => {
  const [resultList, setResultList] = useState(route.params.resultList);
  const lessonInfo = route.params.lessonInfo;
  const contentsList = route.params.contentsList;
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [resultRatio, setResultRatio] = useState(0);

  useEffect(() => {
    console.log(resultList);
    let correct = 0;
    let wrong = 0;
    resultList.map((item) => {
      if (item) {
        correct++;
      } else {
        wrong++;
      }
    });
    setCorrect(correct);
    setWrong(wrong);

    setResultRatio((correct / resultList.length) * 100);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        {wrong === 0 ? (
          <>
            <View
              style={{
                ...Platform.select({
                  ios: {
                    shadowColor: "rgba(0,0,0,0.2)",
                    shadowOpacity: 1,
                    shadowOffset: { height: 2, width: 2 },
                    shadowRadius: 2,
                  },

                  android: {
                    elevation: 10,
                    marginHorizontal: 0,
                  },
                }),
                backgroundColor: "#fff",
                borderRadius: 20,
                width: 200,
                height: 50,
                marginTop: 100,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <QuizPerfect />
            </View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins-Medium",
                fontSize: 18,

                marginBottom: 80,
              }}
            >
              Lesson Complete
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins-Regular",
                fontSize: 12,
                color: "#444345",
              }}
            >
              You got {correct}/{resultList.length} quizes right!
            </Text>
          </>
        ) : resultRatio >= 50 ? (
          <>
            <View
              style={{
                ...Platform.select({
                  ios: {
                    shadowColor: "rgba(0,0,0,0.2)",
                    shadowOpacity: 1,
                    shadowOffset: { height: 2, width: 2 },
                    shadowRadius: 2,
                  },

                  android: {
                    elevation: 10,
                    marginHorizontal: 0,
                  },
                }),
                backgroundColor: "#fff",
                borderRadius: 20,
                width: 300,
                height: 50,
                marginTop: 100,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 100,
              }}
            >
              <QuizSuccess />
            </View>

            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins-Regular",
                fontSize: 12,
                color: "#444345",
                marginTop: 80,
              }}
            >
              You got {correct}/{resultList.length} quizes right!
            </Text>
          </>
        ) : (
          <>
            <View
              style={{
                ...Platform.select({
                  ios: {
                    shadowColor: "rgba(0,0,0,0.2)",
                    shadowOpacity: 1,
                    shadowOffset: { height: 2, width: 2 },
                    shadowRadius: 2,
                  },

                  android: {
                    elevation: 10,
                    marginHorizontal: 0,
                  },
                }),
                backgroundColor: "#fff",
                borderRadius: 20,
                width: 300,
                height: 50,
                marginTop: 100,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 100,
              }}
            >
              <QuizFail />
            </View>

            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins-Regular",
                fontSize: 12,
                color: "#444345",
                marginTop: 80,
              }}
            >
              You got {correct}/{resultList.length} quizes right!{"\n"}You need
              to review the lesson again. You can do it!
            </Text>
          </>
        )}
      </View>
      <View style={styles.resultTextContainer}></View>
      <View style={styles.nextBtnContainer}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("LessonInfo", {
            //   lessonInfo: {
            //     id: 1,
            //     imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
            //     profileImgUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
            //     teacherName: "Kyungeun1",
            //     className: "class1",
            //     category: "K-culture",
            //     level: "Lollipop",
            //     currentUnit: 4,
            //     totalUnits: 10,
            //     price: 100,
            //     startDate: "2021-01-01",
            //     endDate: "2021-01-31",
            //     description: "Let's study real Korean\n formal language!",
            //     isPortrait: true, // is세로? -> true면 세로, false면 가로

            //     curriculum: [
            //       {
            //         unitNum: 1,
            //         unitName: "Greetings 안녕하세요",
            //         // videoUrl: require("../assets/videos/shin_yoo_jin/1차시.mp4"),
            //       },
            //       {
            //         unitNum: 2,
            //         unitName: "Greetings 안녕하세요",
            //         // videoUrl: require("../assets/videos/shin_yoo_jin/2차시.mp4"),
            //       },
            //       {
            //         unitNum: 3,
            //         unitName: "Greetings 안녕하세요",
            //         // videoUrl: require("../assets/videos/shin_yoo_jin/3차시.mp4"),
            //       },
            //       {
            //         unitNum: 4,
            //         unitName: "Greetings 안녕하세요",
            //         // videoUrl: require("../assets/videos/shin_yoo_jin/4차시.mp4"),
            //       },
            //       {
            //         unitNum: 5,
            //         unitName: "Greetings 안녕하세요",
            //         // videoUrl: require("../assets/videos/shin_yoo_jin/5차시.mp4"),
            //       },
            //       {
            //         unitNum: 6,
            //         unitName: "Greetings 안녕하세요",
            //         // videoUrl: require("../assets/videos/shin_yoo_jin/6차시.mp4"),
            //       },
            //       {
            //         unitNum: 7,
            //         unitName: "Greetings 안녕하세요",
            //         // videoUrl: require("../assets/videos/shin_yoo_jin/7차시.mp4"),
            //       },
            //       {
            //         unitNum: 8,
            //         unitName: "Greetings 안녕하세요",
            //         // videoUrl: require("../assets/videos/shin_yoo_jin/8차시.mp4"),
            //       },
            //       {
            //         unitNum: 9,
            //         unitName: "Greetings 안녕하세요",
            //         // videoUrl: require("../assets/videos/shin_yoo_jin/9차시.mp4"),
            //       },
            //     ],
            //   },
            // });
            // 나중엔 어떤 lesson 에 해당하는 quiz 인지 알기 위해 lessonNo 를 같이 넘겨줘야 함
            navigation.navigate("LessonInfo", {lessonInfo: lessonInfo, contentsList: contentsList})
          }}
        >
          <QuizNextButton></QuizNextButton>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  returnBtn: {
    marginTop: 30,
  },
  resultContainer: {
    width: "100%",
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  nextBtnContainer: {
    width: "100%",
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default QuizResult;
