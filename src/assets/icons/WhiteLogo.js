import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

function WhiteLogo(props) {
  return (
    <Svg
      width={135}
      height={130}
      viewBox="0 0 135 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M39.827 4.875C27.045 20.863 26.787 42.281 52.258 52.09c21.34 8.217 25.846 27.177 11.583 47.68"
        stroke="#fff"
        strokeWidth={7.04187}
      />
      <Path
        d="M99.38 40.677C83.491 27.77 62.076 27.344 52.07 52.739 43.685 74.013 24.69 78.37 4.3 63.949"
        stroke="#fff"
        strokeWidth={7.04187}
      />
      <Circle
        cx={52.1098}
        cy={52.1098}
        r={48.5889}
        stroke="#fff"
        strokeWidth={7.04187}
      />
      <Path
        stroke="#fff"
        strokeWidth={7.04187}
        strokeLinecap="round"
        d="M91.829 84.9722L131 124.143"
      />
    </Svg>
  );
}

export default WhiteLogo;
