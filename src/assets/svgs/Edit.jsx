import * as React from "react";
const SvgEdit = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M9.176 2.96 3.702 8.752c-.206.22-.406.653-.446.953l-.247 2.16c-.087.78.473 1.313 1.247 1.18l2.146-.367c.3-.053.72-.273.927-.5l5.473-5.793c.947-1 1.373-2.14-.1-3.533-1.466-1.38-2.58-.894-3.526.106Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M8.262 3.926a4.084 4.084 0 0 0 3.633 3.433"
    />
  </svg>
);
export default SvgEdit;
