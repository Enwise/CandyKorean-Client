import * as React from "react";
import Svg, { Path } from "react-native-svg";

const MyPageInactive = (props) => (
  <Svg
    width={21}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.22 11.277a4.914 4.914 0 1 0 0-9.827 4.914 4.914 0 0 0 0 9.827ZM.935 21.407v.62H19.5v-.62c0-2.31 0-3.465-.45-4.348a4.125 4.125 0 0 0-1.803-1.802c-.882-.45-2.037-.45-4.348-.45H7.536c-2.31 0-3.466 0-4.348.45a4.125 4.125 0 0 0-1.803 1.803c-.45.882-.45 2.037-.45 4.348Z"
      stroke="#929292"
      strokeWidth={1.666}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MyPageInactive;
