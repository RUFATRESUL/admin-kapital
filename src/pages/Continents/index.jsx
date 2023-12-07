import React, { useState } from "react";
import { Add } from "@mui/icons-material";

import {
  useContinentsFilterQuery,
  useLazyContinentsByIdQuery,
} from "src/redux/api/Continents";
import SpinnerLarg from "src/shared/components/SpinnerLarg/SpinnerLarg";
import FountInformation from "src/shared/components/FountInformation";
import TooltipCustom from "src/shared/components/TooltipCustom";
import { Button, Input, RenderIf } from "src/shared/components";
import ContinentsTable from "./components/ContinentsTable";
import Create from "./modals/Create";
import Remove from "./modals/Remove";
import View from "./modals/View";
import Edit from "./modals/Edit";

import styles from "./Continents.module.scss";
import { useSelector } from "react-redux";
import { RoleName } from "src/shared/constants/role";

const Continents = () => {
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
  const { data: continentData, isLoading } = useContinentsFilterQuery({
    Skip: page * rowsPerPage,
    Take: rowsPerPage,
    OrderBy: false,
  });
  const filteredData = continentData?.data?.filter((continent) =>
    continent?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [
    continentsById,
    { data: continentByIdData, isLoading: continentByIdIsLoading },
  ] = useLazyContinentsByIdQuery();

  const handleViewModal = (id) => {
    continentsById({ id });
    setOpenViewModal(true);
  };
  const handleEditModal = (id) => {
    continentsById({ id });
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
      <div className={styles.Continents}>
        <RenderIf condition={!isLoading}>
          <div className={styles.Continents_Title}>
            <h1>Continents</h1>
            {/* <p>
              <Switch />
              Show filter
            </p> */}
          </div>
          <div className={styles.Continents_Table}>
            <div className={styles.Continents_Table_Create}>
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
                  {" "}
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
            <RenderIf condition={continentData && filteredData?.length}>
              <ContinentsTable
                handleEditModal={handleEditModal}
                handleViewModal={handleViewModal}
                handleDeleteModal={handleDeleteModal}
                continentData={continentData}
                filteredData={filteredData}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChangePage={handleChangePage}
              />
            </RenderIf>

            <RenderIf
              condition={
                (!continentData && !isLoading) || !filteredData?.length
              }
            >
              <div className="text-center ">
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
          continentByIdIsLoading={continentByIdIsLoading}
          continentByIdData={continentByIdData}
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
          continentByIdData={continentByIdData}
          continentByIdIsLoading={continentByIdIsLoading}
        />
      </RenderIf>
    </>
  );
};

export default Continents;
