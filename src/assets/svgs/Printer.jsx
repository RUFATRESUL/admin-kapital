import * as React from "react";
const SvgPrinter = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <g
      stroke="#13181E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      opacity={0.9}
    >
      <path d="M6.042 5.833h7.917V4.167c0-1.667-.625-2.5-2.5-2.5H8.542c-1.875 0-2.5.833-2.5 2.5v1.666ZM13.334 12.5v3.333c0 1.667-.834 2.5-2.5 2.5H9.167c-1.667 0-2.5-.833-2.5-2.5V12.5h6.667Z" />
      <path d="M17.5 8.333V12.5c0 1.667-.833 2.5-2.5 2.5h-1.667v-2.5H6.667V15H5c-1.667 0-2.5-.833-2.5-2.5V8.333c0-1.666.833-2.5 2.5-2.5h10c1.667 0 2.5.834 2.5 2.5ZM14.166 12.5H5.833M5.833 9.167h2.5" />
    </g>
  </svg>
);
export default SvgPrinter;
