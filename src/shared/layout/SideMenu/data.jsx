import {
  Apartment,
  Flag,
  LocalPostOfficeSharp,
  PublicOutlined,
  RoomServiceRounded,
} from "@mui/icons-material";
import {
  Home,
  Messages,
  Text,
  Bank,
  UserPeople,
  MapIcon,
} from "src/assets/svgs";

export const SIDE_URL = [
  {
    id: 1,
    inner: "Continents",
    icon: <PublicOutlined />,
    url: "/continents",
  },
  {
    id: 2,
    inner: "Countries",
    icon: <Flag />,
    url: "/countries",
  },
  {
    id: 3,
    inner: "Customs offices",
    icon: <Apartment />,
    url: "/customs-offices",
  },
  {
    id: 4,
    inner: "Roles",
    icon: <UserPeople />,
    url: "/roles",
  },

  {
    inner: "Profile",
    url: "/profile",
  },
];
