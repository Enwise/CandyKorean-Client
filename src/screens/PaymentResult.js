import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import StudyNowIcon from "../assets/icons/StudyNowIcon";
import UnitIcon from "../assets/icons/UnitIcon";

import {
  getCourseById,
  getCourses,
  getAllPurchasedCoursesByUserId,
  getTutorById,
  getLevelById,
} from "../modules/NetworkFunction";

const PaymentResult = ({ navigation, route }) => {

  const [isSuccess, setIsSuccess] = useState(route.params.isSuccess);
  const [itemInfo, setItemInfo] = useState(route.params.itemInfo);
  const [courseList, setCourseList] = useState([]);

  const [level_id, setLevel_id] = useState(0);
  const [isCourseLoaded, setIsCourseLoaded] = useState(false);
  const [isRecommendListLoaded, setIsRecommendListLoaded] = useState(false);

  const [recommendList, setRecommendList] = useState([]);
  const [isTutorLoaded, setIsTutorLoaded] = useState(false);

  const [isPurchasedListLoaded, setIsPurchasedListLoaded] = useState(false);
  const [purchasedList, setPurchasedList] = useState([]);

  const [title, setTitle] = useState("");
  const [isLevelLoaded, setIsLevelLoaded] = useState(false);

  // level 정보 이용해서, 그 level 에 해당하는 class정보들 가져와야함!
  // 맨 밑 Recommend에 보여주기 위해서
  useEffect(() => {
    console.log(itemInfo);

    if (!isCourseLoaded) {
      getCourseById(
        { course_id: itemInfo.course_id },
        (d) => {
          console.log(d.data);
          setLevel_id(d.data.level_id);
        },
        setIsCourseLoaded,
        (e) => {
          console.log(e);
        }
      );
    }

    if (isCourseLoaded && !isPurchasedListLoaded) {
      console.log("--------------------");
      console.log("level_id", level_id);
      console.log("--------------------");
      if (!isLevelLoaded) {
        getLevelById(
          { level_id: level_id },
          (d) => {
            setTitle(d.data.name);
          },
          setIsLevelLoaded,
          (e) => {
            console.log(e);
          }
        );
      }
      getAllPurchasedCoursesByUserId(
        { userId: route.params.user_id },
        (d) => {
          d.data.map((course_item) => {
            setPurchasedList((purchasedList) => [
              ...purchasedList,
              course_item.course_id,
            ]);
          });
        },
        setIsPurchasedListLoaded,
        (e) => {
          console.log(e);
        }
      );
    }

    if (isCourseLoaded && isPurchasedListLoaded && !isRecommendListLoaded) {
      console.log("--------------------");
      console.log("purchasedList", purchasedList);
      console.log("--------------------");

      getCourses(
        () => {},
        (d) => {
          console.log("--------------------");
          console.log("payment result courselist");
          console.log(d.data);
          console.log("--------------------");

          d.data.map((course_item) => {
            // if (
            //   course_item.level.level_id == level_id &&
            //   !purchasedList.includes(course_item.course_id)
            // ) {
            //   console.log("--------------------");
            //   console.log("recommend list making...");
            //   console.log(course_item);
            //   console.log("--------------------");
            //   setRecommendList((recommendList) => [
            //     ...recommendList,
            //     course_item,
            //   ]);
            // }
            if (course_item.level.level_id == level_id) {
              if (
                course_item.name === "Conversational Korean Course" ||
                course_item.name === "Survival Korean Course" ||
                course_item.name === "After Like Course"
              ) {
                // if (!isTutorLoaded) {
                //   getTutorById(
                //     {
                //       tutor_id: course_item.tutor_id,
                //     },
                //     (d) => {
                //       console.log(d);
                //       course_item["tutor"] = { ...d.data };
                      
                //     },
                //     setIsTutorLoaded,
                //     (e) => {
                //       console.log(e);
                //     }
                //   );
                // }
                setCourseList((courseList) => [
                  ...courseList,
                  course_item,
                ]);
              }
            }
            setIsTutorLoaded(false);
          });
        },
        setIsRecommendListLoaded,
        (e) => {
          console.log(e);
        }
      );
    }
    console.log("recommendList", recommendList);
  }, [
    isSuccess,
    isCourseLoaded,
    isPurchasedListLoaded,
    isRecommendListLoaded,
    level_id,
    isLevelLoaded,
    title,
  ]);

  const goToClassMore = () => {
    navigation.navigate("Class", {
      screen: "ClassMore",
      params: {
        courseList: courseList,
        title: title,
      },
    });
  };

  return (
    <View style={styles.container}>
      {isSuccess ? (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Order Completed{"\n"}Thank you for purchasing!
            </Text>
            <TouchableOpacity
              onPress={() => {
                route.params.returnToClass
                  ? navigation.navigate("ClassMain")
                  : navigation.navigate("My");
              }}
            >
              <Ionicons name="ios-close-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.purchasedItemContainer}>
            <Text style={styles.purchasedItemText}>Purchased product</Text>
            <View style={styles.purchasedItem}>
              <Image
                style={styles.purchasedItemImg}
                source={{ uri: itemInfo.tutor.profile_url }}
              ></Image>
              <View style={styles.purchasedItemInfo}>
                <Text style={styles.classNameText}>{itemInfo.name}</Text>
                <View style={styles.categoryAndUnit}>
                  <View style={styles.unitContainer}>
                    <UnitIcon />
                    <Text style={styles.unitText}>
                      {itemInfo.name === "Conversational Korean Course" ||
                      itemInfo.name === "Survival Korean Course" ||
                      itemInfo.name === "After Like Course"
                        ? 10
                        : 0}{" "}
                      Units
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total payment amount</Text>
            <Text style={styles.totalPrice}>$ {itemInfo.price}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ClassRoom");
            }}
          >
            <View style={styles.studyNowBtn}>
              <StudyNowIcon />
              <Text style={styles.studyNowText}>Study now!</Text>
            </View>
          </TouchableOpacity>
          <SafeAreaView style={{ ...styles.recommendContainer }}>
            <View style={styles.recommendTopContainer}>
              <Text style={styles.recommendTitle}>Recommend</Text>
              <TouchableOpacity
                onPress={() => {
                  // Lollipop level의 classList를 넘겨줘야함
                  // navigation.navigate("ClassMore", { title: "Lollipop Level" });
                  goToClassMore();
                }}
              >
                <Text style={styles.recommendMore}>MORE {">"}</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              key={"_"}
              data={courseList}
              style={{
                ...styles.recommendListContainer,
              }}
              // contentContainerStyle={{ flex: 1, flexGrow: 1 }}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.recommendItemShadowContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log("recommendItem", item);
                      navigation.navigate("Class", {
                        screen: "ClassInfo",
                        params: {
                          classInfo: item,
                        },
                      });
                    }}
                  >
                    <View
                      style={{
                        ...styles.recommendItemContainer,
                      }}
                    >
                      <Image
                        style={styles.imageContainer}
                        source={{
                          uri: item.tutor.profile_url,
                        }}
                      ></Image>
                      <View style={styles.recommendItemInfo}>
                        <Text style={styles.recommendItemClassName}>
                          {item.name}
                        </Text>
                        <Text style={styles.recommendItemTeacherName}>
                          {item.tutor.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </SafeAreaView>
        </>
      ) : (
        <View style={styles.paymentFailedTextContainer}>
          <Text style={styles.paymentFailedText}>
            Failed to payment.{"\n"}You may have already bought this course.
            {"\n"}If not, try again.
          </Text>
        </View>
      )}
      {isSuccess ? null : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Payment", { itemInfo: itemInfo });
          }}
        >
          <View style={styles.backToPageBtn}>
            <Text style={styles.backToPageText}>back to page</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  titleContainer: {
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
    width: Dimensions.get("window").width,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    backgroundColor: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#000",
  },
  purchasedItemContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    width: Dimensions.get("window").width,
    height: 150,
  },
  purchasedItem: {
    flexDirection: "row",
    height: "80%",
  },
  purchasedItemImg: {
    marginRight: 15,
    width: "30%",
    height: "80%",
    borderRadius: 10,
  },
  classNameText: {
    fontFamily: "Poppins-Medium",
    color: "#444345",
    fontSize: 14,
  },
  purchasedItemText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#B8B5BC",
    marginBottom: 15,
  },
  categoryAndUnit: {
    flexDirection: "row",
    marginBottom: 10,
  },
  cateogryContainer: {
    borderColor: "#A160E2",
    borderWidth: 1,
    borderRadius: 15,
    height: 20,
    alignItems: "center",
    width: 70,
    marginRight: 5,
    justifyContent: "center",
  },
  categoryText: {
    color: "#807F82",
    fontSize: 12,
  },
  unitContainer: {
    height: 25,
    width: 80,
    position: "relative",
  },
  unitText: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#fff",
    position: "absolute",
    top: 4,
    left: 7,
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#B8B5BC",
  },
  totalContainer: {
    marginTop: 40,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    width: Dimensions.get("window").width * 0.95,
  },
  totalText: { fontFamily: "Poppins-Medium", fontSize: 16, color: "#000" },
  totalPrice: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#A160E2",
  },
  studyNowBtn: {
    width: Dimensions.get("window").width,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
  },
  studyNowText: {
    position: "absolute",
    top: 10,
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#fff",
  },
  recommendContainer: {
    marginTop: 40,
    width: "100%",
    height: Dimensions.get("window").height * 0.35,
    paddingLeft: 10,
  },

  recommendTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#807F82",
  },
  recommendTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
  },
  recommendMore: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#807F82",
  },
  recommendListContainer: {
    width: Dimensions.get("window").width * 0.95,
    height: "100%",
    paddingLeft: 10,
  },
  recommendItemShadowContainer: {
    width: Dimensions.get("window").width * 0.35,
    height: "85%",
    marginRight: 20,
    borderRadius: 10,

    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
      },

      android: {
        shadowColor: "gray",
        elevation: 3,
      },
    }),
  },
  recommendItemContainer: {
    alignItems: "center",
    borderRadius: 10,
    zIndex: 3,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    height: "70%",
    backgroundColor: "#fff",
  },
  recommendItemInfo: {
    width: "95%",
    height: "30%",
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#fff",
  },
  recommendItemTeacherName: {
    color: "#807F82",
    fontSize: 12,
    backgroundColor: "#fff",
  },
  paymentFailedTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.8,
    backgroundColor: "#fff",
  },
  paymentFailedText: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#000",
  },
  backToPageBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A160E2",
    borderRadius: 30,
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.07,
  },
  backToPageText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#FDFDFD",
  },
});

export default PaymentResult;
