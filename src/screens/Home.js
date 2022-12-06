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
import NoticeIcon from "../assets/icons/NoticeIcon";

import RecommendedLecture from "../components/RecommendedLecture";
import { LinearGradient } from "expo-linear-gradient";
import RecommendedLecList from "../components/RecommendedLecList";
import ProgressLecture from "../components/ProgressLecture";

import { Audio } from "expo-av";
import AuthContext from "../contexts/AuthContext";
import { getUserById } from "../modules/NetworkFunction";
import RightIcon from "../assets/icons/RightIcon";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Home = () => {
  const { authState } = React.useContext(AuthContext);
  const [user, setUser] = React.useState(null);

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

  React.useEffect(() => {
    getUserById(
      authState.userId,
      (d) => {
        setUser(d.data);
      },
      () => {},
      (e) => {
        console.log("getUserById error");
      }
    );
  }, [authState]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80, backgroundColor: "white" }}
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
            <TouchableOpacity>
              <NoticeIcon />
            </TouchableOpacity>
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
              <Text style={styles.headerText}>3일째 연속 출석 중이에요</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Lecture in progress</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 12,
          }}
        >
          <ProgressLecture />
          <View style={{ width: 15 }} />
          <ProgressLecture />
          <View style={{ width: 15 }} />
          <ProgressLecture />
        </ScrollView>
        <View style={{ marginTop: 41 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 12,
              paddingEnd: 15,
            }}
          >
            <Text style={[styles.title]}>Recommended Lecture</Text>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
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

          <RecommendedLecList />
        </View>
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
    width: 91,
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
