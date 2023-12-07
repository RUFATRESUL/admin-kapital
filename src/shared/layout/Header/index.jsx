import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useLazyUserByIdQuery } from "src/redux/api/authApi/authApi";
import { SIDE_URL } from "shared/layout/SideMenu/data";
import { imgBaseUrl } from "src/redux/api/axiosBase";
import { NotificationBing } from "src/assets/svgs";
import { Urls } from "src/shared/constants/url";

import styles from "./Header.module.scss";
import { RenderIf, Spinner } from "src/shared/components";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [userById, { data, isLoading }] = useLazyUserByIdQuery();
  const { pathname } = useLocation();
  const urls = SIDE_URL?.filter(
    (item) => item?.url === `/${pathname.split("/")[1]}`
  );
  useEffect(() => {
    userById({ userId: user?.id });
  }, [user]);

  return (
    <div className={styles.Header}>
      <div className={styles.HeaderLeft}>{urls[0]?.inner}</div>

      <div className={`${styles.HeaderRight} d-flex align-items-center`}>
        <Link to={`${Urls?.PROFILE}${Urls.PROFILE_INFO}`}>
          <div className={styles.HeaderRightProfil}>
            <RenderIf condition={!isLoading}>
              <img
                role="button"
                src={imgBaseUrl + "uploads/" + data?.photoUrl}
                alt="photos"
              />
            </RenderIf>
            <RenderIf condition={isLoading}>
              <Spinner color={"red"} />
            </RenderIf>
            <div className={styles.HeaderRightProfilName}>
              <h1> {data?.name + " " + data?.surname}</h1>
              <p>{data?.countryName}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
