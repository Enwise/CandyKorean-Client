import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "../screens/Setting";
import MyPage from "../screens/MyPage";
import MyPurchases from "../screens/MyPurchases";
import MyLesson from "../screens/MyLesson";
import MyWishList from "../screens/MyWishList";
import Payment from "../screens/Payment";
import PaymentResult from "../screens/PaymentResult";
const Stack = createNativeStackNavigator();

const MyPageStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="My" component={MyPage} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="MyPurchases" component={MyPurchases} />
      <Stack.Screen name="MyLesson" component={MyLesson} />
      <Stack.Screen name="MyWishList" component={MyWishList} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="PaymentResult" component={PaymentResult} />
    </Stack.Navigator>
  );
};

export default MyPageStack;
