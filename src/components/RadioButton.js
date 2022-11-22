import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const RadioButton = ({ data, onPress }) => {
  const [selected, setSelected] = React.useState();
  const onSelect = (value) => {
    setSelected(value);
    onPress(value);
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={item === selected ? styles.selected : styles.unselected}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  unselected: {
    backgroundColor: "white",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#E6E3EA",
    paddingVertical: 9,
    paddingHorizontal: 22,
    marginRight: 16,
  },
  selected: {
    backgroundColor: "#E6E3EA",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#E6E3EA",
    paddingVertical: 9,
    paddingHorizontal: 22,
    marginRight: 16,
  },
  text: {
    fontFamily: "Poppins-Regular",
    color: "#B8B5BC",
    fontSize: 14,
  },
});
export default RadioButton;
