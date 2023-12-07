import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginUserMutation } from "src/redux/api/authApi/authApi";
import { Button, Input, RenderIf } from "shared/components";
import { ArrowRight } from "src/assets/svgs";
import { Urls } from "src/shared/constants/url";
import Logo from "src/shared/media/img/SideLogo.png";
import { Country } from "./data";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
  const [loginUser, { isLoading, data }] = useLoginUserMutation();

  const loginUserHandler = (values) => {
    loginUser({
      userName: values?.userName,
      password: values?.password,
    });
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email daxil edin"),
  });

  const formik = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      loginUserHandler(values);
    },
  });

  return (
    <div className={`${styles.ForgotPassword} col-lg-12 col-12 d-flex  w-100`}>
      <div
        className={`${styles.ForgotPasswordLeft} col-lg-6 col-6 d-flex flex-column justify-content-between`}
      >
        <div className={styles.ForgotPasswordLeftLogo}>
          <div>
            <img src={Logo} alt="" />
          </div>
          <h1>
            Trans-Caspian International East-West Middle Corridor (Admin Panel){" "}
          </h1>
        </div>
        <div className={styles.ForgotPasswordLeftAbout}>
          <h1>Middle Corridor's Gateway to Effortless Transit</h1>
          <p>
            Welcome to the Middle Corridor's transit web portal, gateway to
            effortless transit. Multilateral mechanism between customs
            administration of the countries located along Middle Corridor..
          </p>
          <div className={styles.ForgotPasswordLeftAboutCountry}>
            {Country.map((item) => (
              <h2 key={item?.id} role="button">
                <span> {item?.icon}</span>
                <p>{item?.inner}</p>
              </h2>
            ))}
          </div>
        </div>
        <div className={styles.ForgotPasswordLeftYear}>
          ©2023 Single transit portal for Middle Corridor
        </div>
      </div>
      <div className={`${styles.ForgotPasswordRight} col-lg-6 col-6`}>
        <h6 style={{ visibility: "hidden" }}>.</h6>
        <form
          onSubmit={formik.handleSubmit}
          className={styles.ForgotPasswordRightInput}
        >
          <h1 className="text-center">Forgot password</h1>
          <h2>
            {" "}
            Enter you email and we`ll send you a link to reset your password
          </h2>
          <div className={styles.ForgotPasswordRightInputEmail}>
            <p>Email</p>
            <Input
              errors={formik.errors.email && formik.touched.email}
              nameError={formik.errors.email}
              id="email"
              type="text"
              name="email"
              placeholder="Email daxil edin"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-100"
            />
          </div>
          <div className={styles.ForgotPasswordRightInputButton}>
            <Button
              // onClick={loginUserHandler}
              type="submit"
              color="#ffffff"
              children="Submit"
              disabled={isLoading}
              isLoading={isLoading}
              background="#14458D"
            />
          </div>
          <div className={styles.ForgotPasswordRightInputBack}>
            <Link to={Urls?.LOGIN_URL}>
              <ArrowRight />
              Back to <span style={{ color: "#14458d" }}>login</span>
            </Link>
          </div>
        </form>
        <div className={styles.ForgotPasswordRightCrocusoft}>
          <p>
            {" "}
            Site by <a href="https://crocusoft.com/">Crocusoft LLC</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
