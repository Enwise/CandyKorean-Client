import React from "react";
import {
    Button,
    Dimensions, Image,
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



import { Audio } from 'expo-av';

const windowWidth = Dimensions.get("window").width;





const Home = () => {





    const sample_translate = ["See you next time", "다음에 보자"];

    const [sound, setSound] = React.useState();

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync( require('../assets/sound/file_example_MP3_700KB.mp3')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#84E9FF", "#C284FF"]}
        locations={[0, 1]}
        start={[0.025, 0.5]}
        end={[0.975, 0.5]}
        style={{
          height: 238,
          position: "absolute",
          width: windowWidth,
        }}
      />
      <View style={styles.header}>
        <SmallLogoIcon />
        <TouchableOpacity>
          <NoticeIcon />
        </TouchableOpacity>
      </View>


        <View
            style={{marginTop:20,marginBottom: 40, height: 170 }}
        >
            <Text style={{fontSize:18, fontWeight: "500"}}>Hello, Bony</Text>
            <View style={styles.textInput}>
                <View style={styles.alignRow}>
                    <View style={styles.alignColumn}>
                        <Text style={styles.text1}>Eng</Text>
                        <Text style={styles.text2}>{sample_translate[0]}</Text>
                    </View>
                    <View>
                        <Image
                            source={require("../assets/img/btn-purple.png")}
                            style={{width:28, height:1}}
                        />
                    </View>
                    <View style={styles.alignColumn}>
                        <Text style={styles.text1}>Kor</Text>
                        <Text style={styles.text3}>{sample_translate[1]}</Text>
                    </View>
                </View>


                <TouchableOpacity
                    onPress={playSound}
                >
                    <Image
                        source={require("../assets/img/home-sound-icon.png")}
                        style={styles.imgAlign}
                    />
                </TouchableOpacity>

            </View>
        </View>


      <ScrollView>
        <View style={{}}>
          <Text style={styles.title}>Lecture in progress</Text>
          <ProgressLecture />
        </View>
        <View style={{ marginTop: 41 }}>
          <Text style={styles.title}>Recommended Lecture</Text>
          <RecommendedLecList />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight + 12,
    position: "relative",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    marginBottom: 12,
  },
    textInput: {
        width: '100%',
        height: 75,
        marginTop: 15,
        backgroundColor: "#ffffff",
        borderRadius:13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 20,

    },
    alignRow:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        marginTop: 9,
        // paddingHorizontal: 20,

    },
    alignColumn:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
    },
    text1 : {
        fontSize:14,
        color:"#B8B5BC",
        fontWeight:"400",
    },
    text2 : {
        fontSize:13,
        color:"#000000",
        fontWeight:"400",
    },
    text3 : {
        fontSize:14,
        color:"#000000",
        fontWeight:"400",
    },
    imgAlign:{
        display:"flex",
        marginLeft:"auto",
        marginRight:5,
        width:22,
        height:22,
    },
});

export default Home;
