import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClassMain from "../screens/ClassMain";
import ClassMore from "../screens/ClassMore";
import ClassInfo from "../screens/ClassInfo";
import MyWishList from "../screens/MyWishList";
import Payment from "../screens/Payment";
import PaymentResult from "../screens/PaymentResult";
const Stack = createNativeStackNavigator();

const ClassStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClassMain" component={ClassMain} />
      <Stack.Screen name="ClassMore" component={ClassMore} />
      <Stack.Screen name="ClassInfo" component={ClassInfo} />
      <Stack.Screen name="MyWishList" component={MyWishList} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="PaymentResult" component={PaymentResult} />
    </Stack.Navigator>
  );
};

export default ClassStack;
