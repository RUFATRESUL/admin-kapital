import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, RenderIf } from "src/shared/components";

const DeleteProfile = ({ visiblity, setIsViewModal, isViewModal }) => {
  const handleClose = () => {
    setIsViewModal(visiblity?.CLOSE_ALL);
  };
  return (
    <Modal
      show={isViewModal === visiblity?.DELETE_PROFILE}
      onHide={handleClose}
      size="md"
      aria-labelledby="edit"
      centered
      className="modal pr-0"
    >
      <Modal.Body>
        <div className="delete-modal-body">
          <h4>Qovluğu silmək istədiyinizdən əminsiniz?</h4>
          <p>Sildiyiniz təqdirdə bütün qeyd edilən profillər silinəcək.</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button background="#ffffff" color="#44546F" 
        onClick={handleClose}
        >
          <span>Ləğv et</span>
        </Button>
        <Button background="#B61D29" color="white">
          <span>Sil</span>
        </Button>
      </Modal.Footer>

    </Modal>
  );
};

export default DeleteProfile;
