import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLazyUserByIdQuery } from "src/redux/api/authApi/authApi";
import { imgBaseUrl } from "src/redux/api/axiosBase";
import { Urls } from "src/shared/constants/url";
import { RenderIf, Spinner } from "src/shared/components";
import DropDown from "src/shared/components/DropDown"
import styles from "./Header.module.scss";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [userById, { data, isLoading }] = useLazyUserByIdQuery();
  const { pathname } = useLocation();

  useEffect(() => {
    userById({ userId: user?.id });
  }, [user]);

  return (
    <div className={styles.Header}>
      <div className={`${styles.HeaderRight} d-flex align-items-center`}>
        <DropDown />
      </div>
    </div>
  );
};

export default Header;
