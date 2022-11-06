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
      navigation.setOptions({
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
      });
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
