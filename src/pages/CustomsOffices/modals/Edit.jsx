import React, { useEffect } from "react";
import { Add } from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { format } from "date-fns";

import {
  useCustomsOfficesEditMutation,
  useCustomsOfficesFilterQuery,
} from "src/redux/api/CustomsOfficesApi";
import { LanguageDate } from "src/shared/components/Helpers/LanguageData";
import SpinnerLarg from "src/shared/components/SpinnerLarg/SpinnerLarg";
import { LevelId } from "src/shared/components/Helpers/LevelId";
import { Button, Input, RenderIf } from "src/shared/components";
import ReactSelect from "src/shared/components/ReactSelect";
import { officesCreateValidation } from "src/validation";
import InputTime from "src/shared/components/InputTime";
import CustomTabMenu from "src/shared/components/CustomTabMenu";
import { useState } from "react";
import { LangName } from "src/shared/constants/lang";
import { useSelector } from "react-redux";

const Edit = ({
  customOfficeByIdData,
  countrieData,
  setIsViewModal,
  isViewModal,
  visiblity,
  customOfficeByIdIsLoading,
}) => {
  const test = useSelector((state) => state?.user?.userById);
  const roleName = test?.roleName
  const countryId = test?.countryId
  const LOCAL_ADMIN = "Local Admin";
  const { data: customOfficeData, isLoading: officeIsLoading } =
    useCustomsOfficesFilterQuery({
      OrderBy: false,
    });
  const [customsOfficesEdit, { isSuccess, isLoading }] =
    useCustomsOfficesEditMutation();
  const handleOfficeEdit = (values) => {
    customsOfficesEdit({
      id: customOfficeByIdData?.id,
      countryId: roleName == LOCAL_ADMIN ? countryId : values?.countryId,
      levelId: values?.levelId,
      cusOffCodeOrg: values?.cusOffCodeOrg,
      cusOffCodeSys: values?.cusOffCodeSys,
      cusOffShortName: values?.cusOffShortName,
      boundary: values?.boundary,
      address: values?.address,
      workHour: values?.startWork + " - " + values?.endWork,
      email: values?.email,
      phone: values?.phone,
      gpsLat: values?.gpsLat,
      gpsLong: values?.gpsLong,
      languageId: values?.languageId,
      parentId: values?.parentId || null,
      customOfficeTranslates: [
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
      ],
    });
  };
  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);
  const handleClose = () => {
    setIsViewModal(visiblity?.CLOSE_ALL);
  };

  useEffect(() => {
    formik.resetForm({ values: customOfficeByIdData });
    customOfficeByIdData?.customOfficeTranslates?.forEach((translate) => {
      formik.setFieldValue(
        translate?.languageName?.toLowerCase(),
        translate?.name
      );
    });
    const workHourParts = customOfficeByIdData?.workHour?.split(" - ");

    if (workHourParts?.length === 2) {
      const startWork = workHourParts[0];
      const endWork = workHourParts[1];
      formik.setFieldValue("startWork", startWork);
      formik.setFieldValue("endWork", endWork);
    }
  }, [customOfficeByIdData]);

  // useEffect(() => {
  // formik.setFieldValue("startWork", customOfficeByIdData?.workHour);
  // formik.setFieldValue("endWork", customOfficeByIdData?.workHour);
  // }, [formattedStartWorkHour, formattedEndWorkHour]);

  const formik = useFormik({
    validationSchema: officesCreateValidation,
    initialValues: {
      countryId: "",
      cusOffCodeOrg: "",
      cusOffCodeSys: "",
      cusOffShortName: "",
      boundary: false,
      address: "",
      workHour: "",
      email: "",
      phone: "",
      gpsLat: "",
      gpsLong: "",
      languageId: "",
      levelId: "",
      parentId: "",
      endWork: "",
      startWork: "",
      az: "",
      en: "",
      ru: "",
    },
    onSubmit: (values) => {
      handleOfficeEdit(values);
    },
  });

  const boundaryData = [
    {
      id: true,
      label: "Boundary",
    },
    {
      id: false,
      label: "Unboundary",
    },
  ];
  const boundaryOptions = boundaryData?.map((item) => ({
    value: item?.id,
    label: item?.label,
  }));

  const countrieOptions = countrieData?.data?.map((item) => ({
    value: item?.id,
    label: item?.countryName,
  }));
  const languageOptions = LanguageDate?.map((item) => ({
    value: item?.id,
    label: item?.languageName,
  }));
  const levelOptions = LevelId?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  let customOptions = customOfficeData?.data
    ?.filter((item) => item?.countryId == formik.values.countryId)
    ?.map((item) => ({
      value: item?.id,
      label: item?.cusOffShortName,
    }));
  if (customOptions?.length === 0 || customOfficeByIdData?.parentId === 0) {
    customOptions = [
      {
        value: 0,
        label: "Heç biri",
      },
      ...customOptions,
    ];
  }

  const [activeTab, setActiveTab] = useState("az");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <>
      <Modal
        className="UserPermissionsModal"
        show={isViewModal === visiblity?.EDIT}
        onHide={handleClose}
        centered
      >
        <Modal.Header style={{ border: "none" }}>
          <div className="Modal_Close_Icon" onClick={handleClose}>
            <Add />
          </div>
          <Modal.Title className="text-center w-100">Edit</Modal.Title>
        </Modal.Header>
        <RenderIf condition={officeIsLoading || customOfficeByIdIsLoading}>
          <div className="text-center">
            <SpinnerLarg color="#14458d" />
          </div>
        </RenderIf>
        <RenderIf condition={!officeIsLoading && !customOfficeByIdIsLoading}>
          <Modal.Body className="p-0 p-3">
            <form onSubmit={formik.handleSubmit}>
              <div className="modal-create-office">
                <label htmlFor="">
                  <span>Country</span>
                  <ReactSelect
                    disabled={roleName == LOCAL_ADMIN}
                    errors={formik.errors.countryId && formik.touched.countryId}
                    nameError={formik.errors.countryId}
                    onChange={formik.handleChange}
                    values={formik.values.countryId}
                    defaultValue="Country"
                    name="countryId"
                    data={countrieOptions}
                  />
                </label>
                <label htmlFor="">
                  <span>Parent Offices</span>
                  <ReactSelect
                    errors={formik.errors.parentId && formik.touched.parentId}
                    nameError={formik.errors.parentId}
                    onChange={formik.handleChange}
                    values={formik.values.parentId}
                    defaultValue="Parent Offices"
                    name="parentId"
                    data={customOptions}
                  />
                </label>
                <label htmlFor="">
                  <span>Custom Office Code Org</span>
                  <Input
                    errors={
                      formik.errors.cusOffCodeOrg &&
                      formik.touched.cusOffCodeOrg
                    }
                    nameError={formik.errors.cusOffCodeOrg}
                    id="cusOffCodeOrg"
                    type="text"
                    name="cusOffCodeOrg"
                    placeholder="Custom Office Code Org"
                    value={formik.values.cusOffCodeOrg}
                    onChange={formik.handleChange}
                    className="w-100"
                  />
                </label>
                <label htmlFor="">
                  <span>Custom Office Code Sys</span>
                  <Input
                    errors={
                      formik.errors.cusOffCodeSys &&
                      formik.touched.cusOffCodeSys
                    }
                    nameError={formik.errors.cusOffCodeSys}
                    id="cusOffCodeSys"
                    type="text"
                    name="cusOffCodeSys"
                    placeholder="cusOffCodeSys"
                    value={formik.values.cusOffCodeSys}
                    onChange={formik.handleChange}
                    className="w-100"
                  />
                </label>
                <label htmlFor="">
                  <span>Boundary</span>
                  <ReactSelect
                    errors={formik.errors.boundary && formik.touched.boundary}
                    nameError={formik.errors.boundary}
                    onChange={formik.handleChange}
                    values={formik.values.boundary}
                    defaultValue="boundary"
                    name="boundary"
                    data={boundaryOptions}
                  />
                </label>
                <label htmlFor="">
                  <span>Custom office short name</span>
                  <Input
                    errors={
                      formik.errors.cusOffShortName &&
                      formik.touched.cusOffShortName
                    }
                    nameError={formik.errors.cusOffShortName}
                    id="cusOffShortName"
                    type="text"
                    name="cusOffShortName"
                    placeholder="Custom office short name"
                    value={formik.values.cusOffShortName}
                    onChange={formik.handleChange}
                    className="w-100"
                  />
                </label>
                <label htmlFor="">
                  <span>Address</span>
                  <Input
                    errors={formik.errors.address && formik.touched.address}
                    nameError={formik.errors.address}
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    className="w-100"
                  />
                </label>
                <label htmlFor="">
                  <span>Email</span>
                  <Input
                    errors={formik.errors.email && formik.touched.email}
                    nameError={formik.errors.email}
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="w-100"
                  />
                </label>
                <label htmlFor="">
                  <span>Phone</span>
                  <Input
                    errors={formik.errors.phone && formik.touched.phone}
                    nameError={formik.errors.phone}
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    className="w-100"
                  />
                </label>
                <label htmlFor="">
                  <span>GPS latitude</span>
                  <Input
                    errors={formik.errors.gpsLat && formik.touched.gpsLat}
                    nameError={formik.errors.gpsLat}
                    id="gpsLat"
                    type="text"
                    name="gpsLat"
                    placeholder="GPS latitude "
                    value={formik.values.gpsLat}
                    onChange={formik.handleChange}
                    className="w-100"
                  />
                </label>
                <label htmlFor="">
                  <span>GPS longitude </span>
                  <Input
                    errors={formik.errors.gpsLong && formik.touched.gpsLong}
                    nameError={formik.errors.gpsLong}
                    id="gpsLong"
                    type="text"
                    name="gpsLong"
                    placeholder="GPS longitude"
                    value={formik.values.gpsLong}
                    onChange={formik.handleChange}
                    className="w-100"
                  />
                </label>

                <div
                  style={{ gap: "13px" }}
                  className="d-flex justify-content-between"
                >
                  <label className="w-100" htmlFor="">
                    <span>Start Work</span>
                    <Input
                      errors={
                        formik.errors.startWork && formik.touched.startWork
                      }
                      nameError={formik.errors.startWork}
                      id="startWork"
                      name="startWork"
                      placeholder="Start Work"
                      value={formik.values.startWork}
                      onChange={formik.handleChange}
                      className="w-100"
                    />
                  </label>
                  <label className="w-100" htmlFor="">
                    <span>End Work</span>
                    <Input
                      errors={formik.errors.endWork && formik.touched.endWork}
                      nameError={formik.errors.endWork}
                      id="endWork"
                      name="endWork"
                      placeholder="End Work"
                      value={formik.values.endWork}
                      onChange={formik.handleChange}
                      className="w-100"
                    />
                  </label>
                </div>
                <label htmlFor="">
                  <span>Language Id</span>
                  <ReactSelect
                    errors={
                      formik.errors.languageId && formik.touched.languageId
                    }
                    nameError={formik.errors.languageId}
                    onChange={formik.handleChange}
                    values={formik.values.languageId}
                    defaultValue="Language Id"
                    name="languageId"
                    data={languageOptions}
                  />
                </label>
                <label htmlFor="">
                  <span>Level Id</span>
                  <ReactSelect
                    errors={formik.errors.levelId && formik.touched.levelId}
                    nameError={formik.errors.levelId}
                    onChange={formik.handleChange}
                    values={formik.values.levelId}
                    defaultValue="Level Id"
                    name="levelId"
                    data={levelOptions}
                  />
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
    </>
  );
};

export default Edit;
