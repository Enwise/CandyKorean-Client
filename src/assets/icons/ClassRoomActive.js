import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function ClassRoomActive(props) {
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
        d="M23.956 9.615H7.223a2.39 2.39 0 00-2.391 2.39v10.758a2.39 2.39 0 002.39 2.39h16.734a2.39 2.39 0 002.39-2.39V12.006a2.39 2.39 0 00-2.39-2.39z"
        fill="url(#paint0_linear_1004_4104)"
        stroke="url(#paint1_linear_1004_4104)"
        strokeWidth={1.66609}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.121 6.123a1.557 1.557 0 011.102-.456h4.78a1.557 1.557 0 011.558 1.558v2.39h-7.896v-2.39c0-.414.164-.81.456-1.102zM10 9.615v-2.39A3.223 3.223 0 0113.223 4h4.78a3.223 3.223 0 013.224 3.224v2.39h2.73a2.39 2.39 0 012.39 2.39v10.758a2.39 2.39 0 01-2.39 2.39H7.222a2.39 2.39 0 01-2.391-2.39V12.006a2.39 2.39 0 012.39-2.39H10z"
        fill="url(#paint2_linear_1004_4104)"
      />
      <Path
        d="M15.832 15.592v.013M3.5 16.5c3.337 1.681 8.354 2.844 12.09 2.844 3.737 0 8.573-1.163 11.91-2.844"
        stroke="#fff"
        strokeWidth={1.66609}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1004_4104"
          x1={4.83203}
          y1={9.61523}
          x2={28.13}
          y2={13.0468}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1004_4104"
          x1={4.83203}
          y1={9.61523}
          x2={28.13}
          y2={13.0468}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_1004_4104"
          x1={4.83203}
          y1={4.00098}
          x2={28.36}
          y2={6.54662}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default ClassRoomActive;
