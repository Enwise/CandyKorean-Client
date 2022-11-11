import { useFonts } from "expo-font";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const TutoringHistory = ({ tutoring }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      {tutoring.map((tutor, index) => {
        return (
          <View style={styles.tutor} key={index}>
            <View style={styles.imgContainer}>
              <Image source={tutor.img} style={styles.img} />
            </View>
            <View>
              <Text style={styles.name}>{tutor.name}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{tutor.date}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    borderRadius: 9,
    width: windowWidth - 40,
    ...Platform.select({
      ios: {
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 10,
        shadowColor: "rgba(0, 0, 0, 0.07)",
      },
      android: {
        elevation: 10,
      },
    }),
    paddingStart: 18,
    paddingBottom: 20,
  },
  tutor: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 15,
    marginTop: 20,
  },
  imgContainer: {
    backgroundColor: "white",
    width: 51,
    height: 51,
    borderRadius: 51 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0.05,
    ...Platform.select({
      ios: {
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 0.1,
        },
        shadowRadius: 4.63,
        shadowColor: "rgba(0, 0, 0, 0.07)",
      },
      android: {
        elevation: 1,
      },
    }),
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 51 / 2,
  },
  name: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#444345",
  },
  dateContainer: {
    backgroundColor: "#FDFDFD",
    borderRadius: 41,
    borderWidth: 1,
    borderColor: "#E6E3EA",
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginTop: 4,
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#B8B5BC",
  },
});

export default TutoringHistory;
