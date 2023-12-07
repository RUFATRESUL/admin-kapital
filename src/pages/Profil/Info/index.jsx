import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

import {
  useLazyUserByIdQuery,
  useUsersEditMutation,
} from "src/redux/api/authApi/authApi";
import { Button, Input, RenderIf } from "src/shared/components";
import ReactSelect from "src/shared/components/ReactSelect";
import { userEditPermissionsSchema } from "src/validation";
import { Edit, EditProf, Logo } from "src/assets/svgs";
import { ProfileContext } from "..";

import styles from "./Info.module.scss";
import { useCountriesFilterQuery } from "src/redux/api/CountriesApi";
import { useCustomsOfficesFilterQuery } from "src/redux/api/CustomsOfficesApi";

export const Info = () => {
  const { isImgUpdate, setIsImgUpdate, profilImg } = useContext(ProfileContext);
  const [isShowEdit, setShowEdit] = useState(false);
  const { user } = useSelector((state) => state?.user);
  const [userById, { data: byIdData }] = useLazyUserByIdQuery();
  useEffect(() => {
    userById({ userId: user?.id });
  }, [userById]);

  const [usersEdit, { data, error, isSuccess, isLoading: isLoadingEdit }] =
    useUsersEditMutation();

  const handlerUserEdit = (values) => {
    const formData = new FormData();
    formData.append("Id", user.id);
    formData.append("CustomOfficeId", values.customOfficeId);
    formData.append("File", profilImg);
    formData.append("CountryId", values.countryId);
    formData.append("UserName", values.userName);
    formData.append("Surname", values.surname);
    formData.append("Phone", values.phone);
    formData.append("Name", values.name);
    formData.append("Email", values.email);
    formData.append("Father", values.father);
    formData.append("GenderId", values.genderId);
    formData.append("RoleId", user.roleId);
    let permissions = user?.permissions;
    let permissionsConvert = Object.keys(permissions).map((key) => {
      const permissionId = permissions[key].parameters[0].id;
      const scopeId = permissionId;
      const value = permissions[key].parameterValues.value || "All";

      return { permissionId, scopeId, value };
    });

    for (let i = 0; i < permissionsConvert.length; i++) {
      const item = permissionsConvert[i];
      const permissionId = item.permissionId;
      const scopeId = item.scopeId;
      const value = item.value;

      formData.append(`Permissions[${i}].PermissionId`, permissionId);
      formData.append(`Permissions[${i}].ScopeId`, scopeId);
      formData.append(`Permissions[${i}].Value`, value);
    }
    usersEdit(formData);
  };
  useEffect(() => {
    formik.resetForm({ values: byIdData });
  }, [byIdData]);

  useEffect(() => {
    if (isSuccess) {
      setShowEdit((show) => !show);
      setIsImgUpdate((current) => !current);
    }
  }, [isSuccess]);

  const { data: countriesData } = useCountriesFilterQuery({
    IsTransitCountry: true,
  });
  const { data: customOfficesData } = useCustomsOfficesFilterQuery();
  const genderData = [
    {
      id: 0,
      gender: "Female",
    },
    {
      id: 1,
      gender: "Male",
    },
  ];
  const formik = useFormik({
    validationSchema: userEditPermissionsSchema,
    initialValues: {
      userName: "",
      name: "",
      surname: "",
      father: "",
      countryId: "",
      genderId: "",
      email: "",
      phone: "",
      customOfficeId: "",
    },
    onSubmit: (values) => {
      handlerUserEdit(values);
      // handleNext();
    },
  });
  useEffect(() => {
    if (isShowEdit) {
      formik.setFieldValue("customOfficeId", "");
    }
  }, [formik?.values?.countryId]);

  const customOfficesOptions = customOfficesData?.data
    ?.filter((item) => item?.countryId === formik.values.countryId)
    .map((item) => ({
      value: item?.id,
      label: item?.cusOffShortName,
    }));

  const genderOptions = genderData?.map((data) => ({
    value: data?.id,
    label: data?.gender,
  }));

  const countriesOption = countriesData?.data
    .filter((data) => data.countryName !== null)
    .map((item) => {
      return {
        value: item?.id,
        label: item?.countryName,
      };
    });
  const handlerProfilEdit = () => {
    setShowEdit((show) => !show);
    setIsImgUpdate((current) => !current);
  };
  return (
    <div className={styles.Info}>
      <div className={styles.Info_Header}>
        <h1>Profile Information</h1>
        <button onClick={handlerProfilEdit} className={styles.Info_Header_SVG}>
          <EditProf />
        </button>
      </div>
      <RenderIf condition={!isShowEdit}>
        <div className={styles.Info_Details}>
          <label htmlFor="">
            <span>Full Name</span>
            <p>{byIdData?.name + " " + byIdData?.surname}</p>
          </label>
          <label htmlFor="">
            <span>Gender</span>
            <p>{byIdData?.genderName}</p>
          </label>
          <label htmlFor="">
            <span>Email</span>
            <p>{byIdData?.email}</p>
          </label>
          <label htmlFor="">
            <span>Phone</span>
            <p>{byIdData?.phone}</p>
          </label>
          <label htmlFor="">
            <span>Country</span>
            <p>{byIdData?.countryName || "Azerbaijan"}</p>
          </label>
          <label htmlFor="">
            <span>Customs Offices</span>
            <p>{byIdData?.customOfficeName || "Baku"}</p>
          </label>
        </div>
      </RenderIf>
      <RenderIf condition={isShowEdit}>
        <div className={styles.Info_Edit}>
          <form action="" onSubmit={formik.handleSubmit}>
            <div className={styles.Info_Edit_Input}>
              <label>
                <p>Name</p>
                <Input
                  errors={formik.errors.name && formik.touched.name}
                  nameError={formik.errors.name}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="Name"
                  className="w-100"
                  name="name"
                  type="text"
                />{" "}
              </label>
              <label>
                <p>Surname</p>
                <Input
                  errors={formik.errors.surname && formik.touched.surname}
                  nameError={formik.errors.surname}
                  onChange={formik.handleChange}
                  value={formik.values.surname}
                  placeholder="Surname"
                  className="w-100"
                  name="surname"
                  type="text"
                />{" "}
              </label>
              <label>
                <p>Login</p>
                <Input
                  errors={formik.errors.userName && formik.touched.userName}
                  nameError={formik.errors.userName}
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                  placeholder="Login"
                  className="w-100"
                  name="userName"
                  type="text"
                />{" "}
              </label>
              <label>
                <p>Father Name</p>
                <Input
                  errors={formik.errors.father && formik.touched.father}
                  nameError={formik.errors.father}
                  onChange={formik.handleChange}
                  value={formik.values.father}
                  placeholder="Father Name"
                  className="w-100"
                  name="father"
                  type="text"
                />{" "}
              </label>
              <label>
                <p>Gender</p>
                <ReactSelect
                  errors={formik.errors.genderId && formik.touched.genderId}
                  nameError={formik.errors.genderId}
                  onChange={formik.handleChange}
                  values={formik.values.genderId}
                  defaultValue="Gender"
                  name="genderId"
                  data={genderOptions}
                />
              </label>
              <label>
                <p>Phone</p>
                <Input
                  errors={formik.errors.phone && formik.touched.phone}
                  nameError={formik.errors.phone}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  placeholder="Phone"
                  className="w-100"
                  name="phone"
                  type="text"
                />{" "}
              </label>
              <label>
                <p>Email</p>
                <Input
                  errors={formik.errors.email && formik.touched.email}
                  nameError={formik.errors.email}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Email"
                  className="w-100"
                  name="email"
                  type="text"
                />{" "}
              </label>
              <label>
                <p>Country</p>
                <ReactSelect
                  errors={formik.errors.countryId && formik.touched.countryId}
                  nameError={formik.errors.countryId}
                  onChange={formik.handleChange}
                  values={formik.values.countryId}
                  defaultValue="Country"
                  name="countryId"
                  data={countriesOption}
                />
              </label>
              <label>
                <p>Customs Offices</p>
                <ReactSelect
                  errors={
                    formik.errors.customOfficeId &&
                    formik.touched.customOfficeId
                  }
                  nameError={formik.errors.customOfficeId}
                  onChange={formik.handleChange}
                  values={formik.values.customOfficeId}
                  defaultValue="Customs Offices"
                  name="customOfficeId"
                  data={customOfficesOptions}
                />
              </label>
            </div>
            <RenderIf condition={isSuccess}>
              <div
                className="text-center"
                style={{
                  color: "#14458D",
                  fontWeight: "bold",
                  fontSize: "17px",
                  marginBottom: "15px",
                }}
              >
                Your information has been successfully changed
              </div>
            </RenderIf>
            <RenderIf condition={error}>
              <div
                className="text-center"
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "17px",
                  marginBottom: "15px",
                }}
              >
                {error?.data?.message}
              </div>
            </RenderIf>
            <div className={styles.Info_Edit_Button}>
              <Button
                // onClick={handlerButton}
                disabled={isLoadingEdit}
                isLoading={isLoadingEdit}
                background="#14458D"
                children="Next"
                color="#ffffff"
                type="submit"
              />
            </div>
          </form>
        </div>
      </RenderIf>
    </div>
  );
};
