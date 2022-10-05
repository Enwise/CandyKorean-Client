import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Class from "../screens/Class";
import MyLecture from "../screens/MyLecture";
import Premium from "../screens/Premium";
import MyPage from "../screens/MyPage";
import ClassInactive from "../assets/icons/ClassInactive";
import MyLectureInactive from "../assets/icons/MyLectureInactive";
import MyPageInactive from "../assets/icons/MyPageInactive";
import PremiumInactive from "../assets/icons/PremiumInactive";
import HomeInactive from "../assets/icons/HomeInactive";

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
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
        component={Class}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <ClassInactive /> : <ClassInactive />;
          },
        }}
      />
      <Tab.Screen
        name="MyLecture"
        component={MyLecture}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <MyLectureInactive /> : <MyLectureInactive />;
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
        name="MyPage"
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
