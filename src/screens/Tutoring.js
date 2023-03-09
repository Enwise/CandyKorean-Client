import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import Tutor from "../components/Tutor";
import AlertDialog from "../components/AlertDialog";
import BackButton from "../components/BackButton";

import TutoringHistory from "../components/TutoringHistory";
import {
  createLearnedClass,
  getAssistantByCourseId,
  getClassesByCourseId,
  updateLearnedClass,
} from "../modules/NetworkFunction";
import { useFocusEffect } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const Tutoring = ({ navigation, route }) => {
  const { tutors, userId, course } = route.params;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedTutor, setSelectedTutor] = React.useState(null);
  const [learnedClass, setLearnedClass] = React.useState(course.learned_class);
  const [classIdList, setClassIdList] = React.useState(null);
  const [assistants, setAssistants] = React.useState(null);
  useFocusEffect(
    React.useCallback(() => {
      // 튜터링 클래스id 가져오기(10개)
      const getClasses = async () => {
        await getClassesByCourseId(
          { id: course.course_id },
          (d) => {
            const classIdList = d.data
              .filter((item) => item.is_metaverse)
              .map((item) => item.class_id);
            setClassIdList(classIdList);
          },
          () => {},
          (e) => {
            console.log(e);
          }
        );
      };
      const getAssistants = async () => {
        await getAssistantByCourseId(
          { id: course.course_id },
          (d) => {
            setAssistants(d.data[0].assistants);
          },
          () => {},
          (e) => {
            console.log(e);
          }
        );
      };
      getClasses();
      getAssistants();
    }, [])
  );

  const handleTutoring = async () => {
    /*
    tutored 버튼 클릭하면 createLearnedClass
    DB에 튜터링 클래스 10개 미리 생성해놓고, 튜터링 받을 때마다 그 클래스의 id를 가져와서 createLearnedClass로 생성
    새로 튜터링 받을 클래스의 id => 마지막으로 튜터링 받은 클래스의 id + 1 , 튜터링을 받은적이 없으면 classIdList 첫번째 값
    */
    const newClassId =
      learnedClass.length > 0
        ? learnedClass[learnedClass.length - 1].class_id + 1
        : classIdList[0];

    if (classIdList.includes(newClassId)) {
      await createLearnedClass(
        { user_id: userId, class_id: newClassId },
        (d) => {},
        () => {},
        (e) => {
          console.log(e);
        }
      );
      // 누구한테 튜터링 받았는지 update
      await updateLearnedClass(
        {
          user_id: userId,
          class_id: newClassId,
          assistant_id: selectedTutor.assistant_id,
        },
        (d) => {
          setLearnedClass([...learnedClass, d.data]);
        },
        () => {},
        (e) => {
          console.log(e);
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.pop()} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.courseName}>{course.name}</Text>
          <View style={styles.gatherTownImg}>
            <Image source={require("../assets/img/gather_town_ex.png")} />
          </View>
          <Text style={styles.courseInfo}>{course.info}</Text>
        </View>

        <View style={styles.line}></View>
        <View style={styles.content}>
          <Text style={styles.title}>Tutors</Text>
          {/* 전체 튜터 출력 후 강좌에 맞는 튜터가 아닌 경우 또는 튜터링 받은 횟수가 10번일 때 버튼 disabled */}
          {tutors.map((tutor, index) => {
            return (
              <Tutor
                key={index}
                onPress={() => {
                  setModalVisible(true);
                  setSelectedTutor(tutor);
                }}
                tutor={tutor}
                disabled={
                  !tutor.courses
                    .map((e) => e.course_id)
                    .includes(course.course_id) || learnedClass.length === 10
                }
              />
            );
          })}
        </View>
        <View style={styles.line2}></View>
        <View style={styles.content}>
          <Text style={styles.title}>Tutoring history</Text>
          {learnedClass && assistants && (
            <TutoringHistory tutoring={learnedClass} assistants={assistants} />
          )}
        </View>
        <AlertDialog
          visible={modalVisible}
          setModalVisible={setModalVisible}
          url={selectedTutor?.metaverse_url}
          handleTutoring={handleTutoring}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginTop: Constants.statusBarHeight + 12,
    width: 24,
    height: 24,
    paddingHorizontal: 20,
  },
  gatherTownImg: {
    backgroundColor: "#D9D9D9",
    width: windowWidth - 40,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    marginTop: 5,
    marginBottom: 10,
  },
  content: {
    alignSelf: "flex-start",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  classTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#807F82",
    marginBottom: 20,
  },
  line: {
    backgroundColor: "#F1EFF4",
    height: 4,
    marginTop: 25,
  },
  line2: {
    borderWidth: 0.5,
    borderColor: "#F1EFF4",
    marginBottom: 25,
    marginTop: 25,
  },
  courseName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    marginTop: 42,
  },
  courseInfo: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#807F82",
  },
});
export default Tutoring;
