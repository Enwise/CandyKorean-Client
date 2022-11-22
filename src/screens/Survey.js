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
  const survey3 = [
    "K-Pop",
    "Drama",
    "History",
    "Food",
    "Movies",
    "K-Brands",
    "Fashion",
    "Tv-Show",
    "K-Sports",
    "K-Games",
    "Webtoon",
    "K-Beauty",
  ];
  const [selected1, setSelected1] = React.useState([]);
  const [selected2, setSelected2] = React.useState([]);
  const [selected3, setSelected3] = React.useState([]);
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

  const handleSelect3 = (item) => {
    if (selected3.includes(item)) {
      setSelected3(selected3.filter((i) => i !== item));
    } else {
      if (selected3.length !== 3) {
        setSelected3([...selected3, item]);
      }
    }
  };
  console.log(selected3);
  const survey3Items = survey3.map((item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.survey3(selected3.includes(item))}
        activeOpacity={0.9}
        onPress={() => handleSelect3(item)}
      >
        <Text style={styles.survey3Text(selected3.includes(item))}>{item}</Text>
      </TouchableOpacity>
    );
  });

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
            <LinearGradient
              colors={["#84E9FF", "#C284FF"]}
              locations={[0, 1]}
              start={[0.025, 0.5]}
              end={[0.975, 0.5]}
              style={styles.gradient(surveyOption)}
            />
          </View>
        ) : surveyOption === 2 ? (
          <View style={styles.rightContainer}>
            <LinearGradient
              colors={["#C284FF", "#84E9FF"]}
              locations={[0, 1]}
              start={[0.025, 0.5]}
              end={[0.975, 0.5]}
              style={styles.gradient(surveyOption)}
            />
          </View>
        ) : (
          <View style={styles.fullContainer}>
            <LinearGradient
              colors={["#84E9FF", "#C284FF"]}
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
          {surveyOption === 1 ? (
            "How did you hear \nabout Candy Korean? "
          ) : surveyOption === 2 ? (
            "What is your purpose \nto learn Korean?"
          ) : (
            <Text style={styles.surveyTitle}>
              Please select the K-culture field{"\n"}you are interested in.
              {"   "}
              {surveyOption === 3 ? (
                <View style={styles.info}>
                  <Text style={styles.infoText}>3 things</Text>
                </View>
              ) : null}
            </Text>
          )}
        </Text>
        {surveyOption === 3 ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {survey3Items}
          </View>
        ) : (
          <SurveyList
            data={surveyOption === 1 ? survey1 : survey2}
            onPress={(item) => handleSelect(item)}
            selectedData={surveyOption === 1 ? selected1 : selected2}
          />
        )}
      </View>
      <View style={styles.button}>
        {surveyOption === 1 ? (
          <GradientButton
            title={"NEXT"}
            disabled={selected1.length === 0}
            onPress={() => setSurveyOption(2)}
          />
        ) : surveyOption === 2 ? (
          <GradientButton
            title={"SUBMIT"}
            disabled={selected2.length === 0}
            onPress={() => setSurveyOption(3)}
          />
        ) : (
          <GradientButton
            title={"SUBMIT"}
            disabled={selected3.length < 3}
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
    marginBottom: 42,
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
  fullContainer: {
    flex: 1,
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
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  info: {
    backgroundColor: "#FDFDFD",
    borderWidth: 1,
    borderRadius: 41,
    borderColor: "#B8B5BC",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  infoText: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#807F82",
    textAlign: "center",
  },
  survey3: (selected) => ({
    borderWidth: 1,
    borderColor: selected ? "#A160E2" : "#E6E3EA",
    borderRadius: 9,
    paddingHorizontal: 15,
    paddingVertical: 9,
    margin: 5,
    backgroundColor: selected ? "#A160E2" : "white",
  }),
  survey3Text: (selected) => ({
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: selected ? "white" : "#444345",
  }),
});
export default Survey;
