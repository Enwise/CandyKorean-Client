import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Course from "../components/Course";

const ClassMain = ({ navigation }) => {
  const [courseNameList, setCourseNameList] = useState([
    "Lollipop Level",
    "Cotton Candy Level",
    "Mint Candy Level",
  ]);

  const [isShowAllActive, setIsShowAllActive] = useState(false);
  const [activeState, setActiveState] = useState({
    "Lollipop Level": false,
    "Cotton Candy Level": false,
    "Mint Candy Level": false,
  });

  // 객체 형태로 저장
  // key: 코스이름
  // value: 코스에 해당하는 수업 리스트
  const [dummyCourseList, setDummyCourseList] = useState({
    "Lollipop Level": [
      { imgUrl: "img1", teacherName: "Kyungeun1", className: "class1" },
      { imgUrl: "img1", teacherName: "Kyungeun2", className: "class2" },
      { imgUrl: "img1", teacherName: "Kyungeun3", className: "class3" },
      { imgUrl: "img1", teacherName: "Kyungeun4", className: "class4" },
      { imgUrl: "img1", teacherName: "Kyungeun5", className: "class5" },
    ],
    "Cotton Candy Level": [
      { imgUrl: "img2", teacherName: "K pop with Wang1", className: "class1" },
      { imgUrl: "img2", teacherName: "K pop with Wang2", className: "class2" },
      { imgUrl: "img2", teacherName: "K pop with Wang3", className: "class3" },
      { imgUrl: "img2", teacherName: "K pop with Wang4", className: "class4" },
    ],
    "Mint Candy Level": [
      { imgUrl: "img3", teacherName: "shin", className: "class1" },
      { imgUrl: "img3", teacherName: "kim", className: "class2" },
      { imgUrl: "img3", teacherName: "lee", className: "class3" },
    ],
  });

  // const changeActiveCourse = (courseName) => {
  //   setActiveCourse({
  //     ...activeCourse,
  //     [courseName]: !activeCourse[courseName],
  //   });
  // };

  // const goBack = () => {
  //   console.log("goBack");
  //   setActiveCourse({
  //     "K-Culture": false,
  //     "Standard Korean": false,
  //     TOPIK: false,
  //   });
  //   setIsMoreActive(false);
  // };

  const showAllClass = (title, status) => {
    if (status) {
      // more 버튼 눌렀을 때
      setIsShowAllActive(true);
      setActiveState({
        ...activeState,
        [title]: !activeState[title],
      });
    } else {
      // back 버튼 눌렀을 때
      setIsShowAllActive(false);
      setActiveState({
        "K-Culture": false,
        "Standard Korean": false,
        TOPIK: false,
      });
    }
  };

  useEffect(() => {
    console.log("activeState");
  }, [activeState, isShowAllActive]);

  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {courseNameList.map((courseName) => {
          return (
            <Course
              navigation={navigation}
              key={courseName}
              title={courseName}
              classList={dummyCourseList[courseName]}
              showAllClass={showAllClass}
              isShowAll={false}
            ></Course>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  moreButton: {
    flexDirection: "row",
  },
});

export default ClassMain;
