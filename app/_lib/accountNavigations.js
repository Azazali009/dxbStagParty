import HomeIcon from "../svgIcons/HomeIcon";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";
import UserIcon from "../svgIcons/UserIcon";
export const accountNavigations = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className={"size-3"} />,
  },
  {
    name: "Bookings",
    href: "/account/bookings",
    icon: <CalenderDaysIcon className={"size-3"} />,
  },
  {
    name: "profile",
    href: "/account/profile",
    icon: <UserIcon className={"size-3"} />,
  },
];
