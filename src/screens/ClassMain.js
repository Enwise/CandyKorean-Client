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

  // getLevels result
  // {
  //   "data": [
  //       {
  //           "level_id": 1,
  //           "name": "롤리팝",
  //           "enabled": false,
  //           "info": "test",
  //           "tutor": {
  //               "tutor_id": 2,
  //               "enabled": false,
  //               "name": "imtutor3",
  //               "img_url": "",
  //               "profile_url": ""
  //           }
  //       },
  //       {
  //           "level_id": 2,
  //           "name": "test",
  //           "enabled": false,
  //           "info": "",
  //           "tutor": {
  //               "tutor_id": 6,
  //               "enabled": true,
  //               "name": "yoojin shin",
  //               "img_url": "",
  //               "profile_url": ""
  //           }
  //       },

  // 객체 형태로 저장
  // key: 코스이름
  // value: 코스에 해당하는 수업 리스트

  /* levels */
  // id : level_id
  // name : 레벨 이름
  // info : 레벨 설명
  // join : One Level to Many Courses (O)
  // join : Many tutor to One Level (O)

  /* Courses */
  // name : 코스 이름
  // category : 카테고리 이름
  // price : 코스 가격
  // join : One Course to Many Classes (O)
  // join : One Course to One Tutor (X) -> #31 issue

  /* Classes */
  // join : One Classes to Many Contents (O)

  /* Contents */
  // units : 전체 유닛 갯수 : .length 활용
  // introVideoUrl : 소개 영상 url -> 결과 list의 첫 번째 영상 video_url 사용
  // video_url: 강의화면에서 사용될 영상 url

  /* Tutors */
  // 튜터 이름 : name
  // 튜터 level 사진 : img_url
  // 튜터 profile 사진 : profile_url

  // useEffect 기공
  // isPortait : 모두 true 로 해두기 -> #41 issue 추가될 예정

  const [dataList, setDataList] = useState();

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
            // console.log(item);

            if (
              item.name === "Lollipop Level" ||
              item.name === "Cotton Candy Level" ||
              item.name === "Mint Candy Level"
            ) {
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

    console.log("levelList", levelList);
  }, [isLevelListLoaded]);

  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {levelList.map((item) => {
          return (
            <Course
              navigation={navigation}
              title={item.name}
              levelItem={item}
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
