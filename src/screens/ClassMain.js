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

import { getLevels, createLevel, getWishlistByUser } from "../modules/NetworkFunction";

const ClassMain = ({ navigation }) => {

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
        {isLevelListLoaded && levelList.map((item) => {
          return (
            <Course
              key={item.level_id}
              navigation={navigation}
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
