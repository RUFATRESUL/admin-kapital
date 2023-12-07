import React from "react";
import { useSelector } from "react-redux";

import { Input } from "src/shared/components";

import styles from "./Permissions.module.scss";

export const Permissions = () => {
  const user = useSelector((state) => state.user?.userById);
  const descriptions = Object.values(user?.permissions).map(
    (item) => item.description
  );
  return (
    <div className={styles.Permissions}>
      <div className={styles.Permissions_Header}>
        <h1>Permissions</h1>
      </div>
      <div className={styles.Permissions_Operation}>
        {descriptions?.map((item) => (
          <label htmlFor="" key={item}>
            <Input type="checkbox" checked />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
