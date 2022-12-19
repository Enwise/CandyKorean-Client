import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const GradientButtonView = ({ text, textStyle, viewStyle }) => {
  return (
    <View>
      <LinearGradient
        colors={["#84E9FF", "#C284FF"]}
        locations={[0, 1]}
        start={[0.025, 0.5]}
        end={[0.975, 0.5]}
        style={{ ...viewStyle }}
      >
        <Text style={{ ...textStyle }}>{text}</Text>
      </LinearGradient>
    </View>
  );
};

export default GradientButtonView;
