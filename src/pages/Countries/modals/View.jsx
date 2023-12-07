import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Button, RenderIf } from "src/shared/components";
import SpinnerLarg from "src/shared/components/SpinnerLarg/SpinnerLarg";
import { Add, UserPeople } from "src/assets/svgs";
import {
  Close,
  CodeSharp,
  Flag,
  NumbersSharp,
  PublicOutlined,
} from "@mui/icons-material";

const View = ({
  setOpenViewModal,
  openViewModal,
  countrieByIdData,
  countrieByIdIsLoading,
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
                <h2>{countrieByIdData?.continentName}</h2>
                <p>Continent name</p>
              </div>
            </div>
            <div className="view-modal-body-common d-flex align-items-center">
              <Flag />
              <div>
                <h2>{countrieByIdData?.countryName}</h2>
                <p>Country name</p>
              </div>
            </div>
            <div className="view-modal-body-common d-flex align-items-center">
              <NumbersSharp />
              <div>
                <h2>{countrieByIdData?.countryCodeNum}</h2>
                <p>CountryCodeNum</p>
              </div>
            </div>
            <div className="view-modal-body-common d-flex align-items-center">
              <CodeSharp />
              <div>
                <h2>{countrieByIdData?.countryCodeAbv3}</h2>
                <p>CountryCodeAbv3</p>
              </div>
            </div>
            <div className="view-modal-body-common d-flex align-items-center">
              <CodeSharp />
              <div>
                <h2>{countrieByIdData?.countryCodeAbv2}</h2>
                <p>CountryCodeAbv2</p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default View;
