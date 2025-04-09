import Link from "next/link";
import HomeIcon from "../svgIcons/HomeIcon";
import UserIcon from "../svgIcons/UserIcon";
import WebsiteIcon from "../svgIcons/WebsiteIcon";
import ChartPieIcon from "../svgIcons/ChartPieIcon";

const SideBar = () => {
  return (
    <aside className="sticky flex min-h-screen flex-col bg-primary p-0 px-6 py-3 text-white">
      <h1 className="text-center text-xl font-bold">Admin panel</h1>
      <ul className="mt-20 flex flex-col gap-4">
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 font-medium capitalize transition-all duration-200 hover:bg-secondary hover:text-white`}
          href={"/dashboard"}
        >
          <HomeIcon />
          <span>home</span>
        </Link>
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 font-medium capitalize transition-all duration-200 hover:bg-secondary hover:text-white`}
          href={"/dashboard"}
        >
          <ChartPieIcon />
          <span> activities</span>
        </Link>
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 font-medium capitalize transition-all duration-200 hover:bg-secondary hover:text-white`}
          href={"/dashboard"}
        >
          <UserIcon />
          <span> users</span>
        </Link>
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 font-medium capitalize transition-all duration-200 hover:bg-secondary hover:text-white`}
          href={"/"}
        >
          <WebsiteIcon />
          <span>visite website</span>
        </Link>
      </ul>
    </aside>
  );
};

export default SideBar;
