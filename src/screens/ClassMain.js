import { update } from "lodash";
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

import { getLevels, createLevel } from "../modules/NetworkFunction";

const ClassMain = ({ navigation }) => {
  const [courseNameList, setCourseNameList] = useState([
    "Lollipop Level",
    "Cotton Candy Level",
    "Mint Candy Level",
  ]);

  // 객체 형태로 저장
  // key: 코스이름
  // value: 코스에 해당하는 수업 리스트
  const [dummyCourseList, setDummyCourseList] = useState({
    "Lollipop Level": [
      {
        id: 1,
        imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
        profileUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
        teacherName: "yoojin shin",
        // mp4 로 해야됨..서버에 mp4 파일 올려야됨
        // introVideoUrl: require("https://youtube.com/shorts/2sr2X_inOSg"),
        // introVideoUrl: require("../assets/videos/shin_yoo_jin/0차시(소개).mp4"),
        introVideoUrl:
          "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/video1.mp4",
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
        profileUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
        introVideoUrl:
          "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/video1.mp4",

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
        profileUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
        introVideoUrl:
          "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/video1.mp4",

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
        profileUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
        introVideoUrl:
          "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/video1.mp4",

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
        profileUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
        introVideoUrl:
          "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/video1.mp4",
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
        profileUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
        introVideoUrl:
          "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/video1.mp4",
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
        profileUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
        introVideoUrl:
          "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/video1.mp4",
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
        profileUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
        introVideoUrl:
          "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/video1.mp4",
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
        profileUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
        introVideoUrl:
          "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/video1.mp4",
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
        profileUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
        introVideoUrl:
          "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/video1.mp4",
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
        profileUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
        introVideoUrl:
          "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/video1.mp4",
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
        profileUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
        introVideoUrl:
          "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/video1.mp4",
        teacherName: "lee",
        className: "class3",
        category: "K-culture",
        level: "MintCandy",
        units: 10,
        price: 100,
      },
    ],
  });

  const [isLogin, setIsLogin] = useState(false);
  const [isLevelListLoaded, setIsLevelListLoaded] = useState(false);
  const [levelList, setLevelList] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    console.log("getLevel data: ");

    // levelList 불러오기
    if (!isLevelListLoaded) {
      getLevels(
        {},
        (d) => {
          console.log("getLevel data: ", d.data);
          let updatedLevelList = [...levelList];
          d.data.map((item) => {
            console.log(item);

            if (item.enabled) {
              updatedLevelList.push(item);
            }
          });
          console.log("updatedLevelList", updatedLevelList);
          setLevelList(updatedLevelList);
        },

        setIsLevelListLoaded,
        (e) => {
          console.log(e);
        }
      );
    }

    setLevelList({ ...dummyCourseList });
  }, [isLevelListLoaded]);

  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {Object.keys(levelList).map((title) => {
          return (
            <Course
              navigation={navigation}
              title={title}
              classList={dummyCourseList[title]}
              isShowAll={false}
              isMain={true}
            ></Course>
          );
        })}
      </ScrollView>
      {/* <WishListButton
        text="1"
        navigation={navigation}
        isMain={true}
      ></WishListButton> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    position: "relative",
    paddingBottom: 50,
  },
});

export default ClassMain;
