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
  getAllQuizs,
} from "../modules/NetworkFunction";
import AuthContext from "../contexts/AuthContext";

import { useIsFocused } from '@react-navigation/native';

const ClassRoom = ({ route, navigation }) => {
  // 객체 형태로 저장
  // key: 코스이름
  // value: 코스에 해당하는 수업 리스트

  
  const [purchasedCourseList, setPurchasedCourseList] = useState([]);
  const [classList, setClassList] = useState([]);
  const { authState } = React.useContext(AuthContext);
  const [userId, setUserId] = useState(authState.userId);
  // const [userId, setUserId] = useState(17);


  const [isPurchasedCourseListLoaded, setIsPurchasedCourseListLoaded] =
    useState(false);

  const [isClassListLoaded, setIsClassListLoaded] = useState(false);
  const [text, setText] = useState("");

  const isFocused = useIsFocused(); // isFoucused를 통해 화면이 focus 되었을 때 useEffect 실행

  const [quizList, setQuizList] = useState([]); // 맞춘 갯수 / 총 갯수
  const [isQuizListLoaded, setIsQuizListLoaded] = useState(false);

  useState(false);

  useEffect(() => {
    
    console.log("authState.userId"); //

    console.log("user id"); //
    console.log(authState.userId);
    // setUserId(authState.userId);
        getAllPurchasedCoursesByUserId(
          { userId: userId },
          (d) => {
            console.log("purchasedCourse : ", d.data);
            let updatedPurchasedCourseList = [];
            d.data.map((item) => {
              getCourses(
                { },
                (d) => {
                  d.data.map((courseItem) => {
                    if (courseItem.course_id == item.course_id) {
                      updatedPurchasedCourseList.push(courseItem);
                      setPurchasedCourseList([...updatedPurchasedCourseList]);
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
      
      getAllQuizs(() => {},
      (d) => {
        setQuizList(d.data);
        console.log("quizList loaded");
      }, setIsQuizListLoaded, (e) => {console.log(e)}
      )
    
  }, [isFocused]);

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
            <Lesson navigation={navigation} lessonInfo={item} quizList={quizList}/>
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
