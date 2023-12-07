import React from "react";

export const When = ({ condition, children }) => {
  return condition ? children : null;
};
