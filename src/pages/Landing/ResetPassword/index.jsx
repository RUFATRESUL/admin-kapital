import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Input, RenderIf } from "shared/components";
import { Country } from "./data";
import {
  useChangePasswordMutation,
  useLoginUserMutation,
} from "src/redux/api/authApi/authApi";
import { useSelector } from "react-redux";
import Logo from "src/shared/media/img/SideLogo.png";
import styles from "./ResetPassword.module.scss";

const ResetPassword = () => {
  const [passwordShow, setPasswordShow] = React.useState(false);
  const [changePassword, { isLoading, data, isError }] =
    useChangePasswordMutation();

  const changePasswordHandler = (values) => {
    changePassword({
      newPasswordConfirm: values?.newPasswordConfirm,
      newPassword: values?.newPassword,
    });
  };
  const handlerSeeText = () => {
    setPasswordShow((current) => !current);
  };
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required("Do not keep it empty"),
    newPasswordConfirm: Yup.string().required("Do not keep it empty"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      newPassword: "",
      newPasswordConfirm: "",
    },
    onSubmit: (values) => {
      changePasswordHandler(values);
    },
  });

  return (
    <div className={`${styles.ResetPassword} col-lg-12 col-12 d-flex  w-100`}>
      <div
        className={`${styles.ResetPasswordLeft} col-lg-6 col-6 d-flex flex-column justify-content-between`}
      >
        <div className={styles.ResetPasswordLeftLogo}>
          <div>
            <img src={Logo} alt="" />
          </div>
          <h1>
            Trans-Caspian International East-West Middle Corridor (Admin Panel)
          </h1>
        </div>
        <div className={styles.ResetPasswordLeftAbout}>
          <h1>Middle Corridor's Gateway to Effortless Transit</h1>
          <p>
            Welcome to the Middle Corridor's transit web portal, gateway to
            effortless transit. Multilateral mechanism between customs
            administration of the countries located along Middle Corridor..
          </p>
          <div className={styles.ResetPasswordLeftAboutCountry}>
            {Country.map((item) => (
              <h2 key={item?.id} role="button">
                <span> {item?.icon}</span>
                <p>{item?.inner}</p>
              </h2>
            ))}
          </div>
        </div>
        <div className={styles.ResetPasswordLeftYear}>
          ©2023 Single transit portal for Middle Corridor
        </div>
      </div>
      <div className={`${styles.ResetPasswordRight} col-lg-6 col-6`}>
        <h6 style={{ visibility: "hidden" }}>.</h6>
        <form
          onSubmit={formik.handleSubmit}
          className={styles.ResetPasswordRightInput}
        >
          <h1 className="text-center">Reset password</h1>
          <div className={styles.ResetPasswordRightInputPassword}>
            <p>Password</p>
            <Input
              errors={formik.errors.newPassword && formik.touched.newPassword}
              nameError={formik.errors.newPassword}
              type={passwordShow ? "text" : "password"}
              placeholder="Enter the password"
              id="newPassword"
              name="newPassword"
              value={formik.values.newPassword}
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
          <div className={styles.ResetPasswordRightInputEmail}>
            <p>Confirm password</p>
            <Input
              errors={
                formik.errors.newPasswordConfirm &&
                formik.touched.newPasswordConfirm
              }
              nameError={formik.errors.newPasswordConfirm}
              id="newPasswordConfirm"
              type={passwordShow ? "text" : "password"}
              name="newPasswordConfirm"
              placeholder="Enter the password again"
              value={formik.values.newPasswordConfirm}
              onChange={formik.handleChange}
              className="w-100"
            />
          </div>
          <RenderIf condition={!isLoading && isError}>
            <div className="text-center  mt-3 landing-error">
              Username or password is incorrect.
            </div>
          </RenderIf>
          <div
            style={{ paddingTop: isError ? "20px" : "40px" }}
            className={styles.ResetPasswordRightInputButton}
          >
            <Button
              type="submit"
              color="#ffffff"
              children="Reset password"
              //  disabled={isLoading}
              //  isLoading={isLoading}
              background="#14458D"
            />
          </div>
        </form>
        <div className={styles.ResetPasswordRightCrocusoft}>
          <p>
            {" "}
            Site by <a href="https://crocusoft.com/">Crocusoft LLC</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
