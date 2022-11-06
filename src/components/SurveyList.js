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
  const [selected, setSelected] = React.useState(selectedData);
  const onSelect = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
      onPress(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
      onPress([...selected, item]);
    }
  };

  // console.log(selected);
  return (
    <View>
      {data.map((item, index) => (
        <SurveyItem
          key={index}
          checked={selected.includes(item)}
          item={item}
          onPress={() => onSelect(item)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default SurveyList;
