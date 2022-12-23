import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import Class from "../components/Class";
import CartButton from "../components/WishListButton";
import { AntDesign } from "@expo/vector-icons";

const ClassMore = ({ navigation, route }) => {
  // useEffect
  // 장바구니에서 Similar 눌렀을 때, level 정보 가져와서 그 레벨에 해당하는 class들만 가져와서 보여주기

  const title = route.params.title ?? route.params.maintitle;
  const [courseList, setCourseList] = useState(route.params.courseList);
  const [classList, setClassList] = useState([]);
  const [isClassLoaded, setIsClassLoaded] = useState(false);
  const [introVideoList, setIntroVideoList] = useState([]);

  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    console.log("--------------------------------");
    console.log("ClassMore useEffect");
    console.log("courseList", courseList);

    console.log("--------------------------------");
  }, [isClassLoaded]);

  return (
    <View style={styles.courseContainer}>
      <View style={styles.topContainer}>
        <View style={styles.topItem1}>
          <Text style={styles.title}>{title}</Text>
          {/* <Text style={styles.secondTitle}>
            {title === "Lollipop Level"
              ? "K-Culture with influencers!"
              : title === "Cotton Candy Level"
              ? "Standard Korean"
              : "Lessons for TOPIK"}
          </Text> */}
        </View>
      </View>
      <SafeAreaView nestedScrollEnabled={true}>
        <FlatList
          numColumns={1}
          key={"_"}
          contentContainerStyle={{}}
          style={styles.classListContainer}
          horizontal={false}
          keyExtractor={(item) => String(item.id)}
          data={courseList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Class
              maintitle={title}
              navigation={navigation}
              classInfo={item}
              isShowAll={true}
              isMain={false}
            />
          )}
        ></FlatList>
      </SafeAreaView>
      <View style={styles.backBtn}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ClassMain");
          }}
        >
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {/* <CartButton text="1" navigation={navigation} isMain={false}></CartButton> */}
    </View>
  );
};

const styles = StyleSheet.create({
  courseContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 50,
    paddingBottom: 150,
    backgroundColor: "#fff",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    marginTop: 30,
    marginBottom: 30,
  },
  classListContainer: {
    backgroundColor: "#fff",
  },
  topItem1: {
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  backBtn: {
    position: "absolute",
    top: 60,
    left: 30,
    width: 50,
  },
  title: {
    fontSize: 23,
    fontFamily: "Poppins-SemiBold",
  },
});
export default ClassMore;
