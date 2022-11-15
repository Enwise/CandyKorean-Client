import * as React from "react";
import Svg, {
  G,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function QuizCorrect(props) {
  return (
    <Svg
      width={133}
      height={133}
      viewBox="0 0 133 133"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_d_1004_4458)">
        <Circle cx={64} cy={64} r={64} fill="#fff" />
        <Circle
          cx={64}
          cy={64}
          r={61}
          stroke="url(#paint0_linear_1004_4458)"
          strokeWidth={6}
        />
      </G>
      <Path
        d="M21.65 75.242c-.358-1.34-.387-2.609-.087-3.807a6.365 6.365 0 011.757-3.1c.884-.873 1.984-1.485 3.297-1.837 1.61-.431 3.102-.375 4.476.167 1.374.543 2.45 1.497 3.23 2.862l-3.631.973c-.422-.494-.925-.822-1.506-.984-.569-.165-1.169-.163-1.8.006-1.017.273-1.747.848-2.188 1.725-.441.878-.503 1.909-.186 3.094.318 1.185.887 2.047 1.708 2.586.82.54 1.74.673 2.757.4.631-.17 1.152-.467 1.562-.895.423-.43.694-.966.812-1.605l3.632-.973c.007 1.572-.448 2.936-1.367 4.094-.922 1.144-2.188 1.932-3.798 2.363-1.313.352-2.57.378-3.768.078a6.54 6.54 0 01-3.072-1.806c-.86-.888-1.468-2.002-1.827-3.341zm22.047 1.546c-1.056.283-2.07.313-3.04.09a5.21 5.21 0 01-2.508-1.398c-.7-.71-1.201-1.625-1.502-2.745-.296-1.108-.312-2.146-.047-3.114a5.138 5.138 0 011.486-2.49c.73-.678 1.622-1.159 2.678-1.442 1.056-.283 2.07-.313 3.04-.09.971.223 1.815.694 2.532 1.413.714.706 1.22 1.613 1.516 2.72.297 1.108.308 2.154.034 3.139a5.144 5.144 0 01-1.511 2.475c-.73.679-1.622 1.16-2.678 1.442zm-.766-2.859a2.196 2.196 0 001.417-1.125c.326-.584.374-1.308.143-2.17-.231-.864-.628-1.468-1.19-1.815-.55-.35-1.14-.44-1.77-.27-.645.172-1.117.547-1.418 1.124-.304.565-.339 1.285-.104 2.161.231.863.615 1.471 1.151 1.824.55.35 1.14.44 1.77.271zm9.014-9.145a4.418 4.418 0 011.077-1.779 3.813 3.813 0 011.792-1.039l.937 3.497-.908.243c-.825.22-1.395.567-1.71 1.038-.319.458-.36 1.131-.121 2.02l1.34 5.004-3.303.885-2.888-10.78 3.303-.885.481 1.796zm8.264-2.214a4.418 4.418 0 011.076-1.779 3.813 3.813 0 011.792-1.04l.937 3.498-.908.243c-.824.22-1.394.567-1.71 1.038-.319.458-.36 1.131-.121 2.02l1.34 5.003-3.303.886-2.888-10.78 3.303-.885.482 1.796zm16.037-.632c.083.309.15.636.201.981l-7.476 2.004c.23.656.581 1.114 1.051 1.374.48.245.997.292 1.55.144.825-.22 1.305-.722 1.44-1.504l3.516-.942a4.932 4.932 0 01-.473 2.177 4.966 4.966 0 01-1.4 1.804c-.623.511-1.371.885-2.247 1.12-1.056.282-2.057.309-3.002.079a4.98 4.98 0 01-2.45-1.414c-.687-.713-1.181-1.63-1.482-2.75-.3-1.12-.337-2.16-.11-3.118.239-.961.71-1.778 1.414-2.45.703-.671 1.59-1.15 2.658-1.437 1.044-.28 2.03-.309 2.958-.088.93.22 1.728.676 2.396 1.367.68.687 1.166 1.571 1.456 2.653zm-3.614.036c-.151-.566-.465-.965-.942-1.196-.475-.232-1.003-.27-1.583-.115-.554.149-.98.436-1.28.861-.288.422-.397.942-.329 1.558l4.134-1.108zm4.747-.153c-.3-1.12-.338-2.16-.111-3.118a5.015 5.015 0 011.395-2.444c.703-.672 1.583-1.149 2.64-1.432 1.352-.362 2.573-.31 3.665.157 1.104.463 1.97 1.3 2.599 2.513l-3.516.942c-.517-.745-1.201-1.004-2.051-.776-.605.162-1.024.53-1.257 1.103-.237.56-.238 1.278-.003 2.154.235.876.596 1.504 1.085 1.884.484.367 1.03.47 1.635.307.85-.228 1.312-.794 1.388-1.697l3.516-.942c.055 1.338-.279 2.49-1 3.456-.72.966-1.751 1.629-3.09 1.988-1.057.283-2.057.31-3.002.08a5.015 5.015 0 01-2.43-1.42c-.675-.716-1.163-1.635-1.463-2.755zm19.055-2.331l.75 2.8-1.68.451c-1.198.321-2.21.281-3.034-.119-.829-.413-1.42-1.282-1.776-2.609l-1.15-4.289-1.313.352-.735-2.743 1.314-.352-.704-2.627 3.303-.885.704 2.627 2.164-.58.735 2.743-2.164.58 1.16 4.328c.086.322.225.533.418.633.192.1.469.102.83.005l1.178-.316zm7.268-13.998l2.093 9.357-2.801.75-2.866-9.15 3.574-.957zm2.066 14.664c-.58.156-1.101.116-1.564-.119a1.765 1.765 0 01-.883-1.13 1.788 1.788 0 01.194-1.44c.281-.447.71-.748 1.29-.904.567-.152 1.077-.102 1.531.15.466.247.769.628.907 1.143.134.503.062.978-.219 1.425-.271.432-.689.724-1.256.875z"
        fill="url(#paint1_linear_1004_4458)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1004_4458"
          x1={0}
          y1={0}
          x2={140.032}
          y2={14.896}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1004_4458"
          x1={17}
          y1={61}
          x2={111.755}
          y2={65.4674}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#84E9FF" />
          <Stop offset={1} stopColor="#C284FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default QuizCorrect;
