import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ArrowRight } from "src/assets/svgs";
import RenderIf from "../RenderIf";

import "./InnerCountry.scss";

const InnerCountry = ({ to, name, isSuccess, route, minId }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = pathname === to;

  useEffect(() => {
    if (isSuccess) {
      navigate(`${minId}`);
    }
  }, [isSuccess]);
  return (
    <>
      <li
        className={`innerCountry ${isActive ? "activeCountry" : ""} `}
        onClick={() => navigate(to)}
      >
        <Link to="">
          <RenderIf condition={name}>{name}</RenderIf>
        </Link>
        <ArrowRight />
      </li>
    </>
  );
};

export default InnerCountry;
