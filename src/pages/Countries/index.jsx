import React, { useState } from "react";
import { Add } from "@mui/icons-material";

import {
  useCountriesFilterQuery,
  useLazyCountriesByIdQuery,
} from "src/redux/api/CountriesApi";
import SpinnerLarg from "src/shared/components/SpinnerLarg/SpinnerLarg";
import CountriesTable from "./components/CountriesTable";
import { Button, Input, RenderIf } from "src/shared/components";
import Create from "./modals/Create";
import Remove from "./modals/Remove";
import View from "./modals/View";
import Edit from "./modals/Edit";

import styles from "./Countries.module.scss";
import FountInformation from "src/shared/components/FountInformation";
import { Tooltip } from "@mui/material";
import TooltipCustom from "src/shared/components/TooltipCustom";
import { RoleName } from "src/shared/constants/role";
import { useSelector } from "react-redux";

const Countries = () => {
  const { roleName } = useSelector((state) => state?.user?.user);
  const [openCreatedModal, setOpenCreateModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isdeleteId, setIsDeleteId] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const { data: countrieData, isLoading } = useCountriesFilterQuery({
    Skip: page * rowsPerPage,
    Take: rowsPerPage,
    OrderBy: false,
  });
  const filteredData = countrieData?.data?.filter((a) => {
    const { countryCodeNum, countryName } = a;
    const lowerCaseName = countryCodeNum?.toLowerCase() ?? "";
    const lowerCaseCountryName = countryName?.toLowerCase() ?? "";

    return (
      lowerCaseName.includes(searchQuery.toLowerCase()) ||
      lowerCaseCountryName.includes(searchQuery.toLowerCase())
    );
  });
  const [
    countriesById,
    { data: countrieByIdData, isLoading: countrieByIdIsLoading },
  ] = useLazyCountriesByIdQuery();

  const handleViewModal = (id) => {
    countriesById({ id });
    setOpenViewModal(true);
  };
  const handleEditModal = (id) => {
    countriesById({ id });
    setOpenEditModal(true);
  };
  const handleDeleteModal = (id) => {
    setIsDeleteId(id);
    setOpenDeleteModal(true);
  };
  const handleCreateModal = () => {
    setOpenCreateModal(true);
  };

  return (
    <>
      <div className={styles.Countries}>
        <RenderIf condition={!isLoading}>
          <div className={styles.Countries_Title}>
            <h1>Countries</h1>
          </div>
          <div className={styles.Countries_Table}>
            <div className={styles.Countries_Table_Create}>
              <div>
                <Input
                  icon={true}
                  id="search"
                  type="text"
                  name="search"
                  placeholder="Search"
                  className="w-100"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <RenderIf condition={roleName == RoleName?.ADMIN}>
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
              </RenderIf>
            </div>
            <RenderIf condition={countrieData && filteredData?.length}>
              <CountriesTable
                handleEditModal={handleEditModal}
                handleViewModal={handleViewModal}
                handleDeleteModal={handleDeleteModal}
                countrieData={countrieData}
                rowsPerPage={rowsPerPage}
                page={page}
                filteredData={filteredData}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChangePage={handleChangePage}
              />
            </RenderIf>
            <RenderIf
              condition={(!countrieData && !isLoading) || !filteredData?.length}
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
      <RenderIf condition={roleName == RoleName?.ADMIN}>
        <View
          openViewModal={openViewModal}
          handleViewModal={handleViewModal}
          setOpenViewModal={setOpenViewModal}
          countrieByIdIsLoading={countrieByIdIsLoading}
          countrieByIdData={countrieByIdData}
        />
        <Create
          openCreatedModal={openCreatedModal}
          handleCreateModal={handleCreateModal}
          setOpenCreateModal={setOpenCreateModal}
        />
        <Remove
          openDeleteModal={openDeleteModal}
          handleDeleteModal={handleDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          isdeleteId={isdeleteId}
        />
        <Edit
          openEditModal={openEditModal}
          handleEditModal={handleEditModal}
          setOpenEditModal={setOpenEditModal}
          countrieByIdData={countrieByIdData}
        />
      </RenderIf>
    </>
  );
};

export default Countries;
