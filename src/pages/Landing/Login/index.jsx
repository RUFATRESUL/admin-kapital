import React from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { useLoginUserMutation } from "src/redux/api/authApi/authApi";
import { Button, Input, RenderIf } from "shared/components";
import Logo from "src/shared/media/img/kapital.png";
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
        className={`col-lg-5 col-6 d-flex flex-column justify-content-between`}
      >
        <img src={Logo} />
       
      </div>
      <div className={`${styles.LoginRight} col-lg-7 col-6`}>
        <h6 style={{ visibility: "hidden" }}>.</h6>
        <form onSubmit={formik.handleSubmit} className={`${styles.LoginRightInput} col-lg-6 mx-auto` }>
          <h1>Giriş</h1>
          <div className={styles.LoginRightInputEmail}>
            <p>Email</p>
            <Input
              errors={formik.errors.userName && formik.touched.userName}
              nameError={formik.errors.userName}
              id="userName"
              type="text"
              name="userName"
              placeholder="Email"
              value={formik.values.userName}
              onChange={formik.handleChange}
              className="w-100"
            />
          </div>
          <div className="text-center text-danger ">{formik.errors.email}</div>
          <div className={styles.LoginRightInputPassword}>
            <p>Şifrə</p>
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
          <Link className={styles.LinkColor} to={Urls.RESET_PASSWORD_REQUEST_URL}>Şifrənizi unutmusunuz?</Link>
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
              children="Daxil ol"
              disabled={isLoading}
              isLoading={isLoading}
              background="#14458D"
            />
          </div>
        </form>
        {/* <div className={styles.LoginRightCrocusoft}>
          <p>
            {" "}
            Site by <a href="https://crocusoft.com/">Crocusoft LLC</a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
