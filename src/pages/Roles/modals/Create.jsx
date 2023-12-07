import React, { useEffect } from "react";
import { Add } from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { Button, Input } from "src/shared/components";
import "./modal.scss";
import {
  useRoleCreateMutation,
  useUsersPermissionsQuery,
} from "src/redux/api/RolesApi";
import { roleCreateValidation, roleEditValidation } from "src/validation";
const Create = ({ setOpenCreateModal, openCreatedModal }) => {
  const handleClose = () => {
    setOpenCreateModal(false);
  };

  const [roleCreate, { isSuccess, isLoading }] = useRoleCreateMutation();
  const { data } = useUsersPermissionsQuery();

  const handleRoleCreate = (values) => {
    roleCreate({
      name: values?.name,
      description: values?.description,
      permissons: values?.permissons,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      handleClose();
      formik.resetForm();
    }
  }, [isSuccess]);
  const formik = useFormik({
    validationSchema: roleCreateValidation,
    initialValues: {
      name: "",
      description: "",
      permissons: [],
    },
    onSubmit: (values) => {
      handleRoleCreate(values);
    },
  });

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      formik.setFieldValue("permissons", [
        ...formik.values.permissons,
        { id: Number(name), scopeId: Number(name), value: "All" },
      ]);
    } else {
      formik.setFieldValue(
        "permissons",
        formik.values.permissons.filter((perm) => perm.id !== Number(name))
      );
    }
  };
  return (
    <Modal
      className="UserPermissionsModal"
      show={openCreatedModal}
      onHide={handleClose}
      centered
    >
      <Modal.Header style={{ border: "none" }}>
        <div className="Modal_Close_Icon" onClick={handleClose}>
          <Add />
        </div>
        <Modal.Title className="text-center w-100">Add to</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 p-3">
        <form onSubmit={formik.handleSubmit}>
          <div className="modal-create">
            <label htmlFor="">
              <span>Role Name</span>
              <Input
                errors={formik.errors.name && formik.touched.name}
                nameError={formik.errors.name}
                id="name"
                type="text"
                name="name"
                placeholder="Role Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-100"
              />
            </label>
            <label htmlFor="">
              <span>Description</span>
              <Input
                errors={formik.errors.description && formik.touched.description}
                nameError={formik.errors.description}
                id="description"
                type="text"
                name="description"
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="w-100"
              />
            </label>
            <div className="modal-create-per">
              <h2>Choose Permissions:</h2>
              {data?.map((per) => (
                <label
                  role="button"
                  className="d-flex align-items-center role-create-permissions"
                  htmlFor={per?.name}
                  key={per?.id}
                >
                  <Input
                    id={per?.name}
                    type="checkbox"
                    name={per?.id.toString()}
                    placeholder="Description"
                    onChange={handlePermissionChange}
                    className="w-100"
                  />
                  <h1>{per?.name}</h1>
                </label>
              ))}
            </div>
          </div>
          <div
            style={{
              color: "red",
              fontSize: "13px",
              fontWeight: "500",
              marginTop: "12px",
            }}
          >
            {formik.errors.permissons}
          </div>

          <div className="modal-button d-flex justify-content-center">
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
              disabled={isLoading}
              isLoading={isLoading}
              background="#14458D"
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Create;
