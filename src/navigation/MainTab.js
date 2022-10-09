import React from "react";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import MyLecture from "../screens/MyLecture";
import Class from "../screens/Class";
import Premium from "../screens/Premium";
import MyPage from "../screens/MyPage";
import ClassStack from "../navigation/ClassStack";
import ClassInactive from "../assets/icons/ClassInactive";
import ClassRoomInactive from "../assets/icons/ClassRoomInactive";
import MyPageInactive from "../assets/icons/MyPageInactive";
import PremiumInactive from "../assets/icons/PremiumInactive";
import HomeInactive from "../assets/icons/HomeInactive";
import { useFonts } from "expo-font";
import ClassRoom from "../screens/ClassRoom";
const Tab = createBottomTabNavigator();

const MainTab = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "Poppins-Regular",
        },
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          height: 88,
          borderRadius: "29px 29px 0px 0px",
          border: "0.5px solid #EFEFEF",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowRadius: 23,
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
      {/* <Tab.Screen
        name="ClassInfo"
        component={ClassInfo}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <ClassInactive /> : <ClassInactive />;
          },
        }}
      /> */}
      <Tab.Screen
        name="ClassRoom"
        component={ClassRoom}
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
        component={MyPage}
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
