import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import Video from "react-native-video";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const ClassInfo = ({ props, navigation, route }) => {
  const className = route.params.classInfo.className;
  const teacherName = route.params.classInfo.teacherName;
  const isMain = route.params.isMain;

  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [unitsNum, setUnitsNum] = useState(9);

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{className}</Text>
        <View style={styles.backBtn}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ClassMain");
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
        {/* <Video
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          style={styles.fullScreen}
          paused={false} // 재생/중지 여부
          resizeMode={"cover"} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
          onLoad={(e) => console.log(e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
          repeat={true} // video가 끝나면 다시 재생할 지 여부
          onAnimatedValueUpdate={() => {}}
        /> */}
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
            navigation.navigate("MyCart");
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  titleContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
  },
  backBtn: {
    position: "absolute",
    top: 10,
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
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  classAndteacherContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonContainer: {
    width: 210,
    flexDirection: "row",
    marginTop: 30,
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
