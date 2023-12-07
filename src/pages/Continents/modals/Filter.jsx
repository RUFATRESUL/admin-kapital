import React, { useEffect } from "react";
import { Add } from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { continentsCreateValidation } from "src/validation";
import { Button, Input } from "src/shared/components";
import "./modal.scss";
import { useContinentsCreateMutation } from "src/redux/api/Continents";
import { LangName } from "src/shared/constants/lang";
const Filter = () => {
  const handleClose = () => {
    setOpenCreateModal(false);
  };

  const [continentsCreate, { isSuccess, isLoading }] =
    useContinentsCreateMutation();

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);
  const formik = useFormik({
    validationSchema: continentsCreateValidation,
    initialValues: {
      az: "",
      en: "",
      ka: "",
    },
    onSubmit: (values) => {
      const continentTranslates = [
        {
          name: values.az,
          languageId: 1,
        },
        {
          name: values.en,
          languageId: 2,
        },
        {
          name: values.ka,
          languageId: 3,
        },
      ];
      continentsCreate({ continentTranslates });
    },
  });

  return (
    <Modal
      className="UserPermissionsModal"
      show={openCreatedModal}
      onHide={handleClose}
      centered
    >
      <Modal.Header style={{ border: "none" }}>
        <div className="Modal_Close_Icon" onClick={handleClose}>
          <Add />
        </div>
        <Modal.Title className="text-center w-100">Add to</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 p-3">
        <form onSubmit={formik.handleSubmit}>
          <div className="modal-create">
            <label htmlFor="">
              <span>{LangName?.AZ_LANG}</span>
              <Input
                errors={formik.errors.az && formik.touched.az}
                nameError={formik.errors.az}
                id="az"
                type="text"
                name="az"
                placeholder={LangName?.AZ_LANG}
                value={formik.values.az}
                onChange={formik.handleChange}
                className="w-100"
              />
            </label>
            <label htmlFor="">
              <span>{LangName?.EN_LANG}</span>
              <Input
                errors={formik.errors.en && formik.touched.en}
                nameError={formik.errors.en}
                id="en"
                type="text"
                name="en"
                placeholder={LangName?.EN_LANG}
                value={formik.values.en}
                onChange={formik.handleChange}
                className="w-100"
              />
            </label>
            <label htmlFor="">
              <span>{LangName?.RU_LANG}</span>
              <Input
                errors={formik.errors.ka && formik.touched.ka}
                nameError={formik.errors.ka}
                id="ka"
                type="text"
                name="ka"
                placeholder={LangName?.RU_LANG}
                value={formik.values.ka}
                onChange={formik.handleChange}
                className="w-100"
              />
            </label>
          </div>
          <div className="modal-button d-flex justify-content-center">
            <Button
              type="button"
              color="#14458D"
              children="Close"
              onClick={handleClose}
              background="#ffffff"
              border="#14458D"
            />
            <Button
              type="submit"
              color="#ffffff"
              children="Add"
              disabled={isLoading}
              isLoading={isLoading}
              background="#14458D"
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Filter;
