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
  //https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671094225509/shin_yoo_jin_square.jpg
  //https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671094225509/shin_yoo_jin_rect.jpg
  const [unitsNum, setUnitsNum] = useState(9);
  const [isWishList, setIsWishList] = useState(false);

  const dummy_img_url =
    "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671094225509/shin_yoo_jin_rect.jpg";
  const dummy_profile_url =
    "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671094225509/shin_yoo_jin_rect.jpg";

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
              // source={
              //   isShowAll
              //     ? classInfo.tutor.profile_url !== ""
              //       ? classInfo.profileUrl
              //       : dummy_profile_url
              //     : classInfo.tutor.img_url !== ""
              //     ? classInfo.img_url
              //     : dummy_img_url
              // }
              source={isShowAll ? dummy_profile_url : dummy_img_url}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={dstyles(isShowAll).textContainer}>
          {isShowAll ? (
            <View style={styles.classNameAndHeart}>
              <Text style={styles.className}>{classInfo.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  handleWishList();
                }}
              >
                <View style={{marginTop: 3,}}>
                {isWishList ? (
                  <AntDesign name="heart" size={22} color="#A160E2" />
                ) : (
                  <AntDesign name="hearto" size={22} color="#A160E2" />
                )}
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.teacherNameContainer}>
            <Text style={styles.teacherName}>
              {/* with {classInfo.tutor.name ?? "dummy_tutor_name"} */}
              with {classInfo.name}
            </Text>
          </View>
          
        </View>
        {isShowAll ? (
            <GradientBtn
              viewStyle={{
                borderRadius: 10,
                justifyContent: "center",
                padding: 5,
                position: "absolute",
                right: -5,
                bottom: 5,
              }}
              text={`${classInfo.units} Units`}
            />
          ) : null}
      </View>

      {isShowAll ? (
        <View style={styles.bottomShadowContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ClassInfo", {
                classInfo: classInfo,
              });
              console.log("ClassInfo");
            }}
          >
            <View style={styles.bottomContainer}>
              <Text style={styles.bottomText}>
                Go to the lecture description
              </Text>
              <AntDesign name="right" size={10} color="#807F82" />
            </View>
          </TouchableOpacity>
        </View>
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
    fontSize: 15,
    marginRight:5,
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
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.04,
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
        shadowColor: "rgba(0,0,0,0.5)",
        elevation: 5,
      },
    }),
  },
  bottomContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#fff",
  },
  bottomText: {
    fontFamily: "Poppins-Regular",
    color: "#807F82",
    borderRadius: 32,
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
          height: Dimensions.get('window').height * 0.2,
          marginBottom: 80,
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
      position:'relative',
      flexDirection: isShowAll ? "row" : "column",
      width: isShowAll ? Dimensions.get("window").width * 0.93 : "100%",
      height: isShowAll ? "100%" : 300,
      backgroundColor: "#fff",
      borderRadius: 9,
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
          shadowColor: "rgba(0,0,0,0.5)",

          marginHorizontal: 0,
        },
      }),
    },

    textContainer: {
      flexDirection: "column",
      width: "58%",
    },
  });
export default memo(Class);
