import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { SwipeListView } from "react-native-swipe-list-view";
import GradientBtn from "../components/GradientButtonView";

const Payment = ({ navigation, route }) => {
  // const [payList, setPayList] = useState(route.params.payList);
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2]; // -2 because -1 is the current route
  const [itemInfo, setItemInfo] = useState(route.params.item);
  const [payList, setPayList] = useState([itemInfo]);

  const [unitsNum, setUnitsNum] = useState(route.params.unitsNum);

  const [returnToClass, setReturnToClass] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const [classInfo, setClassInfo] = useState(route.params.classInfo);

  useEffect(() => {
    console.log("prev : ", prevRoute.name);
    if (prevRoute.name == "ClassInfo") {
      setReturnToClass(true);
    } else {
      setReturnToClass(false);
    }
    let now = new Date(); // 현재 날짜 및 시간
    let year = now.getFullYear(); // 연도
    setYear(year);

    let month = now.getMonth() + 1;
    setMonth(month);

    let date = now.getDate();
    setDate(date);

    let totalPrice = 0;
    // payList.append(item);
    payList.forEach((item) => {
      totalPrice += item.price;
    });
    setTotalPrice(totalPrice);

    console.log(itemInfo);
  }, [payList, itemInfo]);

  const deleteItem = (id) => {
    console.log("delete");
    setPayList(payList.filter((item) => item.id !== id));
  };

  return (
    <View
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
        <View style={styles.payListItem}>
          <View style={styles.classInfoContainer}>
            <Image
              source={{
                uri: "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671463082652/shin_yoo_jin_square.jpg",
              }}
              style={styles.classImg}
            ></Image>
            <View style={styles.classInfoTextContainer}>
              <Text style={styles.classNameText}>{itemInfo.name}</Text>
              <View style={styles.categoryAndUnitContainer}>
                <GradientBtn
                  text={`${unitsNum} Units`}
                  // text="9 Units"
                  textStyle={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 10,
                    fontFamily: "Poppins-Medium",
                  }}
                  viewStyle={{
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 53,
                    height: 19,
                    marginLeft: 5,
                  }}
                />
              </View>

              {/* <View style={styles.unitsNumContainer}>
              <Text style={styles.unitsNum}>{itemInfo.units} Units</Text>
            </View> */}
            </View>
          </View>

          <View style={styles.paymentAmountContainer}>
            <Text style={styles.paymentAmountText}>Payment amount</Text>
            <Text style={styles.paymentPriceText}>$ {totalPrice}</Text>
          </View>
          <View style={styles.howToPayContainer}>
            <Text style={styles.howToPayText}>How to pay</Text>
          </View>
          <View style={styles.paymentContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PaymentResult", {
                  itemInfo: itemInfo,
                  totalPrice: totalPrice,
                  isSuccess: true,
                  returnToClass,
                });
              }}
            >
              <View style={styles.creditcardBtn}>
                <Text style={styles.creditcardText}>Credit card</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PaymentResult", {
                  itemInfo: itemInfo,
                  totalPrice: totalPrice,
                  isSuccess: false,
                });
              }}
            >
              <View style={styles.paypalBtn}>
                <Text style={styles.paypalText}>Paypal</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        // <View>
        //   <View style={styles.payListContainer}>
        //     <SwipeListView
        //       data={payList}
        //       // 어떻게 아이템을 렌더링 할 것인가
        //       renderItem={({ item }) => (
        //         <View style={styles.payListItem}>
        //           <View style={styles.classInfoContainer}>
        //             <Image
        //               source={{
        //                 uri: "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671463082652/shin_yoo_jin_square.jpg",
        //               }}
        //               style={styles.classImg}
        //             ></Image>
        //             <View style={styles.classInfoTextContainer}>
        //               <Text style={styles.classNameText}>{item.name}</Text>
        //               <View style={styles.categoryAndUnitContainer}>
        //                 <View style={styles.categoryContainer}>
        //                   <Text style={styles.cateogryText}>
        //                     {item.category}
        //                   </Text>
        //                 </View>
        //                 <GradientBtn
        //                   // text={`${item.units} Units`}
        //                   text="9 Units"
        //                   textStyle={{
        //                     color: "white",
        //                     textAlign: "center",
        //                     fontSize: 10,
        //                     fontFamily: "Poppins-Medium",
        //                   }}
        //                   viewStyle={{
        //                     borderRadius: 10,
        //                     justifyContent: "center",
        //                     alignItems: "center",
        //                     width: 53,
        //                     height: 19,
        //                     marginLeft: 5,
        //                   }}
        //                 />
        //               </View>

        //               <View style={styles.priceTextContainer}>
        //                 <Text style={styles.priceText}>
        //                   $ {item.price === 0 ? "Free" : item.price}
        //                 </Text>
        //               </View>
        //             </View>
        //           </View>
        //           <View style={styles.bottomContainer}>
        //             <View style={styles.courseDateTextContainer}>
        //               <Text style={styles.courseDateText}>
        //                 Date : {year}-{month}-{date} ~ 수강가능기간 끝 날짜
        //               </Text>
        //             </View>
        //             <View style={styles.unitsNumContainer}>
        //               <Text style={styles.unitsNum}>{item.units} Units</Text>
        //             </View>
        //           </View>
        //         </View>
        //       )}
        //       // 어떻게 숨겨진 아이템을 렌더링 할 것인가
        //       renderHiddenItem={({ item }) => (
        //         <View style={styles.swipeHiddenItemContainer}>
        //           <View style={styles.swipeHiddenItem}>
        //             <TouchableOpacity
        //               onPress={() => {
        //                 navigation.navigate("MyWishList", {
        //                   isAddToCart: false,
        //                 });
        //               }}
        //             >
        //               <Text style={styles.swipeHiddenItemText}>
        //                 Return{"\n"}to cart
        //               </Text>
        //             </TouchableOpacity>
        //           </View>
        //           <View style={styles.swipeHiddenItem}>
        //             <TouchableOpacity
        //               onPress={() => {
        //                 console.log("delete");
        //                 deleteItem(item.id);
        //               }}
        //             >
        //               <Text style={styles.swipeHiddenItemText}>Delete</Text>
        //             </TouchableOpacity>
        //           </View>
        //         </View>
        //       )}
        //       rightOpenValue={-150}
        //       previewRowKey={"0"}
        //       previewOpenValue={-40}
        //       previewOpenDelay={3000}
        //       disableRightSwipe={true}
        //       // leftOpenValue={0}
        //     />
        //   </View>

        //   {/* <View style={styles.summaryContainer}>
        //     <Text>Summary</Text>
        //     {payList.map((item) => {
        //       return (
        //         <View style={styles.summaryItem}>
        //           <View style={styles.summaryText}>
        //             <Text>{item.className}</Text>
        //             <Text>
        //               from {year}.{month}.{date} until 수강가능기간 끝날짜
        //             </Text>
        //           </View>
        //           <View style={styles.summaryPrice}>
        //             <Text>$ {item.price}</Text>
        //           </View>
        //         </View>
        //       );
        //     })}
        //     <View style={{ height: 1, backgroundColor: "#000" }}></View>
        //     <View style={styles.totalPriceContainer}>
        //       <Text>Total</Text>
        //       <Text>$ {totalPrice}</Text>
        //     </View>
        //   </View> */}
        //   <View style={styles.howToPayContainer}>
        //     <Text style={styles.howToPayText}>How to pay</Text>
        //   </View>
        //   <View style={styles.paymentContainer}>
        //     <TouchableOpacity
        //       onPress={() => {
        //         navigation.navigate("PaymentResult", {
        //           itemInfo: itemInfo,
        //           totalPrice: totalPrice,
        //           isSuccess: true,
        //           returnToClass,
        //         });
        //       }}
        //     >
        //       <View style={styles.creditcardBtn}>
        //         {/* <Image source={require("../assets/img/btn-purple.png")}></Image> */}
        //         <Text style={styles.creditcardText}>Credit card</Text>
        //       </View>
        //     </TouchableOpacity>
        //     <TouchableOpacity
        //       onPress={() => {
        //         navigation.navigate("PaymentResult", {
        //           itemInfo: itemInfo,
        //           totalPrice: totalPrice,
        //           isSuccess: false,
        //         });
        //       }}
        //     >
        //       <View style={styles.paypalBtn}>
        //         {/* <Image source={require("../assets/img/btn-purple.png")}></Image> */}
        //         <Text style={styles.paypalText}>Paypal</Text>
        //       </View>
        //     </TouchableOpacity>
        //   </View>
        // </View>
      )}
    </View>
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
    marginBottom: 20,
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
    width: Dimensions.get("window").width,
    paddingLeft: 20,
    paddingRight: 20,
    position: "relative",
    marginBottom: 25,
    backgroundColor: "white",
  },

  classInfoContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  classInfoTextContainer: {
    width: "70%",
    flexDirection: "column",
  },
  classImg: {
    width: "30%",
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
  categoryAndUnitContainer: {
    flexDirection: "row",
    marginBottom: 10,
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
  courseDateTextContainer: {
    width: "100%",
  },
  courseDateText: {
    fontFamily: "Poppins-Regular",
    color: "#B8B5BC",
    fontSize: 10,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  paymentAmountContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "#E6E3EA",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 20,
    height: 50,
    alignItems: "center",
  },
  paymentAmountText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#000",
  },
  paymentPriceText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#A160E2",
  },
  howToPayContainer: {
    marginTop: 20,
  },
  howToPayText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#B8B5BC",
  },
  paymentContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    justifyContent: "space-evenly",
  },

  creditcardBtn: {
    width: Dimensions.get("screen").width / 2 - 20,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "#F1EFF4",
    borderRadius: 10,
    marginRight: 5,
  },
  creditcardText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#807F82",
  },
  paypalBtn: {
    width: Dimensions.get("screen").width / 2 - 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    height: 40,

    backgroundColor: "#F1EFF4",
    borderRadius: 10,
  },
  paypalText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#807F82",
  },
  swipeHiddenItemContainer: {
    paddingLeft: 30,
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  swipeHiddenItem: {
    height: "100%",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  swipeHiddenItemText: {
    fontFamily: "Poppins-Medium",
    color: "#444345",
    fontSize: 14,
  },
});
export default Payment;
