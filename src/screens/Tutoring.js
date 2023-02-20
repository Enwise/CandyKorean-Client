import React, { useEffect } from "react";
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
  getPremiumLearnedClasses,
} from "../modules/NetworkFunction";
import { useFocusEffect } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Tutoring = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { tutors, userId } = route.params;
  let course = route.params.course;
  const [assistant, setAssistant] = React.useState(null);
  const [selectedTutor, setSelectedTutor] = React.useState(null);
  const [learnedClass, setLearnedClass] = React.useState(course.learned_class);
  useFocusEffect(
    React.useCallback(() => {
      const setTutor = async () => {
        await getAssistantByCourseId(
          { id: course.course_id },
          (d) => {
            setAssistant(d.data[0]); // 임시data
          },
          () => {},
          (e) => {
            console.log(e);
          }
        );
      };
      setTutor();
    }, [])
  );

  const handleTutoring = () => {
    // tutored 버튼 클릭하면 createLearnedClass
    // DB에 튜터링 클래스 10개 미리 생성해놓고, 튜터링 받을 때마다 그 클래스의 id를 가져와서 createLearnedClass로 생성
    // 새로 튜터링 받을 클래스의 id => 마지막으로 튜터링 받은 클래스의 id + 1

    const newClassId = learnedClass[learnedClass.length - 1].class_id + 1;
    // console.log(newClassId);
    if (course.class_id.includes(newClassId)) {
      createLearnedClass(
        { user_id: userId, class_id: newClassId },
        (d) => {
          setLearnedClass([...learnedClass, d.data]);
        },
        () => {},
        (e) => {
          console.log(e);
        }
      );
    }
    console.log("tutored");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.pop()} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 20,
              marginTop: 42,
            }}
          >
            {course.name}
          </Text>
          <View style={styles.gatherTownImg}>
            <Image source={require("../assets/img/gather_town_ex.png")} />
          </View>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 12,
              color: "#807F82",
            }}
          >
            {course.info}
          </Text>
        </View>

        <View style={styles.line}></View>
        <View style={styles.content}>
          <Text style={styles.title}>Tutors</Text>
          {/* 전체 튜터 출력 후 강좌에 맞는 튜터가 아닌 경우 버튼 disabled */}
          {tutors.map((tutor, index) => {
            return (
              <Tutor
                key={index}
                onPress={() => {
                  setModalVisible(true);
                  setSelectedTutor(tutor);
                }}
                tutor={tutor}
                disabled={tutor.course_id !== course.course_id}
              />
            );
          })}
        </View>
        <View style={styles.line2}></View>
        <View style={styles.content}>
          <Text style={styles.title}>Tutoring history</Text>
          {learnedClass && assistant && (
            <TutoringHistory tutoring={learnedClass} assistant={assistant} />
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
});
export default Tutoring;
