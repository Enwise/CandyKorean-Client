import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "react-native";

const LessonVideo = ({ route, navigation }) => {
  const isPortrait = route.params.isPortrait;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoPlayer = useRef();
  const [videoStatus, setVideoStatus] = useState(3);

  useEffect(() => {
    // StatusBar.setBackgroundColor("transparent");
    // StatusBar.setTranslucent(true);
    // StatusBar.setBarStyle("dark-content");

    console.log("useEffect");
  }, [isFullScreen]);

  const setOrientation = (status) => {
    if (status === 1 && !isPortrait) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} hidden={true} />
      <Video
        // source={{
        //   uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        // }}
        source={{
          uri: route.params.video_url,
        }}
        rate={1.0}
        useNativeControls={true}
        resizeMode={"contain"}
        style={dstyles(videoStatus).video}
        isLooping
        onFullscreenUpdate={(status) => {
          // console.log(status);
          const videoStatus = status.fullscreenUpdate; // 1이면 전체화면 표시완료, 3이면 닫기 완료
          setVideoStatus(videoStatus);
          setOrientation(videoStatus);
        }}
        slider={{ visible: true }}
        ref={videoPlayer}
        shouldPlay
      />
      <View style={styles.lectureNoteContainer}>
        <Text style={styles.lectureNote}>강의노트</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  lectureNoteContainer: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const dstyles = (videoStatus) =>
  StyleSheet.create({
    video: {
      height: videoStatus === 1 ? Dimensions.get("window").height : "60%",
      zIndex: videoStatus === 1 ? 3 : 1,
      backgroundColor: "#000",
    },
  });

export default LessonVideo;
