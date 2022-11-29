import React, { memo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";
import SampleClassImg1 from "../assets/icons/level/SampleClassImg1";

const Lesson = ({ navigation, lessonInfo }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("LessonInfo", {
          lessonInfo: lessonInfo,
        });
      }}
    >
      <View style={styles.container}>
        <View style={styles.lessonInfoContainer}>
          <Image
            style={styles.imageContainer}
            source={lessonInfo.profileImgUrl}
          ></Image>
          <View style={styles.textContainer}>
            <View style={styles.lessonNameContainer}>
              <Text style={styles.lessonName}>{lessonInfo.className}</Text>
            </View>
            <View style={styles.lessonDescContainer}>
              <Text style={styles.lessonDesc}>{lessonInfo.description}</Text>
            </View>
          </View>
        </View>

        <View style={styles.unitsContainer}>
          <Image source={require("../assets/img/ic-lesson-units.png")}></Image>
          <Text style={styles.unitsText}>
            {lessonInfo.currentUnit}/{lessonInfo.totalUnits} Units
          </Text>
        </View>
        <View style={styles.lessonDateContainer}>
          <Text style={styles.lessonDateText}>
            From {lessonInfo.startDate} - {lessonInfo.endDate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    position: "relative",
    marginBottom: 40,
    width: "100%",
    height: 150,
    borderRadius: 20,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: "rgba(0,0,0,0.2)",
    //     shadowOpacity: 1,
    //     shadowOffset: { height: 2, width: 2 },
    //     shadowRadius: 2,
    //   },
    //   android: {
    //     elevation: 3,
    //     marginHorizontal: 0,
    //   },
    // }),
  },
  lessonInfoContainer: {
    flexDirection: "row",
    width: "100%",
  },
  imageContainer: {
    width: "40%",
    height: "100%",
    borderRadius: 20,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },

  textContainer: {
    marginLeft: 10,
    width: "60%",
  },
  lessonName: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },

  lessonDesc: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#B8B5BC",
  },
  unitsContainer: {
    position: "absolute",
    bottom: 0,
    right: 20,
  },
  unitsText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#FFF",
    position: "absolute",
    bottom: 0,
    right: 4,
  },

  lessonDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: -20,
    right: 20,
  },

  lessonDateText: {
    fontFamily: "Poppins-Medium",
    color: "#B8B5BC",
    fontSize: 10,
  },
});

export default memo(Lesson);
