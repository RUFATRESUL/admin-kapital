import * as React from "react";
const SvgPen = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#44546F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m18 10-4-4M2.5 21.5l3.384-.376c.414-.046.62-.069.814-.131a2 2 0 0 0 .485-.233c.17-.112.317-.26.61-.553L21 7a2.828 2.828 0 1 0-4-4L3.794 16.207c-.294.294-.442.44-.553.61a2 2 0 0 0-.233.485c-.063.194-.086.4-.132.814L2.5 21.5Z"
    />
  </svg>
);
export default SvgPen;
