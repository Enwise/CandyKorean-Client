import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Class from "../screens/Class";
import MyLecture from "../screens/MyLecture";
import Premium from "../screens/Premium";
import MyPage from "../screens/MyPage";

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Class" component={Class} />
      <Tab.Screen name="MyLecture" component={MyLecture} />
      <Tab.Screen name="Premium" component={Premium} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
};

export default MainTab;
