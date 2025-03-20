import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
export const accountNavigations = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-indigo-600" />,
  },
  {
    name: "Bookings",
    href: "/account/bookings",
    icon: <CalendarDaysIcon className="h-5 w-5 text-indigo-600" />,
  },
  {
    name: "profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-indigo-600" />,
  },
];
