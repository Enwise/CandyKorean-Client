import React, { memo, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Platform,
  Dimensions,
} from "react-native";
import GradientBtn from "./GradientButtonView";

import { AntDesign } from "@expo/vector-icons";

const Class = ({ maintitle, classInfo, navigation, isShowAll, isMain }) => {
  const [unitsNum, setUnitsNum] = useState(9);
  const [isWishList, setIsWishList] = useState(false);

  const handleWishList = () => {
    console.log("handleWishList");
    setIsWishList(!isWishList);
  };

  useEffect(() => {
    // 각 class가 wishList에 있는건지 없는건지 상태 체크해야됨!
  }, []);

  console.log(isShowAll);

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
            <Image
              style={isShowAll ? styles.classProfileImg : styles.classImg}
              source={isShowAll ? classInfo.profileUrl : classInfo.imgUrl}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={dstyles(isShowAll).textContainer}>
          {isShowAll ? (
            <View style={styles.classNameAndHeart}>
              <Text style={styles.className}>{classInfo.className}</Text>
              <TouchableOpacity
                onPress={() => {
                  handleWishList();
                }}
              >
                {isWishList ? (
                  <AntDesign name="heart" size={24} color="#A160E2" />
                ) : (
                  <AntDesign name="hearto" size={24} color="#A160E2" />
                )}
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.teacherNameContainer}>
            <Text style={styles.teacherName}>with {classInfo.teacherName}</Text>
          </View>
          {isShowAll ? (
            <GradientBtn
              viewStyle={{
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                position: "absolute",
                top: 30,
                right: 0,
              }}
              text={`${classInfo.units} Units`}
            />
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
          <View style={styles.bottomShadowContainer}>
            <View style={styles.bottomContainer}>
              <Text style={styles.bottomText}>
                Go to the lecture description
              </Text>
              <AntDesign name="right" size={10} color="#807F82" />
            </View>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  classContainer: {
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
    bottom: 0,
    right: 0,
  },

  unitsNumText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    right: 6,
  },
  bottomShadowContainer: {
    width: Dimensions.get("window").width * 0.93,
    height: 30,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
      },

      android: {
        elevation: 5,
      },
    }),
  },
  bottomContainer: {
    width: Dimensions.get("window").width * 0.93,
    height: 30,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 20,
    backgroundColor: "#fff",
    zIndex: 5,
  },
  bottomText: {
    fontFamily: "Poppins-Regular",
    color: "#807F82",

    backgroundColor: "#fff",
  },
  classImg: {
    borderRadius: 20,
    width: 150,
    height: 250,
    marginRight: 10,
  },
  classProfileImg: {
    borderRadius: 20,
    width: "100%",
    height: 130,
    marginRight: 15,
  },
  classNameAndHeart: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  imageContainer: {
    width: "35%",
    marginRight: 15,
  },
});

const dstyles = (isShowAll) =>
  StyleSheet.create({
    classContainer: isShowAll
      ? {
          flexDirection: "column",
          borderRadius: 9,
          width: Dimensions.get("window").width * 0.95,
          height: 170,
          marginBottom: 60,
          marginTop: 10,
          alignItems: "center",
        }
      : {
          flex: 1,
          flexDirection: "column",
          marginRight: 5,
          alignItems: "center",
          width: 170,
        },
    img: {
      width: isShowAll ? 130 : 140,
      height: isShowAll ? 130 : 250,
      marginRight: isShowAll ? 15 : 0,
      borderRadius: 10,
    },
    topContainer: {
      flexDirection: isShowAll ? "row" : "column",
      width: isShowAll ? Dimensions.get("window").width * 0.93 : "100%",
      height: isShowAll ? 150 : 300,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 5,
      ...Platform.select({
        ios: isShowAll && {
          shadowColor: "rgba(0,0,0,0.2)",
          shadowOpacity: 1,
          shadowOffset: { height: 1, width: 1 },
          shadowRadius: 2,
        },

        android: isShowAll && {
          elevation: 3,
          marginHorizontal: 0,
        },
      }),
    },

    textContainer: {
      flexDirection: "column",
      width: "58%",
      position: "relative",
    },
  });
export default memo(Class);
