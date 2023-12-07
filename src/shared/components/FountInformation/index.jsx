import { Alert } from "@mui/material";
import React from "react";

const FoundInformation = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Alert
        variant="filled"
        severity="error"
        sx={{
          fontSize: "20px",
          maxWidth: "500px",
          alignItems: "center",
          padding: "12px",
          "& .MuiAlert-icon": {
            fontSize: "24px", // SVG içeren ikonun font boyutu
          },
        }}
      >
        No information found
      </Alert>
    </div>
  );
};

export default FoundInformation;
