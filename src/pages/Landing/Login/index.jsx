import React from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { useLoginUserMutation } from "src/redux/api/authApi/authApi";
import { Button, Input, RenderIf } from "shared/components";
import Logo from "src/shared/media/img/SideLogo.png";
import { Urls } from "src/shared/constants/url";
import { loginSchema } from "src/validation";
import { Country } from "./data";

import styles from "./Login.module.scss";

const Login = () => {
  const [passwordShow, setPasswordShow] = React.useState(false);
  const [loginUser, { isLoading, data, isError }] = useLoginUserMutation();

  const loginUserHandler = (values) => {
    loginUser({
      userName: values?.userName,
      password: values?.password,
    });
  };
  const handlerSeeText = () => {
    setPasswordShow((current) => !current);
  };

  const formik = useFormik({
    validationSchema: loginSchema,
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      loginUserHandler(values);
    },
  });

  return (
    <div className={`${styles.Login} col-lg-12 col-12 d-flex  w-100`}>
      <div
        className={`${styles.LoginLeft} col-lg-6 col-6 d-flex flex-column justify-content-between`}
      >
        <div className={styles.LoginLeftLogo}>
          <div>
            <img src={Logo} alt="" />
          </div>
          {/* <Logo /> */}
          <h1>
            Trans-Caspian International East-West Middle Corridor (Admin Panel){" "}
          </h1>
        </div>
        <div className={styles.LoginLeftAbout}>
          <h1>Middle Corridor's Gateway to Effortless Transit</h1>
          <p>
            Welcome to the Middle Corridor's transit web portal, gateway to
            effortless transit. Multilateral mechanism between customs
            administration of the countries located along Middle Corridor..
          </p>
          <div className={styles.LoginLeftAboutCountry}>
            {Country.map((item) => (
              <div key={item?.id} role="button">
                <span>
                  {" "}
                  <img src={item?.icon} alt="" />
                </span>
                <p>{item?.inner}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.LoginLeftYear}>
          ©2023 Single transit portal for Middle Corridor
        </div>
      </div>
      <div className={`${styles.LoginRight} col-lg-6 col-6`}>
        <h6 style={{ visibility: "hidden" }}>.</h6>
        <form onSubmit={formik.handleSubmit} className={styles.LoginRightInput}>
          <h1 className="text-center">Welcome to Admin Panel</h1>
          <div className={styles.LoginRightInputEmail}>
            <p>User Name</p>
            <Input
              errors={formik.errors.userName && formik.touched.userName}
              nameError={formik.errors.userName}
              id="userName"
              type="text"
              name="userName"
              placeholder="İsdifadəçi adı daxil edin"
              value={formik.values.userName}
              onChange={formik.handleChange}
              className="w-100"
            />
          </div>
          <div className="text-center text-danger ">{formik.errors.email}</div>
          <div className={styles.LoginRightInputPassword}>
            <p>Password</p>
            <Input
              errors={formik.errors.password && formik.touched.password}
              nameError={formik.errors.password}
              type={passwordShow ? "text" : "password"}
              placeholder="Şifrəni daxil edin"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-100"
            />
            <RenderIf condition={!passwordShow}>
              <VisibilityOff role="button" onClick={handlerSeeText} />
            </RenderIf>
            <RenderIf condition={passwordShow}>
              <Visibility role="button" onClick={handlerSeeText} />
            </RenderIf>
          </div>
          {/* <Link to={Urls?.FORGOT_PASSWORD_URL}>
            <p>Forgot your password?</p>
          </Link> */}
          <RenderIf condition={!isLoading && isError}>
            <div className="text-center  mt-3 landing-error">
              Username or password is incorrect.
            </div>
          </RenderIf>
          <div
            style={{ paddingTop: isError ? "20px" : "40px" }}
            className={`${styles.LoginRightInputButton} `}
          >
            <Button
              // onClick={loginUserHandler}
              type="submit"
              color="#ffffff"
              children="Login"
              disabled={isLoading}
              isLoading={isLoading}
              background="#14458D"
            />
          </div>
        </form>
        <div className={styles.LoginRightCrocusoft}>
          <p>
            {" "}
            Site by <a href="https://crocusoft.com/">Crocusoft LLC</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
