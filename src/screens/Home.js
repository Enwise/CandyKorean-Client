import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import SmallLogoIcon from "../assets/icons/SmallLogoIcon";
import NoticeIcon from "../assets/icons/NoticeIcon";
import { useFonts } from "expo-font";
import RecommendedLecture from "../components/RecommendedLecture";
import { LinearGradient } from "expo-linear-gradient";
import RecommendedLecList from "../components/RecommendedLecList";
import ProgressLecture from "../components/ProgressLecture";
const windowWidth = Dimensions.get("window").width;
const Home = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#84E9FF", "#C284FF"]}
        locations={[0, 1]}
        start={[0.025, 0.5]}
        end={[0.975, 0.5]}
        style={{
          height: 238,
          position: "absolute",
          width: windowWidth,
        }}
      />
      <View style={styles.header}>
        <SmallLogoIcon />
        <TouchableOpacity>
          <NoticeIcon />
        </TouchableOpacity>
      </View>

      <View
        style={{ backgroundColor: "#D9D9D9", marginBottom: 40, height: 70 }}
      >
        <Text>오늘의 한마디</Text>
      </View>
      <ScrollView>
        <View style={{}}>
          <Text style={styles.title}>Lecture in progress</Text>
          <ProgressLecture />
        </View>
        <View style={{ marginTop: 41 }}>
          <Text style={styles.title}>Recommended Lecture</Text>
          <RecommendedLecList />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight + 12,
    position: "relative",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    marginBottom: 12,
  },
});

export default Home;
