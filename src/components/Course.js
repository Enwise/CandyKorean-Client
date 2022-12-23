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
  // getCourse -> courseList 가져온 다음, 각 레벨에 따라서 분류
  const [lollipopCourseList, setLollipopCourseList] = useState([]);
  const [cottonCandyCourseList, setCottonCandyCourseList] = useState([]);
  const [mintCandyCourseList, setMintCandyCourseList] = useState([]);

  const [isCourseListLoaded, setIsCourseListLoaded] = useState(false);

  const [isTutorLoaded, setIsTutorLoaded] = useState(false);

  // getCourses result
  //    "data": [
  //     {
  //         "course_id": 1,
  //         "name": "test3",
  //         "price": 10000,
  //         "info": "info",
  //         "category": "기",
  //         "view_count": 2,
  //         "date_created": "2022-11-22T15:51:09.974Z",
  //         "date_updated": "2022-11-22T15:51:09.974Z",
  //         "level": {
  //             "level_id": 1,
  //             "name": "롤리팝",
  //             "enabled": false,
  //             "info": "test"
  //         }
  //     }
  // ],

  useEffect(() => {
    console.log(levelItem);

    if (!isCourseListLoaded) {
      getCourses(
        {},
        (d) => {
          console.log("getCourse data: ", d.data);
          let updatedLollipopCourseList = [...lollipopCourseList];
          let updatedCottonCandyCourseList = [...cottonCandyCourseList];
          let updatedMintCandyCourseList = [...mintCandyCourseList];

          d.data.map((item) => {
            // console.log(item);
            if (item.level.name === "Lollipop Level") {
              if (
                item.name === "Yoojin Teacher Course" ||
                item.name === "Seongyeop Teacher Course" ||
                item.name === "After Like Course"
              ) {
                // course_id : 3
                // class_id: 14(ot) 3, 5~13
                if (!isTutorLoaded) {
                  getTutorById(
                    {
                      tutor_id: item.tutor_id,
                    },
                    (d) => {
                      console.log(d);
                      item["tutor"] = { ...d.data };
                      updatedLollipopCourseList.push(item);
                    },
                    setIsTutorLoaded,
                    (e) => {
                      console.log(e);
                    }
                  );
                }
              }
            } else if (item.level.name === "Cotton Candy Level") {
              updatedCottonCandyCourseList.push(item);
            } else if (item.level.name === "Mint Candy Level") {
              updatedMintCandyCourseList.push(item);
            }
            setIsTutorLoaded(false);
          });
          setLollipopCourseList(updatedLollipopCourseList);
          setCottonCandyCourseList(updatedCottonCandyCourseList);
          setMintCandyCourseList(updatedMintCandyCourseList);
          console.log("lollipopCourseList");
          console.log(lollipopCourseList);
        },

        setIsCourseListLoaded,
        (e) => {
          console.log(e);
        }
      );
    }
  }, [isCourseListLoaded, isTutorLoaded]);

  const handleShowAllClass = () => {
    {
      title === "Lollipop Level"
        ? navigation.navigate("ClassMore", {
            title: title,
            courseList: lollipopCourseList,
          })
        : null;
    }
  };

  return (
    <View style={styles.courseContainer}>
      <View style={styles.topContainer}>
        <View style={styles.topItem1}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.secondTitle}>{levelItem.info}</Text>
        </View>
        <View style={styles.topItem2}>
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
      </View>
      {title === "Lollipop Level" ? (
        <SafeAreaView nestedScrollEnabled={true} style={{ width: "100%" }}>
          <FlatList
            numColumns={1}
            key={"_"}
            style={styles.classListContainer}
            horizontal={true}
            keyExtractor={(levelItem) => String(levelItem.level_id)}
            data={lollipopCourseList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Class
                key={item.course_id}
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
          style={styles.commingSoonContainer}
          source={require("../assets/img/EmptyLevel.png")}
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
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },

  topItem1: {
    width: "80%",
  },

  topItem2: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "flex-end",
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
    paddingLeft: 5,
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
    width: 300,
  },
});

export default Course;
