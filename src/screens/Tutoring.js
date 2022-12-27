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
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Tutoring = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { course, tutors } = route.params;
  const ex_history = [
    {
      name: "Amy",
      date: "09/02",
      img: require("../assets/img/gather_town_ex.png"),
    },
    {
      name: "Amy",
      date: "09/07",
      img: require("../assets/img/gather_town_ex.png"),
    },
    {
      name: "Amy",
      date: "09/12",
      img: require("../assets/img/gather_town_ex.png"),
    },
    {
      name: "Amy",
      date: "09/19",
      img: require("../assets/img/gather_town_ex.png"),
    },
  ];

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
          {/* <TutoringHistory tutoring={ex_history} /> */}
        </View>
        <AlertDialog
          visible={modalVisible}
          setModalVisible={setModalVisible}
          url={
            "https://app.gather.town/app/rcStwsUdkfF8lpoI/Candy%20Korean_class%20room"
          }
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
