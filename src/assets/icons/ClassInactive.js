import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ClassInactive = (props) => (
  <Svg
    width={29}
    height={21}
    viewBox="0 0 29 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.366.06a.833.833 0 00-.62 0L.525 5.35a.833.833 0 000 1.547l4.488 1.795A.839.839 0 005 8.834v6.545c0 1.527 1.193 2.755 2.784 3.55 1.63.815 3.783 1.25 5.983 1.25 2.2 0 4.353-.435 5.983-1.25 1.59-.795 2.784-2.023 2.784-3.55v-6.46l3.913-1.565v6.703a.833.833 0 101.666 0V6.123a.833.833 0 00-.524-.773L14.366.06zm6.502 9.525l-6.502 2.601a.834.834 0 01-.62 0l-7.08-2.832v6.025c0 .577.479 1.368 1.863 2.06 1.346.673 3.23 1.074 5.238 1.074 2.008 0 3.892-.401 5.238-1.074 1.384-.692 1.863-1.483 1.863-2.06V9.585zm-6.812.93l10.98-4.392-10.98-4.392-10.98 4.392 10.98 4.392z"
      fill="#807F82"
    />
  </Svg>
);

export default ClassInactive;
