import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import BottomSheet from "../components/BottomSheet";
import GradientButton from "../components/GradientButton";
import SurveyList from "../components/SurveyList";
import BackButton from "../components/BackButton";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

const windowWidth = Dimensions.get("window").width;
const Survey = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [selected1, setSelected1] = React.useState([]);
  const [selected2, setSelected2] = React.useState([]);
  const [surveyOption, setSurveyOption] = React.useState(1);

  const handleSelect = (item) => {
    if (surveyOption === 1) {
      if (selected1.includes(item)) {
        setSelected1(selected1.filter((i) => i !== item));
      } else {
        setSelected1([...selected1, item]);
      }
    } else {
      if (selected2.includes(item)) {
        setSelected2(selected2.filter((i) => i !== item));
      } else {
        setSelected2([...selected2, item]);
      }
    }
  };
  console.log(selected1, selected2);
  const survey1 = [
    "Google Search",
    "App Store / Google Play Store",
    "Facebook / Instagram",
    "Friends / Family",
    "Youtube",
    "TikTok",
  ];
  const survey2 = [
    "Support my education",
    "Spend time productively",
    "Prepare for travel",
    "Connect with people",
    "Just for fun",
    "Boost my career",
    "Other",
  ];

  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.pop()} />
      </View>

      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 16,
          color: "#B8B5BC",
          marginLeft: 20,
          marginBottom: 7,
        }}
      >
        Please participate in survey
      </Text>

      <View style={styles.progressContainer}>
        {surveyOption === 1 ? (
          <View style={styles.leftContainer}>
            <GradientButton
              colors={["#84E9FF", "#C284FF"]}
              locations={[0, 1]}
              start={[0.025, 0.5]}
              end={[0.975, 0.5]}
              style={styles.gradient(surveyOption)}
            />
          </View>
        ) : (
          <View style={styles.rightContainer}>
            <LinearGradient
              colors={["#C284FF", "#84E9FF"]}
              locations={[0, 1]}
              start={[0.025, 0.5]}
              end={[0.975, 0.5]}
              style={styles.gradient(surveyOption)}
            />
          </View>
        )}
      </View>

      <View style={styles.surveyContainer}>
        <Text style={styles.surveyTitle}>
          {surveyOption === 1
            ? "How did you hear \nabout Candy Korean? "
            : "What is your purpose \nto learn Korean?"}
        </Text>
        <SurveyList
          data={surveyOption === 1 ? survey1 : survey2}
          onPress={(item) => handleSelect(item)}
          selectedData={surveyOption === 1 ? selected1 : selected2}
        />
      </View>
      <View style={styles.button}>
        {surveyOption === 1 ? (
          <GradientButton
            title={"NEXT"}
            disabled={selected1.length === 0}
            onPress={() => setSurveyOption(2)}
          />
        ) : (
          <GradientButton
            title={"SUBMIT"}
            disabled={selected2.length === 0}
            onPress={() => navigation.navigate("SurveyComplete")}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  header: {
    marginTop: Constants.statusBarHeight + 15,
    marginBottom: 42,
    width: 24,
    height: 24,
    marginLeft: 12,
  },
  progressContainer: {
    width: "100%",
    height: 7,
    backgroundColor: "#F1EFF4",
    flexDirection: "row",
  },
  gradient: (surveyOption) => ({
    flex: 1,
    borderTopRightRadius: surveyOption === 1 ? 50 : 0,
    borderBottomRightRadius: surveyOption === 1 ? 50 : 0,
    borderTopLeftRadius: surveyOption === 1 ? 0 : 50,
    borderBottomLeftRadius: surveyOption === 1 ? 0 : 50,
  }),
  leftContainer: {
    flex: 0.5,
  },
  rightContainer: {
    flex: 1,
    marginLeft: windowWidth / 2,
  },
  title: {
    marginBottom: 10,
  },
  surveyContainer: {
    flex: 5,
    paddingHorizontal: 20,
  },
  surveyTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    marginBottom: 35,
    marginTop: 42,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
});
export default Survey;
