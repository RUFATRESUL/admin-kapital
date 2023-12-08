import React from "react";
import styled from "styled-components";
import RenderIf from "../RenderIf";
import Spinner from "../Spinner";

const StyledButton = styled.button`
  gap: 0px;
  display: flex;
  align-items: center;
  background: ${(props) => props.background};
  border-radius: 8px;
  padding: ${(props) => (props.pdf ? "12px" : props.padding || "12px 24px")};

  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.0016em;
  color: ${(props) => props.color};
  border: ${(props) =>
    props.border ? `2px solid ${props.border} !important` : "none"};
  &:disabled {
    opacity: 0.5;
  }
`;

const Button = ({
  onClick,
  disabled,
  type,
  background,
  padding,
  color,
  border,
  icon,
  children,
  isLoading,
  className,
  pdf,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      pdf={pdf}
      type={type}
      background={background}
      padding={padding}
      color={color}
      border={border}
      className={className}
    >
      <RenderIf condition={isLoading}>
        <span>
          {icon} {children}
        </span>

        <Spinner />
      </RenderIf>
      <RenderIf condition={!isLoading}>
        {icon} {children}
      </RenderIf>
    </StyledButton>
  );
};

export default Button;
