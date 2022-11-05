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
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Dialog, {
  DialogContent,
  ScaleAnimation,
  DialogFooter,
  DialogButton,
} from "react-native-popup-dialog";

const LessonInfo = ({ navigation, route }) => {
  const [lessonInfo, setLessonInfo] = useState(route.params.lessonInfo);
  const [visible, setVisible] = useState(false);
  const [review, setReview] = useState(true);
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
      <View style={styles.backBtn}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.lessonInfoContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.img}
            source={require("../assets/img/sample_class_img1.jpeg")}
          ></Image>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.todayContainer}>
            <Text style={styles.todayText}>Today's Lecture</Text>
          </View>
          <View style={styles.totalUnitContainer}>
            <Image
              style={styles.totalUnitsImg}
              source={require("../assets/img/units_num_info.png")}
            ></Image>
            <Text style={styles.totalUnitsNum}>
              {lessonInfo.totalUnits} Units
            </Text>
          </View>
          <View style={styles.studyNowBtn}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LessonVideo", { lessonInfo: lessonInfo });
              }}
            >
              <Image
                source={require("../assets/img/btn-purple-lecture.png")}
              ></Image>
              <Text style={styles.studyNowText}>Study Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quizBtn}>
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
              }}
            >
              <Image
                source={require("../assets/img/btn-purple-lecture.png")}
              ></Image>
              <Text style={styles.quizText}>Today's Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.curriculumHeader}>
        <Text style={styles.curriculumHeaderText}>Curriculum</Text>
      </View>

      <FlatList
        numColumns={1}
        key={"_"}
        style={styles.curriculumListContainer}
        keyExtractor={(item) => String(item.id)}
        data={lessonInfo.curriculum}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.curriculumItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LessonVideo", { lessonInfo: item });
              }}
            >
              <View style={styles.unitNum}>
                <Text style={styles.unitNumText}>Unit {item.unitNum}</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.unitInfo}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("LessonVideo", { lessonInfo: item });
                }}
              >
                <View style={styles.unitTitle}>
                  <Text style={styles.unitTitleText}>{item.unitName}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.unitBottomContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("LessonVideo", { lessonInfo: item });
                  }}
                >
                  <View style={styles.unitStudyContainer}>
                    <Text style={styles.unitStudyText}>Study</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(true);
                  }}
                >
                  <View style={styles.unitQuizContainer}>
                    <Image
                      style={styles.unitQuizBtn}
                      source={require("../assets/img/units_quiz_btn.png")}
                    ></Image>
                    <Text style={styles.unitQuizText}></Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      ></FlatList>
      <Dialog
        width={0.8}
        height={0.25}
        visible={visible}
        onTouchOutside={() => {
          setVisible(false);
        }}
        onHardwareBackPress={() => {
          setVisible(false);
        }}
        dialogAnimation={
          new ScaleAnimation({
            initialValue: 0, // optional
            useNativeDriver: true, // optional
          })
        }
        footer={
          <DialogFooter
            bordered={false}
            style={{
              paddingLeft: 10,
              paddingRight: 10,

              paddingBottom: 20,
            }}
          >
            <DialogButton
              style={{
                backgroundColor: "#E6E3EA",
                borderRadius: 30,
                marginRight: 5,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
              textStyle={{
                color: "#444345",
                fontFamily: "Poppins-Medium",
                fontSize: 14,
                justifyContent: "center",
                alignItems: "center",
              }}
              text="NO"
              onPress={() => {
                setReview(false);
                console.log("review: ", review);
              }}
            />
            <DialogButton
              style={{
                backgroundColor: "#444345",
                borderRadius: 30,
                marginLeft: 5,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
              textStyle={{
                color: "#E6E3EA",
                fontFamily: "Poppins-Medium",
                fontSize: 14,
                justifyContent: "center",
                alignItems: "center",
              }}
              text="YES"
              onPress={() => {
                setReview(true);
                console.log("review: ", review);
              }}
            />
          </DialogFooter>
        }
      >
        <DialogContent
          style={{
            position: "relative",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-SemiBold",
              color: "#000",
              paddingTop: 40,
              textAlign: "center",
            }}
          >
            Do you want to start reviewing before the quiz?
          </Text>
        </DialogContent>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}
          style={{ position: "absolute", right: 10, top: 10 }}
        >
          <Ionicons name="ios-close-outline" size={24} color="black" />
        </TouchableOpacity>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",

    backgroundColor: "#fff",
    position: "relative",
  },

  lessonInfoContainer: {
    flexDirection: "row",
    marginTop: 100,
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  todayContainer: {
    marginBottom: 3,
  },
  todayText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    fontColor: "#000",
  },
  totalUnitContainer: {
    borderRadius: 20,
    flexDirection: "row",

    width: 55,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    position: "relative",
  },
  totalUnitsImg: {
    position: "absolute",
    width: 60,
    height: 25,
    borderRadius: 20,
  },

  totalUnitsNum: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    fontSize: 12,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 30,
  },
  studyNowBtn: {
    position: "relative",
    marginBottom: 10,
  },
  studyNowText: {
    position: "absolute",
    top: 4,
    left: 25,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#fff",
  },
  quizBtn: { position: "relative" },
  quizText: {
    position: "absolute",
    top: 4,
    left: 20,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#fff",
  },
  curriculumContainer: {
    padding: 40,
  },
  curriculumHeader: {
    marginTop: 30,
    marginLeft: 40,
  },
  curriculumHeaderText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#444345",
  },

  curriculumListContainer: {
    marginTop: 20,
    marginLeft: 40,
  },

  curriculumItem: {
    flexDirection: "row",
  },
  unitNum: {
    marginRight: 20,
  },
  unitInfo: {
    width: 200,
  },
  unitTitle: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E3EA",
    borderStyle: "solid",
  },
  unitTitleText: {
    color: "#444345",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  unitStudyContainer: {
    borderColor: "#A160E2",
    borderWidth: 1,
    width: 50,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  unitStudyText: {
    fontSize: 10,
    fontFamily: "Poppins-Medium",
    color: "#A160E2",
  },
  unitNumText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#807F82",
  },
  unitBottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default LessonInfo;
