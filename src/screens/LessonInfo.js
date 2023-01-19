import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Dialog, {
  DialogContent,
  ScaleAnimation,
  DialogFooter,
  DialogButton,
} from "react-native-popup-dialog";

import GradientBtn from "../components/GradientButtonView";
import AuthContext from "../contexts/AuthContext";

import { getCourses, getSolvedQuizsByUser, getContents,
  getCourseById,
  getLearnedClasses,
  getTutorById,
  createLearnedClass,
  updateLearnedClass} from '../modules/NetworkFunction';
import { useIsFocused, useFocusEffect } from '@react-navigation/native'; 


const LessonInfo = ({ navigation, route }) => {


  const [contentsList, setContentsList] = useState(route.params.contentsList);
  
  const [lessonInfo, setLessonInfo] = useState(route.params?.lessonInfo);
  const [courseId, setCourseId] = useState(route.params?.lessonInfo.course_id);

  // const [contentsList, setContentsList] = useState(route.params.contentsList);
  const [quizList, setQuizList] = useState(route.params?.quizList);
  // const [quizList, setQuizList] = useState([]);
  const [solvedQuizList, setSolvedQuizList] = useState(route.params?.solvedQuizList);
  const [isSolvedQuizListLoaded, setIsSolvedQuizListLoaded] = useState(false);

  const [solvedQuizNumList, setSolvedQuizNumList] = useState([]);

  const [visible, setVisible] = useState(false);
  const [review, setReview] = useState(true);

  
  const [clickedContentId, setClickedContentId] = useState(
    contentsList[0].content_id
    );
    const [clickedTodayContentId, setClickedTodayContentId] = useState(0);
  const [currentClassByCourseId, setCurrentClassByCourseId] = useState([]);

  const [isQuizReady, setIsQuizReady] = useState(false);

  const { authState } = React.useContext(AuthContext);
  const [userId, setUserId] = useState(authState.userId);
  // const [userId, setUserId] = useState(72);

  const [startQuizList, setStartQuizList] = useState(); // 퀴즈 시작하기 버튼 누르면 해당 컨텐츠의 퀴즈 리스트가 들어감

  const isFocused = useIsFocused(); // isFoucused를 통해 화면이 focus 되었을 때 useEffect 실행


  const goToCurrentVideo = () => {

    if (currentClassByCourseId.length == 0) {
      navigation.navigate("LessonVideo", {
        video_url: contentsList[0].video_url,
        is_portrait: contentsList[0].is_portrait,
        isHome: false,
      });
    }  else {
      navigation.navigate("LessonVideo", {
        video_url: currentClassByCourseId[0].video_url,
        is_portrait: currentClassByCourseId[0].is_portrait,
        isHome: false,

      });
    }

    
  };

  const goToVideo = (content_id) => {
    console.log(content_id);

    const clickedContent = contentsList.find(
      (content) => content.content_id == content_id
    );

    // 만약, currentClass가 0 이면, createLearnedClass
    // 그렇지 않으면, updateLearnedClass
    const isPlayed = currentClassByCourseId.find(
      (currentClass) => currentClass.class.class_id == clickedContent.class_entity.class_id
    );

    if (isPlayed) { // updateLearnedClass
      
      console.log('updateLearnedClass');

      updateLearnedClass(
        {
          user_id: userId,
          class_id: clickedContent.class_entity.class_id,
        },
        (response) => {
          console.log(response);
        },
        () => {},
        (e) => { console.log(e); }
      );
    } else { // 없는 경우! -> createLearnedClass
      console.log('createLearnedClass');
      createLearnedClass(
        {
          user_id: userId,
          class_id: clickedContent.class_entity.class_id,
        },
        (response) => {
          console.log(response);
        },
        () => {},
        (e) => { console.log(e); }
      );
    }

    navigation.navigate("LessonVideo", {
      content_id,
      video_url: clickedContent.video_url,
      is_portrait: clickedContent.is_portrait,
      isHome: false,

    });
  };

  const getTodayQuizList = (id) => {
    console.log('quizList', quizList);
    const todayQuizList = quizList.filter(
      (quiz) => quiz.content_id === id
    );
    console.log('getTodayQuizList', todayQuizList);
    return todayQuizList;
  }

 // contentsList
  // yoojin
  // 1~10차시 == 2 ~ 11 : content_id
  // 1차시 == 2, 2차시 == 3, 3차시 == 4, 4차시 == 5, 5차시 == 39, 6차시 == 40, 7차시 == 41, 8차시 == 9, 9차시 == 10, 10차시 == 11


  // seongyeop
  // 1~10차시 == 17 ~ 26
  // 1차시 == 17, 2차시 == 18, 3차시 == 19, 4차시 == 20, 5차시 == 21, 6차시 == 22, 7차시 == 23, 8차시 == 24, 9차시 == 25, 10차시 == 26

  // kyungeun
  // 1~10강 == 28 ~ 37
  // part1 == 28, part2 == 29, part3 == 30, part4 == 31, part5 == 32, part6 == 33, part7 == 34, part8 == 35, part9 == 36, part10 == 37

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [learnedClass, setLearnedClass] = React.useState([]);
  useFocusEffect(
  React.useCallback(() => {
    const getProgressLecture = async () => {
      let filterData = [];
      await getLearnedClasses(
        {},
        (d) => {
          filterData = d.data.filter((item) => {
            return item.user_id === Number(authState.userId) && !item.is_completed;
          });
        },
        setIsLoaded,
        (e) => {
          console.log(e);
        }
      );

      const data = filterData.map(async (item) => {
        let courseName, tutorId, tutorName, contents;
        await getCourseById(
          { course_id: item.class.course_id },
          (d) => {
            courseName = d.data.name;
            tutorId = d.data.tutor_id;
          },
          () => {},
          (e) => {
            console.log(e);
          }
        );
        await getTutorById(
          { tutor_id: tutorId },
          (d) => {
            tutorName = d.data.name;
          },
          () => {},
          (e) => {
            console.log(e);
          }
        );
        await getContents(
          {},
          (d) => {
            contents = d.data.filter((content) => {
              return (
                content.class_entity.class_id === item.class_id &&
                content.enabled
              );
            });
          },
          () => {},
          (e) => {
            console.log(e);
          }
        );
        if (contents[0] !== undefined) {
          item.content_id = contents[0].content_id;
          item.className = contents[0].name;
          item.is_portrait = contents[0].is_portrait;
          item.video_url = contents[0].video_url;
        }
        item.courseName = courseName;
        item.tutorName = tutorName;
        return item;
      });
      Promise.all(data).then((d) => {
        setLearnedClass(d);
        // 현재 course의 듣고 있는 class 찾기 -> courseId 기준으로!
        const learnedClassByCourseId = d.filter((item) => {
          return item.class.course_id === courseId;
        });

        // 날짜로 정렬!
        const orderedClassByCourseId = learnedClassByCourseId.sort((a, b) => {
          return new Date(b.date_updated) - new Date(a.date_updated);
        });
      
        setCurrentClassByCourseId(orderedClassByCourseId);
        
        });
      };
      getProgressLecture();
      console.log("currentClassByCourseId", currentClassByCourseId);

  }, [isFocused]));

  useFocusEffect(
    React.useCallback(() => {

      console.log("LessonInfo is focused");
      console.log('lessonInfo', lessonInfo);

      if(!isSolvedQuizListLoaded){
        getSolvedQuizsByUser({user_id : userId}, (d) => {
          setSolvedQuizList([...d.data]);
          console.log("solvedQuizList loaded");
        }, setIsSolvedQuizListLoaded, (e) => {console.log(e)})
       
      }
          solvedQuizList.map((solvedItem) => {
            setSolvedQuizNumList((solvedQuizNumList) => [...solvedQuizNumList, solvedItem.quiz_id])
          })
          // console.log("solvedQuizNumList : ",  solvedQuizNumList)
          
            contentsList.map((content) => {
      
              let id = content.content_id;
              let solvedQuizNum = 0;
              let quiz = quizList.filter((q) => {
                  return q.content.content_id == id && q.quiz_id !== 44;
              });
        
              
              if (quiz) {
                content.totalQuizNum = quiz.length;
                content.quiz = quiz;
                quiz.map((q) => {
                  if(solvedQuizNumList.includes(q.quiz_id)){
                  let foundSolvedQuizItem = solvedQuizList.find((solvedQuizItem) => {
                    return solvedQuizItem.quiz_id == q.quiz_id;
                  })
      
                  // console.log('foundSolvedQuizItem', foundSolvedQuizItem)
                  // console.log('foundsolvedItem.is_correct : ', foundSolvedQuizItem.is_correct)
      
                  if(foundSolvedQuizItem.is_correct){
                    solvedQuizNum += 1;
                  }
      
                }
                })
                
                content.solvedQuizNum = solvedQuizNum;
              } else {
                content.totalQuizNum = 0;
              }
        })
        if(isSolvedQuizListLoaded){
          setIsSolvedQuizListLoaded(false);
        }

    }, [solvedQuizList, isFocused])
  )



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
      <View style={styles.lessonInfoShadowContainer}>
        <View style={styles.lessonInfoContainer}>
          <Image
            style={styles.imageContainer}
            source={{
              uri:lessonInfo.tutor.profile_url
              
            }}
          ></Image>

          <View style={styles.textContainer}>
            <View style={styles.todayContainer}>
              <Text style={styles.todayText}>Today's Lecture</Text>
            </View>

            <GradientBtn
              text={`${contentsList.length} Units`}
              textStyle={{
                color: "white",
                textAlign: "center",
                fontSize: 12,
                fontFamily: "Poppins-Medium",
              }}
              viewStyle={{
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 3,
                width: 75,
                height: 25,
                marginBottom: 30,
              }}
            />

            <TouchableOpacity
              onPress={() => {
                goToCurrentVideo();
              }}
            >
              <View style={styles.studyNowBtn}>
                <Text style={styles.studyNowText}>Study Now</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={15}
                  color="white"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                let content_id;
                if (currentClassByCourseId.length == 0) {
                  console.log('no listened contents');
                  content_id = contentsList[0].content_id
                  setClickedTodayContentId(contentsList[0].content_id);
                }  else {
                  console.log('currently listening');
                  console.log('currentClassByCourseId[0].content_id', currentClassByCourseId[0].content_id);
                  content_id = currentClassByCourseId[0].content_id
                  setClickedTodayContentId(currentClassByCourseId[0].content_id);
                }
                const todayQuizList = getTodayQuizList(content_id);
                setStartQuizList([...todayQuizList])
                setVisible(true);
              }}
            >
              <View style={styles.quizBtn}>
                <Text style={styles.quizText}>Today's Quiz</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={15}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.curriculumShadowContainer}>
        <View style={styles.curriculumHeader}>
          <Text style={styles.curriculumHeaderText}>Curriculum</Text>
        </View>

        <FlatList
          numColumns={1}
          key={"_"}
          style={styles.curriculumListContainer}
          keyExtractor={(item) => String(item.content_id)}
          data={contentsList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.curriculumItem}>
              <TouchableOpacity
                onPress={() => {
                  goToVideo(item.content_id, false);
                }}
              >
                <View style={styles.unitNum}>
                  <Text style={styles.unitNumText}>
                    Unit {item.class_entity.unit}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.unitInfo}>
                <TouchableOpacity
                  onPress={() => {
                    goToVideo(item.content_id, false);
                  }}
                >
                  <View style={styles.unitTitle}>
                    <Text style={styles.unitTitleText}>{item.name}</Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.unitBottomContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      goToVideo(item.content_id, false);
                    }}
                  >
                    <View style={styles.unitStudyContainer}>
                      <Text style={styles.unitStudyText}>Study</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setClickedContentId(item.content_id);
                      setStartQuizList(item.quiz)
                      console.log("---------------------------------")
                      setVisible(true);
                    }}
                  >
                    <View style={styles.unitQuizContainer}>
                      <View style={styles.unitQuizLeftContainer}>
                        <Text style={styles.unitQuizLeftText}>Quiz</Text>
                      </View>
                      <Text style={styles.unitQuizNumText}>{item.solvedQuizNum}/{item.totalQuizNum}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        ></FlatList>
      </View>

      <Dialog
        dialogStyle={{
          borderRadius: 25,
          width: Dimensions.get("window").width * 0.9,
          height: Dimensions.get("window").height * 0.27,
        }}
        visible={visible}
        onTouchOutside={() => {
          setVisible(false);
        }}
        onHardwareBackPress={() => {
          setVisible(false);
        }}
        dialogAnimation={
          new ScaleAnimation({
            initialValue: 0, // optional
            useNativeDriver: true, // optional
          })
        }
        footer={
          <DialogFooter
            bordered={false}
            style={{
              height: "50%",
              width: "100%",
            }}
          >
            <DialogButton
              style={{
                width: "50%",
                height: "100%",
                backgroundColor: "#E6E3EA",
                borderBottomLeftRadius: 25,
                flexDirection: "row",
                alignItems: "center",
              }}
              textStyle={{
                color: "#fff",
                fontFamily: "Poppins-SemiBold",
                fontSize: 24,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
              text={
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={{ marginRight: 5 }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "Poppins-SemiBold",
                        fontSize: 24,
                      }}
                    >
                      NO
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "Poppins-Regular",
                        fontSize: 10,
                        textAlign: "center",
                      }}
                    >
                      I want to review{"\n"}before the quiz
                    </Text>
                  </View>
                </View>
              }
              onPress={() => {
                setReview(true);
                setVisible(false);
                goToVideo(clickedTodayContentId, true);

                console.log("review: ", review);
              }}
            ></DialogButton>
            <DialogButton
              style={{
                backgroundColor: "#A160E2",
                borderBottomRightRadius: 25,
                width: "50%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              textStyle={{
                color: "#E6E3EA",
                fontFamily: "Poppins-SemiBold",
                fontSize: 24,
                height: "100%",
              }}
              text={
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={{ marginRight: 5 }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "Poppins-SemiBold",
                        fontSize: 24,
                      }}
                    >
                      YES
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "Poppins-Regular",
                        fontSize: 10,
                        textAlign: "center",
                      }}
                    >
                      I want to start{"\n"}without the review
                    </Text>
                  </View>
                </View>
              }
              onPress={() => {
                setReview(false);
                setVisible(false);
                // if (currentClassByCourseId.length == 0) {
                //   setClickedContentId(contentsList[0].content_id);
                // }  else {
                //   console.log("currentClassByCourseId", currentClassByCourseId);
                //   console.log('currentClassByCourseId[0].content_id', currentClassByCourseId[0].content_id);
                //   setClickedContentId(currentClassByCourseId[0].content_id);
                // }
                console.log('param QuizList', startQuizList);
                navigation.navigate("LessonQuiz", { content_id: clickedContentId, contentsList: contentsList, lessonInfo: lessonInfo, quizList: startQuizList, solvedQuizList: solvedQuizList, solvedQuizNumList: solvedQuizNumList });
              }}
            />
          </DialogFooter>
        }
      >
        <DialogContent
          style={{
            position: "relative",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: "#000",
              paddingTop: 40,
              textAlign: "center",
            }}
          >
            Before starting the quiz,{"\n"}Are you sure to start without
            reviewing the last lesson?
          </Text>
        </DialogContent>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}
          style={{ position: "absolute", right: 10, top: 10 }}
        >
          <Ionicons name="ios-close-outline" size={24} color="black" />
        </TouchableOpacity>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "relative",
  },

  lessonInfoShadowContainer: {
    marginTop: 100,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.22,
    backgroundColor: "#fff",
    borderRadius: 9,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
      },

      android: {
        shadowColor: "gray",
        elevation: 10,
      },
    }),
  },

  lessonInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    width: "40%",
    height: "100%",
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  textContainer: {
    width: "55%",
    height: "95%",
    marginLeft: 15,
    position: "relative",
  },
  todayContainer: {
    marginBottom: 3,
  },
  todayText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    fontColor: "#000",
  },
  totalUnitContainer: {
    borderRadius: 20,
    flexDirection: "row",

    width: 55,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    position: "relative",
  },
  totalUnitsImg: {
    position: "absolute",
    width: 60,
    height: 25,
    borderRadius: 20,
  },

  totalUnitsNum: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    fontSize: 12,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 30,
  },
  studyNowBtn: {
    backgroundColor: "#A160E2",
    borderRadius: 7,
    width: 120,
    height: 25,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  studyNowText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#fff",
  },
  studyNowArrow: {
    color: "#fff",
  },
  quizBtn: {
    backgroundColor: "#A160E2",
    borderRadius: 7,
    width: 120,
    height: 25,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
  },
  quizText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#fff",
  },
  quizArrow: {
    color: "#fff",
  },
  curriculumShadowContainer: {
    marginTop: 20,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.6,
    backgroundColor: "#fff",
    borderRadius: 9,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
      },

      android: {
        shadowColor: "gray",
        elevation: 10,
      },
    }),
  },
  curriculumHeader: {
    marginTop: 30,
    marginLeft: 40,
  },
  curriculumHeaderText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#444345",
  },

  curriculumListContainer: {
    marginTop: 20,
    marginLeft: 40,
  },

  curriculumItem: {
    flexDirection: "row",
    marginBottom: 20,
    width: "90%",
  },
  unitNum: {
    marginRight: 20,
    flex: 1,
  },
  unitInfo: {
    flex: 2,
  },
  unitTitle: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E3EA",
    borderStyle: "solid",
  },
  unitTitleText: {
    color: "#444345",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  unitStudyContainer: {
    borderColor: "#A160E2",
    borderWidth: 1,
    width: 50,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  unitStudyText: {
    fontSize: 10,
    fontFamily: "Poppins-Medium",
    color: "#A160E2",
  },
  unitQuizContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitQuizLeftContainer: {
    width: 45,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A160E2",
    marginRight: 5,
  },
  unitQuizLeftText: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#FDFDFD",
  },
  unitQuizNumText: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#A160E2",
  },
  unitNumText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#807F82",
  },
  unitBottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default LessonInfo;
