import * as React from "react";
import Svg, { Path } from "react-native-svg";

function PremiumEnter(props) {
  return (
    <Svg
      width={24}
      height={22}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9 16.145l6-5.382-6-5.381"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default PremiumEnter;
