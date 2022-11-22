import React from "react";
import {
  Dimensions,
  Image,
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
const windowWidth = Dimensions.get("window").width;
const Premium = ({ navigation }) => {
  const [isPaid, setIsPaid] = React.useState(false);
  const tutors = [
    {
      name: "Amy",
      img: require("../assets/img/tutor_ex1.png"),
    },
    {
      name: "Jake",
      img: require("../assets/img/tutor_ex2.png"),
    },
    {
      name: "Herry",
      img: require("../assets/img/gather_town_ex.png"),
    },
    {
      name: "Bony",
      img: require("../assets/img/gather_town_ex.png"),
    },
  ];

  return (
    <View style={styles.container}>
      {!isPaid ? (
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
              <TutorList tutor={tutors} />
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
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Premium Course</Text>
            <Text style={styles.text}>
              Meet the tutor in the metaverse space
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate("Tutoring");
            }}
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
                  K-Culture with Influencers!
                </Text>
                <PremiumEnter />
              </View>
            </View>
            <View style={styles.progress}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>Number of times tutored</Text>
                <Text style={styles.progressText}>7/10</Text>
              </View>
              <Progress.Bar
                progress={0.7}
                height={7}
                color={"#A160E2"}
                unfilledColor={"#F1EFF4"}
                width={windowWidth - 40}
                borderColor={"#F1EFF4"}
              />
            </View>
          </TouchableOpacity>
        </View>
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
