import React, { useEffect } from "react";
import { Add } from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import { useCountriesDeleteMutation } from "src/redux/api/CountriesApi";
import { Button } from "src/shared/components";
import { useRoleDeleteMutation } from "src/redux/api/RolesApi";

const Remove = ({ setOpenDeleteModal, openDeleteModal, isdeleteId }) => {
  const [roleDelete, { data, isLoading, isSuccess }] = useRoleDeleteMutation();

  const handleRoleDelete = () => {
    roleDelete({ id: isdeleteId });
  };
  useEffect(() => {
    if (isSuccess) handleClose();
  }, [isSuccess]);

  const handleClose = () => {
    setOpenDeleteModal(false);
  };
  return (
    <Modal
      className="all-delete-modal"
      show={openDeleteModal}
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
          onClick={handleRoleDelete}
          disabled={isLoading}
          isLoading={isLoading}
          background="#14458D"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
