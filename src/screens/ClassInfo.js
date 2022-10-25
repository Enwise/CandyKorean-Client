import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

const ClassInfo = ({ props, navigation, route }) => {
  const maintitle = route.params.maintitle;
  const className = route.params.classInfo.className;
  const teacherName = route.params.classInfo.teacherName;

  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      <View style={styles.backBtnContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ClassMore", { maintitle: maintitle });
          }}
        >
          <Ionicons name="arrow-back" size={35} color="black" />
        </TouchableOpacity>
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
          <View>
            <Text style={styles.teacherName}>{teacherName}</Text>
          </View>

          <View>
            <Text style={styles.unitsNum}>9 Units</Text>
          </View>
        </View>
      </View>
      <View style={styles.classAndteacherContainer}>
        <Text style={styles.classInfoText}>
          Let's study real Korean formal language!
        </Text>
        <Text style={styles.teacherInfoText}>Ph.D Korean education</Text>
      </View>
      <View style={styles.videoContainer}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? "Pause" : "Play"}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.cartBtn}>
          <Button
            title="Add to Cart"
            onPress={() => {
              navigation.navigate("MyCart");
            }}
          ></Button>
        </View>
        <View style={styles.payBtn}>
          <Button
            title="Buy Now"
            onPress={() => {
              navigation.navigate("Payment");
            }}
          ></Button>
        </View>
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
  img: {
    width: 150,
    height: 150,
    marginRight: 15,
  },
  topContainer: {
    flexDirection: "row",
    marginTop: 100,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 35,
  },
  backBtnContainer: {
    position: "absolute",
    right: 0,
    top: 50,
  },
  className: {
    width: "100%",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  teacherName: {
    textAlign: "center",
    marginBottom: 10,
  },
  classAndteacherContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 100,
  },
  cartBtn: {
    width: 130,
    marginRight: 10,
  },
  payBtn: {
    width: 130,
    marginLeft: 10,
  },
});
export default ClassInfo;
