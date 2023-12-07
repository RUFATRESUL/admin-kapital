import React from "react";

import { Logo, NoInformation } from "../../../assets/svgs";

const H1Style = {
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "20px",
  lineHeight: "30px",
  letterSpacing: "0.0016em",
  color: "#374253",
  marginLeft: "20px",
};
const NoInformations = () => {
  return (
    <div
      style={{ marginLeft: "95px" }}
      className="d-flex align-items-center justify-content-center mt-4 "
    >
      <NoInformation width="44px" height="44px" />
      <h1 style={H1Style}>No infomation</h1>
    </div>
  );
};

export default NoInformations;
