import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import Lesson from "../components/Lesson";

const ClassRoomMain = ({ navigation }) => {
  // 객체 형태로 저장
  // key: 코스이름
  // value: 코스에 해당하는 수업 리스트
  const [dummyLessonList, setDummyLessonList] = useState([
    {
      imgUrl: "img1",
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
    },
    {
      imgUrl: "img1",
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
    },
    {
      imgUrl: "img1",
      teacherName: "Kyungeun3",
      className: "class3",
      category: "K-pop",
      level: "Lollipop",
      currentUnit: 6,

      totalUnits: 10,
      price: 100,
      startDate: "2021-01-01",
      endDate: "2021-01-31",
      description: "Let's study real Korean\n formal language!",
    },
    {
      imgUrl: "img1",
      teacherName: "Kyungeun4",
      className: "class4",
      category: "K-culture",
      level: "Lollipop",
      currentUnit: 1,

      totalUnits: 10,
      price: 100,
      startDate: "2021-01-01",
      endDate: "2021-01-31",
      description: "Let's study real Korean formal language!",
    },
    {
      imgUrl: "img1",
      teacherName: "Kyungeun5",
      className: "class5",
      category: "K-culture",
      level: "Lollipop",
      currentUnit: 3,

      totalUnits: 10,
      price: 100,
      startDate: "2021-01-01",
      endDate: "2021-01-31",
      description: "Let's study real Korean\n formal language!",
    },
  ]);

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Today's Lesson</Text>
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

    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#fff",
    position: "relative",
    paddingBottom: 50,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
  moreButton: {
    flexDirection: "row",
  },
});

export default ClassRoomMain;
