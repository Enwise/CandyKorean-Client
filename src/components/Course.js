import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Class from "./Class";
import { AntDesign } from "@expo/vector-icons";
import { getCourses, getTutorById } from "../modules/NetworkFunction";

const Course = ({ title, levelItem, isShowAll, navigation, isMain }) => {

  const [courseList, setCourseList] = useState([]);

  const [isCourseListLoaded, setIsCourseListLoaded] = useState(false);

  const [isTutorLoaded, setIsTutorLoaded] = useState(false);

  useEffect(() => {
    console.log(levelItem);
    console.log('Course useEffect')
    if (!isCourseListLoaded) {
      getCourses(
        {},
        (d) => {
          // 각 레벨에 따라 따로 분류
          d.data.map((item, idx) => {
            console.log('course item', item);
            if (item.level.name === levelItem.name) {
              setCourseList((prev) => {
                return [...prev, item]}
              )
            }
          });
        },

        setIsCourseListLoaded,
        (e) => {
          console.log(e);
        }
      );
    }
  }, []);

  const handleShowAllClass = () => {
    {
      levelItem.name === "Lollipop Level"
        ? navigation.navigate("ClassMore", {
            title: levelItem.name,
            courseList: lollipopCourseList,
          })
        : null;
    }
  };

  return (
    <View
      style={[
        styles.courseContainer,
        levelItem.name === "Lollipop Level" ? { marginTop: 0 } : {},
      ]}
    >
      <View style={styles.topContainer}>
        <View style={styles.topItem1}>
          <Text style={styles.title}>{levelItem.name}</Text>

          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => {
              handleShowAllClass();
            }}
          >
            <Text style={styles.moreText}>MORE</Text>
            <AntDesign name="right" size={12} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.topItem2}>
          <Text
            style={{
              marginTop: 15,
              fontSize: 15,
              fontFamily: "Poppins-SemiBold",
              color: levelItem.name === "Lollipop Level" ? "#000" : "lightgray",
              marginBottom: 10,
            }}
          >
            {levelItem.info}
          </Text>
        </View>
      </View>
      {levelItem.name === "Lollipop Level" ? (
        // 현재 지금은 Lollipop Level 인 것만 show
        <SafeAreaView nestedScrollEnabled={true} style={{ width: "100%" }}>
          <FlatList
            numColumns={1}
            key={"_"}
            style={styles.classListContainer}
            horizontal={true}
            keyExtractor={(item) => String(item.course_id)}
            data={courseList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20
            }}
            renderItem={({ item }) => (
              <Class
                navigation={navigation}
                classInfo={item}
                isShowAll={isShowAll}
                maintitle="Lollipop Level"
                isMain={isMain}
              />
            )}
          ></FlatList>
        </SafeAreaView>
      ) : (
        // Coming Soon
        <Image
          style={styles.comingSoonContainer}
          source={{
            uri: "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1673498494106.coming_soon.png"
          }}
        ></Image>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  courseContainer: {
    marginTop: 40,
    width: Dimensions.get("window").width,
  },
  topContainer: {
    width: "90%",
    flexDirection: "column",
    marginLeft: 20,
  },

  topItem1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  topItem2: {
    // width: "20%",
    flexDirection: "row",
  },
  title: {
    fontSize: 25,
    fontFamily: "Poppins-SemiBold",
  },
  secondTitle: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
  },

  classListContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.45,
  },

  moreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreText: {
    fontSize: 10,
    marginTop: 2,
    marginLeft: 10,
    fontFamily: "Poppins-Regular",
    color: "#807F82",
  },
  comingSoonContainer: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.35,
  },
});

export default Course;
