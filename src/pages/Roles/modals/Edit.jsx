import React, { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import {
  useRoleEditMutation,
  useUsersPermissionsQuery,
} from "src/redux/api/RolesApi";
import { Button, Input } from "src/shared/components";
import Checkbox from "src/shared/components/Checkbox";
import { roleEditValidation } from "src/validation";

const Edit = ({ setOpenEditModal, roleIdData, openEditModal }) => {
  const [roleEdit, { isSuccess, isLoading }] = useRoleEditMutation();
  const { data } = useUsersPermissionsQuery();
  const [selectedValues, setSelectedValues] = React.useState([]);
  const handleRoleEdit = (values) => {
    roleEdit({
      id: roleIdData?.id,
      name: values?.name,
      description: values?.description,
      permissons: values?.permission,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);

  const handleClose = () => {
    setOpenEditModal(false);
  };

  useEffect(() => {
    formik.resetForm({
      values: { name: roleIdData?.name, description: roleIdData?.description },
    });
  }, [roleIdData]);

  const formik = useFormik({
    validationSchema: roleEditValidation,
    initialValues: {
      name: "",
      permission: [],
      description: "",
    },
    onSubmit: (values) => {
      handleRoleEdit(values);
    },
  });

  const isPermissionChecked = (permissionId) => {
    return (
      roleIdData?.permissions
        ?.map((item) => item?.permissionId)
        ?.includes(permissionId) &&
      data?.map((item) => item?.id)?.includes(permissionId)
    );
  };

  const handleCheckboxChange = (permissionId) => {
    const obj = {
      id: permissionId,
      scopeId: permissionId,
      value: "All",
    };

    if (!selectedValues.some((item) => item.id === permissionId)) {
      setSelectedValues([...selectedValues, obj]);
    } else {
      setSelectedValues(
        selectedValues.filter((item) => item.id !== permissionId)
      );
    }
  };

  useEffect(() => {
    formik.setFieldValue("permission", selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    if (roleIdData && roleIdData.permissions) {
      const selectedPermissions = roleIdData.permissions.map((item) => ({
        id: item.permissionId,
        scopeId: item.scopeId,
        value: "All",
      }));
      setSelectedValues(selectedPermissions);
    }
  }, [roleIdData]);
  return (
    <Modal
      className="all-delete-modal"
      show={openEditModal}
      onHide={handleClose}
      centered
    >
      <Modal.Header style={{ border: "none" }}>
        <div className="Modal_Close_Icon" onClick={handleClose}>
          <Add />
        </div>
        <Modal.Title className="text-center w-100">Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body className=" p-3">
        <form onSubmit={formik.handleSubmit}>
          <div className="modal-edit">
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
                  <Checkbox
                    id={per?.name}
                    checked={isPermissionChecked(per?.id)}
                    type="checkbox"
                    name={per?.id}
                    placeholder="Description"
                    className="w-100"
                    formik={formik}
                    onChange={(e) => handleCheckboxChange(per?.id)}
                  />
                  <h1>{per?.name}</h1>
                </label>
              ))}
              <div style={{ color: "red", fontSize: "13px" }}>
                {formik?.errors?.permission}
              </div>
            </div>
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
              children="Save"
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

export default Edit;
