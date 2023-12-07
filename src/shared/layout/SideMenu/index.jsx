// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { NavLink } from "react-router-dom";

// import SideLogo from "shared/media/img/SideLogo.png";
// import { RenderIf } from "src/shared/components";
// import { SIDE_URL } from "./data";

// import Crocusoft from "src/assets/imgs/Crocusoft.png";
// import styles from "./SideMenu.module.scss";
// import { useDispatch } from "react-redux";
// import { logout } from "src/redux/features/User/userSlice";
// import { ExposureTwoTone, Logout } from "@mui/icons-material";

// const SideMenu = () => {
//   const dispatch = useDispatch();

//   const logoutHandler = () => {
//     dispatch(logout());
//   };

//   return (
//     <div style={{ width: "346px" }}>
//       <div className={`${styles.SideMenu} `}>
//         <div>
//           <div className={styles.SideMenuLogo}>
//             <img src={SideLogo} alt="LOGO" />
//             <h1>
//               Trans-Caspian International East-West Middle Corridor (Admin
//               Panel){" "}
//             </h1>
//           </div>
//           <ul className={styles.SideMenuPage}>
//             {SIDE_URL?.map((item) => (
//               <RenderIf condition={item?.id}>
//                 <li key={item?.id}>
//                   <NavLink to={item.url}>
//                     <span>{item?.icon} </span>
//                     {item?.inner}
//                   </NavLink>
//                 </li>
//               </RenderIf>
//             ))}
//           </ul>
//         </div>
//         <div className="crocusoft-link">
//           <div
//             role="button"
//             onClick={logoutHandler}
//             className="crocusoft-logout"
//           >
//             <span>
//               <Logout />
//             </span>
//             <button>Logout</button>
//           </div>
//           <div className="d-flex justify-content-center">
//             {" "}
//             <h1>Designed & Developed by</h1>
//             <a target="_blanc" href="https://crocusoft.com/">
//               <img src={Crocusoft} alt="Photo" />
//               <span>Crocusoft</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// <FontAwesomeIcon icon="fa-regular fa-calendar-check" />;

// export default SideMenu;



import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";
import { Typography } from "antd";


import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;


const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'nav 1',
      url: "/continents"
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'nav 2',
      url: "/customs-offices"

    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'nav 3',
      url: "/test4"

    },
  ]

  const { pathname } = useLocation()

  console.log(pathname)
  return (
    <Layout>
      {/* <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
   
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout> */}


      <Sider className='kt-aside' width={300} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {/* <Typography className="demo-logo-vertical mb-3">
          <Image src={Logo} preview={false} height={50} width={collapsed ? 50 : 100} />
        </Typography> */}
        <Menu theme="dark" mode="inline" selectedKeys={[pathname]}>
          {items.map(item => (
            <>
              {
                !item?.children?.length
                  ?
                  <Menu.Item className={collapsed ? "menu-item-icon" : "alal"} key={item.url}>

                    <Link to={item.url}>
                      {item.icon}
                      {item.label}</Link>


                  </Menu.Item> :

                  <SubMenu
                    key={item.key}
                    title={item.label}
                    icon={item.icon}
                  >
                    {item.children?.map(childItem => (
                      <Menu.Item key={childItem.url}>
                        <Link to={childItem.url}>{childItem.label}</Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
              }
            </>
          ))}
        </Menu>
      </Sider>
    </Layout>
  );
};
export default SideMenu;