import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HomeInactive = (props) => (
  <Svg
    width={23}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20.34 21.029c.46 0 .833-.373.833-.834V9.325a.833.833 0 0 0-.313-.65l-9.253-7.403a.833.833 0 0 0-1.04 0L1.312 8.675a.833.833 0 0 0-.313.65v10.87c0 .46.373.834.833.834H7.48c.46 0 .833-.373.833-.834V13.54c0-.46.373-.833.833-.833h3.881c.46 0 .833.373.833.833v6.655c0 .46.373.834.833.834h5.647Z"
      stroke="#807F82"
      strokeWidth={1.666}
      strokeLinejoin="round"
    />
  </Svg>
);

export default HomeInactive;
