import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ChangePassword } from "./Profil/ChangePassword";
import { Permissions } from "./Profil/Permissions";
import CustomsOffices from "./CustomsOffices";
import { Urls } from "shared/constants/url";
import { Info } from "./Profil/Info";
import { Profile } from "./Profil";
import Continents from "./Continents";
import Countries from "./Countries";
import Roles from "./Roles";

import Folders from "./Folders";
import MainOffice from "./Structure/MainOffice";
import Branches from "./Structure/Branches";
import Sections from "./Structure/Sections";
import Departments from "./Structure/Departments";
import Positions from "./Structure/Positions";
import SystemUsers from "./SystemUsers";

const PrivateRouter = () => {
  return (
    <Routes>
      <Route path={Urls.FOLDERS} element={<Folders />} />
      <Route path={Urls.STRUCTURE_MAIN_OFFICES} element={<MainOffice />} />
      <Route path={Urls.STRUCTURE_BRANCHES} element={<Branches />} />
      <Route path={Urls.STRUCTURE_SECTIONS} element={<Sections />} />
      <Route path={Urls.STRUCTURE_DEPARTAMENTS} element={<Departments />} />
      <Route path={Urls.STRUCTURE_POSITIONS} element={<Positions />} />

      <Route path={Urls.SYSTEM_USERS} element={<SystemUsers />} />

      <Route path={Urls.CUSTOMS_OFFICES} element={<CustomsOffices />} />
      <Route path={Urls.CONTINENTS} element={<Continents />} />
      <Route path={Urls.COUNTRIES} element={<Countries />} />
      <Route path={Urls.ROLES} element={<Roles />} />
      <Route path={Urls.PROFILE} element={<Profile />}>
        <Route path={Urls.PROFILE_INFO} element={<Info />} />
        <Route
          path={Urls.PROFILE_CHANGE_PASSWORD}
          element={<ChangePassword />}
        />
        <Route path={Urls.PROFILE_PERMISSIONS} element={<Permissions />} />
      </Route>
      {/* <Route path="*" element={<Navigate replace to={Urls.CONTINENTS} />} /> */}
    </Routes>
  );
};

export default PrivateRouter;
