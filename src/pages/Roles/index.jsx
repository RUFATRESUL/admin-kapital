import React, { useState } from "react";
import { Add } from "@mui/icons-material";

import { useGetRoleQuery, useLazyRoleIdQuery } from "src/redux/api/RolesApi";
import SpinnerLarg from "src/shared/components/SpinnerLarg/SpinnerLarg";
import { Button, Input, RenderIf } from "src/shared/components";
import RolesTable from "./components/RolesTable";
import Create from "./modals/Create";
import Remove from "./modals/Remove";
import View from "./modals/View";
import Edit from "./modals/Edit";

import styles from "./Roles.module.scss";
import FountInformation from "src/shared/components/FountInformation";
import TooltipCustom from "src/shared/components/TooltipCustom";
import { useSelector } from "react-redux";
import { RoleName } from "src/shared/constants/role";

const Roles = () => {
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
  const { data: roleData, isLoading } = useGetRoleQuery();

  const [roleId, { data: roleIdData, isLoading: roleIsLoading }] =
    useLazyRoleIdQuery();

  const filteredData = roleData?.filter((a) => {
    const { name } = a;
    const lowerCaseName = name?.toLowerCase() ?? "";

    return lowerCaseName.includes(searchQuery.toLowerCase());
  });
  const handleViewModal = (id) => {
    roleId({ id });
    setOpenViewModal(true);
  };
  const handleEditModal = (id) => {
    roleId({ id });
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
      <div className={styles.Roles}>
        <div className={styles.Roles_Title}>
          <h1>Roles</h1>
        </div>
        <RenderIf condition={!isLoading}>
          <div className={styles.Roles_Table}>
            <div className={styles.Roles_Table_Create}>
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
            <RenderIf condition={roleData && filteredData.length}>
              <RolesTable
                handleEditModal={handleEditModal}
                handleViewModal={handleViewModal}
                handleDeleteModal={handleDeleteModal}
                roleData={roleData}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChangePage={handleChangePage}
                filteredData={filteredData}
              />
            </RenderIf>

            <RenderIf
              condition={(!roleData && !isLoading) || !filteredData?.length}
            >
              <div className="text-center">
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
          roleIsLoading={roleIsLoading}
          roleIdData={roleIdData}
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
          roleIdData={roleIdData}
        />
      </RenderIf>
    </>
  );
};

export default Roles;
