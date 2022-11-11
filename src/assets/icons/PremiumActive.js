import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function PremiumActive(props) {
  return (
    <Svg
      width={31}
      height={30}
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.5 7l5.556 8.5L28 9.833 25.222 24H5.778L3 9.833 9.944 15.5 15.5 7z"
        fill="url(#paint0_linear_1004_3627)"
        stroke="url(#paint1_linear_1004_3627)"
        strokeWidth={1.82072}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1004_3627"
          x1={3}
          y1={7}
          x2={29.9987}
          y2={11.2235}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1004_3627"
          x1={3}
          y1={7}
          x2={29.9987}
          y2={11.2235}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default PremiumActive;
