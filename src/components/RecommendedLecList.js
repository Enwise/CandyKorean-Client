import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import RecommendedLecture from "./RecommendedLecture";

const RecommendedLecList = () => {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <RecommendedLecture />
      <RecommendedLecture />
      <RecommendedLecture />
      <RecommendedLecture />
      <RecommendedLecture />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
});
export default RecommendedLecList;
