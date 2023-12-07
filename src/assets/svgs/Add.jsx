import * as React from "react";
const SvgAdd = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <path
      stroke="#374253"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.5 15h15M15 22.5v-15"
    />
  </svg>
);
export default SvgAdd;
