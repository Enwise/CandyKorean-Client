import * as React from "react";
import Svg, { Path } from "react-native-svg";

function UnCheckedIcon(props) {
  return (
    <Svg
      width={31}
      height={31}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.5 30C23.508 30 30 23.508 30 15.5S23.508 1 15.5 1 1 7.492 1 15.5 7.492 30 15.5 30z"
        fill="#FDFDFD"
        stroke="#F1EFF4"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M9 16.361l4.361 4.362L22.084 12" fill="#FDFDFD" />
      <Path
        d="M9 16.361l4.361 4.362L22.084 12"
        stroke="#E6E3EA"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default UnCheckedIcon;
