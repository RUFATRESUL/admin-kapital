import React, { useEffect } from "react";
import { Add } from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import FormLabel from "src/shared/components/FormLabel";
import Input from "src/shared/components/Input";
import { Button,  RenderIf } from "src/shared/components";


const Edit = ({ setIsViewModal, isViewModal, visiblity }) => {
  const handleClose = () => {
    setIsViewModal(visiblity?.CLOSE_ALL);
  };

  return (
    <>
      <Modal
        show={isViewModal === visiblity?.EDIT}
        onHide={handleClose}
        size="md"
        aria-labelledby="edit"
        centered
        className="modal pr-0"
      >
        <form>
          <Modal.Header>
            <Modal.Title>Baş ofisə düzəliş et</Modal.Title>
            <div className="Modal_Close_Icon" onClick={handleClose}>
              <Add />
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-0 m-0 mt-3">
              <div className="col-lg-12 col-md-12 col-12  mb-4 ">
                {/* <FormLabel text="İxtisas" isRequired="" /> */}
                <Input
                  id="profession"
                  name="profession"
                  placeholder="Audit komitəsi"
                  className=" w-100"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-end">
            <Button background="#ffffff" color="#44546F" type="submit"   onClick={handleClose}>
              <span>Ləğv et</span>
            </Button>
            <Button background="#B61D29" color="white" type="submit" >
              <span>Yadda saxla</span>
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Edit;
