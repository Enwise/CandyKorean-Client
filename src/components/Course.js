import React, { useState } from "react";
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

const Course = ({ title, classList, showAllClass, isShowAll, navigation }) => {
  const handleShowAllClass = () => {
    {
      isShowAll ? showAllClass(title, false) : showAllClass(title, true);
    }
  };

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
            <Text style={styles.moreText}>more</Text>
            <AntDesign name="right" size={24} color="black" />
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
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    marginBottom: 15,
  },

  topItem1: {
    width: 270,
  },
  topItem2: {
    width: 50,
  },
  title: {
    fontSize: 25,
  },

  classListContainer: {
    flexDirection: "row",
    paddingLeft: 20,
  },
  moreText: {
    fontSize: 15,
    marginBottom: 5,
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
