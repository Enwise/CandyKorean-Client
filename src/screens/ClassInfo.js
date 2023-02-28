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
  BackHandler
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "react-native";
import GradientBtn from "../components/GradientButtonView";
import {
  getClasses,
  getContents,
  getWishlistByUser,
  createWishlist,
  deleteWishlist,
  getClassesCountByCourseId,
} from "../modules/NetworkFunction";
import AuthContext from "../contexts/AuthContext";
import { useIsFocused } from '@react-navigation/native'; 

const ClassInfo = ({ props, navigation, route }) => {
  const [isMain, setIsMain] = useState(route.params?.isMain);
  const isHome = route.params?.isHome;
  const [isWish, setIsWish] = useState(false);
  const [isClassLoaded, setIsClassLoaded] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [classList, setClassList] = useState([]);
  const [contentsList, setContentsList] = useState([]);
  const [isPortrait, setIsPortrait] = useState(true);

  const [introVideoUrl, setIntroVideoUrl] = useState("");
  const classInfo = route.params.classInfo;
  const [isProcessLoaded, setIsProcessLoaded] = useState(false);

  const videoPlayer = useRef();
  const [videoStatus, setVideoStatus] = useState(3);
  const { authState } = React.useContext(AuthContext);
  const [userId, setUserId] = useState("");

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('screen').width)

  const [isWishLoaded, setIsWishLoaded] = useState(false);
  
  const [isClassCountLoaded, setIsClassCountLoaded] = useState(false);
  const [unitsNum, setUnitsNum] = useState(0);

  const isFocused = useIsFocused(); // isFoucused를 통해 화면이 focus 되었을 때 useEffect 실행

  const setOrientation = (status) => {
    if (status === 1 && !isPortrait) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  const handlePressBack = () => {
    if(isHome){
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
      return true
    }
    videoPlayer.current.pauseAsync();

    if (navigation?.canGoBack()){
      navigation.goBack();
      return true
    } 
    return false
  }

  const handleWishlist = () => {
    console.log('wishlist heart clicked')
    console.log('isWish', isWish)
    if (isWish) {
      deleteWishlist(
        {user_id: authState.user_id, course_id: classInfo.course_id },
        (d) => {
          console.log('delete wishlist success')
          setIsWish(false);
        },
        () => {},
        (e) => {
          console.log(e);

        }
      );
    } else {
      createWishlist(
        {user_id: userId, course_id: classInfo.course_id, checked: true },
        (d) => {
          console.log('create wishlist success')
          setIsWish(true);
        },
        () => {},
        (e) => {
          console.log(e);
        }
      );
    }


  }

  useEffect(() => {

    console.log(authState.userId);
    setUserId(authState.userId);

    BackHandler.addEventListener('hardwareBackPress', handlePressBack);
    
    setIsProcessLoaded(false);

    console.log("----------------classInfo--------------------");
    console.log(route.params.classInfo);

    // console.log(classInfo);

    console.log(classInfo.course_id);
    
 // console.log(classInfo.introVideoUrl);

    // class, content, 그리고 tutor 정보 가져와야함
    // class, content ->  Units 갯수가 얼마인지 알기위해

    // course_id
    // 1 : Yoojin
    // class_id : OT: 1, 1차시 ~ 10차시 : 3 ~ 12

    // 2 : Seongyeop
    // class_id : OT: 13, 1차시 ~ 10차시 : 15 ~ 24

    // 3 : Kyungeun
    // class_id : OT: 25, 1강 ~ 10강 : 26 ~ 35
    


  
    console.log('isContentLoading')
    
    getContents(
      {},
      (d) => {
        console.log("getAllContents");
  
          d.data.map((contentItem) => {
            
          
            if (
              contentItem.name == "Orientation" && contentItem.class_entity.course_id == route.params.classInfo.course_id
              || contentItem.name == "OT_SeongyeopT" && contentItem.class_entity.course_id == route.params.classInfo.course_id
              || contentItem.name == "OT_KyungeunT" && contentItem.class_entity.course_id == route.params.classInfo.course_id
              
              ) {
                console.log('video url', introVideoUrl);
                setIntroVideoUrl(contentItem.video_url);
                // console.log(contentItem.video_url);
                // console.log(contentItem.is_portrait);
                
                setIsPortrait(contentItem.is_portrait);
                
              } 
              return;
          });
        
      },
      setIsContentLoaded,
      (e) => {
        console.log(e);
      }
    );

    if(!isWishLoaded){
      getWishlistByUser(
        {user_id: authState.userId},
        (d) => {
          console.log("getWishlists");
          console.log(d.data);
          d.data.map((item) => {
            if (item.course_id == route.params.classInfo.course_id && item.user_id == userId) {
              console.log("wishlist true!!")
              setIsWish(true);
            } 
          });
          setIsWishLoaded(true);
        },
        () => {},
        (e) => {
          console.log(e);
        }
      );
    }

    if(!isClassCountLoaded) {
      getClassesCountByCourseId(
        {
          id : route.params.classInfo.course_id
        },
        (d) => { setUnitsNum(d.data) },
        setIsClassCountLoaded,
        (e) => {console.log(e)}
      )
    }

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handlePressBack);
    }
    
  }, [route.params.classInfo, isWish, isWishLoaded, userId, unitsNum, isClassCountLoaded, isFocused, isPortrait, introVideoUrl]);

  return (
    <>
      <StatusBar translucent={false} hidden={true} />
      
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          flexGrow: 1,
          paddingBottom: 70,
        }}
        // showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={styles.titleContainer}>
        <View style={styles.backBtn}>
            <TouchableOpacity
              onPress={() => {
                // navigation.goBack();
                isHome
                  ? navigation.reset({ routes: [{ name: "Home" }] })
                  : navigation.reset({ routes: [{ name: "ClassMain" }] });
              }}
            >
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
          </View>
      </View>
        <View style={styles.topShadowContainer}>
          <View style={styles.topContainer}>
            <Image
              source={{
                uri: classInfo.tutor.profile_url,
              }}
              style={styles.imageContainer}
            ></Image>
            <View style={styles.textContainer}>
              <GradientBtn
                text={
                  `${unitsNum - 1} Units`
                }
                textStyle={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 12,
                  fontFamily: "Poppins-Medium",
                }}
                viewStyle={{
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  zIndex: 3,
                  width: 70,
                  height: 30,
                  right: -10,
                  bottom: -120,
                }}
              />
              <View style={styles.classNameHeartContainer}>
                <Text style={styles.className}>{classInfo.name}</Text>
                <TouchableOpacity
                  style={styles.heartContainer}
                  onPress={() => {
                    handleWishlist();
                  }}
                >
                  {isWish ? (
                    <AntDesign name="heart" size={22} color="#A160E2" />
                  ) : (
                    <AntDesign name="hearto" size={22} color="#A160E2" />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.teacherNameContainer}>
                <Text style={styles.teacherName}>
                  with {classInfo.tutor.name}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{
          flex: 3,
          width: isPortrait ? 300 : screenWidth,
          height: isPortrait ? 500 : screenWidth * 0.5625,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,}}>
          <Video
            usePoster={true}
            // source={{ uri: classInfo.introVideoUrl }}
            source={{
              uri: introVideoUrl,
            }}
            rate={1.0}
            useNativeControls={true}
            style={{ width: "100%", 
                    height: "100%", 
                    backgroundColor: "#000" }}
            // posterSource={{
            //   uri: "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671471320710/shin_yoo_jin_rect.jpg",
            // }}
            // posterStyle={{
            //   height: 500,
            //   width: 300,
            // }}
            resizeMode={isPortrait ? "stretch" : "contain"}
            isLooping
            shouldPlay
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
          <Text style={styles.classInfoText}>{classInfo.info}</Text>
          {/* {classList.map((classItem) => {
            return <Text>{classItem.name}</Text>;
          })}
          {contentsList.map((contentItem) => {
            return <Text>{contentItem.name}</Text>;
          })} */}
        </View>

        {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            videoPlayer.current.pauseAsync();
            // const payList = [{ ...classInfo }];
            navigation.navigate("Payment", {
              item: classInfo,
              unitsNum : 10,
            });
          }}
        >
          <View style={styles.payBtn}>
            <Text style={styles.payBtnText}>buy now</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    
    marginBottom: 20,
    backgroundColor: "#fdfdfd",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    width: "100%",
    backgroundColor: "#fdfdfd",
    marginBottom:40,
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    fontFamily: "Poppins-SemiBold",
    backgroundColor: "#fdfdfd",
    textAlign: "center",
  },
  imageContainer: {
    width: "35%",
    height: "80%",
    marginRight: 10,
    borderRadius: 20,
  },
  backBtn: {
    position: "absolute",
    top: 5,
    left: 20,
  },
  img: {
    width: 150,
    height: 150,
    marginRight: 15,
    borderRadius: 10,
  },

  topShadowContainer: {
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: "#fdfdfd",
    borderRadius: 9,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
      },

      android: {
        shadowColor: "rgba(0,0,0,0.5)",
        elevation: 5,
      },
    }),
  },

  topContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fdfdfd",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingTop: 5,
    borderRadius: 9,
  },

  textContainer: {
    width: "55%",
    height: "80%",
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
    fontSize: 15,
    marginRight: 5,
  },
  teacherName: {
    marginBottom: 10,
    textAlign: "left",
    width: "100%",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#444345",
  },

  classAndteacherContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  classInfoText: {
    padding: 10,
    fontFamily: "Poppins-Regular",
  },

  payBtn: {
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#A160E2",
    borderRadius: 10,
  },

  payBtnText: {
    textAlign: "center",
    color: "#fdfdfd",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
});

export default ClassInfo;
