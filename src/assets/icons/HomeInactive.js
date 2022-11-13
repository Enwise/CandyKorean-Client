import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HomeInactive = (props) => (
  <Svg
    width={23}
    height={23}
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20.34 21.173c.46 0 .833-.373.833-.833V9.47a.833.833 0 00-.313-.65l-9.253-7.404a.833.833 0 00-1.04 0L1.312 8.82A.833.833 0 001 9.47V20.34c0 .46.373.833.833.833H7.48c.46 0 .833-.373.833-.833v-6.655c0-.46.373-.833.833-.833h3.881c.46 0 .833.373.833.833v6.655c0 .46.373.833.833.833h5.647z"
      stroke="#807F82"
      strokeWidth={1.66609}
      strokeLinejoin="round"
    />
  </Svg>
);

export default HomeInactive;
