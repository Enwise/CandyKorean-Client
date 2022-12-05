import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ClassRoom from "../screens/ClassRoom";
import LessonInfo from "../screens/LessonInfo";
import LessonVideo from "../screens/LessonVideo";
import LessonQuiz from "../screens/LessonQuiz";
import QuizResult from "../screens/QuizResult";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator();

const ClassRoomStack = ({ navigation, route }) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log(routeName);
  React.useLayoutEffect(() => {
    if (
      routeName == "LessonVideo" ||
      routeName == "LessonQuiz" ||
      routeName == "LessonInfo" ||
      routeName == "QuizResult"
    ) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          paddingHorizontal: 10,
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
          borderWidth: 0.5,
          borderColor: "#EFEFEF",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowRadius: 23,
          position: "absolute",
        },
      });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClassRoomMain" component={ClassRoom} />
      <Stack.Screen
        name="LessonInfo"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={LessonInfo}
      />
      <Stack.Screen
        name="LessonVideo"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        component={LessonVideo}
      />
      <Stack.Screen name="LessonQuiz" component={LessonQuiz} />
      <Stack.Screen name="QuizResult" component={QuizResult} />
    </Stack.Navigator>
  );
};

export default ClassRoomStack;
