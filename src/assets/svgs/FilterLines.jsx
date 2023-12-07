import * as React from "react";
const SvgFilterLines = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="#091E42"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 10h10M2.5 5h15m-10 10h5"
    />
  </svg>
);
export default SvgFilterLines;
