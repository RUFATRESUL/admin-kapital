import * as React from "react";
const SvgClock = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <path
      stroke="#14458D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.165 11c0 5.06-4.106 9.167-9.166 9.167-5.06 0-9.167-4.106-9.167-9.166 0-5.06 4.107-9.167 9.167-9.167s9.166 4.107 9.166 9.167Z"
    />
    <path
      stroke="#14458D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.4 13.916 11.56 12.22c-.495-.294-.899-1-.899-1.577V6.885"
    />
  </svg>
);
export default SvgClock;
