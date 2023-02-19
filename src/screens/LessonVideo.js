import { Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity, BackHandler } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Video, VideoFullscreenUpdate } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "react-native";
import { getSlidesByContentId } from '../modules/NetworkFunction';
import LessonSlides from '../components/LessonSlides'
import { AntDesign } from "@expo/vector-icons"; 


const LessonVideo = ({ route, navigation }) => {

  const is_portrait = route.params.is_portrait;
  const [isHome, setIsHome] = useState(route.params.isHome);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("screen").width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get("screen").height);

  const [contentId, setContentId] = useState(route.params.content_id);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoPlayer = useRef();
  const [videoStatus, setVideoStatus] = useState(3);
  const [slideList, setSlideList] = useState([]);
  const [isSlideLoaded, setIsSlideLoaded] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!isSlideLoaded) {
      getSlidesByContentId(
        { content_id: contentId },
        (d) => {
          // console.log(d.data)
          d.data.map((item) => {
            setSlideList((prev) => {
              return [...prev, item];
            });
          });
          // console.log('slidelist data')
        },
        setIsSlideLoaded,
        (e) => {
          console.log(e);
        }
      );
    }
    // console.log(slideList)

    // console.log("useEffect");
  }, [isFullScreen, isSlideLoaded]);

  useEffect(() => {
    const backAction = () => {
      if (isHome) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }else{
        navigation.goBack();
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    setVideoStatus(fullscreenUpdate);

    if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT) {
      await ScreenOrientation.unlockAsync();
    } else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: screenWidth,
          height: 70,
          justifyContent: "center",
          paddingLeft: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (isHome) {
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            } else {
              navigation.goBack();
            }
          }}
        >
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <StatusBar translucent={false} hidden={true} />
      <Video
        source={{
          uri: route.params.video_url,
        }}
        rate={1.0}
        useNativeControls={true}
        resizeMode={"contain"}
        style={{
          height:
            videoStatus === 1
              ? screenWidth
              : is_portrait
              ? screenWidth * (16 / 9)
              : screenWidth,
          zIndex: videoStatus === 1 ? 3 : 1,
          backgroundColor: "#000",
        }}
        isLooping
        onFullscreenUpdate={onFullscreenUpdate}
        slider={{ visible: true }}
        ref={videoPlayer}
        onPlaybackStatusUpdate={(status) => {
          // console.log('status', status);
          setCurrentTime(status.positionMillis);

          if (status.didJustFinish) {
            videoPlayer.current.replayAsync();
          }
        }}
      />
      {is_portrait ? null : (
        <LessonSlides
          currentTime={currentTime}
          slideList={slideList}
          screenWidth={screenWidth}
          screenHeight={screenHeight}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor:"#fff",
  },
  
  
});

export default LessonVideo;
