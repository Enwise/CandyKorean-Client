import React from "react";
import { TouchableOpacity } from "react-native";
import BackButtonIcon from "../assets/icons/BackButtonIcon";

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BackButtonIcon />
    </TouchableOpacity>
  );
};

export default BackButton;
