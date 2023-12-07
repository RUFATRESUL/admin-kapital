import React from "react";
import styled from "styled-components";
import { Search } from "../../../assets/svgs";
import styles from "./InputTime.module.scss";
import RenderIf from "../RenderIf";

const StyledInput = styled.input`
  position: relative;
  background: #ffffff;
  border: 1px solid ${(props) => (props.errors ? "red" : "#dadcde")};
  border-radius: 12px;
  padding: 11px 15px 11px ${(props) => (props.icon ? "54px" : "16px")};
  // @include all-design(#051327, 16px, normal, 400, 24px);
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.0016em;
  color: #051327;
  &:focus {
    outline: none;
  }
  &:placeholder {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.0016em;
    color: #051327;
  }
  span {
  }
`;

const InputTime = ({
  placeholder,
  onChange,
  onClick,
  disabled,
  name,
  type,
  value,
  id,
  className,
  icon,
  onBlur,
  errors,
  nameError,
  checked,
  width,
  ref,
}) => {
  return (
    <div
      style={{ position: "relative", width: width }}
      className={icon ? styles.InputTime : ""}
    >
      <StyledInput
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
        disabled={disabled}
        name={name}
        type={type}
        value={value}
        id={id}
        className={className}
        icon={icon}
        errors={errors}
        onBlur={onBlur}
        nameError={nameError}
        checked={checked}
      />
      <RenderIf condition={errors}>
        <span
          style={{
            color: "red",
            fontSize: "13px",
            position: "absolute",
            bottom: "-30px",
            left: "31%",
            transform: "translateX(-23%)",
          }}
        >
          {nameError}
        </span>
      </RenderIf>
      <RenderIf condition={icon}>
        <Search />
      </RenderIf>
    </div>
  );
};

export default InputTime;
