import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";

const LessonVideo = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>LessionVideo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default LessonVideo;
