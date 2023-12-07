import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  userName: Yup.string().required("İsdifadəçi adı boş ola bilməz."),
  password: Yup.string().required("Şifrə boş ola bilməz."),
});

export const userAddPermissionsSchema = Yup.object().shape({
  name: Yup.string().required("Name field cannot be empty."),
  userName: Yup.string().required("Username field cannot be empty."),
  surname: Yup.string().required("Surname field cannot be empty."),
  father: Yup.string().required("Father's name field cannot be empty."),
  genderId: Yup.string().required("Gender field cannot be empty."),
  email: Yup.string().required("Email field cannot be empty."),
  countryId: Yup.string().required("Country field cannot be empty."),
  phone: Yup.string().required("Phone field cannot be empty."),
  customOfficeId: Yup.string().required("Offices field cannot be empty."),
  password: Yup.string().required("Password field cannot be empty."),
  file: Yup.mixed().required("File field cannot be empty."),
});

export const userEditPermissionsSchema = Yup.object().shape({
  name: Yup.string().required("Do not keep empty"),
  userName: Yup.string().required("Do not keep empty"),
  surname: Yup.string().required("Do not keep empty"),
  father: Yup.string().required("Do not keep empty"),
  genderId: Yup.string().required("Do not keep empty"),
  email: Yup.string().required("Do not keep empty"),
  countryId: Yup.string().required("Do not keep empty"),
  phone: Yup.string().required("Do not keep empty"),
  customOfficeId: Yup.string().required("Do not keep empty"),
});

export const changePasswordValidation = Yup.object().shape({
  oldPassword: Yup.string().required("Do not keep it empty"),
  newPassword: Yup.string().required("Do not keep it empty"),
  newPasswordConfirm: Yup.string().required("Do not keep it empty"),
});

export const continentsCreateValidation = Yup.object().shape({
  az: Yup.string().required("Do not keep it empty"),
  en: Yup.string().required("Do not keep it empty"),
  ru: Yup.string().required("Do not keep it empty"),
});

export const countriesCreateValidation = Yup.object().shape({
  countryCodeNum: Yup.string().required("Do not keep it empty"),
  countryCodeAbv3: Yup.string().required("Do not keep it empty"),
  countryCodeAbv2: Yup.string().required("Do not keep it empty"),
  continentId: Yup.string().required("Do not keep it empty"),
  files: Yup.mixed().required("Do not keep it empty"),
  az: Yup.string().required("Do not keep it empty"),
  en: Yup.string().required("Do not keep it empty"),
  ru: Yup.string().required("Do not keep it empty"),
});
export const countriesEditValidation = Yup.object().shape({
  countryCodeNum: Yup.string().required("Do not keep it empty"),
  countryCodeAbv3: Yup.string().required("Do not keep it empty"),
  countryCodeAbv2: Yup.string().required("Do not keep it empty"),
  continentId: Yup.string().required("Do not keep it empty"),
  az: Yup.string().required("Do not keep it empty"),
  en: Yup.string().required("Do not keep it empty"),
  ru: Yup.string().required("Do not keep it empty"),
});

export const roleEditValidation = Yup.object().shape({
  name: Yup.string().required("Do not keep it empty"),
  permission: Yup.array().min(1, "Do not keep it empty"),
  description: Yup.string().required("Do not keep it empty"),
});
export const roleCreateValidation = Yup.object().shape({
  name: Yup.string().required("Do not keep it empty"),
  description: Yup.string().required("Do not keep it empty"),
  permissons: Yup.array().min(1, "Do not keep it empty"),
});

export const officesCreateValidation = Yup.object().shape({
  // countryId: Yup.string().required("Do not keep it empty"),
  // cusOffCodeOrg: Yup.string().required("Do not keep it empty"),
  // cusOffCodeSys: Yup.string().required("Do not keep it empty"),
  cusOffShortName: Yup.string().required("Do not keep it empty"),
  boundary: Yup.boolean().required("Do not keep it empty"),
  // address: Yup.string().required("Do not keep it empty"),
  // email: Yup.string().required("Do not keep it empty"),
  // phone: Yup.string().required("Do not keep it empty"),
  // gpsLat: Yup.string().required("Do not keep it empty"),
  // gpsLong: Yup.string().required("Do not keep it empty"),
  languageId: Yup.string().required("Do not keep it empty"),
  levelId: Yup.string().required("Do not keep it empty"),
  // endWork: Yup.string().required("Do not keep it empty"),
  // startWork: Yup.string().required("Do not keep it empty"),
  az: Yup.string().required("Do not keep it empty"),
  en: Yup.string().required("Do not keep it empty"),
  ru: Yup.string().required("Do not keep it empty"),
});
