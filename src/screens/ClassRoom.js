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
import {
  getAllPurchasedCoursesByUserId,
  getCourses,
} from "../modules/NetworkFunction";
import AuthContext from "../contexts/AuthContext";

const ClassRoom = ({ navigation }) => {
  // 객체 형태로 저장
  // key: 코스이름
  // value: 코스에 해당하는 수업 리스트

  const [purchasedCourseList, setPurchasedCourseList] = useState([]);
  const [classList, setClassList] = useState([]);
  const { authState } = React.useContext(AuthContext);

  const [isPurchasedCourseListLoaded, setIsPurchasedCourseListLoaded] =
    useState(false);

  const [isClassListLoaded, setIsClassListLoaded] = useState(false);
  const [text, setText] = useState("");

  useState(false);

  useEffect(() => {
    

    console.log("user id"); //
    console.log(authState.userId);

    if (!isPurchasedCourseListLoaded) {
      getAllPurchasedCoursesByUserId(
        { userId: 13 },
        (d) => {
          console.log("purchasedCourse : ", d.data);
          d.data.map((item) => {
            let purchasedCourse;
            getCourses(
              { },
              (d) => {
                d.data.map((courseItem) => {
                  if (courseItem.course_id === item.course_id) {
                    purchasedCourse = courseItem;
                    console.log("purchasedCourse : ", purchasedCourse);
                    setPurchasedCourseList((prev) => [...prev, purchasedCourse]);
                  }
                })
                
              },
              () => {},
              (e) => {
                console.log(e);
              }
            );
          });
        },
        setIsPurchasedCourseListLoaded,
        (e) => {
          console.log(e);
        }
      );
    }
  }, [authState.userId, isPurchasedCourseListLoaded]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My ClassRoom</Text>

      </View>
      <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
      {purchasedCourseList.length === 0 ? (
        <Text style={{fontFamily: 'Poppins-Regular'}}>There are no purchased courses.</Text>
      ) : (  <SafeAreaView nestedScrollEnabled={true}>
        <FlatList
          numColumns={1}
          key={"_"}
          style={styles.classListContainer}
          horizontal={false}
          keyExtractor={(item) => String(item.id)}
          data={purchasedCourseList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Lesson navigation={navigation} lessonInfo={item} />
          )}
        ></FlatList>
      </SafeAreaView>)}
      </View>
     

      
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
