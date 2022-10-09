import React from "react";
import { Image, View } from "react-native";
import LogoIcon from "../assets/icons/LogoIcon";
const Logo = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <LogoIcon />
      <Image
        source={require("../assets/LogoText.png")}
        style={{ marginTop: 23 }}
      />
    </View>
  );
};

export default Logo;
