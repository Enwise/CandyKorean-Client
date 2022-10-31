import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClassRoomMain from "../screens/ClassRoomMain";
import LessonInfo from "../screens/LessonInfo";

const Stack = createNativeStackNavigator();

const ClassStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClassRoomMain" component={ClassRoomMain} />
      <Stack.Screen name="LessonInfo" component={LessonInfo} />
    </Stack.Navigator>
  );
};

export default ClassStack;
