import React, { useEffect, useState } from "react";
import {
    Image,
    Platform, ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Dimensions } from "react-native";
import BackButton from "../components/BackButton";
import { Calendar } from "react-native-calendars";
import Plotly from "react-native-plotly";
import { LineChart } from "react-native-chart-kit";
import { VERTICAL } from "react-native/Libraries/Components/ScrollView/ScrollViewContext";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import AuthContext from "../contexts/AuthContext";
import {
    getCourses,
    getLevels,
    getUserById,
    getSolvedQuizsByUser, getAllAttendanceByUserId,
} from "../modules/NetworkFunction";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const MyPage = ({ navigation }) => {
  const { signOut, authState } = React.useContext(AuthContext);
  const Width = Dimensions.get("window").width; //스크린 너비 초기화
  const Height = Dimensions.get("window").height; //스크린 높이 초기화
  const markedDates = {
    "2022-11-26": { selected: true },
    "2022-11-27": { marked: true },
    "2022-11-28": { marked: true },
    "2022-11-30": { selected: true },
  };
  const 데이터이름 = ["Score", "KDA", "Damage", "Vision", "Suvival", "Growth"];
  const 유저데이터 = [30, 24, 50, 23, 50, 34];
  const 평균데이터 = [100, 100, 100, 100, 100, 100, 100];
  const data = [
    {
      name: "avgGroup",
      type: "scatterpolar",
      r: 평균데이터,
      theta: [...데이터이름, 데이터이름[0]],
      fill: "none",
      mode: "lines", // 각 데이터 위에 점이 안찍히고 선으로만 이루어지게 한다!
      line: {
        color: "green",
      },
    },
    {
      name: "userGroup",
      type: "scatterpolar",
      r: [...유저데이터, 유저데이터[0]],
      theta: [...데이터이름, 데이터이름[0]],
      fill: "none",
      mode: "lines",
      line: {
        color: "blue",
      },
    },
  ];

  const layout = {
    height: 320, // 원하는 크기로 height를 지정해주었다!
    margin: {
      // chart에는 기본값으로 margin이 적용되어 있는데, 우리가 흔히 아는 top, bottom, left와는 좀 다르다. 0으로 모두 초기화 해주었다.
      l: 0,
      r: 0,
      t: 20,
      d: 0,
    },
    polar: {
      radialaxis: {
        // 방사축 꾸미기 시작!
        visible: true,
        range: [0, 200],
        color: "#d9d9d9", // 방사축의 선 색깔
        showticklabels: false, // @1-1
        showline: false, // @1-2
        ticklen: 0, // @1-3
      },
      angularaxis: {
        // 각축 꾸미기 시작!
        rotation: 210, // 차트 회전율! (KDA가 제일 위로 올 수 있도록 돌려주었당)
        color: "#eee", // 각축의 선 색깔
        ticklen: 0, // @2-1
        tickfont: {
          // @2-2
          color: "#888",
          size: 13,
        },
      },
      gridshape: "linear", // @3
    },
    showlegend: false, // @4
  };

  // getUserById

  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [user, setUser] = React.useState(null);

  // getSolvedQuizs

  const [solvedQuizList, setSolvedQuizList] = useState([]);
  const [isSolvedQuizListLoaded, setIsSolvedQuizListLoaded] = useState(false);
  const [isAnalysisObjectLoaded, setIsAnalysisObjectLoaded] = useState(false);
  const [userId, setUserId] = useState(authState.userId);
  const [analysisObject, setAnalysisObject] = useState({
    Writing: 0,
    Vocabulary: 0,
    Grammar: 0,
    Comprehension: 0,
  });
  const isFocused = useIsFocused();
  

  useFocusEffect(
    React.useCallback(() => {
    setAnalysisObject({
      Writing: 0,
      Vocabulary: 0,
      Grammar: 0,
      Comprehension: 0,
    })
  }, []))

 
  useFocusEffect(
    React.useCallback(
    () => {
      console.log("enter get solved quiz foucs effect")
      
      
      getSolvedQuizsByUser(
        {
          user_id: authState.userId,
        },
        (d) => {
          
          // console.log(d);
          let updatedSolvedQuizList = d.data.filter(
            (item) => item.is_correct === true
          );
          setSolvedQuizList((prev) => [...prev, ...updatedSolvedQuizList]);

          // console.log("solvedQuizList", solvedQuizList);
        },
        setIsSolvedQuizListLoaded,
        (e) => {
          console.log(e);
        }
      );
  }, []));


  useFocusEffect(
    React.useCallback(
    () => {
    console.log('enter updated analysisObject useEffect');
    console.log('solvedQuizList', solvedQuizList[0], solvedQuizList[1]);
    setAnalysisObject({
      Writing: 0,
      Vocabulary: 0,
      Grammar: 0,
      Comprehension: 0,
    })
    let updatedAnalysisObject = {
      Writing: 0,
      Vocabulary: 0,
      Grammar: 0,
      Comprehension: 0,
    };
    solvedQuizList.map((item) => {
      if (item.quiz.style === "arrange" || item.quiz.style === "sentence") {
        // Writing
        // setAnalysisObject((prev) => ({...prev, "Writing" : prev["Writing"] + 1}))
        updatedAnalysisObject["Writing"] += 1;
      } else if (item.quiz.style === "word") {
        // Vocabulary
        // setAnalysisObject((prev) => ({...prev, "Vocabulary" : prev["Vocabulary"] + 1}))
        updatedAnalysisObject["Vocabulary"] += 1;

        // analysisObject['Vocabulary'] += 1
        // Grammar
        // setAnalysisObject((prev) => ({...prev, "Grammar" : prev["Grammar"] + 1}))
        updatedAnalysisObject["Grammar"] += 1;

        // analysisObject['Grammar'] += 1
      } else if (item.quiz.style === "dialog") {
        // Comprehension
        // setAnalysisObject((prev) => ({...prev, "Comprehension" : prev["Comprehension"] + 1}))
        updatedAnalysisObject["Comprehension"] += 1;
      }

    });
    setAnalysisObject(updatedAnalysisObject);
    console.log("analysisObject", analysisObject);
  }, [isSolvedQuizListLoaded]));

  useFocusEffect(
    React.useCallback(() => {
      getUserById(
        {userId: authState.userId},
        (d) => {
          // console.log(d);
          console.log("enter focus effect");
          console.log(d.data);
          setUser(d.data);
        },
        () => {},
        (e) => {
          console.log("getUserById error");
        }
      );
    }, [])
  );

    const [calendarData, setcalendarData] = useState();

  useEffect(()=>{
      getAllAttendanceByUserId(
          authState.userId,
          (d) => {
              // console.log(d.data);
              let tmpArr = [];
              d.data.map((item,idx)=>{
                  const year = new Date(item.data_created).getFullYear();
                  const month = new Date(item.data_created).getMonth() + 1;
                  const date = new Date(item.data_created).getDate();
                  tmpArr.push(`${year}-${month > 9 ? month : '0' + month}-${date > 9 ? date : '0' + date}`);
                  // tmpArr.push(item.data_created.split("T")[0]);
                  // tmpArr.push(`${item.data_created.split("T")[0]}`: { color: "#70d7c7", textColor: "white" });



              })

              let obj = tmpArr.reduce(
                  (c, v) =>
                      Object.assign(c, {
                          [v]: { color: "#70d7c7", textColor: "white" },
                      }),
                  {},
              );
              setcalendarData(obj);
              // console.log(tmpArr);
              // setcalendarData(tmpArr);
          },
          () => {},
          (e) => {
              console.log("getAllAttendanceByUserId error");
          }
      );
  },[])


  const [lollipopCourseList, setLollipopCourseList] = useState([]);
  const [cottonCandyCourseList, setCottonCandyCourseList] = useState([]);
  const [mintCandyCourseList, setMintCandyCourseList] = useState([]);

  const [isCourseListLoaded, setIsCourseListLoaded] = useState(false);

  useEffect(() => {
    console.log("Course useEffect");
    if (!isCourseListLoaded) {
      getCourses(
        {},
        (d) => {
          // console.log("getCourse data: ", d.data);
          let updatedLollipopCourseList = [...lollipopCourseList];
          let updatedCottonCandyCourseList = [...cottonCandyCourseList];
          let updatedMintCandyCourseList = [...mintCandyCourseList];

          d.data.map((item) => {
            // console.log(item);
            if (item.level.name === "Lollipop Level") {
              // if (
              //   item.name === "Yoojin Teacher Course" ||
              //   item.name === "Seongyeop Teacher Course" ||
              //   item.name === "After Like Course"
              // ) {
              //   // course_id : 3
              //   // class_id: 14(ot) 3, 5~13
              //   if (!isTutorLoaded) {
              //     getTutorById(
              //       {
              //         tutor_id: item.tutor_id,
              //       },
              //       (d) => {
              //         console.log(d);
              //         item["tutor"] = { ...d.data };
              //         updatedLollipopCourseList.push(item);
              //       },
              //       setIsTutorLoaded,
              //       (e) => {
              //         console.log(e);
              //       }
              //     );
              //   }
              // }
              updatedLollipopCourseList.push(item);
            } else if (item.level.name === "Cotton Candy Level") {
              updatedCottonCandyCourseList.push(item);
            } else if (item.level.name === "Mint Candy Level") {
              updatedMintCandyCourseList.push(item);
            }
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
  }, []);

 


  const getTotalScore = () => {
    let totalScore = 0;

    Object.keys(analysisObject).map((key) => {
      totalScore += analysisObject[key];
    });
    return totalScore;
  };

  

  return (
      <ScrollView
          contentContainerStyle={{
              backgroundColor: "white",
          }}
          showsVerticalScrollIndicator={false}
      >
          <View style={styles.container}>
              <View
                  style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "90%",
                      alignItems: "center",
                      marginBottom: 20,
                  }}
              >
                  <View>
                      <Text style={{ fontSize: 20, fontWeight: "400", fontFamily: "Poppins-SemiBold" }}>
                          반가워요. {user?.name}!
                      </Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center" }}>
                      <TouchableOpacity
                          onPress={() => {
                              navigation.navigate("Setting");
                          }}
                      >
                          <View
                              style={{ width: 24, height: 48, display:"flex", justifyContent:"center", alignItems:"center" }}
                          >
                              <Image
                                  source={require("../assets/img/setting-icon.png")}
                                  style={{ width: 24, height: 24 }}
                              />
                          </View>

                      </TouchableOpacity>
                      <View style={{ width: 8 }} />
                      <TouchableOpacity onPress={signOut}>
                          {/*, border:"1px solid #B8B5BC",*/}
                          <View
                              style={{
                                  width: 50,
                                  height: 20,
                                  borderRadius: 5,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderColor:"#B8B5BC",
                                  borderWidth: 1
                              }}
                          >
                              <Text style={{ fontSize: 10, color: "#B8B5BC", fontFamily:"Poppins-Regular" }}>Log out</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
              </View>
              <View
                  style={{
                      width: "90%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent:"space-between"
                  }}
                  
              >
                  
                  <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate("ChangeProfile");
                  }}>
                  {user?.img_url === "" || user?.img_url === undefined ? <Image
                          source={require("../assets/img/mypage-default-image.png")}
                          style={{ width: 110, height: 110, borderRadius: 55 }}
                          
                      />  :<Image
                      source={{
                          uri: `${user?.img_url}`
                      }}
                      style={{ width: 110, height: 110, borderRadius: 55 }}
                      
                  />  }
                  </TouchableOpacity>
                      
                      
                      
                  
                  <View
                      style={{
                          marginLeft: 20,
                          display: "flex",
                          flexDirection: "column",
                          width: "60%",
                      }}
                  >
                      <Text style={{ fontSize: 16, fontWeight: "600", color: "#444345" }}>
                          {user?.name}
                      </Text>
                      <View style={{ height: 7 }} />
                      <TouchableOpacity
                          onPress={() => {
                              navigation.navigate("CompletedPurchases");
                          }}
                          style={{
                              backgroundColor: "#807F82",
                              borderRadius: 9,
                              width: "100%",
                              height: 36,
                              justifyContent: "center",
                              paddingLeft: 20,
                          }}
                      >
                          <Text style={{ fontSize: 14, fontWeight: "500", color: "#FFFFFF", fontFamily:"Poppins-Medium" }}>
                              My purchases
                          </Text>
                      </TouchableOpacity>
                      <View style={{ height: 2 }} />
                      <TouchableOpacity
                          onPress={() => {
                              navigation.navigate("MyWishList", { isAdd: false });
                          }}
                          style={{
                              backgroundColor: "#807F82",
                              borderRadius: 9,
                              width: "100%",
                              height: 36,
                              paddingLeft: 20,
                              flexDirection: "row",
                              alignItems: "center",
                          }}
                      >
                          <AntDesign name="heart" size={15} color="#fff" />
                          <Text
                              style={{
                                  marginLeft: 10,
                                  fontSize: 14,
                                  fontWeight: "500",
                                  color: "#FFFFFF",
                                  fontFamily:"Poppins-Medium"
                              }}
                          >
                              Wish List
                          </Text>
                      </TouchableOpacity>
                  </View>
              </View>

              <View style={{ width: "90%", marginTop: 20 }}>
                  <Calendar
                      style={styles.calendar}
                      theme={{
                          arrowColor: "#B8B5BC",
                          monthTextColor: "#807F82",
                          textMonthFontFamily: "Poppins-Medium",
                          "stylesheet.calendar.header": {
                              dayTextAtIndex0: {
                                  color: "#E2608F",
                              },
                              dayHeader: {
                                  color: "#807F82",
                                  fontFamily: "Poppins-Medium",
                                  fontSize: 12,
                                  width: 32,
                                  textAlign: "center",
                                  marginBottom: 5,
                              },
                          },
                          "stylesheet.calendar.main": {
                              week: {
                                  marginVertical: 4,
                                  flexDirection: "row",
                                  justifyContent: "space-around",
                              },
                          },
                      }}
                      dayComponent={({ date, state, marking }) => {
                          return (
                              <LinearGradient
                                  colors={
                                      marking ? ["#84E9FF", "#C284FF"] : ["#FFFFFF", "#ffffff"]
                                  }
                                  locations={[0, 1]}
                                  start={[0.025, 0.5]}
                                  end={[0.975, 0.5]}
                                  style={{
                                      width: 23,
                                      height: 23,
                                      borderRadius: 23 / 2,
                                      justifyContent: "center",
                                      alignItems: "center",
                                  }}
                              >
                                  <Text
                                      style={{
                                          fontFamily: "Poppins-Regular",
                                          fontSize: 12,
                                          textAlign: "center",
                                          color:
                                              state === "disabled"
                                                  ? "#E6E3EA"
                                                  : marking
                                                      ? "white"
                                                      : "#B8B5BC",
                                      }}
                                  >
                                      {date.day}
                                  </Text>
                              </LinearGradient>
                          );
                      }}
                      markingType={"custom"}
                      markedDates={
                          // {
                          //     "2022-12-15": { marked: true, dotColor: "#50cebb" },
                          //     "2022-11-16": { marked: true, dotColor: "#50cebb" },
                          //     "2022-11-17": {
                          //         startingDay: true,
                          //         color: "#FFFFFF",
                          //         textColor: "white",
                          //     },
                          //     "2022-11-18": { color: "#70d7c7", textColor: "white" },
                          //     "2022-11-19": {
                          //         color: "#70d7c7",
                          //         textColor: "white",
                          //         marked: true,
                          //         dotColor: "white",
                          //     },
                          //     "2022-11-20": { color: "#70d7c7", textColor: "white" },
                          //     "2022-11-21": {
                          //         endingDay: true,
                          //         color: "#50cebb",
                          //         textColor: "white",
                          //     },
                          //     "2022-12-20": { color: "#70d7c7", textColor: "white" },
                          //     "2022-12-21": { color: "#70d7c7", textColor: "white" },
                          //     "2022-12-22": { color: "#000000", textColor: "white" },
                          //     calendarData
                          // }
                          calendarData
                      }
                  />
              </View>

              <View
                  style={{
                      width: "90%",
                      display: "flex",
                      flexDirection: "column",
                      // borderTop:"1px solid #F1EFF4"
                  }}
              >
                  <Text
                      style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#444345",
                          marginTop: 15,
                          fontFamily:"Poppins-SemiBold"
                      }}
                  >
                      Analysis
                  </Text>

                  <View
                      style={{
                          width: Dimensions.get("window").width - 40,
                          height: Dimensions.get("window").height * 0.15,
                          marginTop: 15,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                      }}
                  >
                      <View style={styles.analysisLeftContainer}>
                          {

                              Object.entries(analysisObject).map((item, index) => {
                                  const [key, value] = item;
                                  return (
                                      <View key={key} style={styles.analysisRowContainer}>
                                          <Text style={styles.analysisText}>{key}</Text>
                                          <View style={styles.analysisBarContainer}>
                                              {value === 0 ? (
                                                  <Text style={{ color: "#A160E2", marginLeft:11}}>-</Text>
                                              ) : (
                                                  <View
                                                      style={{
                                                          width: `${value + 10}%`,
                                                          height: "95%",
                                                          backgroundColor: "#A160E2",
                                                          borderRadius: 50,
                                                          flex: 1,
                                                          flexDirection: "row",
                                                          justifyContent: "flex-end",
                                                          paddingRight: 10,
                                                          alignItems: "center",
                                                      }}
                                                  >
                                                      <Text
                                                          style={{
                                                              fontSize: 10,
                                                              fontFamily: "Poppins-Regular",
                                                              color: "#fff",
                                                          }}
                                                      >
                                                          {value}
                                                      </Text>
                                                  </View>
                                              )}
                                          </View>
                                      </View>
                                  );
                              })}
                      </View>

                      <View style={styles.analysisRightContainer}>
                          <Text
                              style={{
                                  fontSize: 11,
                                  fontWeight: "500",
                                  color: "#FFFFFF",
                                  marginTop: 10,
                                  fontFamily:"Poppins-Medium"
                              }}
                          >
                              Total{"\n"}score
                          </Text>
                          <View
                              style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 20,
                                  backgroundColor: "#FDFDFD",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                              }}
                          >
                              <Text
                                  style={{
                                      fontSize: 18,
                                      fontWeight: "600",
                                      color: "#A160E2",
                                      fontFamily:"Poppins-SemiBold"
                                  }}
                              >
                                  {getTotalScore()}
                              </Text>
                          </View>
                      </View>
                  </View>

                  <TouchableOpacity
                      onPress={() => {
                          // navigation.navigate("ClassMain");
                          navigation.navigate("ClassMore", {
                              title: "Lollipop Level",
                              courseList: lollipopCourseList,
                          });
                      }}
                  >
                      <View
                          style={{
                              marginTop: 15,
                              borderWidth: 1,
                              borderColor: "#B8B5BC",
                              borderRadius: 50,
                              height: 24,
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              paddingLeft: 17,
                              paddingRight: 10,
                              flexDirection: "row",
                          }}
                      >
                          <Text
                              style={{
                                  fontSize: 10,
                                  fontWeight: "500",
                                  color: "#B8B5BC",
                                  fontFamily:"Poppins-Medium"
                              }}
                          >
                              How to improve your Korean Level
                          </Text>
                          <Image source={require("../assets/img/mypage-right-icon.png")} />
                      </View>
                  </TouchableOpacity>
              </View>
          </View>
      </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingTop: "15%",
    paddingBottom: "15%",
    backgroundColor: "#FDFDFD",
    marginBottom: 50,
  },
  calendar: {
    padding: 10,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 10,
        shadowColor: "rgba(0,0,0,0.07)",
      },
      android: {
        elevation: 2,
      },
    }),
    marginBottom: 20,
  },
  analysisLeftContainer: {
    width: "70%",
  },
  analysisRightContainer: {
    marginLeft: 22,
    backgroundColor: "#A160E2",
    borderRadius: 13,
    width: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 15,
  },
  analysisRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    alignItems: "center",
    height: 15,
  },
  analysisText: {
    fontSize: 10,
    fontFamily: "Poppins-Medium",
    color: "#807F82",
    width: "40%",
  },
  analysisBarContainer: {
    width: "65%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#F1EFF4",
    justifyContent: "center",
  },
});

export default MyPage;
