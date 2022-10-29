import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import Class from "./Class";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const Course = ({
  title,
  classList,
  showAllClass,
  isShowAll,
  navigation,
  isMain,
}) => {
  const handleShowAllClass = () => {
    {
      isShowAll ? showAllClass(title, false) : showAllClass(title, true);
    }
  };

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.courseContainer}>
      <View style={isShowAll ? styles.topContainerFixed : styles.topContainer}>
        <View style={styles.topItem1}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.secondTitle}>
            {title === "Lollipop Level"
              ? "K-Culture with influencers!"
              : title === "Cotton Candy Level"
              ? "Standard Korean"
              : "Lessons for TOPIK"}
          </Text>
        </View>
        <View style={styles.topItem2}>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => {
              navigation.navigate("ClassMore", {
                classList: classList,
                title: title,
              });
            }}
          >
            <Text style={styles.moreText}>MORE</Text>
            <AntDesign name="right" size={12} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <SafeAreaView nestedScrollEnabled={true}>
        <FlatList
          numColumns={1}
          key={"_"}
          style={styles.classListContainer}
          horizontal={true}
          keyExtractor={(item) => String(item.id)}
          data={classList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Class
              navigation={navigation}
              classInfo={item}
              isShowAll={isShowAll}
              maintitle={title}
              isMain={isMain}
            />
          )}
        ></FlatList>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  courseContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: -50,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    marginBottom: 15,
  },

  topItem1: {
    width: 270,
    marginTop: 25,
  },
  topItem2: {
    width: 50,
  },
  title: {
    fontSize: 25,
    fontFamily: "Poppins-SemiBold",
  },
  secondTitle: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
  },

  classListContainer: {
    flexDirection: "row",
    paddingLeft: 20,
  },
  moreText: {
    fontSize: 10,
    marginTop: 2,
    marginLeft: 10,
    fontFamily: "Poppins-Regular",
    color: "#807F82",
  },
  moreButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Course;
