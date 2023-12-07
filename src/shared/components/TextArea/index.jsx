import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  background: #ffffff;
  border: 1px solid #dadcde;
  border-radius: 12px;
  font-size: 16px;
  padding: 12px 16px;
  &:focus {
    outline: none;
    border-color: #14458d;
  }
`;

function TextArea({ value, rows, placeholder, onChange, className }) {
  return (
    <StyledTextArea
      className={className}
      rows={rows || 3}
      placeholder={placeholder || "Text"}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextArea;
