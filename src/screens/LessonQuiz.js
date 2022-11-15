import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";

import Sea from "../assets/icons/quiz/Sea";
import Mountain from "../assets/icons/quiz/Mountain";
import City from "../assets/icons/quiz/City";
import Tree from "../assets/icons/quiz/Tree";
import QuizNextButton from "../assets/icons/quiz/QuizNextButton";
import QuizCorrect from "../assets/icons/quiz/QuizCorrect";
import QuizWrong from "../assets/icons/quiz/QuizWrong";

const LessonQuiz = ({ route, navigation }) => {
  const [lessonId, setLessonId] = useState(route.params.lessonId);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [isChecked, setIsChecked] = useState({
    isNext: false,
    isCorrect: false,
  });

  // lessonId 를 활용한 quiz 정보 가져오기
  const [quizList, setQuizList] = useState([
    {
      quizId: 1,
      quizName: "Translate this sentence",
      quizType: "translation",
      koreanList: ["아니,", "나", "먹을", "생각", "없어."],
      englishList: ["no,", "I", "don't", "have", "any", "idea", "to", "eat"],
      selectList: [
        {
          word: "no,",
          selected: false,
        },
        {
          word: "I",
          selected: false,
        },
        {
          word: "don't",
          selected: false,
        },
        {
          word: "have",
          selected: false,
        },
        {
          word: "any",
          selected: false,
        },
        {
          word: "idea",
          selected: false,
        },
        {
          word: "to",
          selected: false,
        },
        {
          word: "eat",
          selected: false,
        },
        {
          word: "we",
          selected: false,
        },
        {
          word: "are",
          selected: false,
        },
        {
          word: "tired",
          selected: false,
        },
        {
          word: "going",
          selected: false,
        },
      ],
      selectedList: [],
      answer: "No, I don't have any idea to eat.",
    },
    {
      quizId: 2,
      quizName: "Select the correct word",
      quizType: "selection",
      koreanList: ["바다"],
      selectList: [
        {
          word: "Sea",
          imgUrl: <Sea></Sea>,
          isCorrect: true,
          isSelected: false,
        },
        {
          word: "Mountain",
          imgUrl: <Mountain></Mountain>,
          isCorrect: false,
          isSelected: false,
        },
        {
          word: "Tree",
          imgUrl: <Tree></Tree>,
          isCorrect: false,
          isSelected: false,
        },
        {
          word: "City",
          imgUrl: <City></City>,
          isCorrect: false,
          isSelected: false,
        },
      ],
    },
    // {
    //   quizId: 3,
    //   quizName: "Select the correct word",
    //   quizType: "selection",
    //   quizWord: "바다",
    //   selectList: [
    //     { word: "Sea", imgUrl: <Sea></Sea>, isCorrect: true },
    //     { word: "Mountain", imgUrl: <Mountain></Mountain>, isCorrect: false },
    //     { word: "Tree", imgUrl: <Tree></Tree>, isCorrect: false },
    //     { word: "City", imgUrl: <City></City>, isCorrect: false },
    //   ],
    // },
  ]);

  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    console.log("useEffect");
  }, [currentQuizIdx, quizList, isChecked]);

  console.log(lessonId);
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const updateSelected = (word) => {
    console.log(word);
    if (quizList[currentQuizIdx].quizType === "translation") {
      let updatedQuizList = [...quizList];
      updatedQuizList[currentQuizIdx].selectList.map((select) => {
        if (select.word === word && select.selected === false) {
          select.selected = true;
          updatedQuizList[currentQuizIdx].selectedList.push(word);
        }
      });

      setQuizList(updatedQuizList);
    } else if (quizList[currentQuizIdx].quizType === "selection") {
      let updatedQuizList = [...quizList];
      updatedQuizList[currentQuizIdx].selectList.map((select) => {
        if (select.word === word && select.isSelected === false) {
          select.isSelected = true;
        } else {
          select.isSelected = false;
        }
      });
      // updatedQuizList[currentQuizIdx].selectedList = [...updatedSelectList];

      setQuizList(updatedQuizList);
    }
  };

  const deleteSelected = (pushedWord) => {
    console.log(pushedWord);
    let updatedQuizList = [...quizList];
    updatedQuizList[currentQuizIdx].selectList.map((select) => {
      if (select.word === pushedWord && select.selected === true) {
        select.selected = false;
        let newUpdatedQuizList = updatedQuizList[
          currentQuizIdx
        ].selectedList.filter((selectedWord) => {
          return selectedWord != pushedWord;
        });

        updatedQuizList[currentQuizIdx].selectedList = [...newUpdatedQuizList];
      }
    });

    setQuizList(updatedQuizList);
  };

  const checkQuizAnswer = () => {
    let isCorrect;
    let updatedResultList = [...resultList];
    if (quizList[currentQuizIdx].quizType === "translation") {
      isCorrect =
        quizList[currentQuizIdx].selectedList.join() ==
        quizList[currentQuizIdx].englishList.join();
      let updatedisChecked = { ...isChecked };
      if (isCorrect) {
        updatedisChecked.isCorrect = true;
        updatedisChecked.isNext = true;
        updatedResultList.push(true);
      } else {
        updatedisChecked.isCorrect = false;
        updatedisChecked.isNext = true;
        updatedResultList.push(false);
      }
      setIsChecked(updatedisChecked);
      setResultList(updatedResultList);
    } else if (quizList[currentQuizIdx].quizType === "selection") {
      isCorrect = quizList[currentQuizIdx].selectList.filter((select) => {
        return select.isSelected === true;
      })[0].isCorrect;
      let updatedisChecked = { ...isChecked };
      if (isCorrect) {
        updatedisChecked.isCorrect = true;
        updatedisChecked.isNext = true;
        updatedResultList.push(true);
      } else {
        updatedisChecked.isCorrect = false;
        updatedisChecked.isNext = true;
        updatedResultList.push(false);
      }
      setIsChecked(updatedisChecked);
      setResultList(updatedResultList);
    }
  };

  const nextQuiz = () => {
    let newQuizIdx = currentQuizIdx;
    newQuizIdx += 1;
    setCurrentQuizIdx(newQuizIdx); // 다음 quiz 으로 넘어가기

    let updatedisChecked = { ...isChecked };
    updatedisChecked.isNext = false;
    setIsChecked(updatedisChecked); // 다음 quiz 로 넘어가면 isNext 를 false 로 바꿔준다.
  };

  // selection 일 때, 선택을 했는지 안헀는지 체크하는 함수
  const checkIfNotSelected = () => {
    let isNotSelected = true;
    quizList[currentQuizIdx].selectList.map((item) => {
      if (item.isSelected === true) {
        isNotSelected = false;
        return;
      }
    });
    return isNotSelected;
  };

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
      <View style={styles.quizContentContainer}>
        <View style={styles.resultContainer}>
          {isChecked.isNext ? (
            isChecked.isCorrect ? (
              <QuizCorrect />
            ) : (
              <QuizWrong />
            )
          ) : null}
        </View>
        <View style={styles.quizQuestionContainer}>
          <View style={styles.quizQuestionWordsContainer}>
            {quizList[currentQuizIdx].koreanList.map((word, idx) => {
              return (
                <View style={styles.koreanWordContainer}>
                  <Text style={styles.koreanWordText}>{word}</Text>
                </View>
              );
            })}
          </View>
          {quizList[currentQuizIdx].quizType === "translation" ? (
            <View style={styles.quizQuestionWordsNum}>
              <Text style={styles.quizQuestionWordsNumText}>
                {quizList[currentQuizIdx].englishList.length} words
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.arrowContainer}>
          <AntDesign name="arrowdown" size={24} color="#A160E2" />
        </View>
        {quizList[currentQuizIdx].quizType === "translation" ? (
          <>
            <View
              style={
                tstyles(isChecked.isNext, isChecked.isCorrect)
                  .quizSelectedWordContainer
              }
            >
              {isChecked.isNext && !isChecked.isCorrect ? (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerText}>
                    {quizList[currentQuizIdx].answer}
                  </Text>
                </View>
              ) : null}

              {quizList[currentQuizIdx].selectedList.map((word, idx) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      deleteSelected(word);
                    }}
                  >
                    <View style={styles.selectedWordContainer}>
                      <Text style={styles.selectedWordText}>{word}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.quizEnglishWordsContainer}>
              {quizList[currentQuizIdx].selectList.map((item, idx) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        quizList[currentQuizIdx].englishList.length >
                        quizList[currentQuizIdx].selectedList.length
                      ) {
                        updateSelected(item.word);
                      }
                    }}
                    disabled={item.selected ?? false}
                  >
                    <View style={styles.englishWordContainer}>
                      <Text style={wordStyle(item.selected).englishWordText}>
                        {item.word}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {isChecked.isNext === false ? (
              <TouchableOpacity
                disabled={
                  quizList[currentQuizIdx].englishList.length >
                  quizList[currentQuizIdx].selectedList.length
                }
                onPress={() => {
                  checkQuizAnswer();
                }}
              >
                <View
                  style={
                    buttonStyles(
                      quizList[currentQuizIdx].selectedList.length <
                        quizList[currentQuizIdx].englishList.length
                    ).buttonContainer
                  }
                >
                  <Text style={styles.buttonText}>CHECK</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (currentQuizIdx === quizList.length - 1) {
                    navigation.navigate("QuizResult", {
                      resultList: resultList,
                    });
                  } else {
                    nextQuiz();
                  }
                }}
              >
                <QuizNextButton></QuizNextButton>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <View style={styles.resultContainer}>
              {isChecked.isNext ? (
                isChecked.isCorrect ? (
                  <QuizCorrect />
                ) : (
                  <QuizWrong />
                )
              ) : null}
            </View>
            <View style={styles.quizSelectionContainer}>
              {quizList[currentQuizIdx].selectList.map((item, idx) => {
                return (
                  <TouchableOpacity
                    disabled={isChecked.isNext}
                    onPress={() => {
                      updateSelected(item.word);
                    }}
                  >
                    <View
                      style={
                        wordStyle2(
                          item.isSelected,
                          isChecked.isNext,
                          item.isCorrect
                        ).selectionContainer
                      }
                    >
                      {item.imgUrl}
                      <Text
                        style={
                          wordStyle2(
                            item.isSelected,
                            isChecked.isNext,
                            item.isCorrect
                          ).selectionText
                        }
                      >
                        {item.word}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {isChecked.isNext === false ? (
              <TouchableOpacity
                disabled={checkIfNotSelected()}
                onPress={() => {
                  checkQuizAnswer();
                }}
              >
                <View
                  style={buttonStyles(checkIfNotSelected()).buttonContainer}
                >
                  <Text style={styles.buttonText}>CHECK</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (currentQuizIdx === quizList.length - 1) {
                    navigation.navigate("QuizResult", {
                      resultList: resultList,
                    });
                  } else {
                    nextQuiz();
                  }
                }}
              >
                <QuizNextButton></QuizNextButton>
              </TouchableOpacity>
            )}
          </>
        )}
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
  quizContentContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  quizQuestionContainer: {
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    height: "10%",
    alignItems: "center",
    paddingLeft: 10,
    justifyContent: "space-between",
    paddingRight: 10,

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
  },
  quizQuestionWordsContainer: {
    flexDirection: "row",
  },
  koreanWordContainer: {
    marginRight: 5,
  },
  arrowContainer: {
    marginTop: 10,
  },

  resultContainer: {
    position: "absolute",
    bottom: 200,
    right: 5,
    zIndex: 3,
  },
  quizEnglishWordsContainer: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    justifyContent: "center",
  },
  englishWordContainer: {
    width: 45,
    height: 25,
    backgroundColor: "#F1EFF4",
    borderColor: "#E6E3EA",
    borderWidth: 1,
    marginRight: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  selectedWordContainer: {
    width: 45,
    height: 25,
    backgroundColor: "#F1EFF4",
    borderColor: "#E6E3EA",
    borderWidth: 1,
    marginRight: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  selectedWordText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#807F82",
  },
  buttonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#fff",
  },
  // select word 유형 quiz
  quizSelectionContainer: {
    position: "relative",
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    height: "60%",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    padding: 15,
  },

  // translate 유형 quiz의 answer
  answerContainer: {
    position: "absolute",
    top: 90,
    left: 30,
    opacity: 1,
    zIndex: 2,
  },
  answerText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#E2608F",
  },
});

