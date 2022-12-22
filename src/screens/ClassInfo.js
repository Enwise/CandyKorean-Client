import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "react-native";
import GradientBtn from "../components/GradientButtonView";
import { getClasses } from "../modules/NetworkFunction";
import { getContents } from "../modules/NetworkFunction";

const ClassInfo = ({ props, navigation, route }) => {
  const [classInfo, setClassInfo] = useState(route.params.classInfo);
  const [isMain, setIsMain] = useState(route.params.isMain);
  const [isWishList, setIsWishList] = useState(false);
  const [isClassLoaded, setIsClassLoaded] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [classList, setClassList] = useState([]);
  const [contentsList, setContentsList] = useState([]);
  const [isPortrait, setIsPortrait] = useState(true);

  const [introVideoUrl, setIntroVideoUrl] = useState("");

  const videoPlayer = useRef();
  const [videoStatus, setVideoStatus] = useState(3);

  const setOrientation = (status) => {
    if (status === 1 && !isPortrait) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  useEffect(() => {
    console.log(classInfo);
    // console.log(classInfo.introVideoUrl);

    // class, content, 그리고 tutor 정보 가져와야함
    // class, content ->  Units 갯수가 얼마인지 알기위해

    // course_id
    // 1 : Yoojin
    // class_id : OT: 1, 1차시 ~ 10차시 : 3 ~ 12

    // 2 : Seongyeop
    // 3 : Kyungeun
    if (!isClassLoaded) {
      let updatedClassList = [];
      getClasses(
        {},
        (d) => {
          console.log("getAllClasses");
          console.log(d.data);

          if (isMain) {
            d.data.map((item) => {
              if (
                item.course.course_id == classInfo.course_id &&
                item.name.length <= 5 &&
                item.name !== "1차"
              ) {
                updatedClassList.push(item);
              }
            });
          }
          setClassList(updatedClassList);
        },
        setIsClassLoaded,
        (e) => {
          console.log(e);
        }
      );
    }

    if (isClassLoaded && !isContentLoaded) {
      let introVideoUrl = "";
      let updatedContentList = [];
      getContents(
        {},
        (d) => {
          console.log("getAllContents");
          classList.map((classItem) => {
            d.data.map((contentItem) => {
              if (classItem.class_id == contentItem.class_entity.class_id) {
                updatedContentList.push(contentItem);
                if (contentItem.name === "Orientation") {
                  console.log(contentItem.video_url);
                  console.log(contentItem.is_portrait);
                  introVideoUrl = contentItem.video_url;
                  setIsPortrait(contentItem.is_portrait);
                  setIntroVideoUrl(introVideoUrl);
                }
              }
            });
          });
          setContentsList(updatedContentList);
        },
        setIsContentLoaded,
        (e) => {
          console.log(e);
        }
      );
    }
  }, [isClassLoaded, isContentLoaded, introVideoUrl, isPortrait]);

  return (
    <>
      <StatusBar translucent={false} hidden={true} />
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          flexGrow: 1,
          paddingBottom: 70,
        }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{classInfo.name}</Text>
          <View style={styles.backBtn}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.topShadowContainer}>
          <View style={styles.topContainer}>
            <Image
              source={{
                uri: classInfo.tutor.profile_url,
              }}
              style={styles.imageContainer}
            ></Image>
            <View style={styles.textContainer}>
              <GradientBtn
                text={`${classList.length - 1} Units`}
                textStyle={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 12,
                  fontFamily: "Poppins-Medium",
                }}
                viewStyle={{
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  zIndex: 3,
                  width: 70,
                  height: 30,
                  right: -10,
                  bottom: -120,
                }}
              />
              <View style={styles.classNameHeartContainer}>
                <Text style={styles.className}>{classInfo.name}</Text>
                <TouchableOpacity
                  style={styles.heartContainer}
                  onPress={() => {
                    setIsWishList(!isWishList);
                  }}
                >
                  {isWishList ? (
                    <AntDesign name="heart" size={22} color="#A160E2" />
                  ) : (
                    <AntDesign name="hearto" size={22} color="#A160E2" />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.teacherNameContainer}>
                <Text style={styles.teacherName}>
                  with {classInfo.tutor.name}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.videoContainer}>
          <Video
            usePoster={true}
            // source={{ uri: classInfo.introVideoUrl }}
            source={{
              uri: introVideoUrl,
            }}
            rate={1.0}
            useNativeControls={true}
            style={{ height: 500, width: 300 }}
            // posterSource={{
            //   uri: "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671471320710/shin_yoo_jin_rect.jpg",
            // }}
            // posterStyle={{
            //   height: 500,
            //   width: 300,
            // }}
            resizeMode="stretch"
            isLooping
            onFullscreenUpdate={(status) => {
              // console.log(status);
              const videoStatus = status.fullscreenUpdate; // 1이면 전체화면 표시완료, 3이면 닫기 완료
              setVideoStatus(videoStatus);
              setOrientation(videoStatus);
            }}
            slider={{ visible: true }}
            ref={videoPlayer}
          />
        </View>

        <View style={styles.classAndteacherContainer}>
          <Text style={styles.classInfoText}>{classInfo.info}</Text>
          {/* {classList.map((classItem) => {
            return <Text>{classItem.name}</Text>;
          })}
          {contentsList.map((contentItem) => {
            return <Text>{contentItem.name}</Text>;
          })} */}
        </View>

        {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("MyWishList", {
                classInfo: route.params.classInfo,
                isAdd: true,
              });
            }}
          >
            <View style={styles.cartBtn}>
              <Image source={require("../assets/img/btn-purple.png")}></Image>
              <Text style={styles.cartBtnText}>add to wishlist</Text>
            </View>
          </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            // const payList = [{ ...classInfo }];
            navigation.navigate("Payment", {
              item: classInfo,
              unitsNum: contentsList.length,
            });
          }}
        >
          <View style={styles.payBtn}>
            <Text style={styles.payBtnText}>buy now</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",

    marginBottom: 20,
    backgroundColor: "white",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    width: "100%",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    fontFamily: "Poppins-SemiBold",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  imageContainer: {
    width: "35%",
    height: "80%",
    marginRight: 10,
    borderRadius: 20,
  },
  backBtn: {
    position: "absolute",
    top: 35,
    left: 20,
  },
  img: {
    width: 150,
    height: 150,
    marginRight: 15,
    borderRadius: 10,
  },

  topShadowContainer: {
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: "#fff",
    borderRadius: 9,
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

  topContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingTop: 5,
    borderRadius: 9,
  },

  textContainer: {
    width: "55%",
    height: "80%",
    position: "relative",
  },
  classNameHeartContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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

  videoContainer: {
    flex: 3,
    height: 500,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  classAndteacherContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  classInfoText: {
    padding: 10,
    fontFamily: "Poppins-Regular",
  },

  payBtn: {
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30,
    backgroundColor: "#A160E2",
    borderRadius: 10,
  },

  payBtnText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
});

export default ClassInfo;
