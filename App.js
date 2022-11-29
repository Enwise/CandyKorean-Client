import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./src/navigation/AuthStack";
import MainTab from "./src/navigation/MainTab";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "./src/modules/NetworkFunction";
import AuthContext from "./src/contexts/AuthContext";
const Stack = createNativeStackNavigator();

export default function App() {
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
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // data: {login_id, password} 받아서 서버로 보내서 토큰 받아오기
        let userToken = null;

        await login(
          data,
          (d) => {
            console.log("data", d);
            setUserData(d.data);
            userToken = d.token.token;
          },
          () => {},
          (err) => {
            console.log("error!!", err);
          }
        );
        // 받아온 토큰 저장하기
        if (userToken) {
          try {
            await AsyncStorage.setItem("userToken", userToken);
          } catch (e) {
            // saving error
            console.log("e", e);
          }
        }

        dispatch({ type: "SIGN_IN", token: userToken });
      },
      signOut: async () => {
        await AsyncStorage.removeItem("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
      },
      authState: state,
    }),
    []
  );
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) return null;
  console.log("state", state);
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
