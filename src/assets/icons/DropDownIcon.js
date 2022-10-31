import * as React from "react";
import Svg, { Path } from "react-native-svg";

function DropDownIcon(props) {
  return (
    <Svg
      width={11}
      height={9}
      viewBox="0 0 11 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.366 8.5a1 1 0 01-1.732 0L.737 1.75a1 1 0 01.866-1.5h7.794a1 1 0 01.866 1.5L6.366 8.5z"
        fill="#B8B5BC"
      />
    </Svg>
  );
}

export default DropDownIcon;
