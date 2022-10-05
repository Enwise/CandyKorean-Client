import * as React from "react";
import Svg, { Path } from "react-native-svg";

const PremiumInactive = (props) => (
  <Svg
    width={28}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m13.935 1.738 5.602 8.403 7.003-5.602-2.802 14.005H4.131L1.331 4.54l7.002 5.602 5.602-8.403Z"
      stroke="#929292"
      strokeWidth={1.821}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PremiumInactive;
