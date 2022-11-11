import * as React from "react";
import Svg, { Path } from "react-native-svg";

const MyPageInactive = (props) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15 15a5 5 0 100-10 5 5 0 000 10zM6 24.229V25h18v-.771c0-2.88 0-4.32-.436-5.42-.383-.969-.995-1.755-1.748-2.248C20.96 16 19.84 16 17.6 16h-5.2c-2.24 0-3.36 0-4.216.56-.753.494-1.365 1.28-1.748 2.248C6 19.908 6 21.348 6 24.228z"
      stroke="#807F82"
      strokeWidth={1.66609}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MyPageInactive;
