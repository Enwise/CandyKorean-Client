import React, { useState } from "react";
import {
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownIcon from "../assets/icons/DropDownIcon";
const windowWidth = Dimensions.get("window").width;
const Accordion = ({ title, data, selectItem, selected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button(isOpen)}
        onPress={toggleOpen}
        activeOpacity={0.6}
      >
        <Text
          style={[
            styles.text,
            selected !== undefined ? styles.select : undefined,
          ]}
        >
          {selected === undefined ? title : selected}
        </Text>
        <View style={styles.icon(isOpen)}>
          <DropDownIcon />
        </View>
      </TouchableOpacity>
      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                selectItem(item);
                toggleOpen();
              }}
              style={styles.listItem(index, data.length)}
            >
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: (isOpen) => ({
    height: 40,
    width: windowWidth - 40,
    backgroundColor: "white",
    borderColor: "#E6E3EA",
    borderWidth: 1,
    borderRadius: 9,
    borderBottomLeftRadius: isOpen ? 0 : 9,
    borderBottomRightRadius: isOpen ? 0 : 9,
    paddingLeft: 22,
    flexDirection: "row",
    alignItems: "center",
  }),
  hidden: {
    height: 0,
  },
  list: {
    overflow: "hidden",
  },
  icon: (isOpen) => ({
    transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
  }),
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#B8B5BC",
    flex: 0.95,
  },
  select: {
    color: "#444345",
  },
  listItem: (index, length) => ({
    height: 40,
    width: windowWidth - 40,
    backgroundColor: "white",
    borderColor: "#E6E3EA",
    borderWidth: 1,
    borderTopWidth: 0,
    paddingLeft: 22,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: index === length - 1 ? 9 : 0,
    borderBottomRightRadius: index === length - 1 ? 9 : 0,
  }),
});

export default Accordion;
