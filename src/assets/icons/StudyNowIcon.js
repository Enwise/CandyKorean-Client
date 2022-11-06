import * as React from "react";
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";

function StudyNowIcon(props) {
  return (
    <Svg
      width={350}
      height={50}
      viewBox="0 0 350 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        width={350}
        height={50}
        rx={25}
        fill="url(#paint0_linear_849_7360)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_849_7360"
          x1={0}
          y1={0}
          x2={249.108}
          y2={185.493}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default StudyNowIcon;
