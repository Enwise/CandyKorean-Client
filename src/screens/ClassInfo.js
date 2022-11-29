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

const ClassInfo = ({ props, navigation, route }) => {
  const [unitsNum, setUnitsNum] = useState(9);
  const [classInfo, setClassInfo] = useState(route.params.classInfo);
  const [isWishList, setIsWishList] = useState(false);

  console.log(classInfo);
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
          <Text style={styles.title}>{classInfo.className}</Text>
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
        <View style={styles.topContainer}>
          <Image
            source={classInfo.profileUrl}
            style={styles.imageContainer}
          ></Image>
          <View style={styles.textContainer}>
            <View style={styles.classNameHeartContainer}>
              <Text style={styles.className}>{classInfo.className}</Text>
              <TouchableOpacity
                style={styles.heartContainer}
                onPress={() => {
                  setIsWishList(!isWishList);
                }}
              >
                {isWishList ? (
                  <AntDesign name="heart" size={24} color="#A160E2" />
                ) : (
                  <AntDesign name="hearto" size={24} color="#A160E2" />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.teacherNameContainer}>
              <Text style={styles.teacherName}>
                with {classInfo.teacherName}
              </Text>
            </View>
            <View style={styles.unitsImg}>
              <Image source={require("../assets/img/units_btn.png")}></Image>
              <Text style={styles.unitsNumText}>{classInfo.units} Units</Text>
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
          <Text style={styles.classInfoText}>
            Let's study real Korean formal language!
          </Text>
          <Text style={styles.teacherInfoText}>Ph.D Korean education</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // const payList = [{ ...classInfo }];
              navigation.navigate("Payment", { item: classInfo });
            }}
          >
            <View style={styles.payBtn}>
              <Image source={require("../assets/img/btn-purple.png")}></Image>
              <Text style={styles.payBtnText}>buy now</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    width: "100%",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginTop: 30,
    fontFamily: "Poppins-SemiBold",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  imageContainer: {
    width: "35%",
    height: "100%",
    marginRight: 10,
    borderRadius: 20,
  },
  backBtn: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  img: {
    width: 150,
    height: 150,
    marginRight: 15,
    borderRadius: 10,
  },
  topContainer: {
    flexDirection: "row",
    marginTop: 30,
    width: "100%",
    height: 150,
    paddingLeft: 20,
  },

  textContainer: {
    flexDirection: "column",
    width: "55%",
    alignItems: "flex-start",
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
  unitsImg: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },

  unitsNumText: {
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
    position: "absolute",
    bottom: 0,
    right: 8,
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
  buttonContainer: {
    width: 230,
    flexDirection: "row",
    marginTop: 100,
    marginBottom: 30,
  },
  cartBtn: {
    width: 55,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 125,
  },
  payBtn: {
    width: 50,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  cartBtnText: {
    width: 100,
    textAlign: "center",
    position: "absolute",
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  payBtnText: {
    width: 100,
    textAlign: "center",

    position: "absolute",
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
});

// const dstyles = (videoStatus) =>
//   StyleSheet.create({
//     video: {
//       height: "100%",
//     },
//   });
export default ClassInfo;
