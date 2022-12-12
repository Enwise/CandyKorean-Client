import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

import Lesson from "../components/Lesson";

const ClassRoom = ({ navigation }) => {
  // 객체 형태로 저장
  // key: 코스이름
  // value: 코스에 해당하는 수업 리스트
  const [dummyLessonList, setDummyLessonList] = useState([
    // 필요 데이터
    // 현재 어디유닛 수강하고 있는지 -> currentUnit
    {
      id: 1,
      imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
      profileImgUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
      teacherName: "Kyungeun1",
      className: "class1",
      category: "K-culture",
      level: "Lollipop",
      currentUnit: 4,
      totalUnits: 10,
      price: 100,
      startDate: "2021-01-01",
      endDate: "2021-01-31",
      description: "Let's study real Korean\n formal language!",
      isPortrait: true, // is세로? -> true면 세로, false면 가로

      curriculum: [
        {
          id: 1,
          unitNum: 1,
          unitName: "Greetings 안녕하세요",
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
        },
        {
          id: 2,
          unitNum: 2,
          unitName: "Greetings 안녕하세요",
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
        },
        {
          id: 3,
          unitNum: 3,
          unitName: "Greetings 안녕하세요",
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
        },
        {
          id: 4,
          unitNum: 4,
          unitName: "Greetings 안녕하세요",
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
        },
        {
          id: 5,
          unitNum: 5,
          unitName: "Greetings 안녕하세요",
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
        },
        {
          id: 6,
          unitNum: 6,
          unitName: "Greetings 안녕하세요",
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
        },
        {
          id: 7,
          unitNum: 7,
          unitName: "Greetings 안녕하세요",
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
        },
        {
          id: 8,
          unitNum: 8,
          unitName: "Greetings 안녕하세요",
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
        },
        {
          id: 9,
          unitNum: 9,
          unitName: "Greetings 안녕하세요",
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
        },
      ],
    },
    {
      id: 10,
      imgUrl: require("../assets/icons/class_img/shin_yoo_jin_rect.jpg"),
      profileImgUrl: require("../assets/icons/class_img/shin_yoo_jin_square.jpg"),
      teacherName: "Kyungeun2",
      className: "class2",
      category: "K-history",
      level: "Lollipop",
      currentUnit: 5,

      totalUnits: 10,
      price: 100,
      startDate: "2021-01-01",
      endDate: "2021-01-31",
      description: "Let's study real Korean\n formal language!",
      isPortrait: false, // is세로? -> true면 세로, false면 가로
      curriculum: [
        {
          id: 11,
          unitNum: 1,
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
          unitName: "Greetings 안녕하세요",
        },
        {
          id: 12,
          unitNum: 2,
          unitName: "Greetings 안녕하세요",
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
        },
        {
          id: 13,
          unitNum: 3,
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
          unitName: "Greetings 안녕하세요",
        },
        {
          id: 14,
          unitNum: 4,
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
          unitName: "Greetings 안녕하세요",
        },
        {
          id: 15,
          unitNum: 5,
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
          unitName: "Greetings 안녕하세요",
        },
        {
          id: 16,
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
          unitNum: 6,
          unitName: "Greetings 안녕하세요",
        },
        {
          id: 17,
          unitNum: 7,
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
          unitName: "Greetings 안녕하세요",
        },
        {
          id: 18,
          unitNum: 8,
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
          unitName: "Greetings 안녕하세요",
        },
        {
          id: 19,
          unitNum: 9,
          videoUrl: require("../assets/videos/0차시(소개).mp4"),
          unitName: "Greetings 안녕하세요",
        },
      ],
    },
    // {
    //   id: 3,
    //   imgUrl: "img1",
    //   teacherName: "Kyungeun3",
    //   className: "class3",
    //   category: "K-pop",
    //   level: "Lollipop",
    //   currentUnit: 6,

    //   totalUnits: 10,
    //   price: 100,
    //   startDate: "2021-01-01",
    //   endDate: "2021-01-31",
    //   description: "Let's study real Korean\n formal language!",
    //   curriculum: [
    //     {
    //       unitNum: 1,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 2,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 3,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 4,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 5,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 6,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 7,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 8,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 9,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //   ],
    // },
    // {
    //   id: 4,
    //   imgUrl: "img1",
    //   teacherName: "Kyungeun4",
    //   className: "class4",
    //   category: "K-culture",
    //   level: "Lollipop",
    //   currentUnit: 1,

    //   totalUnits: 10,
    //   price: 100,
    //   startDate: "2021-01-01",
    //   endDate: "2021-01-31",
    //   description: "Let's study real Korean formal language!",
    //   curriculum: [
    //     {
    //       unitNum: 1,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 2,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 3,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 4,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 5,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 6,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 7,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 8,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 9,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //   ],
    // },
    // {
    //   id: 5,
    //   imgUrl: "img1",
    //   teacherName: "Kyungeun5",
    //   className: "class5",
    //   category: "K-culture",
    //   level: "Lollipop",
    //   currentUnit: 3,

    //   totalUnits: 10,
    //   price: 100,
    //   startDate: "2021-01-01",
    //   endDate: "2021-01-31",
    //   description: "Let's study real Korean\n formal language!",
    //   curriculum: [
    //     {
    //       unitNum: 1,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 2,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 3,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 4,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 5,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 6,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 7,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 8,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //     {
    //       unitNum: 9,
    //       unitName: "Greetings 안녕하세요",
    //     },
    //   ],
    // },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My ClassRoom</Text>
      </View>
      <SafeAreaView nestedScrollEnabled={true}>
        <FlatList
          numColumns={1}
          key={"_"}
          style={styles.classListContainer}
          horizontal={false}
          keyExtractor={(item) => String(item.id)}
          data={dummyLessonList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Lesson navigation={navigation} lessonInfo={item} />
          )}
        ></FlatList>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 50,
    backgroundColor: "#fff",
    position: "relative",
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
});

export default ClassRoom;
