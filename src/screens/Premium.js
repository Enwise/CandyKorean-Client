import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import * as Progress from "react-native-progress";

import PremiumEnter from "../assets/icons/PremiumEnter";
import TutorList from "../components/TutorList";
import GradientButton from "../components/GradientButton";
import AuthContext from "../contexts/AuthContext";
import {
  getPurchasedCoursesByUserId,
  getClassesByCourseId,
  getCourseById,
  getPremiumCourses,
  getPremiumLearnedClasses,
  getAllAssistants,
  getLearnedClassesByUserId,
} from "../modules/NetworkFunction";
import { useFocusEffect } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const Premium = ({ navigation }) => {
  const { authState } = React.useContext(AuthContext);
  const [purchasedCourse, setPurchasedCourse] = React.useState([]);
  const [assistants, setAssistants] = React.useState([]);
  // tutor가 강사, assistant가 튜터(조교)
  // 튜터링은 강사가 아닌 튜터(조교)가 진행
  useFocusEffect(
    React.useCallback(() => {
      // 튜터(조교) 리스트 가져오기
      const getTutor = async () => {
        await getAllAssistants(
          {},
          (d) => {
            setAssistants(d.data);
          },
          () => {},
          (e) => {
            console.log(e);
          }
        );
      };

      // 구매한 프리미엄 코스 가져오기
      const getPremiumCourse = async () => {
        let purchased_course = [];
        await getPurchasedCoursesByUserId(
          { userId: authState.userId },
          (d) => {
            purchased_course = d.data.filter((item) => {
              return item.is_premium;
            });
          },
          () => {},
          (e) => {
            console.log(e);
          }
        );

        // 구매한 프리미엄 코스의 클래스 정보 가져오기
        const courses = await Promise.all(
          purchased_course.map(async (course) => {
            let learned = [];
            await getClassesByCourseId(
              { id: course.course_id },
              (d) => {
                // is_metaverse가 true인 클래스id 가져오기
                course.class_id = d.data
                  .filter((item) => item.is_metaverse && item.unit != 0)
                  .map((c) => c.class_id);
              },
              () => {},
              (e) => {
                console.log(e);
              }
            );

            // 튜터링 받은 클래스 정보 가져오기
            await getLearnedClassesByUserId(
              { userId: authState.userId },
              (d) => {
                course.learned_class = d.data.filter((item) =>
                  course.class_id.includes(item.class_id)
                );
              },
              () => {},
              (e) => {
                console.log(e);
              }
            );

            // await getPremiumLearnedClasses(
            //   {},
            //   (d) => {
            //     d.data.map((item) => {
            //       if (
            //         course.class_id.includes(item.class_id) &&
            //         item.user_id == authState.userId
            //       ) {
            //         learned.push({
            //           // 데이터 생성 날짜를 튜터링 날짜로 설정
            //           date: item.date_created,
            //           tutor_id: course.tutor_id,
            //         });
            //       }
            //     });
            //     course.learned_class = learned;
            //     course.learned_count = learned.length;
            //   },
            //   () => {},
            //   (e) => {
            //     console.log(e);
            //   }
            // );
            return course;
          })
        );
        setPurchasedCourse(courses);
      };

      getTutor();
      getPremiumCourse();
    }, [])
  );

  const PremiumCourse = purchasedCourse.map((course, index) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate("Tutoring", {
            course: course,
            tutors: assistants,
            userId: authState.userId,
          });
        }}
        style={{ marginBottom: 42 }}
      >
        <View style={styles.courseContainer}>
          <View style={{ paddingVertical: 15 }}>
            <Image
              source={require("../assets/img/gather_town_ex.png")}
              style={styles.img}
            />
          </View>

          <View style={styles.bottom}>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                color: "white",
                fontSize: 16,
              }}
            >
              {course.name}
            </Text>
            <PremiumEnter />
          </View>
        </View>
        <View style={styles.progress}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>Number of times tutored</Text>
            <Text style={styles.progressText}>
              {course.learned_class.length}/{10}
            </Text>
          </View>
          <Progress.Bar
            progress={course.learned_class.length / 10}
            height={7}
            color={"#A160E2"}
            unfilledColor={"#F1EFF4"}
            width={windowWidth - 40}
            borderColor={"#F1EFF4"}
          />
        </View>
      </TouchableOpacity>
    );
  });
  return (
    <View style={styles.container}>
      {purchasedCourse.length === 0 ? (
        <>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.headerText}>
              Meet your tutor directly{"\n"}with{" "}
              <Text style={[styles.headerText, { color: "#A160E2" }]}>
                Premium Course!
              </Text>
            </Text>
          </View>
          <View>
            <View style={{ marginTop: 160, marginBottom: 42 }}>
              <Text style={[styles.text, { color: "#807F82", marginLeft: 20 }]}>
                Meet the tutor in the metaverse space{" "}
              </Text>
              <TutorList tutor={assistants} />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <GradientButton
                title="BUY NOW"
                disabled={false}
                onPress={() => navigation.navigate("Class")}
              />
            </View>
          </View>
        </>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Premium Course</Text>
            <Text style={styles.text}>
              Meet the tutor in the metaverse space
            </Text>
          </View>
          {PremiumCourse}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight + 12,
    // paddingHorizontal: 20,
  },
  header: {
    marginBottom: 42,
  },
  headerText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#B8B5BC",
  },
  courseContainer: {
    backgroundColor: "#E6E3EA",
    borderRadius: 9,
    marginBottom: 16,
  },
  img: {
    alignSelf: "center",
  },
  bottom: {
    flexDirection: "row",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    backgroundColor: "rgba(68, 67, 69, 0.7)",
    paddingVertical: 7,
    paddingStart: 17,
    justifyContent: "space-between",
    paddingEnd: 9,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  progressText: {
    fontFamily: "Poppins-Medium",
    color: "#A160E2",
    fontSize: 10,
  },
});

export default Premium;
