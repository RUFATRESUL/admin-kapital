import React from "react";
import styled from "styled-components";
import RenderIf from "../RenderIf";
import Spinner from "../Spinner";
const StyledStatus = styled.div`
  background: ${(props) => (!props.background ? "#09A752" : "#8E9090")};
  border-radius: 8px;
  padding: 8px 16px;
  display: inline-block;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.0016em;
  color: #ffffff;
`;
const Status = ({ background, value, onClick, disabled, isLoading }) => {
  return (
    <StyledStatus disabled={disabled} background={background} onClick={onClick}>
      <RenderIf condition={isLoading}>
        <Spinner color="#ffffff" />
      </RenderIf>
      <RenderIf condition={!isLoading}>
        {!value ? "Active" : "Deactive"}
      </RenderIf>
    </StyledStatus>
  );
};

export default Status;
