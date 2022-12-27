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

import GradientBtn from "../components/GradientButtonView";
import AuthContext from "../contexts/AuthContext";

import { createPurchasedCourse, getTutorById, getAllPurchasedCoursesByUserId } from "../modules/NetworkFunction";

const Payment = ({ navigation, route }) => {
  // const [payList, setPayList] = useState(route.params.payList);
  const { authState } = React.useContext(AuthContext);
  const [userId, setUserId] = useState(authState.userId);
  // const [userId, setUserId] = useState(17);

  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2]; // -2 because -1 is the current route
  const [itemInfo, setItemInfo] = useState(route.params.item);

  const [unitsNum, setUnitsNum] = useState(route.params.unitsNum);

  const [returnToClass, setReturnToClass] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const [isCoursePurchased, setIsCoursePurchased] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const [imgUrl, setImgUrl] = useState("");
  
  const [purchasedCourseList, setPurchasedCourseList] = useState([]);
  const [isPurchasedCourseListLoaded, setIsPurchasedCourseListLoaded] = useState(false);

  

  useEffect(() => {
    
    console.log("iteminfo ID----------------------");
    console.log(itemInfo.course_id);
    console.log("iteminfo----------------------");

    console.log("prev : ", prevRoute.name);
    if (prevRoute.name == "ClassInfo") {
      setReturnToClass(true);
    } else {
      setReturnToClass(false);
    }



    console.log(itemInfo);

    getTutorById(
      { tutor_id : itemInfo.tutor_id }, 
      (d) => {
        console.log('img_url', d.data.profile_url)
        setImgUrl(d.data.profile_url)
      },
      () => {},
      (e) => {console.log(e)}
    )

    if(!isPurchasedCourseListLoaded) {
      let updatedPurchasedCourseList = [];

      getAllPurchasedCoursesByUserId(
        { userId : userId},

        (d) => {
          d.data.map((item) => {
            console.log('item', item.course_id)
            updatedPurchasedCourseList.push(item.course_id);
            setPurchasedCourseList([...updatedPurchasedCourseList]);
          })
        },
        setIsPurchasedCourseListLoaded,
        (e) => { console.log(e) }) 

  }
  console.log('purchasedCourseList', purchasedCourseList)
}, [ itemInfo, isSuccess, isCoursePurchased, imgUrl, userId, isPurchasedCourseListLoaded, purchasedCourseList]);

  // navigation.goBack();
  const handlePayment = () => {
    // 결제 프로세스 여기에 필요!

    // 만약 성공이면??
    // setIsSuccess(true);
    // 결제 성공시에는 결제 내역을 DB에 저장해야됨!
    console.log("handlePayment")
    
    if(purchasedCourseList.includes(itemInfo.course_id)) {
      console.log('purchase fail')
      setIsSuccess(false)
    } else {
      console.log('purchase success')
      setIsSuccess(true);
    }

    if(isSuccess) {
      if (!isCoursePurchased) {
        createPurchasedCourse(
          { user_id: userId, course_id: itemInfo.course_id },
          (d) => {
            // console.log(d);
            console.log("-========================-");
            console.log("purchased success");
            console.log("-========================-");
  
            navigation.navigate("PaymentResult", {
              user_id: userId,
              itemInfo: itemInfo,
              isSuccess: true,
              returnToClass,
              imgUrl: imgUrl,
            });
          },
          setIsCoursePurchased,
          (e) => {
            setIsSuccess(false);
            console.log(e.message);
            console.log("-========================-");
            console.log("purchased fail");
            console.log("-========================-");
           
          }
        );
      }
    } else {
      navigation.navigate("PaymentResult", {
        user_id: userId,
        itemInfo: itemInfo,
        isSuccess: false,
        returnToClass,
        imgUrl: imgUrl,
      });
    }
    
    
    

    

    
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
    
        <View style={styles.payListItem}>
          <View style={styles.classInfoContainer}>
            <Image
              source={{
                // uri: itemInfo.tutor.profile_url,
                uri: imgUrl,
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
            <Text style={styles.paymentPriceText}>$ {itemInfo.price - 1}.99</Text>
          </View>
          {/* <View style={styles.howToPayContainer}>
            <Text style={styles.howToPayText}>How to pay</Text>
          </View> */}
          <View style={styles.paymentContainer}>
            <TouchableOpacity
              onPress={() => {
                handlePayment();
              }}
            >
              <View style={styles.creditcardBtn}>
                <Text style={styles.creditcardText}>BUY NOW</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>
        </View>
      
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
