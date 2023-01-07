import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import ClassMain from "../screens/ClassMain";
import ClassMore from "../screens/ClassMore";
import ClassInfo from "../screens/ClassInfo";
import MyWishList from "../screens/MyWishList";
import Payment from "../screens/Payment";
import PaymentResult from "../screens/PaymentResult";
const Stack = createNativeStackNavigator();

const ClassStack = ({ navigation, route }) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "ClassMain";
  console.log("routeName", routeName);
  React.useLayoutEffect(() => {
    if (routeName !== "ClassMain") {
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
