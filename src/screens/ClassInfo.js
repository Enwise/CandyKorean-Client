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

import { ResizeMode } from "expo-av";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "react-native";
import GradientBtn from "../components/GradientButtonView";

const ClassInfo = ({ props, navigation, route }) => {
  const [unitsNum, setUnitsNum] = useState(9);
  const [classInfo, setClassInfo] = useState(route.params.classInfo);
  const [isWishList, setIsWishList] = useState(false);

  const [url, setUrl] = useState("");
  //useEffect(async () => {}, []);

  // const videoCompress = async () => {
  //   await VideoCompress.compress(
  //     "../assets/videos/shin_yoo_jin/1차시.mp4",
  //     {
  //       compressionMethod: "auto",
  //     },
  //     (progress) => {
  //       console.log({ compression: progress });
  //     }
  //   ).then(async (compressedFileUrl) => {
  //     return compressedFileUrl;
  //   });
  // };

  const [isPortrait, setIsPortrait] = useState(classInfo.isPortrait); // false면 가로, true면 세로

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
  }, []);

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
                uri: "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671463082652/shin_yoo_jin_square.jpg",
              }}
              style={styles.imageContainer}
            ></Image>
            <View style={styles.textContainer}>
              <GradientBtn
                text={`${classInfo.units} Units`}
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
                  right: 0,
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
                <Text style={styles.teacherName}>with {classInfo.name}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.videoContainer}>
          <Video
            source={{ uri: classInfo.introVideoUrl }}
            rate={1.0}
            useNativeControls={true}
            style={{ height: 500, width: 300 }}
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
          <Text style={styles.teacherInfoText}>Ph.D Korean education</Text>
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
            navigation.navigate("Payment", { item: classInfo });
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
    marginTop: 150,
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
