import React from "react";
import { useEffect } from "react";

const Checkbox = ({ id, name, checked, onChange, condition = false }) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (event) => {
    const { checked } = event.target;
    setIsChecked(checked);

    if (onChange) {
      onChange(name);
    }
  };

  return (
    <input
      id={id}
      type="checkbox"
      name={name}
      checked={isChecked}
      onChange={handleChange}
    />
  );
};

export default Checkbox;
