import React, { memo, useState } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Platform,
  Dimensions,
} from "react-native";

import GradientBtn from "../components/GradientButtonView";
import { getClasses, getClassesByCourseId, getContents } from "../modules/NetworkFunction";

const Lesson = ({ navigation, lessonInfo, quizList, solvedQuizList }) => {
  const [isClassListLoaded, setIsClassListLoaded] = useState(false);
  const [classList, setClassList] = useState([]);

  const [isContentListLoaded, setIsContentListLoaded] = useState(false);
  const [contentsList, setContentsList] = useState([]);

  useEffect(() => {
    if (!isClassListLoaded) {
      getClassesByCourseId(
        {
          id : lessonInfo.course_id
        },
        (d) => {
          d.data.map((item) => {
            if(item.unit !== 0){ // OT 인 Class 제외
              setClassList((classList) => [...classList, item]);
            }
          });
        },
        setIsClassListLoaded,
        (e) => {
          console.log(e);
        }
      );
    }
    if (isClassListLoaded && !isContentListLoaded) {
      getContents(
        {},
        (d) => {
          classList.map((classItem) => {
            d.data.map((contentItem) => {
              if (
                classItem.class_id == contentItem.class_entity.class_id
                
              ) {
                
                setContentsList((contentsList) => [
                  ...contentsList,
                  contentItem,
                ]);
              }
            });
          });
        },
        setIsContentListLoaded,
        (e) => {
          console.log(e);
        }
      );
    }
  }, [isClassListLoaded, isContentListLoaded]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("LessonInfo", {
            lessonInfo: lessonInfo,
            contentsList: contentsList,
            quizList: quizList,
            solvedQuizList: solvedQuizList,
          });
        }}
      >
        <View style={styles.lessonInfoContainer}>
          <Image
            style={styles.imageContainer}
            source={{
              uri: lessonInfo.tutor.profile_url,
            }}
          ></Image>
          <View style={styles.textContainer}>
            <View style={styles.lessonNameContainer}>
              <Text style={styles.lessonName}>{lessonInfo.name}</Text>
            </View>
            <View style={styles.lessonDescContainer}>
              <Text style={styles.lessonDesc}>
                {lessonInfo.info.split(".")[0] + "."}
              </Text>
            </View>
          </View>
        </View>
        <GradientBtn
          text={`${contentsList.length} Units`}
          textStyle={{
            color: "white",
            textAlign: "center",
            fontSize: 14,
            fontFamily: "Poppins-Medium",
          }}
          viewStyle={{
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 3,
            width: 80,
            height: 30,
            right: 5,
            bottom: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Dimensions.get("window").width * 0.05,
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: "#fff",
    borderRadius: 9,
    marginBottom: 40,
    borderRadius: 9,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.07)",
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 0 },
        shadowRadius: 10,
      },

      android: {
        shadowColor: "lightgray",
        elevation: 10,
      },
    }),
  },
  lessonInfoContainer: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    borderRadius: 9,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "40%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },

  textContainer: {
    marginLeft: 10,
    width: "60%",
    backgroundColor: "#fff",
  },
  lessonName: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },

  lessonDesc: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#B8B5BC",
  },
  unitsContainer: {
    position: "absolute",
    bottom: 0,
    right: 20,
  },
  unitsText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#FFF",
    position: "absolute",
    bottom: 0,
    right: 4,
  },

  lessonDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
  },

  lessonDateText: {
    fontFamily: "Poppins-Medium",
    color: "#B8B5BC",
    fontSize: 10,
  },
});

export default memo(Lesson);
