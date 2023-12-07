import React, { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";

import { useContinentsCreateMutation } from "src/redux/api/Continents";
import { continentsCreateValidation } from "src/validation";
import { Button, Input, RenderIf } from "src/shared/components";

import "./modal.scss";
import CustomTabMenu from "src/shared/components/CustomTabMenu";
import { LangName } from "src/shared/constants/lang";

const Create = ({ setOpenCreateModal, openCreatedModal }) => {
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
      ru: "",
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
          name: values.ru,
          languageId: 3,
        },
      ];
      continentsCreate({ continentTranslates });
    },
  });
  const [activeTab, setActiveTab] = useState("az");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <Modal
      className="all-delete-modal"
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
        <ul className="nav ">
          <li className="nav-item">
            <CustomTabMenu
              label="Az"
              isActive={activeTab === "az"}
              onClick={() => handleTabClick("az")}
            />
          </li>
          <li className="nav-item">
            <CustomTabMenu
              label="En"
              isActive={activeTab === "en"}
              onClick={() => handleTabClick("en")}
            />
          </li>
          <li className="nav-item">
            <CustomTabMenu
              label="Ru"
              isActive={activeTab === "ru"}
              onClick={() => handleTabClick("ru")}
            />
          </li>
        </ul>
        <form onSubmit={formik.handleSubmit}>
          <div className="modal-create">
            <RenderIf condition={activeTab === "az"}>
              <Input
                errors={formik.errors.az && formik.touched.az}
                nameError={formik.errors.az}
                id="az"
                type="text"
                name="az"
                placeholder={LangName?.AZ_LANG}
                value={formik.values.az}
                onChange={formik.handleChange}
                className="w-100 mt-2"
              />
            </RenderIf>
            <RenderIf condition={activeTab === "en"}>
              <Input
                errors={formik.errors.en && formik.touched.en}
                nameError={formik.errors.en}
                id="en"
                type="text"
                name="en"
                placeholder={LangName?.EN_LANG}
                value={formik.values.en}
                onChange={formik.handleChange}
                className="w-100  mt-2"
              />
            </RenderIf>
            <RenderIf condition={activeTab === "ru"}>
              <Input
                errors={formik.errors.ru && formik.touched.ru}
                nameError={formik.errors.ru}
                id="ru"
                type="text"
                name="ru"
                placeholder={LangName?.RU_LANG}
                value={formik.values.ru}
                onChange={formik.handleChange}
                className="w-100  mt-2"
              />
            </RenderIf>
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

export default Create;
