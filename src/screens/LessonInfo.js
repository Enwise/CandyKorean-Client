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

import { getCourseById, getCourses } from '../modules/NetworkFunction';

const LessonInfo = ({ navigation, route }) => {
  const [lessonInfo, setLessonInfo] = useState(route.params.lessonInfo);
  const [contentsList, setContentsList] = useState(route.params.contentsList);

  const [visible, setVisible] = useState(false);
  const [review, setReview] = useState(true);
  const [clickedUnit, setClickedUnit] = useState(0);

  const [isCourseLoaded, setIsCourseLoaded] = useState(false);
  const [tutor_profile_url, setTutorProfileUrl] = useState('');

  const [clickedContentId, setClickedContentId] = useState(
    contentsList[0].content_id
  );

  const goToCurrentVideo = () => {
    navigation.navigate("LessonVideo", {
      video_url: contentsList[0].video_url,
      isPortrait: contentsList[0].is_portrait,
    });
  };

  const goToVideo = (content_id) => {
    console.log(content_id);

    const clickedContent = contentsList.find(
      (content) => content.content_id == content_id
    );

    navigation.navigate("LessonVideo", {
      video_url: clickedContent.video_url,
      isPortrait: clickedContent.is_portrait,
    });
  };

  // contentsList
  // yoojin
  // 1~10차시 == 2 ~ 11

  // seongyeop
  // 1~10차시 == 17 ~ 26

  // kyungeun
  // 1~10강 == 28 ~ 37

  useEffect(() => {
    console.log("contentsList", contentsList);
    
    if (!isCourseLoaded) {
      getCourses({}, (d) => {
        d.data.map((courseItem) => {
          if (courseItem.course_id == contentsList[0].class_entity.course_id){
            setTutorProfileUrl(courseItem.tutor.profile_url);
            console.log(tutor_profile_url)
            return;
          }
        })
        
        
      }, setIsCourseLoaded, (e) => {console.log(e)})
    }

  }, [isCourseLoaded]);

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
              uri:tutor_profile_url
              
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
                setVisible(true);
                setClickedContentId(contentsList[0].content_id);
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
          keyExtractor={(item) => String(item.id)}
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
                      setVisible(true);
                      setClickedContentId(item.content_id);
                    }}
                  >
                    <View style={styles.unitQuizContainer}>
                      <View style={styles.unitQuizLeftContainer}>
                        <Text style={styles.unitQuizLeftText}>Quiz</Text>
                      </View>
                      {/* <Text style={styles.unitQuizNumText}>5/7</Text> */}
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
                goToVideo(clickedContentId, true);

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
                navigation.navigate("LessonQuiz", { content_id: clickedContentId, contentsList: contentsList, lessonInfo: lessonInfo });
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
