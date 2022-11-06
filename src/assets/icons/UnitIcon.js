import * as React from "react";
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";

function UnitIcon(props) {
  return (
    <Svg
      width={53}
      height={21}
      viewBox="0 0 53 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        width={53}
        height={19}
        rx={9.5}
        fill="url(#paint0_linear_849_7344)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_849_7344"
          x1={0}
          y1={0}
          x2={53.8927}
          y2={15.9917}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default UnitIcon;
