import React, { createContext, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useLazyUserByIdQuery } from "src/redux/api/authApi/authApi";
import InnerCountry from "src/shared/components/InnerCountry";
import { imgBaseUrl } from "src/redux/api/axiosBase";
import { RenderIf } from "src/shared/components";
import { Urls } from "src/shared/constants/url";
import { SearchMd } from "src/assets/svgs";
import { profileSettings } from "./data";

import styles from "./Profile.module.scss";

export const ProfileContext = createContext();
export const Profile = () => {
  const { pathname } = useLocation();
  const { id } = useSelector((state) => state?.user?.user);
  const [userById, { data }] = useLazyUserByIdQuery();

  useEffect(() => {
    userById({ userId: id });
  }, []);
  const [isImgUpdate, setIsImgUpdate] = React.useState(false);
  const [profilImg, setProfilIImg] = React.useState(null);
  const [fileReader, setFileReader] = React.useState(null);
  const inputRef = useRef(null);

  const handleDivClick = () => {
    inputRef.current.click();
  };

  const handleInputChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFileReader(reader.result);
    };
    reader.readAsDataURL(file);
    setProfilIImg(file);
  };

  useEffect(() => {
    if (pathname !== Urls?.PROFILE_INFO) {
      setIsImgUpdate(false);
    }
  }, [pathname]);
  return (
    <ProfileContext.Provider value={{ isImgUpdate, setIsImgUpdate, profilImg }}>
      <div className={styles.Profile}>
        <div className={`${styles.Profile_Section}`}>
          <div className={styles.Profile_Section_IMG}>
            <div>
              <img
                src={fileReader || imgBaseUrl + "uploads/" + data?.photoUrl}
                alt="Photo"
              />
            </div>
            <RenderIf condition={isImgUpdate}>
              <div
                role="button"
                className={styles.Profile_Section_IMG_Edit}
                onClick={handleDivClick}
              >
                <SearchMd />
              </div>
              <div className="ProfileImgDiv d-none">
                <input
                  ref={inputRef}
                  className="ProfileImgInput"
                  placeholder="File Path"
                  accept="image/*"
                  type="file"
                  name="photoUrl"
                  onChange={handleInputChange}
                />
              </div>
            </RenderIf>
          </div>
          <div>
            {profileSettings?.map((item) => (
              <InnerCountry
                key={item?.id}
                to={`${Urls?.PROFILE}${item?.url}`}
                name={item?.title}
              />
            ))}
          </div>
        </div>
        <div className={styles.Profile_Outlet}>
          <Outlet />
        </div>
      </div>
    </ProfileContext.Provider>
  );
};
