import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import ForgotPassword from "./Landing/ForgotPassword";
import ResetPassword from "./Landing/ResetPassword";
import SideMenu from "shared/layout/SideMenu";
import Footer from "src/shared/layout/Footer";
import { RenderIf } from "shared/components";
import PrivateRouter from "./PrivateRouter";
import Aux from "shared/modules/Auxilliary";
import { Urls } from "shared/constants/url";
import Header from "shared/layout/Header";
import Cover from "shared/modules/Cover";
import Login from "pages/Landing/Login";
import Reset from "./Landing/Reset";

const Router = () => {
  const IS_AUTHENTICATED = Boolean(useSelector((state) => state?.user?.user));

  return (
    <Aux>
      <RenderIf condition={!IS_AUTHENTICATED}>
        <Routes>
          <Route path={Urls?.LOGIN_URL} element={<Login />} />
          <Route path={Urls?.RESET_PASSWORD_REQUEST_URL} element={<ResetPassword />} />
          <Route
            path={Urls?.FORGOT_PASSWORD_URL}
            element={<ForgotPassword />}
          />

          <Route
            path={Urls?.RESET_PASSWORD_URL}
            element={<Reset />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </RenderIf>
      <RenderIf condition={IS_AUTHENTICATED}>
        <SideMenu />
        <Cover>
          <Header />
          <PrivateRouter />
          {/* <Footer /> */}
        </Cover>
      </RenderIf>
    </Aux>
  );
};

export default Router;
