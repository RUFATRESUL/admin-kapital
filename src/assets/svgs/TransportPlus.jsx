import * as React from "react";
const SvgTransportPlus = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <circle cx={16} cy={16} r={16} fill="#14458D" />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11 16h10M16 21V11"
    />
  </svg>
);
export default SvgTransportPlus;
