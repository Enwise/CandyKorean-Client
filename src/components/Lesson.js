import React, { memo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Platform,
  Dimensions,
} from "react-native";

import GradientBtn from "../components/GradientButtonView";

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
        <View style={styles.lessonInfoShawdowContainer}>
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

          <GradientBtn
            text={`${
              lessonInfo.currentUnit + "/" + lessonInfo.totalUnits
            } Units`}
            viewStyle={{
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 3,
              width: 80,
              height: 30,
              right: 5,
              bottom: 5,
            }}
          />
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
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: "#fff",
    borderRadius: 9,
    marginBottom: 40,
  },
  lessonInfoShawdowContainer: {
    width: "100%",

    height: "100%",

    backgroundColor: "#fff",
    borderRadius: 9,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
      },

      android: {
        shadowColor: "lightgray",
        elevation: 10,
      },
    }),
  },
  lessonInfoContainer: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    borderRadius: 9,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "40%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },

  textContainer: {
    marginLeft: 10,
    width: "60%",
    backgroundColor: "#fff",
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
    marginTop: 5,
  },

  lessonDateText: {
    fontFamily: "Poppins-Medium",
    color: "#B8B5BC",
    fontSize: 10,
  },
});

export default memo(Lesson);
