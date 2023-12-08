import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Button, RenderIf } from "src/shared/components";
import SpinnerLarg from "src/shared/components/SpinnerLarg/SpinnerLarg";
// import { Add, UserPeople } from "src/assets/svgs";
import { Close, PublicOutlined } from "@mui/icons-material";

const View = ({
  setOpenViewModal,
  openViewModal,
  continentByIdData,
  continentByIdIsLoading,
}) => {
  const handleClose = () => {
    setOpenViewModal(false);
  };

  return (
    <Modal
      className="view-modal"
      open={openViewModal}
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
          padding: "20px",
          width: "100%",
          maxWidth: "400px",
          height: "100vh",
        }}
      >
        <div className="view-modal-header">
          <h1>Review</h1>
          <Button onClick={handleClose} padding="0" background="none">
            <Close />
          </Button>
        </div>

        <div className="view-modal-body">
          <label htmlFor="">
            <h1>General information</h1>
            <div className="view-modal-body-common d-flex align-items-center">
              <PublicOutlined />
              <div>
                <h2>{continentByIdData?.name}</h2>
                <p>Continent name</p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default View;
