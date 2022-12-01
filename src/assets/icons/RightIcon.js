import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function RightIcon(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1434_3462)">
        <Path
          d="M5.541 3.844l3.5 3.25-3.5 3.25"
          stroke="#807F82"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1434_3462">
          <Path fill="#fff" transform="translate(0 .594)" d="M0 0H14V13H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default RightIcon;
