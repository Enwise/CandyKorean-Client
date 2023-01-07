import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Premium from "../screens/Premium";
import Tutoring from "../screens/Tutoring";
const Stack = createNativeStackNavigator();
const PremiumStack = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "PremiumMain";
    if (routeName === "Tutoring") {
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
      <Stack.Screen name="PremiumMain" component={Premium} />
      <Stack.Screen name="Tutoring" component={Tutoring} />
    </Stack.Navigator>
  );
};

export default PremiumStack;
