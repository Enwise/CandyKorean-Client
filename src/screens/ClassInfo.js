import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

const ClassInfo = ({ props, navigation, route }) => {
  const className = route.params.classInfo.className;
  const teacherName = route.params.classInfo.teacherName;
  // const isMain = route.params.isMain;

  // const video = useRef(null);
  // const [status, setStatus] = useState({});
  const [unitsNum, setUnitsNum] = useState(9);

  const [inFullscreen, setInFullsreen] = useState(false);
  const [inFullscreen2, setInFullsreen2] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const refVideo = useRef(null);
  const refVideo2 = useRef(null);
  const refScrollView = useRef(null);

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{ ...styles.container, flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{className}</Text>
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
        <View style={styles.imageContainer}>
          <Image
            style={styles.img}
            source={require("../assets/img/sample_class_img1.jpeg")}
          ></Image>
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.className}>{className}</Text>
          </View>
          <View style={styles.teacherNameContainer}>
            <Text style={styles.teacherName}>with {teacherName}</Text>
          </View>
          <View style={styles.unitsImg}>
            <Image source={require("../assets/img/units_btn.png")}></Image>
            <Text style={styles.unitsNumText}>{unitsNum} Units</Text>
          </View>
        </View>
      </View>

      <View style={styles.videoContainer}>
        <VideoPlayer
          videoProps={{
            shouldPlay: true,
            resizeMode: ResizeMode.STRETCH,
            // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
            source: {
              uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
          }}
          fullscreen={{
            enterFullscreen: async () => {
              setStatusBarHidden(true, "fade");
              setInFullsreen2(!inFullscreen2);
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
              );
              refVideo2.current.setStatusAsync({
                shouldPlay: true,
              });
            },
            exitFullscreen: async () => {
              setStatusBarHidden(false, "fade");
              setInFullsreen2(!inFullscreen2);
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.DEFAULT
              );
            },
          }}
          style={{
            videoBackgroundColor: "black",
            height: inFullscreen2 ? Dimensions.get("window").width : 500,
            width: inFullscreen2 ? Dimensions.get("window").height : 300,
          }}
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
            navigation.navigate("MyCart", {
              classInfo: route.params.classInfo,
              isAddToCart: true,
            });
          }}
        >
          <View style={styles.cartBtn}>
            <Image source={require("../assets/img/btn-purple.png")}></Image>
            <Text style={styles.cartBtnText}>add to cart</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Payment");
          }}
        >
          <View style={styles.payBtn}>
            <Image source={require("../assets/img/btn-purple.png")}></Image>
            <Text style={styles.payBtnText}>buy now</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
    backgroundColor: "white",
  },
  titleContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    paddingLeft: 150,
    zIndex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    marginTop: 30,
    fontFamily: "Poppins-SemiBold",
  },
  backBtn: {
    position: "absolute",
    top: 40,
    left: -100,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    marginTop: 50,
  },

  classAndteacherContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 230,
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
export default ClassInfo;
