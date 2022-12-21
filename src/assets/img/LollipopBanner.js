import * as React from "react";

import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import BannerLogo from "../icons/BannerLogo";

function LollipopBanner(props) {
  return (
    <View style={{}}>
      <LinearGradient
        colors={["rgba(132, 233, 255, 0.5)", "rgba(201, 132, 255, 0.5)"]}
        locations={[0, 1]}
        start={[0.025, 0]}
        end={[0.975, 0]}
        style={{
          height: 100,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 100,
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginLeft: 23, marginTop: 0 }}>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 14,

                letterSpacing: -0.165,
                lineHeight: 18,
              }}
            >
              For a beginner
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 24,
              }}
            >
              Lollipop Level
            </Text>
          </View>
          <View style={{ width: 54, height: 50, marginRight: 36 }}>
            <BannerLogo />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

export default LollipopBanner;
