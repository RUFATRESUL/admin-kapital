import { Tooltip } from "@mui/material";
import React from "react";

const TooltipCustom = ({ children, title }) => {
  return (
    <Tooltip
      placement="top"
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "black",
            color: "#ffffff",
            boxShadow: "0px 0px 4px rgba(8, 30, 64, 0.2)",
            fontSize: "10px",
            padding: "3px 9px",
          },
        },
        arrow: {
          sx: {
            color: "black",
            opacity: "1",
          },
        },
      }}
      title={title}
      arrow
    >
      {children}
    </Tooltip>
  );
};

export default TooltipCustom;
