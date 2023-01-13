import { Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "react-native";
import { getSlidesByContentId } from '../modules/NetworkFunction';
import LessonSlides from '../components/LessonSlides'
import { AntDesign } from "@expo/vector-icons"; 


const LessonVideo = ({ route, navigation }) => {

  const is_portrait = route.params.is_portrait;
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("screen").width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get("screen").height);

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
    if (status === 1 && !is_portrait) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{
        width: screenWidth,
        height: 70,
        justifyContent:'center',
        paddingLeft: 30,
      }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
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
          height: videoStatus === 1 ? screenWidth : (is_portrait ? screenWidth * (16 / 9) : screenWidth),
          zIndex: videoStatus === 1 ? 3 : 1,
          backgroundColor: "#000",
        }}
        isLooping
        onFullscreenUpdate={
          
          (status) => {
          // console.log(status);
          const videoStatus = status.fullscreenUpdate; // 1이면 전체화면 표시완료, 3이면 닫기 완료
          setVideoStatus(videoStatus);
          setOrientation(videoStatus);
        }}
        slider={{ visible: true }}
        ref={videoPlayer}
        shouldPlay
      />
      {is_portrait ? null : 
        <LessonSlides slideList={slideList} screenWidth={screenWidth} screenHeight={screenHeight}/>
      }
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
