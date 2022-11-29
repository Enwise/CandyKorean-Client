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
import WishListButton from "../components/WishListButton";

import { login } from "../modules/NetworkFunction";

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
      {
        id: 1,
        imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
        teacherName: "yoojin shin",
        // mp4 로 해야됨..서버에 mp4 파일 올려야됨
        // introVideoUrl: require("https://youtube.com/shorts/2sr2X_inOSg"),
        // introVideoUrl: require("../assets/videos/shin_yoo_jin/0차시(소개).mp4"),
        introVideoUrl:
          "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        className: "yoojin shin class",
        category: "K-culture",
        level: "Lollipop",
        units: 9,
        price: 100,
        isPortrait: true, // is세로? -> true면 세로, false면 가로
      },
      {
        id: 2,
        imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
        teacherName: "Kyungeun2",
        className: "class2",
        category: "K-history",
        level: "Lollipop",
        units: 10,
        price: 100,
      },
      {
        id: 3,
        imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
        teacherName: "Kyungeun3",
        className: "class3",
        category: "K-pop",
        level: "Lollipop",
        units: 10,
        price: 100,
      },
      {
        id: 4,
        imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
        teacherName: "Kyungeun4",
        className: "class4",
        category: "K-culture",
        level: "Lollipop",
        units: 10,
        price: 100,
      },
      {
        id: 5,
        imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
        teacherName: "Kyungeun5",
        className: "class5",
        category: "K-culture",
        level: "Lollipop",
        units: 10,
        price: 100,
      },
    ],
    "Cotton Candy Level": [
      {
        id: 6,

        imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
        teacherName: "K pop with Wang1",
        className: "class1",
        category: "K-culture",
        level: "CottonCandy",
        units: 10,
        price: 100,
      },
      {
        id: 7,
        imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
        teacherName: "K pop with Wang2",
        className: "class2",
        category: "K-culture",
        level: "CottonCandy",
        units: 10,
        price: 100,
      },
      {
        id: 8,

        imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
        teacherName: "K pop with Wang3",
        className: "class3",
        category: "K-culture",
        level: "CottonCandy",
        units: 10,
        price: 100,
      },
      {
        id: 9,
        imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
        teacherName: "K pop with Wang4",
        className: "class4",
        category: "K-culture",
        level: "CottonCandy",
        units: 10,
        price: 100,
      },
    ],
    "Mint Candy Level": [
      {
        id: 10,
        imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
        teacherName: "shin",
        className: "class1",
        category: "K-culture",
        level: "MintCandy",
        units: 10,
        price: 100,
      },
      {
        id: 11,
        imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
        teacherName: "kim",
        className: "class2",
        category: "K-culture",
        level: "MintCandy",
        units: 10,
        price: 100,
      },
      {
        id: 12,
        imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
        teacherName: "lee",
        className: "class3",
        category: "K-culture",
        level: "MintCandy",
        units: 10,
        price: 100,
      },
    ],
  });

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

  const [isLoginSucceed, setIsLoginSucceed] = useState(false);

  useEffect(() => {
    console.log("activeState");

    if (!isLoginSucceed) {
      login(
        { login_id: "11@test.com", password: "1111" },
        (v) => {
          console.log(v);
        },
        setIsLoginSucceed,
        (e) => {
          console.log({ ...e });
        }
      );
    }
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
              isMain={true}
            ></Course>
          );
        })}
      </ScrollView>
      <WishListButton
        text="1"
        navigation={navigation}
        isMain={true}
      ></WishListButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#fff",
    position: "relative",
    paddingBottom: 50,
  },
  moreButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
});

export default ClassMain;
