import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SurveyList = ({ data, onPress }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() => onPress(item)}
        >
          <Text>{item}</Text>
        </TouchableOpacity>
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  itemButton: {
    alignItems: "center",
    marginBottom: 15,
    height: 30,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default SurveyList;
