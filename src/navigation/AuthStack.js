import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import WelcomePage from "../screens/WelcomePage";
import UserInfo from "../screens/UserInfo";
import SignUpSuccessPage from "../screens/SignUpSuccessPage";
import Survey from "../screens/Survey";
import SurveyCompletePage from "../screens/SurveyCompletePage";
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomePage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Success" component={SignUpSuccessPage} />
      <Stack.Screen name="UserInfo" component={UserInfo} />
      <Stack.Screen name="Survey" component={Survey} />
      <Stack.Screen name="SurveyComplete" component={SurveyCompletePage} />
    </Stack.Navigator>
  );
};

export default AuthStack;
