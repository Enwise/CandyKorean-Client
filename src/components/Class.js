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
  const [isWishLoaded, setIsWishLoaded] = useState(false);
  
  const { authState } = React.useContext(AuthContext);
  const [userId, setUserId] = useState(authState.userId);

  const [isClassCountLoaded, setIsClassCountLoaded] = useState(false);
  const [unitsNum, setUnitsNum] = useState(0);

  const handleWishlist = () => {
    if (isWish) {
      deleteWishlist(
        {user_id: authState.user_id, course_id: classInfo.course_id },
        (d) => {
          setIsWish(false);
        },
        () => {},
        (e) => {
          console.log(e);

        }
      );
    } else {
      createWishlist(
        {user_id: userId, course_id: classInfo.course_id },
        (d) => {
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
    // 각 class가 wishList에 있는건지 없는건지 상태 체크해야됨!

    if(!isWishLoaded){
      getWishlistByUser(
        {user_id: userId},
        (d) => {
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

  }, []);


  return (
    <View style={dstyles(isShowAll).classContainer}>
      <View style={dstyles(isShowAll).topShadowContainer}>
      <TouchableOpacity 
        onPress={() => {
          navigation.navigate("ClassInfo", {
            classInfo: classInfo,
            isMain: false,
            
          });
        }}>
      <View style={dstyles(isShowAll).topContainer}>
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
              style={dstyles(isShowAll).imageContainer}
              source={{
                uri:
                  classInfo.tutor.profile_url
              }}
            ></Image>
      </TouchableOpacity>
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
                <View style={{ position: "absolute", right: 7 }}>
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
              {classInfo.tutor.name}
            </Text>
          </View>
        </View>
        {isShowAll ? (
          <GradientBtn
            viewStyle={{
              borderRadius: 10,
              justifyContent: "center",
              paddingVertical: 5,
              paddingHorizontal: 7,
              position: "absolute",
              right: 4,
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
      </TouchableOpacity>
      </View>
      
      {isShowAll ? (
        <View style={styles.bottomShadowContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ClassInfo", {
                classInfo: classInfo,
                isMain: false,
                
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
    width: Dimensions.get("window").width * 0.93,
    height: Dimensions.get("window").height * 0.04,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.07)",
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 0 },
        shadowRadius: 10,
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
    paddingLeft: 12,
    paddingRight: 22,
    backgroundColor: "#fff",
  },
  bottomText: {
    fontFamily: "Poppins-Regular",
    color: "#807F82",
    borderRadius: 32,
    backgroundColor: "#fff",
  },

  
  
});



const dstyles = (isShowAll) =>
  StyleSheet.create({
    classContainer: isShowAll
      ? {
          flexDirection: "column",
          borderRadius: 9,
          width: Dimensions.get("window").width * 0.96,
          height: Dimensions.get("window").height * 0.2,
          marginBottom: 80,
          marginTop: 10,
          backgroundColor: "#fff",
          alignItems: "center",
        }
      : {
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          marginRight: 15,
        },
        imageContainer: {
          borderRadius: 20,
          width: isShowAll ? 120 : 150,
          height: isShowAll ? 120 : Dimensions.get("window").width * 0.6,
          marginRight: 10,
        },

        topContainer: {
          width: "100%",
          height:"100%",
          backgroundColor:'#fff',
          flexDirection: isShowAll? 'row' : 'column',
        },  
      topShadowContainer : {
        position: "relative",
          flexDirection: isShowAll ? "row" : "column",
          width: isShowAll ? Dimensions.get("window").width * 0.9 : "100%",
          height: isShowAll ? Dimensions.get("window").height * 0.2 : 200,
          backgroundColor: "#fff",
          borderRadius: 9,
          padding: isShowAll ? 11 : 0,
          ...Platform.select({
            ios: isShowAll ? {
              shadowColor: "rgba(0,0,0,0.07)",
              shadowOpacity: 1,
              shadowOffset: { height: 2, width: 0 },
              shadowRadius: 10,
            } : {},
      
            android: isShowAll ? {
              shadowColor: "rgba(0,0,0,0.5)",
              elevation: 5,
            }: {},
          }),
        },

    textContainer: {
      flexDirection: "column",
      width: "60%",
    },
  });
export default memo(Class);
