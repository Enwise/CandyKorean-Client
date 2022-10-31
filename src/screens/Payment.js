import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SwipeListView } from "react-native-swipe-list-view";

const Payment = ({ navigation, route }) => {
  const [payList, setPayList] = useState(route.params.payList);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [date, setDate] = useState();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let now = new Date(); // 현재 날짜 및 시간
    let year = now.getFullYear(); // 연도
    setYear(year);

    let month = now.getMonth() + 1;
    setMonth(month);

    let date = now.getDate();
    setDate(date);

    let totalPrice = 0;
    payList.forEach((item) => {
      totalPrice += item.price;
    });
    setTotalPrice(totalPrice);
  }, [totalPrice, payList]);

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
    >
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Payment</Text>
          <View style={styles.backBtn}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {payList.length === 0 ? (
        <View style={styles.noSelectedTextContainer}>
          <Text style={styles.noSelectedText}>No Selected Items</Text>
        </View>
      ) : (
        <View>
          <View style={styles.payListContainer}>
            <SwipeListView
              data={payList}
              // 어떻게 아이템을 렌더링 할 것인가
              renderItem={({ item }) => (
                <View style={styles.payListItem}>
                  <View style={styles.classInfoContainer}>
                    <View style={styles.classImgContainer}>
                      <Image
                        style={styles.classImg}
                        source={item.imgUrl}
                      ></Image>
                    </View>
                    <View style={styles.classInfoTextContainer}>
                      <Text style={styles.classNameText}>{item.className}</Text>
                      <View style={styles.categoryContainer}>
                        <Text style={styles.cateogryText}>{item.category}</Text>
                      </View>
                      <View style={styles.priceTextContainer}>
                        <Text style={styles.priceText}>
                          $ {item.price === 0 ? "Free" : item.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.bottomContainer}>
                    <View style={styles.courseDateTextContainer}>
                      <Text style={styles.courseDateText}>
                        Date : {year}-{month}-{date} ~ 수강가능기간 끝 날짜
                      </Text>
                    </View>
                    <View style={styles.unitsNumContainer}>
                      <Text style={styles.unitsNum}>{item.units} Units</Text>
                    </View>
                  </View>
                </View>
              )}
              // 어떻게 숨겨진 아이템을 렌더링 할 것인가
              renderHiddenItem={({ item }) => (
                <View style={styles.swipeHiddenItemContainer}>
                  <View style={styles.swipeHiddenItem}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("ClassMore", { title: item.level });
                      }}
                    >
                      <Text style={styles.swipeHiddenItemText}>Similar</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.swipeHiddenItem}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log("delete");
                        deleteItem(item.id);
                      }}
                    >
                      <Text style={styles.swipeHiddenItemText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              rightOpenValue={-150}
              previewRowKey={"0"}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              disableRightSwipe={true}
              // leftOpenValue={0}
            />
          </View>
          <View style={styles.summaryContainer}>
            <Text>Summary</Text>
            {payList.map((item) => {
              return (
                <View style={styles.summaryItem}>
                  <View style={styles.summaryText}>
                    <Text>{item.className}</Text>
                    <Text>
                      from {year}.{month}.{date} until 수강가능기간 끝날짜
                    </Text>
                  </View>
                  <View style={styles.summaryPrice}>
                    <Text>$ {item.price}</Text>
                  </View>
                </View>
              );
            })}
            <View style={{ height: 1, backgroundColor: "#000" }}></View>
            <View style={styles.totalPriceContainer}>
              <Text>Total</Text>
              <Text>$ {totalPrice}</Text>
            </View>
          </View>
          <View style={styles.paymentContainer}>
            <TouchableOpacity>
              <View style={styles.creditcardBtn}>
                <Image source={require("../assets/img/btn-purple.png")}></Image>
                <Text style={styles.creditcardText}>Credit card</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.paypalBtn}>
                <Image source={require("../assets/img/btn-purple.png")}></Image>
                <Text style={styles.paypalText}>Paypal</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white",
  },
  topContainer: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    fontFamily: "Poppins-SemiBold",
  },
  titleContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    zIndex: 1,
    backgroundColor: "white",
  },

  backBtn: {
    position: "absolute",
    top: 35,
    left: 25,
  },
  noSelectedTextContainer: {
    marginTop: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  payListContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  payListItem: {
    width: 350,
    paddingLeft: 20,
    paddingRight: 20,
    position: "relative",
    marginBottom: 25,
    zIndex: 2,
    backgroundColor: "white",
  },

  classInfoContainer: {
    flexDirection: "row",
  },
  classImg: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  classNameText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#444345",
    marginBottom: 5,
  },
  categoryContainer: {
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#A160E2",
    borderWidth: 1,
    width: 65,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  cateogryText: {
    fontFamily: "Poppins-Regular",
    color: "#807F82",
    fontSize: 10,
  },
  priceText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  bottomContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  paymentContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  creditcardBtn: {
    position: "relative",
  },
  creditcardText: {
    position: "absolute",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "white",
    top: 15,
    left: 35,
  },
  paypalBtn: {
    position: "relative",
  },
  paypalText: {
    position: "absolute",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "white",
    top: 15,
    left: 55,
  },
});
export default Payment;
