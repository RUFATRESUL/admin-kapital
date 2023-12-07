import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

import SideLogo from "shared/media/img/SideLogo.png";
import { RenderIf } from "src/shared/components";
import { SIDE_URL } from "./data";

import Crocusoft from "src/assets/imgs/Crocusoft.png";
import styles from "./SideMenu.module.scss";
import { useDispatch } from "react-redux";
import { logout } from "src/redux/features/User/userSlice";
import { ExposureTwoTone, Logout } from "@mui/icons-material";

const SideMenu = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div style={{ width: "346px" }}>
      <div className={`${styles.SideMenu} `}>
        <div>
          <div className={styles.SideMenuLogo}>
            <img src={SideLogo} alt="LOGO" />
            <h1>
              Trans-Caspian International East-West Middle Corridor (Admin
              Panel){" "}
            </h1>
          </div>
          <ul className={styles.SideMenuPage}>
            {SIDE_URL?.map((item) => (
              <RenderIf condition={item?.id}>
                <li key={item?.id}>
                  <NavLink to={item.url}>
                    <span>{item?.icon} </span>
                    {item?.inner}
                  </NavLink>
                </li>
              </RenderIf>
            ))}
          </ul>
        </div>
        <div className="crocusoft-link">
          <div
            role="button"
            onClick={logoutHandler}
            className="crocusoft-logout"
          >
            <span>
              <Logout />
            </span>
            <button>Logout</button>
          </div>
          <div className="d-flex justify-content-center">
            {" "}
            <h1>Designed & Developed by</h1>
            <a target="_blanc" href="https://crocusoft.com/">
              <img src={Crocusoft} alt="Photo" />
              <span>Crocusoft</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
<FontAwesomeIcon icon="fa-regular fa-calendar-check" />;

export default SideMenu;
