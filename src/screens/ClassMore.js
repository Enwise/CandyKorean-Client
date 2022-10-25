import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import Class from "../components/Class";
import { Ionicons } from "@expo/vector-icons";

const ClassMore = ({ navigation, route }) => {
  const title = route.params.title;
  const classList = route.params.classList;

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
              navigation.navigate("ClassMain");
            }}
          >
            <Ionicons name="arrow-back" size={35} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView nestedScrollEnabled={true}>
        <FlatList
          numColumns={1}
          key={"_"}
          style={styles.classListContainer}
          horizontal={false}
          keyExtractor={(item) => String(item.id)}
          data={classList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Class navigation={navigation} classInfo={item} isShowAll={true} />
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
    marginTop: 50,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    marginTop: 30,
    marginBottom: 30,
  },
  classListContainer: {
    width: 300,
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
});
export default ClassMore;
