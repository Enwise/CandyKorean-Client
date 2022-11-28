import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import _ from "lodash";
import LevelCheckIcon from "../assets/icons/LevelCheckIcon";
const LevelSelect = ({ data, onPress, select }) => {
  const [selected, setSelected] = React.useState(select);
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
            style={
              _.isEqual(item.level, selected)
                ? styles.selected
                : styles.unselected
            }
            onPress={() => onSelect(item.level)}
          >
            <View>
              <Text style={styles.title}>{item.level}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            {_.isEqual(item.level, selected) && (
              <View>
                <LevelCheckIcon />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "column" },
  unselected: {
    backgroundColor: "#FDFDFD",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#E6E3EA",
    paddingVertical: 12,
    paddingHorizontal: 22,
    marginBottom: 20,
  },
  selected: {
    backgroundColor: "#FDFDFD",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#A160E2",
    paddingVertical: 12,
    paddingHorizontal: 22,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins-Medium",
    color: "#807F82",
    fontSize: 14,
    marginBottom: 2,
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#B8B5BC",
  },
});
export default LevelSelect;
