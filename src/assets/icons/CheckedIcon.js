import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CheckedIcon(props) {
  return (
    <Svg
      width={29}
      height={29}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.5 29C22.508 29 29 22.508 29 14.5S22.508 0 14.5 0 0 6.492 0 14.5 6.492 29 14.5 29z"
        fill="#A160E2"
      />
      <Path
        d="M8 15.361l4.361 4.362L21.084 11"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CheckedIcon;
