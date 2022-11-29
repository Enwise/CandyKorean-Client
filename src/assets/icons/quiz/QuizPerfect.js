import * as React from "react"
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function QuizPerfect(props) {
  return (
    <Svg
      width={"100%"}
      height={60}
      viewBox="0 0 253 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_d_1301_3974)">
        <Rect x={6} y={6} width={233} height={51} rx={13} fill="#fff" />
      </G>
      <Path
        d="M81.535 28.576c0 .976-.224 1.872-.672 2.688-.448.8-1.136 1.448-2.064 1.944-.928.496-2.08.744-3.456.744h-2.544V40h-4.104V23.152h6.648c1.344 0 2.48.232 3.408.696.928.464 1.624 1.104 2.088 1.92.464.816.696 1.752.696 2.808zm-6.504 2.112c.784 0 1.368-.184 1.752-.552.384-.368.576-.888.576-1.56s-.192-1.192-.576-1.56c-.384-.368-.968-.552-1.752-.552h-2.232v4.224h2.232zm12.745-4.248v3.408h5.496v3.168h-5.496v3.696h6.216V40h-10.32V23.152h10.32v3.288h-6.216zM105.248 40l-3.504-6.36h-.984V40h-4.104V23.152h6.888c1.328 0 2.456.232 3.384.696.944.464 1.648 1.104 2.112 1.92.464.8.696 1.696.696 2.688 0 1.12-.32 2.12-.96 3-.624.88-1.552 1.504-2.784 1.872L109.88 40h-4.632zm-4.488-9.264h2.544c.752 0 1.312-.184 1.68-.552.384-.368.576-.888.576-1.56 0-.64-.192-1.144-.576-1.512-.368-.368-.928-.552-1.68-.552h-2.544v4.176zm22.52-7.584v3.288h-6.864v3.552h5.136v3.192h-5.136V40h-4.104V23.152h10.968zm6.261 3.288v3.408h5.496v3.168h-5.496v3.696h6.216V40h-10.32V23.152h10.32v3.288h-6.216zm8.185 5.112c0-1.664.36-3.144 1.08-4.44a7.639 7.639 0 013-3.048c1.296-.736 2.76-1.104 4.392-1.104 2 0 3.712.528 5.136 1.584s2.376 2.496 2.856 4.32h-4.512c-.336-.704-.816-1.24-1.44-1.608-.608-.368-1.304-.552-2.088-.552-1.264 0-2.288.44-3.072 1.32-.784.88-1.176 2.056-1.176 3.528s.392 2.648 1.176 3.528c.784.88 1.808 1.32 3.072 1.32.784 0 1.48-.184 2.088-.552.624-.368 1.104-.904 1.44-1.608h4.512c-.48 1.824-1.432 3.264-2.856 4.32-1.424 1.04-3.136 1.56-5.136 1.56-1.632 0-3.096-.36-4.392-1.08a7.847 7.847 0 01-3-3.048c-.72-1.296-1.08-2.776-1.08-4.44zm31.097-8.4v3.288h-4.464V40h-4.104V26.44h-4.464v-3.288h13.032zm7.46-.6l-.48 11.496h-3.48l-.48-11.496h4.44zm-2.16 17.64c-.72 0-1.312-.208-1.776-.624a2.116 2.116 0 01-.672-1.584c0-.64.224-1.176.672-1.608.464-.432 1.056-.648 1.776-.648.704 0 1.28.216 1.728.648.464.432.696.968.696 1.608 0 .624-.232 1.152-.696 1.584-.448.416-1.024.624-1.728.624z"
        fill="url(#paint0_linear_1301_3974)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1301_3974"
          x1={67}
          y1={14}
          x2={178.682}
          y2={50.9608}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default QuizPerfect