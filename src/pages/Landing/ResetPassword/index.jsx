import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Input, RenderIf } from "shared/components";
import { Link } from "react-router-dom";
import {
  useChangePasswordMutation,
  useLoginUserMutation,
} from "src/redux/api/authApi/authApi";
import { useSelector } from "react-redux";
import Logo from "src/shared/media/img/kapital.png";
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
        className={`col-lg-5 col-6 d-flex flex-column justify-content-between`}
      >
        <img src={Logo} />
      </div>
      <div className={`${styles.ResetPasswordRight} col-lg-6 col-6`}>
        <h6 style={{ visibility: "hidden" }}>.</h6>
        <form
          onSubmit={formik.handleSubmit}
          className={styles.ResetPasswordRightInput}
        >
          <h1>Şifrənin bərpası</h1>
          <p className="mb-4">E-poçt ünvanınızı daxil edin. Sizə yeni şifrə yaratmaq üçün kod göndəriləcək.</p>
          <div className={styles.ResetPasswordRightInputPassword}>
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
              children="Kodu göndər"
              //  disabled={isLoading}
              //  isLoading={isLoading}
              background="#14458D"
            />
          </div>
          <Link className={styles.ResetPasswordBack}>Geri</Link>
        </form>
  
      </div>
    </div>
  );
};

export default ResetPassword;
