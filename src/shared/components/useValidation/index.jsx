import { useState, useCallback } from "react";
export const useValidation = () => {
  const [errors, setErrors] = useState();

  const handleFocus = (e) => {
    const {
      target: { name },
    } = e;
    switch (name) {
      case "name":
        return setErrors({ ...errors, [name]: false });
      default:
        break;
    }
  };

  const validation = useCallback(
    ({ name, value }) => {
      switch (name) {
        case "name":
          if (value.length < 3) {
            return setErrors({ ...errors, [name]: true });
          }
          break;
        case "title":
          if (value.length < 3) {
            return setErrors({ ...errors, [name]: true });
          }
          break;
        case "description":
          if (value.length < 3) {
            return setErrors({ ...errors, [name]: true });
          }
          break;
        default:
          break;
      }
      if (!value?.trim()) {
        setErrors({ ...errors, [name]: true });
        return;
      }
      setErrors({ ...errors, [name]: false });
    },
    [errors]
  );
  return { errors, validation, handleFocus };
};
