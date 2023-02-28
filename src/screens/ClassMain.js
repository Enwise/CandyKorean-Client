import { update } from "lodash";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Course from "../components/Course";
import WishListButton from "../components/WishListButton";
import Constants from "expo-constants";
import { getLevels, createLevel, getWishlistByUser } from "../modules/NetworkFunction";

const ClassMain = ({ navigation }) => {

  const [isLevelListLoaded, setIsLevelListLoaded] = useState(false);
  const [levelList, setLevelList] = useState([]);

  useEffect(() => {

    // levelList 불러오기
    if (!isLevelListLoaded) {
      getLevels(
        {},
        (d) => {
          let updatedLevelList = [...levelList];
          d.data.map((item) => {

            if (
              item.name === "Lollipop Level" ||
              item.name === "Cotton Candy Level" ||
              item.name === "Mint Candy Level"
            ) {
              updatedLevelList.push(item);
            }
          });
          setLevelList(updatedLevelList);
        },

        setIsLevelListLoaded,
        (e) => {
          console.log(e);
        }
      );
    }
    

  }, [isLevelListLoaded]);

  return (
     <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {isLevelListLoaded && levelList.map((item) => {
          return (
            <Course
              key={item.level_id}
              navigation={navigation}
              levelItem={item}
              isShowAll={false}
              isMain={true}
            ></Course>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FDFDFD",
    position: "relative",
    paddingBottom: 50,
    paddingTop: Constants.statusBarHeight,
  },
});

export default ClassMain;
