import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ClassRoom from "../screens/ClassRoom";
import LessonInfo from "../screens/LessonInfo";
import LessonVideo from "../screens/LessonVideo";

const Stack = createNativeStackNavigator();

const ClassRoomStack = ({ navigation, route }) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log(routeName);
  React.useLayoutEffect(() => {
    if (routeName == "LessonVideo") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClassRoom" component={ClassRoom} />
      <Stack.Screen name="LessonInfo" component={LessonInfo} />
      <Stack.Screen name="LessonVideo" component={LessonVideo} />
    </Stack.Navigator>
  );
};

export default ClassRoomStack;
