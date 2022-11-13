import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import StudyNowIcon from "../assets/icons/StudyNowIcon";
import UnitIcon from "../assets/icons/UnitIcon";
import SampleClassImg1 from "../assets/icons/SampleClassImg1";
import SampleClassImg2 from "../assets/icons/SampleClassImg2";
import SampleClassImg3 from "../assets/icons/SampleClassImg3";
import SampleClassImg4 from "../assets/icons/SampleClassImg4";
import SampleClassImg5 from "../assets/icons/SampleClassImg5";

const PaymentResult = ({ navigation, route }) => {
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [date, setDate] = useState();

  const sampleClassImgList = [
    <SampleClassImg2></SampleClassImg2>,
    <SampleClassImg3></SampleClassImg3>,
    <SampleClassImg4></SampleClassImg4>,
    <SampleClassImg5></SampleClassImg5>,
  ];

  const [recommendList, setRecommendList] = useState([
    {
      imgUrl: "../assets/img/sample_class_img1.jpeg",
      teacherName: "Kyungeun1",
      className: "class1",
      category: "K-culture",
      level: "Lollipop",
      units: 10,
      price: 100,
      isPurchased: true,
    },
    {
      imgUrl: "../assets/img/sample_class_img1.jpeg",
      teacherName: "Kyungeun2",
      className: "class2",
      category: "K-history",
      level: "Lollipop",
      units: 10,
      price: 100,
      isPurchased: false,
    },
    {
      imgUrl: "../assets/img/sample_class_img1.jpeg",
      teacherName: "Kyungeun3",
      className: "class3",
      category: "K-pop",
      level: "Lollipop",
      units: 10,
      price: 100,
      isPurchased: false,
    },
    {
      imgUrl: "../assets/img/sample_class_img1.jpeg",
      teacherName: "Kyungeun4",
      className: "class4",
      category: "K-culture",
      level: "Lollipop",
      units: 10,
      price: 100,
      isPurchased: false,
    },
    {
      imgUrl: "../assets/img/sample_class_img1.jpeg",
      teacherName: "Kyungeun5",
      className: "class5",
      category: "K-culture",
      level: "Lollipop",
      units: 10,
      price: 100,
      isPurchased: false,
    },
  ]);

  // level 정보 이용해서, 그 level 에 해당하는 class정보들 가져와야함!
  // 맨 밑 Recommend에 보여주기 위해서
  useEffect(() => {
    let now = new Date(); // 현재 날짜 및 시간
    let year = now.getFullYear(); // 연도
    setYear(year);

    let month = now.getMonth() + 1;
    setMonth(month);

    let date = now.getDate();
    setDate(date);

    console.log(isSuccess);
    console.log(item);
  }, [isSuccess, item]);
  const [isSuccess, setIsSuccess] = useState(route.params.isSuccess);
  const [item, setItem] = useState(route.params.itemInfo);

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      {isSuccess ? (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Order Completed{"\n"}Thank you for purchasing!
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ClassMain");
              }}
              style={{ position: "absolute", right: 10, top: 10 }}
            >
              <Ionicons name="ios-close-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.purchasedItemContainer}>
            <Text style={styles.purchasedItemText}>Purchased product</Text>
            <View style={styles.purchasedItem}>
              <SampleClassImg1 />
              <View style={styles.purchasedItemInfo}>
                <Text style={styles.classNameText}>{item.className}</Text>
                <View style={styles.categoryAndUnit}>
                  <View style={styles.cateogryContainer}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <View style={styles.unitContainer}>
                    <UnitIcon />
                    <Text style={styles.unitText}>{item.units} Units</Text>
                  </View>
                </View>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>
                    2022-09-30 ~ {year}-{month}-{date}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total payment amount</Text>
            <Text style={styles.totalPrice}>$ {item.price}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ClassRoom");
            }}
          >
            <View style={styles.studyNowBtn}>
              <StudyNowIcon />
              <Text style={styles.studyNowText}>Study now!</Text>
            </View>
          </TouchableOpacity>
          <SafeAreaView style={{ ...styles.recommendContainer }}>
            <View style={styles.recommendTopContainer}>
              <Text style={styles.recommendTitle}>Recommend</Text>
              <TouchableOpacity
                onPress={() => {
                  // Lollipop level의 classList를 넘겨줘야함
                  navigation.navigate("ClassMore", { title: "Lollipop Level" });
                }}
              >
                <Text style={styles.recommendMore}>MORE {">"}</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              key={"_"}
              data={recommendList}
              style={{
                ...styles.recommendListContainer,
              }}
              // contentContainerStyle={{ flex: 1, flexGrow: 1 }}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, idx }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ClassInfo", { classInfo: item });
                  }}
                >
                  <View
                    style={{
                      ...styles.recommendItemContainer,
                    }}
                  >
                    <SampleClassImg2 />
                    <View style={styles.recommendItemInfo}>
                      <Text style={styles.recommendItemClassName}>
                        {item.className}
                      </Text>
                      <Text style={styles.recommendItemTeacherName}>
                        {item.teacherName}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </View>
      ) : (
        <Text style={styles.paymentFailedText}>
          Failed to payment.{"\n"}Please try again.
        </Text>
      )}
      {isSuccess ? null : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Payment", { itemInfo: item });
          }}
        >
          <View style={styles.backToPageBtn}>
            <Text style={styles.backToPageText}>back to page</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  titleContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#000",
  },
  purchasedItemContainer: {
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  purchasedItem: {
    flexDirection: "row",
  },
  purchasedItemImg: {
    marginRight: 15,
  },
  classNameText: {
    fontFamily: "Poppins-Medium",
    color: "#444345",
    fontSize: 14,
  },
  purchasedItemText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#B8B5BC",
    marginBottom: 15,
  },
  categoryAndUnit: {
    flexDirection: "row",
    marginBottom: 10,
  },
  cateogryContainer: {
    borderColor: "#A160E2",
    borderWidth: 1,
    borderRadius: 15,
    height: 20,
    alignItems: "center",
    width: 70,
    marginRight: 5,
    justifyContent: "center",
  },
  categoryText: {
    color: "#807F82",
    fontSize: 12,
  },
  unitContainer: {
    height: 25,
    width: 80,
    position: "relative",
  },
  unitText: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#fff",
    position: "absolute",
    top: 4,
    left: 7,
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#B8B5BC",
  },
  totalContainer: {
    marginTop: 40,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  totalText: { fontFamily: "Poppins-Medium", fontSize: 16, color: "#000" },
  totalPrice: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#A160E2",
  },
  studyNowBtn: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
  },
  studyNowText: {
    position: "absolute",
    top: 10,
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#fff",
  },
  recommendContainer: {
    marginTop: 40,
    width: "100%",
    height: 200,
    paddingLeft: 10,
  },

  recommendTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#807F82",
  },
  recommendTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
  },
  recommendMore: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#807F82",
  },
  recommendListContainer: {},
  recommendItemContainer: {
    marginRight: 10,
    width: 100,
    borderRadius: 15,
  },
  recommendItemImg: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  recommendItemTeacherName: {
    color: "#807F82",
    fontSize: 12,
  },
  paymentFailedText: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#000",
    paddingTop: 300,
    paddingBottom: 250,
  },
  backToPageBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A160E2",
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 50,
  },
  backToPageText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#FDFDFD",
  },
});

export default PaymentResult;
