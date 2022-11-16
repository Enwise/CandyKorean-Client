import { useFonts } from "expo-font";
import React from "react";
import {FlatList, Image, StyleSheet, View, Text, Platform} from "react-native";

const TutorList = ({ tutor }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={item.img} />
      </View>
      <Text style={styles.nameText}>{item.name}</Text>
    </View>
  );
  if (!fontsLoaded) return null;
  return (
    <View style={{ marginLeft: 10 }}>
      <FlatList
        horizontal
        data={tutor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // marginRight: 10,
    marginTop: 14,
    marginStart: 10,
  },
  imgContainer: {
    backgroundColor: "white",
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
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
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 110 / 2,
    resizeMode: "contain",
  },
  nameText: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#B8B5BC",
  },
});
export default TutorList;
