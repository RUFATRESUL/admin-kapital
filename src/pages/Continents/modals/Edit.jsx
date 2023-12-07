import React, { useEffect } from "react";
import { Add } from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import { continentsCreateValidation } from "src/validation";
import { useFormik } from "formik";
import { Button, Input, RenderIf } from "src/shared/components";
import { useContinentsEditMutation } from "src/redux/api/Continents";
import SpinnerLarg from "src/shared/components/SpinnerLarg/SpinnerLarg";
import CustomTabMenu from "src/shared/components/CustomTabMenu";
import { useState } from "react";
import { LangName } from "src/shared/constants/lang";

const Edit = ({
  setOpenEditModal,
  continentByIdData,
  continentByIdIsLoading,
  openEditModal,
}) => {
  const [continentsEdit, { isSuccess, isLoading }] =
    useContinentsEditMutation();
  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);
  const handleClose = () => {
    setOpenEditModal(false);
  };
  useEffect(() => {
    if (continentByIdData) {
      const translations = continentByIdData.continentTranslates.reduce(
        (acc, translation) => {
          acc[translation.languageName.toLowerCase()] = translation.name;
          return acc;
        },
        {}
      );

      formik.setValues({
        az: translations.az || "",
        en: translations.en || "",
        ru: translations.ru || "",
      });
    }
  }, [continentByIdData]);
  const formik = useFormik({
    validationSchema: continentsCreateValidation,
    initialValues: {
      az: "",
      en: "",
      ru: "",
    },
    onSubmit: (values) => {
      const continentsTranslates = {
        id: continentByIdData?.id,
        continentTranslates: [
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
        ],
      };
      continentsEdit(continentsTranslates);
    },
  });
  const [activeTab, setActiveTab] = useState("az");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <Modal
      className="all-delete-modal"
      show={openEditModal}
      onHide={handleClose}
      centered
    >
      <Modal.Header style={{ border: "none" }}>
        <div className="Modal_Close_Icon" onClick={handleClose}>
          <Add />
        </div>
        <Modal.Title className="text-center w-100">Edit</Modal.Title>
      </Modal.Header>
      <RenderIf condition={continentByIdIsLoading}>
        <div className="text-center">
          <SpinnerLarg color={"rgb(20, 69, 141)"} />
        </div>
      </RenderIf>
      <RenderIf condition={!continentByIdIsLoading}>
        <Modal.Body className=" p-3">
          <ul className="nav ">
            <li className="nav-item mb-2">
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
            <div className="modal-edit">
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
                  className="w-100"
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
                  className="w-100"
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
                  className="w-100"
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
                children="Save"
                disabled={isLoading}
                isLoading={isLoading}
                background="#14458D"
              />
            </div>
          </form>
        </Modal.Body>
      </RenderIf>
    </Modal>
  );
};

export default Edit;
