import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Button, RenderIf } from "src/shared/components";
import SpinnerLarg from "src/shared/components/SpinnerLarg/SpinnerLarg";
import { Add, UserPeople } from "src/assets/svgs";
import {
  AddLocation,
  Apartment,
  Close,
  Email,
  Flag,
  LocationCity,
  LocationCityRounded,
  LocationCityTwoTone,
  PhoneAndroidOutlined,
  PhoneBluetoothSpeaker,
  PhoneInTalk,
  Place,
  WatchLater,
} from "@mui/icons-material";

const View = ({
  setIsViewModal,
  customOfficeByIdData,
  customOfficeByIdIsLoading,
  isViewModal,
  visiblity,
}) => {
  const handleClose = () => {
    setIsViewModal(visiblity?.CLOSE_ALL);
  };
  return (
    <Modal
      className="view-modal"
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
        <RenderIf condition={customOfficeByIdIsLoading}>
          <div className="text-center">
            {" "}
            <SpinnerLarg color={"red"} />
          </div>
        </RenderIf>
        <RenderIf condition={!customOfficeByIdIsLoading}>
          <div className="view-modal-body">
            <label htmlFor="">
              <h1>General information</h1>
              <div className="view-modal-body-common col-6 col-lg-6 d-flex align-items-center">
                <Flag />
                <div>
                  <h2>
                    {customOfficeByIdData?.countryName || "Not mentioned"}
                  </h2>
                  <p>Country Name</p>
                </div>
              </div>
              <div className="view-modal-body-common  d-flex align-items-center">
                <Apartment />
                <div>
                  <h2>{customOfficeByIdData?.name || "No information"}</h2>
                  <p>Office Name</p>
                </div>
              </div>
              <div className="view-modal-body-common d-flex align-items-center">
                <Email />
                <div>
                  <h2>{customOfficeByIdData?.email || "No information"}</h2>
                  <p>Email</p>
                </div>
              </div>
              <div className="view-modal-body-common d-flex align-items-center">
                <LocationCityRounded />
                <div>
                  <h2>{customOfficeByIdData?.address || "No information"}</h2>
                  <p>Address</p>
                </div>
              </div>
              <div className="view-modal-body-common d-flex align-items-center">
                <Place />
                <div>
                  <h2>{customOfficeByIdData?.gpsLat || "No information"}</h2>
                  <p>Latitude</p>
                </div>
              </div>
              <div className="view-modal-body-common d-flex align-items-center">
                <Place />
                <div>
                  <h2>{customOfficeByIdData?.gpsLong || "No information"}</h2>
                  <p>Longitude</p>
                </div>
              </div>
              <div className="view-modal-body-common d-flex align-items-center">
                <PhoneInTalk />
                <div>
                  <h2>{customOfficeByIdData?.phone || "No information"}</h2>
                  <p>phone</p>
                </div>
              </div>
              <div className="view-modal-body-common d-flex align-items-center">
                <WatchLater />
                <div>
                  <h2>{customOfficeByIdData?.workHour || "No information"}</h2>
                  <p>Work Hour</p>
                </div>
              </div>
            </label>
          </div>
        </RenderIf>
      </div>
    </Modal>
  );
};

export default View;
