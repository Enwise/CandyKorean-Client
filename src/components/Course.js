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
import { Ionicons } from "@expo/vector-icons";

const Course = ({ title, classList, showAllClass, isShowAll, navigation }) => {
  const handleShowAllClass = () => {
    {
      isShowAll ? showAllClass(title, false) : showAllClass(title, true);
    }
  };

  return (
    <View style={styles.courseContainer}>
      <View style={styles.topContainer}>
        <View style={styles.topItem1}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.topItem2}>
          {isShowAll ? (
            <TouchableOpacity
              style={styles.moreButton}
              onPress={handleShowAllClass}
            >
              <Ionicons name="arrow-back" size={35} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.moreButton}
              onPress={handleShowAllClass}
            >
              <Text style={styles.moreText}>more</Text>
              <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <SafeAreaView nestedScrollEnabled={true}>
        {isShowAll ? (
          <FlatList
            numColumns={2}
            key={"_"}
            style={styles.classListContainer}
            horizontal={false}
            keyExtractor={(item) => String(item.id)}
            data={classList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Class
                navigation={navigation}
                classInfo={item}
                isShowAll={isShowAll}
              />
            )}
          ></FlatList>
        ) : (
          <FlatList
            numColumns={1}
            style={styles.classListContainer}
            key={"#"}
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
              />
            )}
          ></FlatList>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  courseContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
