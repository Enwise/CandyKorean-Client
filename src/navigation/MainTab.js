import React from "react";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
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
import { Platform } from "react-native";
const Tab = createBottomTabNavigator();
import MyPageStack from "./MyPageStack";

const MainTab = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "#807F82",
        tabBarActiveTintColor: "black",
        tabBarStyle: {
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
          border: "0.5px solid #EFEFEF",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowRadius: 23,
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins-Regular",
          fontSize: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <HomeInactive /> : <HomeInactive />;
          },
        }}
      />
      <Tab.Screen
        name="Class"
        component={ClassStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <ClassInactive /> : <ClassInactive />;
          },
        }}
      />

      <Tab.Screen
        name="ClassRoom"
        component={ClassRoomStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <ClassRoomInactive /> : <ClassRoomInactive />;
          },
        }}
      />
      <Tab.Screen
        name="Premium"
        component={Premium}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <PremiumInactive /> : <PremiumInactive />;
          },
        }}
      />
      <Tab.Screen
        name="My"
        component={MyPageStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <MyPageInactive /> : <MyPageInactive />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