const tstyles = (isNext, isCorrect) =>
  StyleSheet.create({
    quizSelectedWordContainer: {
      opacity: isNext && !isCorrect ? 0.5 : 1,

      position: "relative",
      marginTop: 10,

      flexDirection: "row",

      width: "90%",
      height: "35%",

      flexWrap: "wrap",

      backgroundColor: "#fff",
      alignItems: "center",
      padding: 10,
      borderRadius: 10,
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

const wordStyle = (selected) =>
  StyleSheet.create({
    englishWordText: {
      fontFamily: "Poppins-Medium",
      fontSize: 12,
      color: selected ? "#B8B5BC" : "#807F82",
    },
    selectionContainer: {
      width: "98%",
      height: 150,
      backgroundColor: "#fff",
      alignItems: "center",
      padding: 10,
      borderRadius: 10,
      margin: 5,
      borderWidth: 2,

      borderColor: selected ? "#A160E2" : "#fff",

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
    },
    selectionText: {
      fontFamily: "Poppins-Medium",
      fontSize: 14,
      color: selected ? "#A160E2" : "#807F82",
      marginTop: 5,
    },
  });

const wordStyle2 = (selected, isNext, isAnswer) =>
  StyleSheet.create({
    englishWordText: {
      fontFamily: "Poppins-Medium",
      fontSize: 12,
      color: selected ? "#B8B5BC" : "#807F82",
    },
    selectionContainer: {
      position: "relative",
      backgroundColor: "#fff",
      borderColor: selected || (isNext && isAnswer) ? "#A160E2" : "#fff",
      opacity: isNext && !isAnswer ? 0.2 : 1,

      width: "98%",
      height: 150,

      alignItems: "center",
      padding: 10,
      borderRadius: 10,
      margin: 5,
      borderWidth: 2,
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
    },
    selectionText: {
      fontFamily: "Poppins-Medium",
      fontSize: 14,
      color: selected || (isNext && isAnswer) ? "#A160E2" : "#807F82",
      marginTop: 5,
    },
  });

const buttonStyles = (flag) =>
  StyleSheet.create({
    buttonContainer: {
      marginTop: 20,
      width: 330,
      height: 50,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: flag ? "#B8B5BC" : "#A160E2",
    },
  });

export default LessonQuiz;
