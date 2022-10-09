import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ClassRoomInactive = (props) => (
  <Svg
    width={24}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20.366 6.488H3.633a2.39 2.39 0 0 0-2.39 2.39v10.758a2.39 2.39 0 0 0 2.39 2.39h16.733a2.39 2.39 0 0 0 2.39-2.39V8.88a2.39 2.39 0 0 0-2.39-2.39Z"
      stroke="#929292"
      strokeWidth={1.666}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.219 6.489V4.098a2.39 2.39 0 0 1 2.39-2.39h4.781a2.39 2.39 0 0 1 2.39 2.39v2.39M12 12.465v.013M1.242 13.66a23.906 23.906 0 0 0 21.515 0"
      stroke="#929292"
      strokeWidth={1.666}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ClassRoomInactive;
