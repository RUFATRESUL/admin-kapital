import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Add } from "@mui/icons-material";
import { Button, RenderIf } from "src/shared/components";
import FormLabel from "src/shared/components/FormLabel";
import Input from "src/shared/components/Input";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useFormik } from "formik";
import ReactSelect from "src/shared/components/ReactSelect";
import "./modal.scss";
import styles from "../../Landing/Login/Login.module.scss"

const ChangePassword = ({ setIsViewModal, visiblity, isViewModal }) => {
  const handleClose = () => {
    setIsViewModal(visiblity?.CLOSE_ALL);
  };

  const [passwordShow, setPasswordShow] = React.useState(false);

  const handlerSeeText = () => {
    setPasswordShow((current) => !current);
  };

  const formik = useFormik({
    // validationSchema: loginSchema,
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      loginUserHandler(values);
    },
  });

  return (
    <Modal
      size="md"
      aria-labelledby="edit"
      centered
      className="modal pr-0"
      show={isViewModal === visiblity?.PASSWORD}
      onHide={handleClose}
    >
      <form>
        <Modal.Header>
          <Modal.Title>Şifrəni dəyiş</Modal.Title>
          <div className="Modal_Close_Icon" onClick={handleClose}>
            <Add />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row p-0 m-0 mt-3">
            <div className={`${styles.LoginRightInputPassword} mb-4`}>
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


            <div className={styles.LoginRightInputPassword}>
              <p>Təkrar şifrə</p>
              <Input
                errors={formik.errors.password && formik.touched.password}
                nameError={formik.errors.password}
                type={passwordShow ? "text" : "password"}
                placeholder="Təkrar şifrəni daxil edin"
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
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end">
          <Button background="#ffffff" color="#44546F" onClick={handleClose}>
            <span>Ləğv et</span>
          </Button>
          <Button background="#B61D29" color="white" type="submit" >
            <span>Yadda saxla</span>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ChangePassword;
