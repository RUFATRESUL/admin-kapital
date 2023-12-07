import React, { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Modal } from "react-bootstrap";

import { useCustomsOfficesDeleteMutation } from "src/redux/api/CustomsOfficesApi";
import { Button, RenderIf } from "src/shared/components";

const Remove = ({ isdeleteId, visiblity, setIsViewModal, isViewModal }) => {
  const [customsOfficesDelete, { data, isLoading, isSuccess, error }] =
    useCustomsOfficesDeleteMutation();
  const handleOfficesDelete = () => {
    customsOfficesDelete({ id: isdeleteId });
  };
  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);

  const handleClose = () => {
    setIsViewModal(visiblity?.CLOSE_ALL);
  };
  return (
    <Modal
      className="all-delete-modal"
      show={isViewModal === visiblity?.DELETE}
      onHide={handleClose}
      centered
    >
      <Modal.Header style={{ border: "none" }}>
        <div className="Modal_Close_Icon" onClick={handleClose}>
          <Add />
        </div>
        <Modal.Title className="text-center w-100">Remove</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete ?</Modal.Body>
      <RenderIf condition={!isLoading && error?.status == 403}>
        <p className="text-danger text-center"> I have don't permissions</p>
      </RenderIf>
      <Modal.Footer>
        <Button
          type="button"
          color="#14458D"
          children="Close"
          onClick={handleClose}
          background="#ffffff"
          border="#14458D"
        />
        <Button
          type="submit"
          color="#ffffff"
          children="Add"
          onClick={handleOfficesDelete}
          disabled={isLoading}
          isLoading={isLoading}
          background="#14458D"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
