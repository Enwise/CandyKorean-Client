import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function CloseIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_696_2130)"
        stroke="#807F82"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M18 6L6 18M6 6l12 12" />
      </G>
      <Defs>
        <ClipPath id="clip0_696_2130">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default CloseIcon;
