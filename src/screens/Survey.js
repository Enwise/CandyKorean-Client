import React from "react";
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
const windowWidth = Dimensions.get("window").width;
const Survey = ({ navigation }) => {
  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(false);
  const [selected1, setSelected1] = React.useState();
  const [selected2, setSelected2] = React.useState();
  const [surveyOption, setSurveyOption] = React.useState();
  console.log(selected1);
  console.log(selected2);
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Please participate in survey</Text>
      </View>
      <View style={{ flex: 6 }}>
        <View style={styles.surveyContainer}>
          <Text style={styles.title}>How did you hear about Candy Korean?</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setBottomSheetVisible(true);
              setSurveyOption(1);
            }}
          >
            <Text>Click here</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.surveyContainer}>
          <Text style={styles.title}>
            What is your purpose to learn Korean?
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setBottomSheetVisible(true);
              setSurveyOption(2);
            }}
          >
            <Text>Click here</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheet
        visible={bottomSheetVisible}
        setVisible={setBottomSheetVisible}
      >
        <SurveyList
          data={surveyOption === 1 ? survey1 : survey2}
          onPress={(data) =>
            surveyOption === 1 ? setSelected1(data) : setSelected2(data)
          }
        ></SurveyList>
      </BottomSheet>
      <View style={{ flex: 1 }}>
        <GradientButton
          title={"SUBMIT"}
          disabled={!selected1 || !selected2}
          onPress={() => navigation.navigate("SurveyComplete")}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    paddingHorizontal: 20,
  },
  header: {
    marginTop: Constants.statusBarHeight + 15,
    marginBottom: 42,
    alignItems: "center",
  },
  title: {
    marginBottom: 10,
  },
  surveyContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  button: {
    border: 1,
    width: windowWidth - 40,
    height: 40,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Survey;
