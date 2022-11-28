import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { AntDesign } from "@expo/vector-icons";

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
  // const [selectedList, setSelectedList] = useState([]);

  // lessonId 를 활용한 quiz 정보 가져오기
  const [quizList, setQuizList] = useState([
    // {
    //   id: 1,
    //   style: "arrange",
    //   json: {
    //     question: "What happend?",
    //     answer : {
    //       1: {
    //         text: "무슨",
    //         order : 1,
    //         is_selected : false,
    //       },
    //       2 : {
    //         text: "일",
    //         order : 2,
    //         is_selected : false,

    //       }, 
    //       3: {
    //         text: "있었어요?",
    //         order : 3,
    //         is_selected : false,

    //       },
    //     },
    //   }
      
    // },
    // {
    //   id: 2,
    //   style: "select_sentence",
    //   json : {
    //   question: "What’s up?",
    //   answer: {
    //     1:{
    //       text: "어떤 일 있었어요?",
    //       correct: false,
    //       is_selected : false,

    //     },
    //     2: {
    //       text: "무슨 일 있었어요?",
    //       correct: false,
    //       is_selected : false,

    
    //     },
    //     3: {
    //       text: "별일 없었어요?",
    //       correct: true,
    //       is_selected : false,

    //     },	
    //   }
    
    //   }
    // },
    // {
    //   id: 3,
    //   style: "select_dialog",
    //   json : {
    //   question: {
    //     A: {
    //     "eng" : "Where are you going?",
    //     "kor" : "어디에 가세요?",
    //     is_question: true,
    //     is_selected : false,

    //     },
    //     B: {
    //     "eng" : "I am trying to go to a bank",
    //     "kor" : "저는 은행에 가려고 해요.",
    //     is_question: false,	
    //     is_selected : false,

    //     },
    //   },
    //   answer: {
    //     1:{
    //       text: "언제 가세요?",	
    //       is_selected : false,

          
    //     },
    //     2: {
    //       text:"지금 가세요?",
    //       is_selected : false,

          
    //     },
          
    //   }
    
    //   }
    // },
    {
      id: 4,
      style: "select_word",
      json : {
      question: "Q. \"be delicious\" in Korean?",
      answer: {
        1:{
          text: "멋지다",
          correct:false	,
          is_selected : false,

        },
        2: {
          text: "재밌다",
          correct:false,
          is_selected : false,

        },
        3: {
          text: "맛있다",
          correct:true,
          is_selected : false,

        },	
      }
    
      }
     }
  
  ]);

  const [resultList, setResultList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    console.log("useEffect");

  }, [currentQuizIdx, quizList, isChecked, selectedList]);

  console.log(lessonId);

  const updateSelected = (key) => {
    let updatedQuizList = [...quizList];
    if (quizList[currentQuizIdx].style === "arrange") {
      

      if(!updatedQuizList[currentQuizIdx].json.answer[key].is_selected) {
        updatedQuizList[currentQuizIdx].json.answer[key].is_selected = true;
        let updatedSelectedList = [...selectedList];
        updatedSelectedList.push(updatedQuizList[currentQuizIdx].json.answer[key].text);
        console.log(updatedSelectedList)
        setSelectedList(updatedSelectedList);
      } 
      console.log(updatedQuizList[currentQuizIdx].json.answer);
     
    } else if (quizList[currentQuizIdx].style === "select_sentence" || quizList[currentQuizIdx].style === "select_word") {
      
      if(!updatedQuizList[currentQuizIdx].json.answer[key].is_selected) {
      Object.keys(updatedQuizList[currentQuizIdx].json.answer).map((key_, idx) => {
        updatedQuizList[currentQuizIdx].json.answer[key_].is_selected = false;
        
      })
      updatedQuizList[currentQuizIdx].json.answer[key].is_selected = true;
    }
  }
    setQuizList(updatedQuizList);
  };

  const deleteSelected = (item) => {

    console.log("삭제예정인 item 값: ", item);
    let updatedQuizList = [...quizList];

    if (quizList[currentQuizIdx].style === "arrange") {
      let updatedQuizList = [...quizList];
      let key = Object.keys(updatedQuizList[currentQuizIdx].json.answer).find(key => updatedQuizList[currentQuizIdx].json.answer[key].text === item);
  
        if(updatedQuizList[currentQuizIdx].json.answer[key].is_selected) {
          console.log('if문 들어오기 성공!')
          updatedQuizList[currentQuizIdx].json.answer[key].is_selected = false;
          let updatedSelectedList = [...selectedList];
          updatedSelectedList = updatedSelectedList.filter((item) => item !== quizList[currentQuizIdx].json.answer[key].text);
          console.log(updatedSelectedList)
          setSelectedList(updatedSelectedList);
        }      
      }

    setQuizList(updatedQuizList);
  };

  const checkQuizAnswer = () => {
    let isCorrect;
    let updatedResultList = [...resultList];
    if (quizList[currentQuizIdx].style === "arrange") {

      let answer = "";
      let guess = "";

    Object.keys(quizList[currentQuizIdx].json.answer).map((key, idx) => {
        answer += quizList[currentQuizIdx].json.answer[key].text;
      })

      selectedList.map((item) => {
        guess += item;
      })
      console.log(answer, guess);
      isCorrect = guess == answer

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
    } else if (quizList[currentQuizIdx].style === "select_sentence" || quizList[currentQuizIdx].style === "select_word") {

      let isCorrect;

      Object.values(quizList[currentQuizIdx].json.answer).map((item, idx) => {
        if(item.is_selected) {
          isCorrect = item.correct;
        }
      })

      

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
    setSelectedList([]);
    
  };

  // selection 일 때, 선택을 했는지 안헀는지 체크하는 함수
  const checkIfNotSelected = () => {
    let isNotSelected = true;
    Object.keys(quizList[currentQuizIdx].json.answer).map((key, idx) => {
      if (quizList[currentQuizIdx].json.answer[key].is_selected) {
        isNotSelected = false;
        return;
      }
    });
    return isNotSelected;
  };

  // 맨 상단의 퀴즈 이름을 정해주느 함수
  const getQuizName = () => {
    if (quizList[currentQuizIdx].style == 'arrange') {
      return "Translate this sentence";

    } else if(quizList[currentQuizIdx].style == 'select_sentence' || quizList[currentQuizIdx].style == 'select_dialog') {
      return "Select the correct sentence";
    }  else  {
      return "Select the correct answer";
    } 
    
  }

  // 오답일때 답을 보여주는 함수
  const showAnswer = () => {
    let answer = ""
    Object.keys(quizList[currentQuizIdx].json.answer).map((key, idx) => {
      answer += quizList[currentQuizIdx].json.answer[key].text + " ";
    })
    return answer;
  }

  // arrange 유형 퀴즈일 때, 몇 개가 선택되었는지 알려주는 함수
  const getSelectedCount = () => {
    let count = 0;
    Object.values(quizList[currentQuizIdx].json.answer).map((value, idx) => {
      if (value.is_selected) {
        count += 1;
      }
    });
    return count;

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
            {getQuizName()}
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

              <Text style={styles.questionText}> {quizList[currentQuizIdx].style !== 'select_dialog' ? quizList[currentQuizIdx].json.question : null}</Text> 

          </View>
          {quizList[currentQuizIdx].style === "arrange" ? (
            <View style={styles.quizQuestionWordsNum}>
              <Text style={styles.quizQuestionWordsNumText}>
                {Object.keys(quizList[currentQuizIdx].json.answer).length} words
              </Text>
            </View>
          ) : null}
        </View>
        <View style={selection_styles(quizList[currentQuizIdx].style).arrowContainer}>
          <AntDesign name="arrowdown" size={24} color="#A160E2" />
        </View>
        {quizList[currentQuizIdx].style === "arrange" ? (
          <>
            <View
              style={
                tstyles(isChecked.isNext, isChecked.isCorrect)
                  .quizSelectedWordContainer
              }
            >
              {isChecked.isNext && !isChecked.isCorrect ? (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerText}>{
                    showAnswer()
                  }

                  </Text>
                </View>
              ) : null}

              {selectedList.map((item, idx) => {
                console.log(item) // item[0] == key, item[1] == value
                return (
                  
                  <TouchableOpacity
                    onPress={() => {
                      deleteSelected(item);
                    }}
                  >
                    <View style={styles.selectedWordContainer}>
                      <Text style={styles.selectedWordText}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                );
                  
              })}
            </View>
            <View style={selection_styles(quizList[currentQuizIdx].style).quizSelectionContainer}>
              {Object.entries(quizList[currentQuizIdx].json.answer).map((item, idx) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        Object.keys(quizList[currentQuizIdx].json.answer).length >
                        getSelectedCount()
                      ) {
                        updateSelected(item[0]);
                      }
                    }}
                    disabled={quizList[currentQuizIdx].json.answer[item[0]].is_selected ?? false}
                  >
                    <View style={styles.englishWordContainer}>
                      <Text style={wordStyle(quizList[currentQuizIdx].json.answer[item[0]].is_selected).englishWordText}>
                        {quizList[currentQuizIdx].json.answer[item[0]].text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {isChecked.isNext === false ? (
              <TouchableOpacity
                disabled={
                  Object.keys(quizList[currentQuizIdx].json.answer).length >
                  selectedList.length
                }
                onPress={() => {
                  checkQuizAnswer();
                }}
              >
                <View
                  style={
                    buttonStyles(
                      selectedList.length <
                      Object.keys(quizList[currentQuizIdx].json.answer).length
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
        ) : quizList[currentQuizIdx].style === "select_sentence" ?  (  
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
            <View style={selection_styles(quizList[currentQuizIdx].style).quizSelectionContainer}>
              {Object.keys(quizList[currentQuizIdx].json.answer).map((key, idx) => {
                return (
                  <TouchableOpacity
                  
                    disabled={isChecked.isNext}
                    onPress={() => {
                      updateSelected(key);
                    }}
                  >
                    <View style={row_styles(isChecked.isNext, quizList[currentQuizIdx].json.answer[key].correct).quizSelectionRowContainer}>
                      <View style={circle_styles(isChecked.isNext, quizList[currentQuizIdx].json.answer[key].correct, quizList[currentQuizIdx].json.answer[key].is_selected).quizSelectionCircle}>
                        <Text style={circle_styles(isChecked.isNext, quizList[currentQuizIdx].json.answer[key].correct, quizList[currentQuizIdx].json.answer[key].is_selected).quizSelectionCircleText}>{key}</Text>
                      </View>
                      <View style={styles.quizSelectionTextContainer}>
                        <Text style={styles.quizSelectionText}>{quizList[currentQuizIdx].json.answer[key].text}</Text>
                      </View>
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
        ) : quizList[currentQuizIdx].style === 'select_word' ? 
        (<>
          <View style={styles.resultContainer}>
            {isChecked.isNext ? (
              isChecked.isCorrect ? (
                <QuizCorrect />
              ) : (
                <QuizWrong />
              )
            ) : null}
          </View>
          <View style={selection_styles(quizList[currentQuizIdx].style).quizSelectionContainer}>
            {Object.keys(quizList[currentQuizIdx].json.answer).map((key, idx) => {
              return (
                <TouchableOpacity
                
                  disabled={isChecked.isNext}
                  onPress={() => {
                    updateSelected(key);
                  }}
                >
                  <View style={styles.quizWordSelectionRowContainer}>
                    <View style={quiz_word_styles(isChecked.isNext, quizList[currentQuizIdx].json.answer[key].correct, quizList[currentQuizIdx].json.answer[key].is_selected).quizWordSelectionTextContainer}>
                      <Text style={quiz_word_styles(isChecked.isNext, quizList[currentQuizIdx].json.answer[key].correct, quizList[currentQuizIdx].json.answer[key].is_selected).quizWordSelectionText}>{quizList[currentQuizIdx].json.answer[key].text}</Text>
                    </View>
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
        </>) : null}
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
  questionText: {
    fontFamily:'Poppins-Regular',
    fontSize: 16,
  },
  koreanWordContainer: {
    marginRight: 5,
  },
  

  resultContainer: {
    position: "absolute",
    bottom: 200,
    right: 5,
    zIndex: 3,
  },

  englishWordContainer: {
    width: 60,
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
    width: 60,
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



  


  quizSelectionTextContainer:{
    width:'90%',
    height:'100%',
    backgroundColor:'#fff',
    justifyContent:'center',
    borderRadius:10,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
      },

      android: {
        elevation: 15,
        marginHorizontal: 0,
      },
    }),

  },
  quizSelectionText:{
    fontFamily:'Poppins-Medium',
    width:'100%',
    fontSize:14,
    paddingLeft:15,
  },

  // arrange 유형 quiz의 answer
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

  // select_word
  quizWordSelectionRowContainer: {
    flexDirection: "row",
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:50,
    marginTop:10,
    borderRadius: 20,
    backgroundColor:'#fff',
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
      },

      android: {
        elevation: 5,
        marginHorizontal: 0,
      },
    }),
  },

});

const quiz_word_styles = (isNext, correct, isSelected) => StyleSheet.create({
  
  quizWordSelectionContainer: {
    height:'100%',
    width:'100%',
  },
  quizWordSelectionText: {
    

    textAlign:'center',
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: isNext ? (correct ? '#A160E2' : '#B8B5BC') : (isSelected ? '#A160E2' : '#000')
  }

})

const row_styles = (isNext, correct) => StyleSheet.create({
    quizSelectionRowContainer:{
      flexDirection:'row',
      width:'100%',
      height: 30,
      alignItems:'center',
      marginBottom:10,
      paddingLeft:10,
      paddingRight:10,
      opacity : isNext && !correct ? 0.1 : 1,
    },
  
})



const circle_styles = (isNext, correct, isSelected) => StyleSheet.create({
  quizSelectionCircle : {
    width:'10%',
    height:'100%',
    backgroundColor: isNext ? (correct ? '#A160E2' : '#000') : (isSelected ? '#A160E2' : '#F1EFF4'),
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:100,
    borderColor: isNext ? (correct ? 'A160E2' : '#000') : (isSelected ? '#A160E2' : '#E6E3EA'),
    marginRight:10,
  } ,
  quizSelectionCircleText:{
    fontFamily:'Poppins-Medium',
    fontSize:14,
    color: isNext ? (correct ? '#fff' : '#000'): (isSelected ? '#fff' : '#807F82')
  },
})

const tstyles = (isNext, isCorrect) =>
  StyleSheet.create({
    quizSelectedWordContainer: {
      opacity: isNext && !isCorrect ? 0.5 : 1,

      position: "relative",
      marginTop: 10,

      flexDirection: "row",

      width: "90%",
      height: "30%",
      marginBottom: 20,

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

const selection_styles = (quiz_style) => 
  StyleSheet.create({
    quizSelectionContainer : quiz_style === 'arrange' ? {

      marginTop: 30,
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 20,
      justifyContent: "center",

    } : {
  // select word 유형 quiz
    flexDirection:'column',
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
    height: "40%",
    justifyContent: "space-evenly",
    padding: 15,
    marginBottom: 20,
  
    },

    arrowContainer: quiz_style === 'arrange' ? {
      
        marginTop: 10,
      
    } : {
      marginTop: 50,
      marginBottom: 50,
    }
  
  })
  


export default LessonQuiz;
