import React, { useState } from "react";
import { Add } from "@mui/icons-material";

import {
  useCustomsOfficesFilterQuery,
  useLazyCustomsOfficesByIdQuery,
} from "src/redux/api/CustomsOfficesApi";
import SpinnerLarg from "src/shared/components/SpinnerLarg/SpinnerLarg";
import FountInformation from "src/shared/components/FountInformation";
import { useCountriesFilterQuery } from "src/redux/api/CountriesApi";
import CustomOfficesTable from "./components/CustomOfficesTable";
import { Button, Input, RenderIf } from "src/shared/components";
import TooltipCustom from "src/shared/components/TooltipCustom";
import { visiblity } from "src/shared/constants/modalFields";
import Create from "./modals/Create";
import Remove from "./modals/Remove";
import View from "./modals/View";
import Edit from "./modals/Edit";

import styles from "./CustomsOffices.module.scss";

const CustomsOffices = () => {
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
    search
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
  const handleCreateModal = () => {
    setIsViewModal(visiblity?.CREATE);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  }

  return (
    <>
      <div className={styles.CustomOffices}>
        <div className={styles.CustomOffices_Title}>
          <h1>Customs Offices</h1>
        </div>
        <RenderIf condition={!isLoading}>
          <div className={styles.CustomOffices_Table}>
            <div className={styles.CustomOffices_Table_Create}>
              <div>
                <Input
                  icon={true}
                  id="search"
                  type="text"
                  name="search"
                  placeholder="Search"
                  className="w-100"
                  value={search}
                  onChange={handleChangeSearch}
                />
              </div>
              <div>
                <Button
                  onClick={handleCreateModal}
                  padding="0"
                  background="none"
                >
                  <TooltipCustom title="Add">
                    <Add />
                  </TooltipCustom>
                </Button>
              </div>
            </div>
            <RenderIf condition={customOfficeData && filteredData?.length}>
              <CustomOfficesTable
                handleEditModal={handleEditModal}
                handleViewModal={handleViewModal}
                handleDeleteModal={handleDeleteModal}
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
      <View
        handleViewModal={handleViewModal}
        customOfficeByIdIsLoading={customOfficeByIdIsLoading}
        customOfficeByIdData={customOfficeByIdData}
        setIsViewModal={setIsViewModal}
        visiblity={visiblity}
        isViewModal={isViewModal}
      />
      <Create
        handleCreateModal={handleCreateModal}
        countrieData={countrieData}
        customOfficeData={customOfficeData}
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
      <Edit
        handleEditModal={handleEditModal}
        setIsViewModal={setIsViewModal}
        countrieData={countrieData}
        customOfficeData={customOfficeData}
        visiblity={visiblity}
        isViewModal={isViewModal}
        customOfficeByIdData={customOfficeByIdData}
        customOfficeByIdIsLoading={customOfficeByIdIsLoading}
      />
    </>
  );
};

export default CustomsOffices;
