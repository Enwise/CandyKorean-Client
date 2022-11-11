import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SurveyItem from "./SurveyItem";

const SurveyList = ({ data, onPress, selectedData }) => {
  return (
    <View>
      {data.map((item, index) => (
        <SurveyItem
          key={index}
          checked={selectedData.includes(item)}
          item={item}
          onPress={() => onPress(item)}
        />
      ))}
    </View>
  );
};

export default SurveyList;
