import React from "react";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import Home from "../screens/Home";
import Premium from "../screens/Premium";
import MyPage from "../screens/MyPage";
import ClassStack from "../navigation/ClassStack";
import ClassRoomStack from "../navigation/ClassRoomStack";
import ClassInactive from "../assets/icons/ClassInactive";
import ClassRoomInactive from "../assets/icons/ClassRoomInactive";
import MyPageInactive from "../assets/icons/MyPageInactive";
import PremiumInactive from "../assets/icons/PremiumInactive";
import HomeInactive from "../assets/icons/HomeInactive";
import { useFonts } from "expo-font";
import ClassRoom from "../screens/ClassRoom";
import { Platform, Text } from "react-native";
import MyPageStack from "./MyPageStack";
import PremiumStack from "./PremiumStack";
import HomeActive from "../assets/icons/HomeActive";
import ClassActive from "../assets/icons/ClassActive";
import ClassRoomActive from "../assets/icons/ClassRoomActive";
import PremiumActive from "../assets/icons/PremiumActive";
import MyPageActive from "../assets/icons/MyPageActive";

const Tab = createBottomTabNavigator();
const MainTab = ({ navigation, route }) => {
  // const routeName = getFocusedRouteNameFromRoute(route);
  // console.log(routeName);
  // React.useLayoutEffect(() => {
  //   if (routeName == "LessonVideo") {
  //     navigation.setOptions({ tabBarVisible: false });
  //   } else {
  //     navigation.setOptions({ tabBarVisible: true });
  //   }
  // }, [navigation, route]);
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
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
        tabBarLabel: ({ focused }) => {
          return (
            <Text
              style={{
                fontFamily: focused ? "Poppins-Medium" : "Poppins-Regular",
                fontSize: 10,
                color: focused ? "black" : "#807F82",
              }}
            >
              {route.name}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <HomeActive /> : <HomeInactive />;
          },
        }}
      />
      <Tab.Screen
        name="Class"
        component={ClassStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <ClassActive /> : <ClassInactive />;
          },
        }}
      />

      <Tab.Screen
        name="ClassRoom"
        component={ClassRoomStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <ClassRoomActive /> : <ClassRoomInactive />;
          },
        }}
      />
      <Tab.Screen
        name="Premium"
        component={PremiumStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <PremiumActive /> : <PremiumInactive />;
          },
        }}
      />
      <Tab.Screen
        name="My"
        component={MyPageStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <MyPageActive /> : <MyPageInactive />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
