import React, { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Modal } from "react-bootstrap";

import { useCustomsOfficesDeleteMutation } from "src/redux/api/CustomsOfficesApi";
import { Button, RenderIf } from "src/shared/components";

const Remove = ({ visiblity, setIsViewModal, isViewModal }) => {
  const handleClose = () => {
    setIsViewModal(visiblity?.CLOSE_ALL);
  };
  return (
    <Modal
      show={isViewModal === visiblity?.DELETE}
      onHide={handleClose}
      size="md"
      aria-labelledby="edit"
      centered
      className="modal pr-0"
    >
      <Modal.Body>
        <div className="delete-modal-body">
        <h4>İstifadəçini silmək istədiyinizdən əminsiniz?</h4>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button background="#ffffff" color="#44546F"   onClick={handleClose}>
          <span>Ləğv et</span>
        </Button>
        <Button background="#B61D29" color="white">
          <span>Sil</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
