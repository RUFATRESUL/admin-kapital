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
import { Typography, Image } from "antd";
import Logo from "src/shared/media/img/KB Logo.svg";


import { Layout, Menu, Button, theme } from 'antd';
import {
  BarChart, Table, Users, User, Success, Share, Briefcase, ClipboardCheck,
  Building, Edit, Folder

} from 'src/assets/svgs';
const { Header, Sider, Content } = Layout;


const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { pathname } = useLocation()

  console.log(pathname)

  const { SubMenu } = Menu


  const items = [
    {
      key: '1',
      icon: <BarChart />,
      label: 'Statistika',
      url: "/continents"
    },
    {
      key: '2',
      icon: <Table />,
      label: 'Vakansiya statistikalar',
      url: "/customs-offices"

    },
    {
      key: '3',
      icon: <Users />,
      label: 'Sistem istifadəçiləri',
      url: "/test3"

    },

    {
      key: '4',
      icon: <User />,
      label: 'Namizədlər',
      url: "/test4"

    },

    {
      key: '5',
      icon: <Success />,
      label: 'Uğur hekayələri',
      url: "/test5"

    },


    {
      key: 'sub6',
      icon: <Share />,
      label: 'Paylaşımlar',
      children: [
        {
          key: '1',
          label: 'Sorğular',
          url: "test4",
          isActive: pathname === "test4",
        },
        {
          key: '2',
          label: 'Sifarişlər',
          url: "test5",
          isActive: pathname === "test5",
        },
      ],
    },


    {
      key: 'sub7',
      icon: <Briefcase />,
      label: 'Vakansiyalar',
      children: [
        {
          key: '3',
          label: 'Sorğular',
          url: "/about",
          isActive: pathname === "/about",
        },
        {
          key: '4',
          label: 'Sifarişlər',
          url: 'Sifarişlər',
          isActive: pathname === 'Sifarişlər',
        },
      ],
    },


    {
      key: 'sub8',
      icon: <Folder />,
      label: 'Qovluqlar',
    },


    {
      key: 'sub9',
      icon: <Edit />,
      label: 'Redaktə',
      children: [
        {
          key: '5',
          label: 'Sorğular',
          // url: Urls.test14,
          // isActive: pathname === Urls.test14,
        },
        {
          key: '6',
          label: 'Sifarişlər',
          // url: Urls.test15,
          // isActive: pathname === Urls.test15,
        },
      ],
    },


    {
      key: 'sub10',
      icon: <Building />,
      label: 'Struktur',
      children: [
        {
          key: '7',
          label: 'Baş ofis',
          // url: Urls.test16,
          // isActive: pathname === Urls.test16,
        },
        {
          key: '8',
          label: 'Filiallar',
          // url: Urls.test17,
          // isActive: pathname === Urls.test17,
        },
        {
          key: '8',
          label: 'Bölmələr',
          // url: Urls.test17,
          // isActive: pathname === Urls.test17,
        },
        {
          key: '8',
          label: 'Şöbələr',
          // url: Urls.test17,
          // isActive: pathname === Urls.test17,
        },
        {
          key: '8',
          label: 'Vəzifələr',
          // url: Urls.test17,
          // isActive: pathname === Urls.test17,
        },
      ],
    },

    {
      key: 'sub11',
      icon: <ClipboardCheck />,
      label: 'Gerchikov',
      children: [
        {
          key: '9',
          label: 'Sorğular',
          // url: Urls.test18,
          // isActive: pathname === Urls.test18,
        },
        {
          key: '10',
          label: 'Sifarişlər',
          // url: Urls.test19,
          // isActive: pathname === Urls.test19,
        },
      ],
    },



  ]




  return (


    <Layout>
      <Sider width={300} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        {/* <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
   
        /> */}

        <Typography className="demo-logo-vertical ">
          <Image src={Logo} preview={false} height={50} width={collapsed ? 50 : 100} />
        </Typography>

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
      </Layout>
    </Layout>
  );
};
export default SideMenu;