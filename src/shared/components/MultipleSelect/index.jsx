import React from "react";

import Select from "react-select";
const MultipleSelect = ({
  value,
  placeholder,
  isMulti,
  name,
  options,
  onChange,
  onBlur,
  id,
}) => {
  return (
    <div className="MultipleSelect">
      <Select
        id={id}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        isMulti={isMulti}
        name={name}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};

export default MultipleSelect;
