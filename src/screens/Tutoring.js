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
  getClassesByCourseId,
  getPremiumLearnedClasses,
} from "../modules/NetworkFunction";
import { useFocusEffect } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Tutoring = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { course, tutors, userId } = route.params;
  const [isLoaded, setIsLoaded] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const setTutor = async () => {
        course.learned_class.map((item) => {
          let tutor = tutors.find((tutor) => tutor.tutor_id == item.tutor_id);
          item.tutor = tutor;
        });
      };
      setTutor();
      setIsLoaded(true);
    }, [])
  );
  const handleTutoring = () => {
    // tutored 버튼 클릭하면 createLearnedClass
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
          {tutors.map((tutor, index) => {
            return (
              <Tutor
                key={index}
                onPress={() => {
                  setModalVisible(true);
                }}
                tutor={tutor}
                disabled={tutor.tutor_id !== course.tutor_id}
              />
            );
          })}
        </View>
        <View style={styles.line2}></View>
        <View style={styles.content}>
          <Text style={styles.title}>Tutoring history</Text>
          {isLoaded && <TutoringHistory tutoring={course.learned_class} />}
        </View>
        <AlertDialog
          visible={modalVisible}
          setModalVisible={setModalVisible}
          url={
            "https://app.gather.town/app/rcStwsUdkfF8lpoI/Candy%20Korean_class%20room"
          }
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
