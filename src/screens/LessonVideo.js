import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "react-native";
import { getSlidesByContentId } from '../modules/NetworkFunction';
import LessonSlides from '../components/LessonSlides'

const LessonVideo = ({ route, navigation }) => {

  const isPortrait = route.params.isPortrait;
  const [contentId, setContentId] = useState(route.params.content_id);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoPlayer = useRef();
  const [videoStatus, setVideoStatus] = useState(3);
  const [slideList, setSlideList] = useState([]);
  const [isSlideLoaded, setIsSlideLoaded] = useState(false);

  useEffect(() => {
    
    if(!isSlideLoaded){
      getSlidesByContentId(
        { content_id : contentId },
        (d) => {
          console.log(d.data)
          d.data.map((item) => {
            setSlideList((prev) => {
              return [...prev, item.img_url]
            })
          })
          console.log('slidelist data')
        },
        setIsSlideLoaded,
        (e) => {
          console.log(e)
        }
        )
      }
      console.log(slideList)
    

    
    console.log("useEffect");
  }, [isFullScreen, isSlideLoaded]);


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
        source={{
          uri: route.params.video_url,
        }}
        rate={1.0}
        useNativeControls={true}
        resizeMode={"contain"}
        style={{
          height: videoStatus === 1 ? Dimensions.get("screen").height : isPortrait ? "100%" : "60%",
          zIndex: videoStatus === 1 ? 3 : 1,
          backgroundColor: "#000",
        }}
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
      {isPortrait ? null : 
        <LessonSlides slideList={slideList}/>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  
});

export default LessonVideo;
