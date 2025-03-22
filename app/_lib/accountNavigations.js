import HomeIcon from "../svgIcons/HomeIcon";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";
import UserIcon from "../svgIcons/UserIcon";
export const accountNavigations = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon />,
  },
  {
    name: "Bookings",
    href: "/account/bookings",
    icon: <CalenderDaysIcon />,
  },
  {
    name: "profile",
    href: "/account/profile",
    icon: <UserIcon />,
  },
];
