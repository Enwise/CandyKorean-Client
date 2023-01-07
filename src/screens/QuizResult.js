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
import AuthContext from "../contexts/AuthContext";

import { useIsFocused } from '@react-navigation/native'; 
import { createSolvedQuiz, updateSolvedQuiz, getSolvedQuizsByUser } from '../modules/NetworkFunction';

const QuizResult = ({ navigation, route }) => {
  const [resultList, setResultList] = useState(route.params.resultList);
  const [solvedQuizNumList, setSolvedQuizNumList] = useState(route.params.solvedQuizNumList);
  const [isSolvedQuizListLoaded, setIsSolvedQuizListLoaded] = useState(false);
  const [solvedQuizList, setSolvedQuizList] = useState(route.params.solvedQuizList);
  const lessonInfo = route.params.lessonInfo;
  const [contentsList, setContentsList] = useState(route.params.contentsList);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [resultRatio, setResultRatio] = useState(0);

  const { authState } = React.useContext(AuthContext);
  const [userId, setUserId] = useState(authState.userId);

  const isFocused = useIsFocused(); // isFoucused를 통해 화면이 focus 되었을 때 useEffect 실행


  useEffect(() => {

    // getSolvedQuizsByUser({user_id : userId}, (d) => {
    //   setSolvedQuizList(d.data);
    //   console.log("solvedQuizList loaded");
    // },
    // () => {}, (e) => {console.log(e)})
    

    console.log('resultlist', resultList);
    console.log('-----------------------')
    console.log('solvedQuizList', solvedQuizNumList);
    let correct = 0;
    let wrong = 0;
    resultList.map((item) => {
      if (item.is_correct) {
        correct++;
      } else {
        wrong++;
      }
    });
    setCorrect(correct);
    setWrong(wrong);

    setResultRatio((correct / resultList.length) * 100);

    resultList.map((item) => {
      console.log("item", item)
      let isExist = false;
      
      if(solvedQuizNumList.includes( item.quiz_id)) {
        isExist = true;
      }
      if(isExist){
        updateSolvedQuiz({user_id : userId, quiz_id : item.quiz_id, is_correct : item.is_correct.toString()}, (d) => {
          console.log("solvedQuiz updated");
        },
        () => {}, (e) => {console.log(e)})
      }else{
        createSolvedQuiz({user_id : userId, quiz_id : item.quiz_id, is_correct : item.is_correct.toString()}, (d) => {
          console.log("solvedQuiz created");
        },
        () => {}, (e) => {console.log(e)})
      }

    })
   

  }, [isFocused,isSolvedQuizListLoaded]);


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
            getSolvedQuizsByUser({user_id : userId}, (d) => {
              setSolvedQuizList([...d.data]);
              console.log("solvedQuizList loaded");
            }, setIsSolvedQuizListLoaded, (e) => {console.log(e)})
            // 나중엔 어떤 lesson 에 해당하는 quiz 인지 알기 위해 lessonNo 를 같이 넘겨줘야 함
            navigation.navigate("LessonInfo", {lessonInfo: lessonInfo, contentsList: contentsList, solvedQuizList: solvedQuizList})
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
