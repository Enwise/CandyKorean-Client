import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "../screens/Setting";
import MyPage from "../screens/MyPage";
import MyPurchases from "../screens/MyPurchases";
import MyLesson from "../screens/MyLesson";
const Stack = createNativeStackNavigator();

const MyPageStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="My" component={MyPage} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="MyPurchases" component={MyPurchases} />
            <Stack.Screen name="MyLesson" component={MyLesson} />
        </Stack.Navigator>
    );
};

export default MyPageStack;
