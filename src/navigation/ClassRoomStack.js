import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClassRoom from "../screens/ClassRoom";
import LessonInfo from "../screens/LessonInfo";
import LessonVideo from "../screens/LessonVideo";

const Stack = createNativeStackNavigator();

const ClassStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClassRoom" component={ClassRoom} />
      <Stack.Screen name="LessonInfo" component={LessonInfo} />
      <Stack.Screen name="LessonVideo" component={LessonVideo} />
    </Stack.Navigator>
  );
};

export default ClassStack;
