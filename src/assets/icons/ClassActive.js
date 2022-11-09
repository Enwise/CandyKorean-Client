import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function ClassActive(props) {
  return (
    <Svg
      width={29}
      height={21}
      viewBox="0 0 29 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.555 8.92v7.14c0 1.053.833 2.062 2.318 2.806 1.484.744 3.497 1.162 5.595 1.162 2.1 0 4.112-.418 5.596-1.162s2.318-1.753 2.318-2.805V8.92"
        fill="url(#paint0_linear_849_7626)"
      />
      <Path
        d="M6.555 8.92v7.14c0 1.053.833 2.062 2.318 2.806 1.484.744 3.497 1.162 5.595 1.162 2.1 0 4.112-.418 5.596-1.162s2.318-1.753 2.318-2.805V8.92"
        stroke="url(#paint1_linear_849_7626)"
        strokeWidth={1.66609}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M27.658 6.805l-13.19-5.29L1.28 6.806l13.19 5.29 13.19-5.29v7.934-7.934z"
        fill="url(#paint2_linear_849_7626)"
      />
      <Path
        d="M27.658 6.805l-13.19-5.29L1.28 6.806l13.19 5.29 13.19-5.29zm0 0v7.934"
        stroke="url(#paint3_linear_849_7626)"
        strokeWidth={1.66609}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_849_7626"
          x1={6.55469}
          y1={8.91992}
          x2={23.6724}
          y2={11.5146}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_849_7626"
          x1={6.55469}
          y1={8.91992}
          x2={23.6724}
          y2={11.5146}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_849_7626"
          x1={1.2793}
          y1={1.51563}
          x2={29.2067}
          y2={7.44202}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_849_7626"
          x1={1.2793}
          y1={1.51563}
          x2={29.2067}
          y2={7.44202}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default ClassActive;
