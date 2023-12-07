import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";

import { useCountriesEditMutation } from "src/redux/api/CountriesApi";
import { Button, Input, RenderIf } from "src/shared/components";
import ReactSelect from "src/shared/components/ReactSelect";
import { countriesEditValidation } from "src/validation";
import { imgBaseUrl } from "src/redux/api/axiosBase";
import CustomTabMenu from "src/shared/components/CustomTabMenu";
import { LangName } from "src/shared/constants/lang";

const Edit = ({ setOpenEditModal, countrieByIdData, openEditModal }) => {
  const [file, setFile] = useState(null);
  const [isImg, setIsImg] = useState(null);
  const refImg = useRef();

  const [countriesEdit, { isSuccess, isLoading }] = useCountriesEditMutation();
  const handleCountriesEdit = (values) => {
    const formData = new FormData();
    formData.append("Id", countrieByIdData?.id);
    formData.append("CountryCodeNum", values?.countryCodeNum);
    formData.append("CountryCodeAbv3", values?.countryCodeAbv3);
    formData.append("CountryCodeAbv2", values?.countryCodeAbv2);
    formData.append("ContinentId", values?.continentId);
    formData.append("File", file);
    const countryTranslates = [
      {
        name: values?.az,
        languageId: 1,
      },
      {
        name: values?.en,
        languageId: 2,
      },
      {
        name: values?.ru,
        languageId: 3,
      },
    ];

    countryTranslates.forEach((translate, index) => {
      formData.append(`CountryTranslates[${index}].name`, translate.name);
      formData.append(
        `CountryTranslates[${index}].languageId`,
        translate.languageId
      );
    });
    countriesEdit(formData);
  };
  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);
  const handleClose = () => {
    setOpenEditModal(false);
  };

  useEffect(() => {
    if (countrieByIdData) {
      const { countryCodeNum, countryCodeAbv3, countryCodeAbv2, continentId } =
        countrieByIdData;
      formik.resetForm({
        values: {
          countryCodeNum: countryCodeNum || "",
          continentId: continentId || "",
          countryCodeAbv3: countryCodeAbv3 || "",
          countryCodeAbv2: countryCodeAbv2 || "",
          az: formik.values.az || "",
          en: formik.values.en || "",
          ru: formik.values.ru || "",
        },
      });
    }
  }, [countrieByIdData]);
  const formik = useFormik({
    validationSchema: countriesEditValidation,
    initialValues: {
      countryCodeNum: "",
      countryCodeAbv3: "",
      countryCodeAbv2: "",
      continentId: "",
      files: "",
      az: "",
      en: "",
      ru: "",
    },
    onSubmit: (values) => {
      handleCountriesEdit(values);
    },
  });

  const handleFileChange = (e) => {
    let reader = new FileReader();
    let selectedFile = e.target.files[0];
    setFile(selectedFile);
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setIsImg(reader.result);
    };
    formik.setFieldValue("files", selectedFile);
  };

  useEffect(() => {
    if (countrieByIdData) {
      countrieByIdData.countryTranslates.forEach((translation) => {
        const { languageName, name } = translation;
        formik.setFieldValue(languageName.toLowerCase(), name || "");
      });
    }
    if (countrieByIdData) {
      let test = countrieByIdData?.slagFileUrl;
      setIsImg(imgBaseUrl + "uploads/" + test);
    }
  }, [countrieByIdData]);

  const continent = useSelector(
    (item) => item?.ContinentsSlice?.continentFilter
  );
  const continentOptions = continent?.data.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));
  const [activeTab, setActiveTab] = useState("az");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <Modal
      className="UserPermissionsModal"
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
      <Modal.Body className=" p-3">
        <form onSubmit={formik.handleSubmit}>
          <div className="modal-create">
            <label htmlFor="">
              <span>Country Code</span>
              <Input
                errors={
                  formik.errors.countryCodeNum && formik.touched.countryCodeNum
                }
                nameError={formik.errors.countryCodeNum}
                id="countryCodeNum"
                type="text"
                name="countryCodeNum"
                placeholder="Country Code"
                value={formik.values.countryCodeNum}
                onChange={formik.handleChange}
                className="w-100"
              />
            </label>
            <label htmlFor="">
              <span>Country Code Abv3</span>
              <Input
                errors={
                  formik.errors.countryCodeAbv3 &&
                  formik.touched.countryCodeAbv3
                }
                nameError={formik.errors.countryCodeAbv3}
                id="countryCodeAbv3"
                type="text"
                name="countryCodeAbv3"
                placeholder="Country Code Abv3"
                value={formik.values.countryCodeAbv3}
                onChange={formik.handleChange}
                className="w-100"
              />
            </label>
            <label htmlFor="">
              <span>Country Code Abv2</span>
              <Input
                errors={
                  formik.errors.countryCodeAbv2 &&
                  formik.touched.countryCodeAbv2
                }
                nameError={formik.errors.countryCodeAbv2}
                id="countryCodeAbv2"
                type="text"
                name="countryCodeAbv2"
                placeholder="Country Code Abv2"
                value={formik.values.countryCodeAbv2}
                onChange={formik.handleChange}
                className="w-100"
              />
            </label>
            {/* <label htmlFor="">
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
            </label> */}
            <label>
              <span>Continent</span>
              <ReactSelect
                errors={formik.errors.continentId && formik.touched.continentId}
                nameError={formik.errors.continentId}
                onChange={formik.handleChange}
                values={formik.values.continentId}
                defaultValue="Continent"
                name="continentId"
                data={continentOptions}
              />
            </label>
            <label htmlFor="">
              <span>Country File</span>
              <Button
                onClick={() => refImg.current.click()}
                type="button"
                background="transparent"
                padding="12px"
                children="Choose File"
                border="rgb(218, 220, 222)"
              />
              <div style={{ color: "red", fontSize: "13px" }}>
                {formik?.errors?.files}
              </div>
              <input
                ref={refImg}
                name="files"
                id="files"
                className="d-none"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <RenderIf condition={isImg}>
                <div className="flag-img">
                  <img src={isImg} alt="" />
                </div>
              </RenderIf>
            </label>

            <div>
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
    </Modal>
  );
};

export default Edit;
