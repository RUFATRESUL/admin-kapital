import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, RenderIf } from "shared/components";
import { Link } from "react-router-dom";
import {
    useChangePasswordMutation,
    useLoginUserMutation,
} from "src/redux/api/authApi/authApi";
import styles from "../Reset.module.scss";

const ResetOtp = () => {
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
        <div className={`${styles.ResetPasswordRight} col-lg-6 col-6`}>
            <h6 style={{ visibility: "hidden" }}>.</h6>
            <form
                onSubmit={formik.handleSubmit}
                className={styles.ResetPasswordRightInput}
            >
                <h1>OTP</h1>
                <p className="mb-4">e********@gmail.com e-poçt ünvanına 6 rəqəmli kod göndərilmişdir.</p>
                <div className={styles.ResetPasswordRightInputPassword}>
                    <p>Kod</p>
                    <Input
                        errors={formik.errors.userName && formik.touched.userName}
                        nameError={formik.errors.userName}
                        id="userName"
                        type="text"
                        name="userName"
                        placeholder="6 qərəmli kod"
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
                <div className={styles.ResetOtp}>Kod gəlmədi?
                    <strong> 0:48</strong>
                    {/* <h4> Yenidən göndər</h4> */}
                </div>
            </form>

        </div>
    );
};

export default ResetOtp;
