import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const QuizResult = ({ navigation, route }) => {
  const [resultList, setResultList] = useState(route.params.resultList);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  useEffect(() => {
    console.log(resultList);
    let correct = 0;
    let wrong = 0;
    resultList.map((item) => {
      if (item) {
        correct++;
      } else {
        wrong++;
      }
    });
    setCorrect(correct);
    setWrong(wrong);
  }, []);

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>MyResult</Text>
      <Text>Correct: {correct}</Text>
      <Text>Wrong: {wrong}</Text>
      <View style={styles.returnBtn}>
        <Text style={styles.returnText}>Return to Class</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  returnBtn: {
    marginTop: 30,
  },
});
export default QuizResult;
