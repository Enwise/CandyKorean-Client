import React, { memo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";

const Class = ({ maintitle, classInfo, navigation, isShowAll, isMain }) => {
  const [unitsNum, setUnitsNum] = useState(9);

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={dstyles(isShowAll).classContainer}>
      <View style={dstyles(isShowAll).topContainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => {
              isMain &&
                navigation.navigate("ClassInfo", {
                  classInfo: classInfo,
                  maintitle: maintitle,
                  isMain: isMain,
                });
            }}
            disabled={!isMain}
          >
            {classInfo.imgUrl}
          </TouchableOpacity>
        </View>
        <View style={dstyles(isShowAll).textContainer}>
          {isShowAll ? (
            <View>
              <Text style={styles.className}>{classInfo.className}</Text>
            </View>
          ) : null}
          <View style={styles.teacherNameContainer}>
            <Text style={styles.teacherName}>with {classInfo.teacherName}</Text>
          </View>
          {isShowAll ? (
            <View style={styles.unitsImg}>
              <Image source={require("../assets/img/units_btn.png")}></Image>
              <Text style={styles.unitsNumText}>{classInfo.units} Units</Text>
            </View>
          ) : null}
        </View>
      </View>

      {isShowAll ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ClassInfo", {
              classInfo: classInfo,
            });
            console.log("ClassInfo");
          }}
        >
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>Go to the lecture description</Text>
            <AntDesign name="right" size={10} color="#807F82" />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  classCotaniner: {
    backgroundColor: "#fff",
  },
  className: {
    marginBottom: 5,
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  teacherName: {
    marginBottom: 10,
    textAlign: "left",
    width: "100%",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#444345",
  },

  teacherNameContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 3,
  },

  unitsImg: {
    position: "absolute",
    bottom: 15,
    right: 5,
  },

  unitsNumText: {
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
    position: "absolute",
    bottom: 0,
    right: 6,
  },
  bottomContainer: {
    marginTop: 15,
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
        marginHorizontal: 0,
      },
    }),
  },
  bottomText: {
    fontFamily: "Poppins-Regular",
    color: "#807F82",
  },
});

const dstyles = (isShowAll) =>
  StyleSheet.create({
    classContainer: isShowAll
      ? {
          flexDirection: "column",
          marginBottom: 40,
        }
      : {
          flexDirection: "column",
          marginRight: 5,
          alignItems: "center",
          width: 150,
        },
    img: {
      width: isShowAll ? 130 : 140,
      height: isShowAll ? 130 : 250,
      marginRight: isShowAll ? 15 : 0,
      borderRadius: 10,
    },
    topContainer: {
      flexDirection: isShowAll ? "row" : "column",
      position: "relative",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    textContainer: {
      flexDirection: "column",
      width: 150,
      alignItems: "flex-start",
    },
  });
export default memo(Class);
