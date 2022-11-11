import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function HomeActive(props) {
  return (
    <Svg
      width={23}
      height={22}
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.34 21.029c.46 0 .833-.373.833-.834V9.325a.833.833 0 00-.313-.65l-9.253-7.403a.833.833 0 00-1.04 0L1.312 8.675a.833.833 0 00-.313.65v10.87c0 .46.373.834.833.834H7.48c.46 0 .833-.373.833-.834V13.54c0-.46.373-.833.833-.833h3.881c.46 0 .833.373.833.833v6.655c0 .46.373.834.833.834h5.647z"
        fill="url(#paint0_linear_849_7030)"
        stroke="url(#paint1_linear_849_7030)"
        strokeWidth={1.66609}
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_849_7030"
          x1={1}
          y1={-0.225406}
          x2={22.2875}
          y2={3.83433}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C984FF" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_849_7030"
          x1={1}
          y1={-0.225401}
          x2={21.6842}
          y2={4.3216}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C984FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default HomeActive;
