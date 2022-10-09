import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Class from "../screens/Class";
import Premium from "../screens/Premium";
import MyPage from "../screens/MyPage";
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
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabelStyle: {
            fontFamily: "Poppins-Regular",
          },
          tabBarActiveTintColor: "black",
          tabBarIcon: ({ focused }) => {
            return focused ? <HomeInactive /> : <HomeInactive />;
          },
        }}
      />
      <Tab.Screen
        name="Class"
        component={Class}
        options={{
          tabBarLabelStyle: {
            fontFamily: "Poppins-Regular",
          },
          tabBarActiveTintColor: "black",
          tabBarIcon: ({ focused }) => {
            return focused ? <ClassInactive /> : <ClassInactive />;
          },
        }}
      />
      <Tab.Screen
        name="ClassRoom"
        component={ClassRoom}
        options={{
          tabBarLabelStyle: {
            fontFamily: "Poppins-Regular",
          },
          tabBarActiveTintColor: "black",
          tabBarIcon: ({ focused }) => {
            return focused ? <ClassRoomInactive /> : <ClassRoomInactive />;
          },
        }}
      />
      <Tab.Screen
        name="Premium"
        component={Premium}
        options={{
          tabBarLabelStyle: {
            fontFamily: "Poppins-Regular",
          },
          tabBarActiveTintColor: "black",
          tabBarIcon: ({ focused }) => {
            return focused ? <PremiumInactive /> : <PremiumInactive />;
          },
        }}
      />
      <Tab.Screen
        name="My"
        component={MyPage}
        options={{
          tabBarLabelStyle: {
            fontFamily: "Poppins-Regular",
          },
          tabBarActiveTintColor: "black",
          tabBarIcon: ({ focused }) => {
            return focused ? <MyPageInactive /> : <MyPageInactive />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
