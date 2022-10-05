import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ClassInactive = (props) => (
  <Svg
    width={29}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m28 6.804-13.224-5.29-13.223 5.29 13.223 5.29 13.223-5.29Zm0 0v7.934"
      stroke="#929292"
      strokeWidth={1.666}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.842 8.92v7.14c0 1.053.836 2.062 2.324 2.806 1.488.744 3.506 1.162 5.61 1.162 2.104 0 4.122-.418 5.61-1.162 1.488-.744 2.324-1.753 2.324-2.805V8.92"
      stroke="#929292"
      strokeWidth={1.666}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ClassInactive;
