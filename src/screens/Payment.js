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

import { createPurchasedCourse, getTutorById, getPurchasedCoursesByUserId, getClassesCountByCourseId } from "../modules/NetworkFunction";

// import {
//   connectAsync,
//   setPurchaseListener,
//   getProductsAsync,
//   getPurchaseHistoryAsync,
//   purchaseItemAsync,
//   getBillingResponseCodeAsync,
//   finishTransactionAsync,
//   disconnectAsync,
//   IAPResponseCode,
//   IAPErrorCode,
// } from 'expo-in-app-purchases';

const Payment = ({ navigation, route }) => {
  const { authState } = React.useContext(AuthContext);
  const [userId, setUserId] = useState(authState.userId);


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



  const items = Platform.select({
    ios: [
      'dev.products.gas',
      'dev.products.premium',
      'dev.products.gold_monthly',
      'dev.products.gold_yearly',
    ],
    android: ['lollipop_test'],
  });

  const [productId, setProductId] = useState('lollipop_test');
  const [bottomText, setBottomText] = useState("결제하기");

  // 구글 스토어 연결
  useEffect(async () => {
    const history = await connectAsync(); 

  }, [])

  useEffect(() => {

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

   
  
}, [ itemInfo, isSuccess, isCoursePurchased, imgUrl, userId, isPurchasedCourseListLoaded]);

useEffect(() => {
  let updatedPurchasedCourseList = []; 
    if(!isPurchasedCourseListLoaded) {
    getPurchasedCoursesByUserId(
      { userId : userId},
      (d) => {
        d.data.map((item) => {
          console.log('item', item.course_id)
          updatedPurchasedCourseList.push(item.course_id);
          setPurchasedCourseList([...updatedPurchasedCourseList]);
        })
      },
      setIsPurchasedCourseListLoaded,
      (e) => { console.log(e) }
      ) 
    }
     }, [])


  // navigation.goBack();
  const handlePayment = async (courseName) => {
    // 결제 프로세스 여기에 필요!

    // 인앱결제 test용 courseName -> 나중에 지우기
    // courseName = "iap_test"
    // setBottomText(courseName);
    
    let itemArray = [];
    if(courseName === "Conversational Korean Course") {
      itemArray.push("lollipop_yoojin");
      // itemArray.push("iap_test_3");
    } else if(courseName === "Survival Korean Course") {
      itemArray.push("lollipop_seongyeop");
    } else if(courseName === "After Like Course") {
      itemArray.push("lollipop_kyungeun");
    } 



    try {
    
     // 구매 정보 가져오기
     const { responseCode, results } = await getProductsAsync(itemArray);

     if (responseCode === IAPResponseCode.OK) {
         setProductId(results[0].productId)
         setBottomText(results[0].productId);
         
     } else {
      setBottomText('something wrong!');
     }

     // 구매 내역에 없는 상품일때만 결제 진행
     if(purchasedCourseList.indexOf(itemInfo.course_id) === -1) {
      purchaseItemAsync(results[0].productId)
     } else {
      // 아닐떈, 바로 이미 구입한 상품이라고 알려주기
      navigation.navigate("PaymentResult", {
        user_id: userId,
        itemInfo: itemInfo,
        isSuccess: false,
        returnToClass,
        imgUrl: imgUrl,
        isBought: true,
      });
     }

     return await new Promise((resolve, reject) => {
      setPurchaseListener(async (result) => {
        if(result.responseCode === IAPResponseCode.OK){
          setBottomText("success")
          if(!result.results[0].acknowledged) {
            setBottomText('successful purchase')
            await finishTransactionAsync(result.results[0], false);

            // 계속 구매 가능한지 test 
            // await finishTransactionAsync(result.results[0], true);

            // DB에 저장 - purchasedCourse 에 없는 경우에만!
            if(purchasedCourseList.indexOf(itemInfo.course_id) === -1) {
            createPurchasedCourse(
              { user_id: userId, course_id: itemInfo.course_id },
              (d) => {
      
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
              }
            );
            } else {
              navigation.navigate("PaymentResult", {
                user_id: userId,
                itemInfo: itemInfo,
                isSuccess: true,
                returnToClass,
                imgUrl: imgUrl,
              });
            }
        }
        } else if (result.responseCode === IAPResponseCode.USER_CANCELED || result.responseCode === IAPResponseCode.DEFERRED) {
          setBottomText('User canceled the transaction');

        }  else {
          
          setBottomText(`Something went wrong with the purchase. Received errorCode ${result.errorCode}`);
            navigation.navigate("PaymentResult", {
            user_id: userId,
            itemInfo: itemInfo,
            isSuccess: false,
            returnToClass,
            imgUrl: imgUrl,
            isBought: result.errorCode === 8 ? true : false,
          });
        }
      })

    })

    } catch(e) {
      disconnectAsync();
      setBottomText('error!!!!!');

    }
  
    navigation.navigate("PaymentResult", {
      user_id: userId,
      itemInfo: itemInfo,
      isSuccess: true,
      returnToClass,
      imgUrl: imgUrl,
    });
    

    
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
                uri: imgUrl,
              }}
              style={styles.classImg}
            ></Image>
            <View style={styles.classInfoTextContainer}>
              <Text style={styles.classNameText}>{itemInfo.name}</Text>
              <View style={styles.categoryAndUnitContainer}>
                <GradientBtn
                  text={`${unitsNum} Units`}
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


            </View>
          </View>

          <View style={styles.paymentAmountContainer}>
            <Text style={styles.paymentAmountText}>Payment amount</Text>
            <Text style={styles.paymentPriceText}>$ {itemInfo.price}</Text>
            
          </View>

          <View style={styles.paymentContainer}>
            <TouchableOpacity
              onPress={() => {
                handlePayment(itemInfo.name)
              }}
            >

              <GradientBtn
                  text= "BUY NOW"
                  // text="9 Units"
                  textStyle={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily: "Poppins-SemiBold",
                  }}
                  viewStyle={{
                    borderRadius: 57,
                    justifyContent: "center",
                    alignItems: "center",
                    width: Dimensions.get("screen").width * 0.9,
                    height: 50,
                    marginLeft: 5,
                  }}
                />
              
            </TouchableOpacity>

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
    flexDirection: "column",
    width: "100%",
    height: '60%',
    justifyContent:'flex-end',
    alignItems:'center',
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
