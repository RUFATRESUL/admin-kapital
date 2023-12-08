import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, RenderIf } from "shared/components";
import { Link } from "react-router-dom";
import {
    useChangePasswordMutation,
    useLoginUserMutation,
} from "src/redux/api/authApi/authApi";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Urls } from "src/shared/constants/url";
import styles from "../../Login/Login.module.scss";

const ResetInner = () => {
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

        <div className={`${styles.LoginRight} col-lg-7 col-6`}>
            <h6 style={{ visibility: "hidden" }}>.</h6>
            <form onSubmit={formik.handleSubmit} className={`${styles.LoginRightInput} col-lg-6 mx-auto`}>
                <h1>Şifrəni yenilə </h1>
                <div className={`${styles.LoginRightInputPassword} mb-4`}>
                    {/* <p>Yeni şifrə</p> */}
                    <Input
                        errors={formik.errors.password && formik.touched.password}
                        nameError={formik.errors.password}
                        type={passwordShow ? "text" : "password"}
                        placeholder="Yeni şifrə"
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
                <div className={styles.LoginRightInputPassword}>
                    {/* <p>Yeni şifrəni təkrarla</p> */}
                    <Input
                        errors={formik.errors.password && formik.touched.password}
                        nameError={formik.errors.password}
                        type={passwordShow ? "text" : "password"}
                        placeholder="Yeni şifrəni təkrarla"
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
                        children="Şifrəni yenilə"
                        disabled={isLoading}
                        isLoading={isLoading}
                        background="#14458D"
                    />
                </div>
                <Link className={styles.LoginPasswordBack}>Geri</Link>

            </form>
     
        </div>
    );
};

export default ResetInner;
