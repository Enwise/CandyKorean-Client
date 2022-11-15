import * as React from "react";
import Svg, {
  Mask,
  Rect,
  G,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
function Mountain(props) {
  return (
    <Svg
      width={110}
      height={110}
      viewBox="0 0 137 137"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Mask
        id="a"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={137}
        height={137}
      >
        <Rect width={137} height={137} rx={7} fill="#D9D9D9" />
      </Mask>
      <G mask="url(#a)">
        <Path fill="url(#pattern0)" d="M0 -50H137V155H0z" />
      </G>
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use
            xlinkHref="#image0_1004_4595"
            transform="matrix(.00146 0 0 .00097 0 -.001)"
          />
        </Pattern>
        <Image
          id="image0_1004_4595"
          width={687}
          height={1031}
        />
      </Defs>
    </Svg>
  );
}
export default Mountain;