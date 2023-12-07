import React, { useState } from "react";
import { Add } from "@mui/icons-material";

import {
  useCustomsOfficesFilterQuery,
  useLazyCustomsOfficesByIdQuery,
} from "src/redux/api/CustomsOfficesApi";
import SpinnerLarg from "src/shared/components/SpinnerLarg/SpinnerLarg";
import FountInformation from "src/shared/components/FountInformation";
import { useCountriesFilterQuery } from "src/redux/api/CountriesApi";
import CustomOfficesTable from "./components/SystemUsersTable";
import { Button, Input, RenderIf } from "src/shared/components";
import TooltipCustom from "src/shared/components/TooltipCustom";
import { visiblity } from "src/shared/constants/modalFields";
import { DatePickers } from "src/shared/components";
import Create from "./modals/Create";
import Remove from "./modals/Remove";
// import View from "./modals/View";
import Edit from "./modals/Edit";

import styles from "../Folders/Folders.module.scss";
import ReactSelect from "react-select";
import ChangePassword from "./modals/ChangePassword";

const SystemUsers = () => {
  const [isViewModal, setIsViewModal] = useState(visiblity?.CLOSE_ALL);

  const [isdeleteId, setIsDeleteId] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = useState("");

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const { data: customOfficeData, isLoading } = useCustomsOfficesFilterQuery({
    Skip: page * rowsPerPage,
    Take: rowsPerPage,
    OrderBy: false,
    search,
  });

  const { data: countrieData } = useCountriesFilterQuery({ OrderBy: false });

  const filteredData = customOfficeData?.data?.filter((item) => {
    const { name, countryName, address, email } = item;

    const lowerCaseName = name?.toLowerCase() ?? "";
    const lowerCountryName = countryName?.toLowerCase() ?? "";
    const lowerAddress = address?.toLowerCase() ?? "";
    const lowerCaseEmail = email?.toLowerCase() ?? "";

    return (
      lowerCaseName.includes(search.toLowerCase()) ||
      lowerCountryName.includes(search.toLowerCase()) ||
      lowerAddress.includes(search.toLowerCase()) ||
      lowerCaseEmail.includes(search.toLowerCase())
    );
  });
  const [
    customOfficesById,
    { data: customOfficeByIdData, isLoading: customOfficeByIdIsLoading },
  ] = useLazyCustomsOfficesByIdQuery();

  const handleViewModal = (id) => {
    customOfficesById({ id });
    setIsViewModal(visiblity?.VIEW);
  };
  const handleEditModal = (id) => {
    customOfficesById({ id });
    setIsViewModal(visiblity?.EDIT);
  };
  const handleDeleteModal = (id) => {
    setIsDeleteId(id);
    setIsViewModal(visiblity?.DELETE);
  };

  const handlePasswordModal = (id) => {
    // setIsDeleteId(id);
    // customOfficesById({ id });
    setIsViewModal(visiblity?.PASSWORD);
  };

  const handleCreateModal = () => {
    setIsViewModal(visiblity?.CREATE);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  return (
    <>
      <div className={styles.CustomOffices}>
        <RenderIf condition={!isLoading}>
          <div className={styles.CustomOffices_Table}>
            <div className={styles.CustomOffices_Table_Create}>
              <div className="d-flex justify-content-end mb-3">
                <TooltipCustom title="Add">
                  <Button
                    onClick={handleCreateModal}
                    padding="0"
                    background="none"
                  >
                    <Add />
                    Əlavə et
                  </Button>
                </TooltipCustom>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  {/* <DatePickers /> */}
                  <ReactSelect className="mr-4" placeholder="Rol" />
                  <ReactSelect placeholder="Status" />

                </div>
                <div>
                  <Input
                    icon={true}
                    id="search"
                    type="text"
                    name="search"
                    placeholder="İstifadəçi axtar"
                    className="w-100"
                    value={search}
                    onChange={handleChangeSearch}
                  />
                </div>
              </div>
            </div>
            <RenderIf condition={customOfficeData && filteredData?.length}>
              <CustomOfficesTable
                handleEditModal={handleEditModal}
                handleViewModal={handleViewModal}
                handleDeleteModal={handleDeleteModal}
                handlePasswordModal={handlePasswordModal}
                customOfficeData={customOfficeData}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChangePage={handleChangePage}
                filteredData={customOfficeData?.data}
              />
            </RenderIf>

            <RenderIf
              condition={
                (!customOfficeData && !isLoading) || !filteredData?.length
              }
            >
              <div className="text-center text-danger">
                <FountInformation />
              </div>
            </RenderIf>
          </div>
        </RenderIf>
        <RenderIf condition={isLoading}>
          <div className="text-center mt-5">
            <SpinnerLarg color={"#14458d"} />
          </div>
        </RenderIf>
      </div>
      {/* <View
        handleViewModal={handleViewModal}
        customOfficeByIdIsLoading={customOfficeByIdIsLoading}
        customOfficeByIdData={customOfficeByIdData}
        setIsViewModal={setIsViewModal}
        visiblity={visiblity}
        isViewModal={isViewModal}
      /> */}
      <Create
        handleCreateModal={handleCreateModal}
        setIsViewModal={setIsViewModal}
        visiblity={visiblity}
        isViewModal={isViewModal}
      />
      <Edit
        handleEditModal={handleEditModal}
        setIsViewModal={setIsViewModal}
        visiblity={visiblity}
        isViewModal={isViewModal}
      />
      <Remove
        handleDeleteModal={handleDeleteModal}
        isdeleteId={isdeleteId}
        setIsViewModal={setIsViewModal}
        visiblity={visiblity}
        isViewModal={isViewModal}
      />

      <ChangePassword
        handlePasswordModal={handlePasswordModal}
        // isdeleteId={isdeleteId}
        setIsViewModal={setIsViewModal}
        visiblity={visiblity}
        isViewModal={isViewModal}
      />

    </>
  );
};

export default SystemUsers;
