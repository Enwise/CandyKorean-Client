import * as React from "react";
import Svg, { Path } from "react-native-svg";

const PremiumInactive = (props) => (
  <Svg
    width={28}
    height={19}
    viewBox="0 0 28 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M13.605 1l5.602 8.403 7.002-5.602-2.8 14.005H3.8L1 3.801l7.003 5.602L13.605 1z"
      stroke="#807F82"
      strokeWidth={1.82072}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PremiumInactive;
