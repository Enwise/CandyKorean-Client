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

import CottonCandyLevel from "../assets/icons/CottonCandyLevel";
import MintCandyLevel from "../assets/icons/MintCandyLevel";
import EmptyLevel from "../assets/icons/level/EmptyLevel";

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
      title === "Lollipop Level"
        ? navigation.navigate("ClassMore", {
            classList: classList,
            title: title,
          })
        : null;
    }
  };

  return (
    <View style={styles.courseContainer}>
      <View style={styles.topContainer}>
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
              handleShowAllClass();
            }}
          >
            <Text style={styles.moreText}>MORE</Text>
            <AntDesign name="right" size={12} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      {title === "Lollipop Level" ? (
        <SafeAreaView nestedScrollEnabled={true} style={{ width: "100%" }}>
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
      ) : (
        // Coming Soon
        <Image
          style={styles.commingSoonContainer}
          source={require("../assets/img/EmptyLevel.png")}
        ></Image>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  courseContainer: {
    marginTop: 40,
    width: "100%",
  },
  topContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },

  topItem1: {
    width: "80%",
  },

  topItem2: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "flex-end",
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
    width: 350,
    flexDirection: "row",
    paddingLeft: 20,
  },

  moreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreText: {
    fontSize: 10,
    marginTop: 2,
    marginLeft: 10,
    fontFamily: "Poppins-Regular",
    color: "#807F82",
  },
  comingSoonContainer: {
    width: 300,
  },
});

export default Course;
