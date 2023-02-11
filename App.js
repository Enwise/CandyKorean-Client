import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./src/navigation/AuthStack";
import MainTab from "./src/navigation/MainTab";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";
// import * as InAppPurchases from "expo-in-app-purchases";

import {
  createUser,
  getUserById,
  login,
  updateUser,
} from "./src/modules/NetworkFunction";
import AuthContext from "./src/contexts/AuthContext";
const Stack = createNativeStackNavigator();


const App = () => {
  const [userData, setUserData] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState(false);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false, // token이 저장되어 있으면 로그인 상태로 변경
            userId: action.userId,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userId: action.userId,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userId: null,
          };
        case "SIGN_UP":
          return {
            ...prevState,
            isSignedUp: action.isSignedUp,
            userId: action.userId,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      isSignedUp: false,
      userId: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken, userId;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        userId = await AsyncStorage.getItem("userId");
      } catch (e) {
        // Restoring token failed
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken, userId: userId });
    };

    bootstrapAsync();

    // 화면 세로 고정
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    // 인앱결제
    // InAppPurchases.connectAsync()

  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // data: {login_id, password} 받아서 서버로 보내서 토큰 받아오기
        let userToken = null;
        let userId = null;
        await login(
          data,
          (d) => {
            // console.log("data", d);
            setUserData(d.data);
            userToken = d.token.token;
            userId = d.data.user_id;
          },
          () => {},
          (err) => {
            console.log("error!!", err);
          }
        );
        // 받아온 토큰 저장하기
        if (userToken) {
          try {
            await AsyncStorage.multiSet([
              ["userToken", userToken],
              ["userId", String(userId)],
            ]);
          } catch (e) {
            console.log("e", e);
          }
        }

        dispatch({ type: "SIGN_IN", token: userToken, userId: userId });
      },
      signOut: async () => {
        await AsyncStorage.multiRemove(["userToken", "userId"]);

        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        // 서버에 회원가입 data 보내고 토큰 받아오기
        let isSignedUp = false;
        let userId = null;
        await createUser(
          data,
          (d) => {
            userId = d.data.user_id;
            isSignedUp = true;
          },
          () => {},
          (err) => {
            console.log("회원가입 실패", err);
          }
        );

        dispatch({ type: "SIGN_UP", isSignedUp: isSignedUp, userId: userId });
        if (isSignedUp) return true;
      },
      authState: state,
    }),
    [state]
  );
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.userToken == null ? (
            <>
              <Stack.Screen
                name="AuthStack"
                component={AuthStack}
                options={{
                  title: "Auth",
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
            </>
          ) : (
            <Stack.Screen name="MainTab" component={MainTab} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
