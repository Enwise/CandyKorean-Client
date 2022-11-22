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
import { useFonts } from "expo-font";
import { ResizeMode } from "expo-av";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "react-native";
import { Video as VideoCompress } from "react-native-compressor";

const ClassInfo = ({ props, navigation, route }) => {
  const [unitsNum, setUnitsNum] = useState(9);
  const [classInfo, setClassInfo] = useState(route.params.classInfo);
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
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

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
            source={classInfo.imgUrl}
            style={styles.imageContainer}
          ></Image>
          <View style={styles.textContainer}>
            <View>
              <Text style={styles.className}>{classInfo.className}</Text>
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
    position: "relative",
    backgroundColor: "white",
  },
  titleContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    width: "100%",
    zIndex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    marginTop: 30,
    fontFamily: "Poppins-SemiBold",
  },
  imageContainer: {
    width: 150,
    height: 250,
    marginRight: 10,
    borderRadius: 20,
  },
  backBtn: {
    position: "absolute",
    top: 40,
    right: 230,
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
  },

  textContainer: {
    flexDirection: "column",
    width: 150,
    alignItems: "flex-start",
    position: "relative",
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
