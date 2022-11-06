import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

import * as ScreenOrientation from "expo-screen-orientation";
import { Video } from "expo-av";

const LessonVideo = ({ navigation, route }) => {
  const [inFullscreen2, setInFullsreen2] = useState(false);
  const [inFullscreen, setInFullsreen] = useState(false);
  const refVideo = useRef(null);

  return (
    <View style={styles.container}>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.STRETCH,
          source: {
            uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          },
          ref: refVideo,
        }}
        fullscreen={{
          enterFullscreen: () => {
            setInFullsreen(!inFullscreen);
            refVideo.current.setStatusAsync({
              shouldPlay: true,
            });
          },
          exitFullscreen: () => {
            setInFullsreen(!inFullscreen);
            refVideo.current.setStatusAsync({
              shouldPlay: true,
            });
          },
          inFullscreen,
        }}
        style={{
          videoBackgroundColor: "black",
          height: inFullscreen
            ? Dimensions.get("window").height
            : Dimensions.get("window").height,
          width: inFullscreen
            ? Dimensions.get("window").width
            : Dimensions.get("window").width,
        }}
        slider={{
          visible: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 25,
    alignItems: "center",
  },
});

export default LessonVideo;
