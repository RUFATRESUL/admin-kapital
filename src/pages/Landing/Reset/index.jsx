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
import styles from "./Reset.module.scss";
import ResetOtp from "./components/ResetOtp";
import ResetInner from "./components/ResetInner";

const Reset = () => {
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

      {/* <ResetOtp /> */}

      <ResetInner />
    </div>
  );
};

export default Reset;
