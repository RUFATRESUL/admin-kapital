import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Button, RenderIf } from "src/shared/components";
import SpinnerLarg from "src/shared/components/SpinnerLarg/SpinnerLarg";
import { Trash } from "src/assets/svgs";
import { Close } from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import DeleteProfile from "./DeleteProfile";

import TooltipCustom from "src/shared/components/TooltipCustom";
const View = ({
  setIsViewModal,
  customOfficeByIdIsLoading,
  isViewModal,
  visiblity,
}) => {
  const [isViewProfileModal, setIsViewProfileModal] = useState(
    visiblity?.CLOSE_ALL
  );

  const handleClose = () => {
    setIsViewModal(visiblity?.CLOSE_ALL);
    setIsViewProfileModal(visiblity?.CLOSE_ALL)
  };
  const handleDeleteProfileModal = () => {
    setIsViewProfileModal(visiblity?.DELETE_PROFILE);
  };
  console.log(isViewProfileModal,"isViewProfileModal")

  return (
    <>
    <Modal
      className="view-modal view-modal-profile"
      open={isViewModal === visiblity?.VIEW}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          outline: "none",
          background: "#fff",
          // padding: "20px",
          width: "100%",
          maxWidth: "500px",
          height: "100vh",
        }}
      >
        <div className="view-modal-header">
          <h1>Profillər</h1>
          <Button onClick={handleClose} padding="0" background="none">
            <Close />
          </Button>
        </div>
        <RenderIf condition={customOfficeByIdIsLoading}>
          <div className="text-center">
            <SpinnerLarg color={"red"} />
          </div>
        </RenderIf>
        <RenderIf condition={!customOfficeByIdIsLoading}>
          <div className="view-modal-body">
            <div className="view-modal-title">
              <h4>Folder name 1</h4>
              <span>
                Profil sayı: <b>150</b>
              </span>
              <span>
                Sahibi: <b>Xəyyam Orucov</b>{" "}
              </span>
            </div>

            <div className="view-modal-table mt-4">
              <TableContainer className="table-container" component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Profillər</TableCell>
                      <TableCell>Əlavə edilmə tarixi</TableCell>
                      <TableCell> </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">Şövkət Məmmədəliyeva</TableCell>
                      <TableCell align="right">15.02.2023</TableCell>

                      <TableCell align="right">
                        <div className=" table-container-oparation d-flex align-items-center">
                          <Button
                            onClick={ handleDeleteProfileModal}
                            padding="0"
                            background="none"
                          >
                            <TooltipCustom title="Delete">
                              <Trash />
                            </TooltipCustom>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">Şövkət Məmmədəliyeva</TableCell>
                      <TableCell align="right">15.02.2023</TableCell>

                      <TableCell align="right">
                        <div className=" table-container-oparation d-flex align-items-center">
                          <Button
                            onClick={handleDeleteProfileModal}
                            padding="0"
                            background="none"
                          >
                            <TooltipCustom title="Delete">
                              <Trash />
                            </TooltipCustom>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </RenderIf>
   
      </div>

     
    </Modal>
    <DeleteProfile
        setIsViewModal={setIsViewProfileModal}
        visiblity={visiblity}
        isViewModal={isViewProfileModal}
      />
    </>
  );
};

export default View;
