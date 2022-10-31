import * as React from "react";
import Svg, { Path } from "react-native-svg";

function LevelCheckIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M12 21a9 9 0 100-18 9 9 0 000 18z" fill="#A160E2" />
      <Path
        d="M9 12l2 2 4-4"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default LevelCheckIcon;
