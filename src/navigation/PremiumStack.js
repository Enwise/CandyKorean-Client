import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Premium from "../screens/Premium";
import Tutoring from "../screens/Tutoring";
const Stack = createNativeStackNavigator();
const PremiumStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PremiumMain" component={Premium} />
      <Stack.Screen name="Tutoring" component={Tutoring} />
    </Stack.Navigator>
  );
};

export default PremiumStack;
