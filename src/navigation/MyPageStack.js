import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import Setting from "../screens/Setting";
import MyPage from "../screens/MyPage";
import MyPurchases from "../screens/MyPurchases";
import MyLesson from "../screens/MyLesson";
import MyWishList from "../screens/MyWishList";
import Payment from "../screens/Payment";
import PaymentResult from "../screens/PaymentResult";
import ClassInfo from "../screens/ClassInfo";
import ClassMain from "../screens/ClassMain";
import ClassMore from "../screens/ClassMore";
import NoticeDetail from "../screens/NoticeDetail";
import TermsOfUse from "../screens/TermsOfUse";

const Stack = createNativeStackNavigator();

const MyPageStack = ({ navigation, route }) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log(routeName);
  React.useLayoutEffect(() => {
    if (
      routeName == "MyWishList" ||
      routeName == "Payment" ||
      routeName == "PaymentResult"
    ) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          paddingHorizontal: 10,
          ...Platform.select({
            android: {
              paddingBottom: 20,
              height: 80,
            },
            ios: {
              height: 88,
            },
          }),
          borderTopLeftRadius: 29,
          borderTopRightRadius: 29,
          backgroundColor: "white",
          borderWidth: 0.5,
          borderColor: "#EFEFEF",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowRadius: 23,
          position: "absolute",
        },
      });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="MyPurchases" component={MyPurchases} />
      <Stack.Screen name="MyLesson" component={MyLesson} />
      <Stack.Screen name="MyWishList" component={MyWishList} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="PaymentResult" component={PaymentResult} />
      <Stack.Screen name="ClassInfo" component={ClassInfo} />
      <Stack.Screen name="ClassMore" component={ClassMore} />
      <Stack.Screen name="NoticeDetail" component={NoticeDetail} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
    </Stack.Navigator>
  );
};

export default MyPageStack;
