import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import * as Progress from "react-native-progress";
const windowWidth = Dimensions.get("window").width;
const Premium = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Text>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Setting");
          }}
        >
          <Text>setting</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.profile}>
          <View style={styles.profileLeftContainer}>
            <View style={styles.profileImg}>
              <Text>프로필사진</Text>
            </View>
          </View>
          <View style={styles.profileRightContainer}>
            <Text>nickname</Text>
            <View style={styles.info}>
              <Text>cotton candy 수강중</Text>
              <Text>프리미엄 이용중</Text>
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text>현재 강의 수강 내역</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.lecture}
            onPress={() => {
              navigation.navigate("Tutoring");
            }}
          >
            <Text style={styles.levelText}>Level</Text>
            <Text style={styles.progress}>70%</Text>
            <View>
              <Progress.Bar
                progress={0.7}
                height={20}
                color={"#84E9FF"}
                unfilledColor={"#C984FF"}
                width={windowWidth * 0.8}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight + 15,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  content: {
    // flex: 1,
  },
  profile: {
    flexDirection: "row",
    marginBottom: 40,
  },
  profileLeftContainer: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },
  profileRightContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  profileImg: {
    width: 127,
    height: 127,
    borderRadius: 70,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    height: 70,
    backgroundColor: "#D9D9D9",
    marginTop: 20,
  },
  levelText: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
  },
  progress: {
    textAlign: "right",
    marginRight: 20,
  },
  lecture: {
    backgroundColor: "#D9D9D9",
    height: 80,
    paddingLeft: 10,
  },
});

export default Premium;
