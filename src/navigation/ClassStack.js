import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClassMain from "../screens/ClassMain";
import ClassMore from "../screens/ClassMore";
import ClassInfo from "../screens/ClassInfo";
const Stack = createNativeStackNavigator();

const ClassStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClassMain" component={ClassMain} />
      <Stack.Screen name="ClassMore" component={ClassMore} />
      <Stack.Screen name="ClassInfo" component={ClassInfo} />
    </Stack.Navigator>
  );
};

export default ClassStack;
