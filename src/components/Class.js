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
import { createWishlist, deleteWishlist, getWishlistByUser, getClassesCountByCourseId } from "../modules/NetworkFunction";
import AuthContext from "../contexts/AuthContext";


const Class = ({ classInfo, navigation, isShowAll, isMain }) => {
  const [isWish, setIsWish] = useState(false);
  const [userId, setUserId] = useState("");
  const [isWishLoaded, setIsWishLoaded] = useState(false);

  const { authState } = React.useContext(AuthContext);

  const [isClassCountLoaded, setIsClassCountLoaded] = useState(false);
  const [unitsNum, setUnitsNum] = useState(0);

  const handleWishlist = () => {
    console.log('wishlist heart clicked')
    console.log('isWish', isWish)
    if (isWish) {
      deleteWishlist(
        {user_id: authState.user_id, course_id: classInfo.course_id },
        (d) => {
          console.log('delete wishlist success')
          setIsWish(false);
        },
        () => {},
        (e) => {
          console.log(e);

        }
      );
    } else {
      createWishlist(
        {user_id: userId, course_id: classInfo.course_id, checked: true },
        (d) => {
          console.log('create wishlist success')
          setIsWish(true);
        },
        () => {},
        (e) => {
          console.log(e);
        }
      );
    }


  }

  

  useEffect(() => {
    console.log("class useEffect")
    console.log(authState.userId);
    setUserId(authState.userId);
    // 각 class가 wishList에 있는건지 없는건지 상태 체크해야됨!

    // console.log("!!!!!!classInfo!!!!!!", classInfo);
    console.log('isWish', isWish)

    if(!isWishLoaded){
      getWishlistByUser(
        {user_id: userId},
        (d) => {
          console.log("getWishlists");
          console.log(d.data);
          d.data.map((item) => {
            if (item.course_id == classInfo.course_id && item.user_id == userId) {
              setIsWish(true);
            } 
          });
          setIsWishLoaded(true);
        },
        () => {},
        (e) => {
          console.log(e);
        }
      );
    }

    if(!isClassCountLoaded) {
      getClassesCountByCourseId(
        {
          id : classInfo.course_id
        },
        (d) => { setUnitsNum(d.data) },
        setIsClassCountLoaded,
        (e) => {console.log(e)}
      )
    }

  }, [isWish, isWishLoaded,isClassCountLoaded, unitsNum]);

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
              source={{
                // uri: classInfo.tutor.profile_url,
                uri:
                  classInfo.tutor.profile_url
              }}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={dstyles(isShowAll).textContainer}>
          {isShowAll ? (
            <View style={styles.classNameAndHeart}>
              <View style={styles.classNameContainer}>
                <Text style={styles.className}>{classInfo.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleWishlist();
                }}
              >
                <View style={{ position: "absolute", right: 0 }}>
                  {isWish ? (
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
              {classInfo.tutor.name}
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
            textStyle={{
              color: "white",
              textAlign: "center",
              fontSize: 14,
              fontFamily: "Poppins-Medium",
            }}
            text={`${unitsNum - 1} Units`}
          />
        ) : null}
      </View>

      {isShowAll ? (
        <View style={styles.bottomShadowContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ClassInfo", {
                classInfo: classInfo,
                isMain: false,
                // introVideoUrl:
                //   classInfo.name == "Conversational Korean Course"
                //     ? "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671715828798.0%EC%B0%A8%EC%8B%9C%28%EC%86%8C%EA%B0%9C%29.mp4"
                //     : classInfo.name == "Survival Korean Course"
                //     ? "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671775511025.OT.mp4"
                //     : "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671777501479.OT.mp4",
                // unitsNum:
                //   (classInfo.name == "Conversational Korean Course" ||
                //     classInfo.name == "Survival Korean Course" ||
                //     classInfo.name == "After Like Course") &&
                //   10,
                // isPortrait:
                //   classInfo.name == "Conversational Korean Course" ||
                //   classInfo.name == "Survival Korean Course"
                //     ? true
                //     : false,
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
  classNameAndHeart: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.55,
    position: "relative",
  },
  classNameContainer: {
    width: "80%",
  },
  className: {
    marginBottom: 5,
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    marginRight: 5,
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
    widht: "100%",
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

  imageContainer: {
    width: "35%",
    marginRight: 8,
  },
});

const dstyles = (isShowAll) =>
  StyleSheet.create({
    classContainer: isShowAll
      ? {
          flexDirection: "column",
          borderRadius: 9,
          width: Dimensions.get("window").width * 0.95,
          height: Dimensions.get("window").height * 0.2,
          marginBottom: 80,
          marginTop: 10,

          alignItems: "center",
        }
      : {
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          width: Dimensions.get("window").width * 0.48,
        },
    img: {
      width: isShowAll ? 130 : 140,
      height: isShowAll ? 130 : 250,
      marginRight: isShowAll ? 15 : 0,
      borderRadius: 10,
    },
    topContainer: {
      position: "relative",
      flexDirection: isShowAll ? "row" : "column",
      width: isShowAll ? Dimensions.get("window").width * 0.93 : "100%",
      height: isShowAll ? "100%" : 300,
      backgroundColor: "#fff",
      borderRadius: 9,
      padding: 11,
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
      width: "60%",
    },
  });
export default memo(Class);
