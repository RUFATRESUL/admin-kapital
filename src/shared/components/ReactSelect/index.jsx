import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import RenderIf from "../RenderIf";

const ReactSelect = ({
  name,
  id,
  values,
  defaultValue,
  data,
  onChange,
  errors,
  nameError,
  disabled,
}) => {
  return (
    <div style={{ position: "relative" }}>
      {/* <FormControl fullWidth className=""> */}
      <Select
        style={{ border: errors ? "1px solid red" : "" }}
        className="w-100 FormControlInput"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        inputProps={{
          name: name,
          id: id,
        }}
        value={values}
        onChange={onChange}
        displayEmpty
        disabled={disabled}
        // renderValue={(selected) => {
        //   if (!selected) {
        //     return <em>{defaultValue}</em>;
        //   }
        //   return selected.label;
        // }}
      >
        <MenuItem disabled value="">
          <em>{defaultValue}</em>
        </MenuItem>
        {data?.map((item) => (
          <MenuItem key={item?.label} value={item?.value}>
            {item?.label}
          </MenuItem>
        ))}
      </Select>
      <RenderIf condition={errors}>
        <span
          style={{
            color: "red",
            fontSize: "13px",
            position: "absolute",
            bottom: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {nameError}
        </span>
      </RenderIf>
      {/* </FormControl> */}
    </div>
  );
};

export default ReactSelect;
