import { CircularProgress, styled } from "@mui/material";

import React from "react";
// import { styled } from "@material-ui/styles/index";

function SpinnerLarg({ color }) {
  const SyledCircularProgress = styled((props) => (
    <CircularProgress {...props} />
  ))({
    width: "unset !important",
    height: "unset !important",
    textAlign: "center",
    color: `${color ? color : "#ffffff"} `,
    "& .MuiCircularProgress-svg": {
      width: "50px",
      height: "50px",
    },
  });

  return <SyledCircularProgress />;
}

export default SpinnerLarg;
