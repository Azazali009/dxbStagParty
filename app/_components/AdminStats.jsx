import React from "react";
import StatsCard from "./StatsCard";
import { getActivities, getBookings } from "../_lib/data-services";
import { getPackages } from "../_lib/packagesApi";
import { getSupplierUsers } from "../_lib/apiSupplier";
import calenderCheck from "../svgIcons/calenderCheck.png";
import truckIcon from "../svgIcons/truck.png";
import boxIcon from "../svgIcons/box.png";
import calenderIcon from "../svgIcons/calender.png";

export default async function AdminStats() {
  const totalActivities = (await getActivities()).length;
  const totalPackages = (await getPackages()).length;
  const totalBookings = (await getBookings()).length;
  const totalSuppliers = (await getSupplierUsers()).length;

  return (
    <div className="grid grid-cols-4 gap-6">
      <StatsCard
        title={"Activities"}
        count={totalActivities}
        icon={calenderCheck}
        bgColor="#c7d2fe"
      />
      <StatsCard
        title={"Suppliers"}
        count={totalSuppliers}
        icon={truckIcon}
        bgColor="#a7f3d0"
      />
      <StatsCard
        title={"packages"}
        count={totalPackages}
        icon={boxIcon}
        bgColor="#bae6fd "
      />
      <StatsCard
        title={"Bookings"}
        count={totalBookings}
        icon={calenderIcon}
        bgColor="#fef08a "
      />
    </div>
  );
}
