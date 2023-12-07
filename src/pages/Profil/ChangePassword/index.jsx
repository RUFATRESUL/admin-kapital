import React, { useEffect } from "react";
import { useFormik } from "formik";

import { useChangePasswordMutation } from "src/redux/api/authApi/authApi";
import { Button, Input, RenderIf } from "src/shared/components";
import { changePasswordValidation } from "src/validation";

import styles from "./ChangePassword.module.scss";

export const ChangePassword = () => {
  const [changePassword, { data, isLoading, isError, error }] =
    useChangePasswordMutation();

  useEffect(() => {
    formik.resetForm();
  }, [data, !isLoading]);

  const handlerChangePassword = (values) => {
    changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      newPasswordConfirm: values.newPasswordConfirm,
    });
  };

  const formik = useFormik({
    validationSchema: changePasswordValidation,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },

    onSubmit: (values) => {
      handlerChangePassword(values);
    },
  });
  return (
    <div className={styles.ChangePassword}>
      <div className={styles.ChangePassword_Header}>
        <h1>Change Password</h1>
      </div>
      <div className={styles.ChangePassword_Operation}>
        <form onSubmit={formik.handleSubmit}>
          <label abel htmlFor="">
            <p>Current Password</p>
            <Input
              errors={formik.errors.oldPassword && formik.touched.oldPassword}
              nameError={formik.errors.oldPassword}
              onChange={formik.handleChange}
              value={formik.values.oldPassword}
              placeholder="Current Password"
              className="w-100"
              name="oldPassword"
              type="text"
            />{" "}
          </label>
          <label htmlFor="">
            <p>New Password</p>
            <Input
              errors={formik.errors.newPassword && formik.touched.newPassword}
              nameError={formik.errors.newPassword}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              placeholder="New Password"
              className="w-100"
              name="newPassword"
              type="text"
            />{" "}
          </label>
          <label htmlFor="">
            <p>Confirm New Password</p>
            <Input
              errors={
                formik.errors.newPasswordConfirm &&
                formik.touched.newPasswordConfirm
              }
              nameError={formik.errors.newPasswordConfirm}
              onChange={formik.handleChange}
              value={formik.values.newPasswordConfirm}
              placeholder="Confirm New Password"
              className="w-100"
              name="newPasswordConfirm"
              type="text"
            />{" "}
          </label>
          <RenderIf condition={error}>
            {error?.data?.errors.map((err) => (
              <div className="r" style={{ color: "red", fontWeight: "bold" }}>
                {err?.errorMessage}
              </div>
            ))}
          </RenderIf>
          <RenderIf condition={!isLoading && data}>
            <div
              style={{ color: "#14458D", fontWeight: "bold", fontSize: "17px" }}
            >
              Your password has been successfully changed
            </div>
          </RenderIf>
          <label style={{ paddingTop: isError ? "18px" : "40px" }} htmlFor="">
            <Button
              type="submit"
              color="#ffffff"
              children="Save"
              disabled={isLoading}
              isLoading={isLoading}
              background="#14458D"
            />
          </label>
        </form>
      </div>
    </div>
  );
};
