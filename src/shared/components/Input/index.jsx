import styled from "styled-components";
import styles from "./Input.module.scss";
import RenderIf from "../RenderIf";

const StyledInput = styled.input`
  position: relative;
  background: ${(props) => (props.inptDisabled ? "#DADCDE" : "#ffffff")};
  border: 1px solid ${(props) => (props.errors ? "red" : "#dadcde")};
  border-radius: 8px;
  padding: 12px 16px 12px ${(props) => (props.icon ? "54px" : "16px")};
  // @include all-design(#051327, 16px, normal, 400, 24px);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.0016em;
  color: #051327;
  accent-color: black;

  &:focus {
    outline: none;
  }
  &:placeholder {
   
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

const Input = ({
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
    inptDisabled,
}) => {
    return (
        <div
            style={{ position: "relative", width: width }}
            className={icon ? styles.Input : ""}
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
                inptDisabled={inptDisabled}
            />
            <RenderIf condition={errors}>
                <span
                    style={{
                        color: "red",
                        fontSize: "13px",
                        position: "absolute",
                        bottom: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                >
                    {nameError}
                </span>
            </RenderIf>
        </div>
    );
};

export default Input;
