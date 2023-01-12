import React from "react";
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import SmallLogoIcon from "../assets/icons/SmallLogoIcon";
import * as Linking from "expo-linking";
import { LinearGradient } from "expo-linear-gradient";
import RecommendedClassList from "../components/RecommendedClassList";
import ProgressLecture from "../components/ProgressLecture";
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";
import AuthContext from "../contexts/AuthContext";
import { getUserById, updateUser } from "../modules/NetworkFunction";
import RightIcon from "../assets/icons/RightIcon";
import HomeCarousel from "../components/HomeCarousel";
import LollipopBanner from "../assets/img/LollipopBanner";
import { NavigationHelpersContext } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Home = ({ navigation }) => {
  const { authState } = React.useContext(AuthContext);
  const [user, setUser] = React.useState(null);
  const updateAttendance = async (
    userId,
    lastLoginDate,
    continuous_attendance_day
  ) => {
    // user table의 마지막 로그인 날짜와 오늘 날짜 비교해서 연속 출석 일수 update
    let today = new Date();
    let lastLogin = new Date(lastLoginDate);
    let diff = today.getDate() - lastLogin.getDate();
    let update_data = { userId: userId, date_last_login: today };

    if (diff === 1) {
      update_data.continuous_attendance = continuous_attendance_day + 1;
    }
    if (diff > 1) {
      update_data.continuous_attendance = 1;
    }
    await updateUser(
      update_data,
      (d) => {
        if (d.message === "updated") {
          // console.log("연속 출석일수 update");
        }
        setUser(d.data);
      },
      () => {},
      (e) => {
        console.log("updateUser error", e);
      }
    );
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const nth = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const DateComponent = () => {
    const date = new Date();
    const month = months[date.getMonth()];
    const day = date.getDate();

    return (
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {month}. {day + nth(day)}
        </Text>
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      let lastLoginDate, continuous_attendance_day;
      const getUser = async () => {
        await getUserById(
          authState.userId,
          (d) => {
            setUser(d.data);
            lastLoginDate = d.data.date_last_login;
            continuous_attendance_day = d.data.continuous_attendance;
          },
          () => {},
          (e) => {
            console.log("getUserById error");
          }
        );

        updateAttendance(
          authState.userId,
          lastLoginDate,
          continuous_attendance_day
        );
      };
      getUser();
    }, [authState])
  );

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 120,
        backgroundColor: "white",
      }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <LinearGradient
          colors={["rgba(132, 233, 255, 0.8)", "rgba(201, 132, 255, 0.8)"]}
          locations={[0, 1]}
          start={[0.025, 0.5]}
          end={[0.975, 0.5]}
          style={{
            height: windowHeight * 0.3,
            borderBottomRightRadius: 50,
            position: "relative",
          }}
        >
          <View style={styles.header}>
            <SmallLogoIcon />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 23,
              paddingHorizontal: 20,
            }}
          >
            <DateComponent />
            <View>
              <Text style={styles.headerText}>
                Hello,{" "}
                <Text style={{ fontFamily: "Poppins-Bold" }}>
                  {user ? user.name : ""}
                </Text>
              </Text>
              <Text style={styles.headerText}>
                {user ? user.continuous_attendance : "1"}일째 연속 출석
                중이에요!
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        <ProgressLecture userId={authState.userId} navigation={navigation} />

        <View style={{ marginTop: 0 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 12,
              paddingEnd: 15,
            }}
          >
            <Text style={[styles.title]}>Recommended Class</Text>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={() => {
                navigation.reset({
                  routes: [{ name: "Class", screen: "ClassMain" }],
                });
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 10,
                  color: "#807F82",
                  textAlign: "center",
                }}
              >
                MORE
              </Text>
              <RightIcon />
            </TouchableOpacity>
          </View>

          <RecommendedClassList navigation={navigation} />
        </View>
      </View>
      <HomeCarousel />
      <View style={{ marginTop: 37 }}>
        <Text style={[styles.title]}>Free Korean Classes</Text>
        <TouchableOpacity
          style={{ marginVertical: 13 }}
          activeOpacity={0.8}
          onPress={() => {
            Linking.openURL("https://www.instagram.com/candy._.korean");
          }}
        >
          <Image source={require("../assets/img/img_instagram.png")} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            Linking.openURL("https://www.instagram.com/candy._.korean");
          }}
        >
          <LinearGradient
            colors={["#84E9FF", "#C284FF"]}
            locations={[0, 1]}
            start={[0.025, 0.5]}
            end={[0.975, 0.5]}
            style={styles.button}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "white",
              }}
            >
              @candy._.korean
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

    // position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Constants.statusBarHeight + 12,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    marginLeft: 20,
  },
  textInput: {
    width: "100%",
    height: 75,
    marginTop: 15,
    backgroundColor: "#ffffff",
    borderRadius: 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  alignRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 9,
    // paddingHorizontal: 20,
  },
  alignColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text1: {
    fontSize: 14,
    color: "#B8B5BC",
    fontWeight: "400",
  },
  text2: {
    fontSize: 13,
    color: "#000000",
    fontWeight: "400",
  },
  text3: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "400",
  },
  imgAlign: {
    display: "flex",
    marginLeft: "auto",
    marginRight: 5,
    width: 22,
    height: 22,
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: "#4CDFFF",
    borderRadius: 105,
    backgroundColor: "white",
    paddingHorizontal: 13,
    paddingVertical: 3,
    marginBottom: 10,
    width: 97,
  },
  dateText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#737373",
    lineHeight: 21,
    textAlign: "center",
  },
  headerText: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    color: "black",
    lineHeight: 27,
  },
  content: {
    // paddingLeft: 20,
    marginTop: 42,
  },
  button: {
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingHorizontal: 7,
    alignSelf: "center",
  },
  buttonContainer: {
    borderRadius: 10,
    alignSelf: "center",
    ...Platform.select({
      ios: {
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 4,
        shadowColor: "rgba(0,0,0,0.25)",
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default Home;
// const sample_translate = ["See you next time", "다음에 보자"];

// const [sound, setSound] = React.useState();

// async function playSound() {
//   console.log("Loading Sound");
//   const { sound } = await Audio.Sound.createAsync(
//     require("../s/sound/file_example_MP3_700KB.mp3")
//   );
//   setSound(sound);

//   console.log("Playing Sound");
//   await sound.playAsync();
// }

// React.useEffect(() => {
//   return sound
//     ? () => {
//         console.log("Unloading Sound");
//         sound.unloadAsync();
//       }
//     : undefined;
// }, [sound]);
//  <View style={{ marginTop: 20, marginBottom: 30, height: 130 }}>
//         {/* <Text style={{ fontSize: 18, fontWeight: "500" }}>Hello, Bony</Text> */}
//         <View style={styles.textInput}>
//           <View style={styles.alignRow}>
//             <View style={styles.alignColumn}>
//               <Text style={styles.text1}>Eng</Text>
//               {/* <Text style={styles.text2}>{sample_translate[0]}</Text> */}
//             </View>
//             <View>
//               <Image
//                 source={require("../s/img/btn-purple.png")}
//                 style={{ width: 28, height: 1 }}
//               />
//             </View>
//             <View style={styles.alignColumn}>
//               <Text style={styles.text1}>Kor</Text>
//               {/* <Text style={styles.text3}>{sample_translate[1]}</Text> */}
//             </View>
//           </View>

//           {/* <TouchableOpacity onPress={playSound}>
//             <Image
//               source={require("../s/img/home-sound-icon.png")}
//               style={styles.imgAlign}
//             />
//           </TouchableOpacity> */}
//         </View>
