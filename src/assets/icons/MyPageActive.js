import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function MyPageActive(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15 15a5 5 0 100-10 5 5 0 000 10z"
        fill="url(#paint0_linear_1004_3143)"
      />
      <Path
        d="M6 24.229V25h18v-.771c0-2.88 0-4.32-.436-5.42-.383-.969-.995-1.755-1.748-2.248C20.96 16 19.84 16 17.6 16h-5.2c-2.24 0-3.36 0-4.216.56-.753.494-1.365 1.28-1.748 2.248C6 19.908 6 21.348 6 24.228z"
        fill="url(#paint1_linear_1004_3143)"
        stroke="url(#paint2_linear_1004_3143)"
        strokeWidth={1.66609}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1004_3143"
          x1={10}
          y1={5}
          x2={20.94}
          y2={6.16375}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1004_3143"
          x1={6}
          y1={16}
          x2={25.0524}
          y2={20.0534}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_1004_3143"
          x1={6}
          y1={16}
          x2={25.0524}
          y2={20.0534}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default MyPageActive;
