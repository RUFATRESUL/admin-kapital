import * as React from "react";
const SvgScan = (props) => (
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
      strokeWidth={1.5}
      opacity={0.9}
    >
      <path d="M1.667 7.5V5.417a3.745 3.745 0 0 1 3.75-3.75H7.5M12.5 1.667h2.083a3.745 3.745 0 0 1 3.75 3.75V7.5M18.333 13.333v1.25a3.745 3.745 0 0 1-3.75 3.75h-1.25M7.5 18.333H5.417a3.745 3.745 0 0 1-3.75-3.75V12.5M14.166 7.917v4.166c0 1.667-.833 2.5-2.5 2.5H8.333c-1.667 0-2.5-.833-2.5-2.5V7.917c0-1.667.833-2.5 2.5-2.5h3.333c1.667 0 2.5.833 2.5 2.5ZM15.834 10H4.167" />
    </g>
  </svg>
);
export default SvgScan;
