import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";

function QuizNextButton(props) {
  return (
    <Svg
      width={330}
      height={50}
      marginTop={20}
      viewBox="0 0 350 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        width={350}
        height={50}
        rx={25}
        fill="url(#paint0_linear_1004_4461)"
      />
      <Path
        d="M160.767 32h-2.8l-6.34-9.58V32h-2.8V18.02h2.8l6.34 9.6v-9.6h2.8V32zm7.067-11.7v3.5h4.7v2.22h-4.7v3.7h5.3V32h-8.1V18.02h8.1v2.28h-5.3zM185.539 32l-3.02-4.7-2.74 4.7h-3.16l4.4-7.04-4.46-6.92h3.22l3.02 4.68 2.72-4.68h3.16l-4.38 7.02 4.46 6.94h-3.22zm16.351-13.96v2.26h-3.72V32h-2.8V20.3h-3.72v-2.26h10.24z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1004_4461"
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

export default QuizNextButton;
