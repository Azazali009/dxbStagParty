// meta data
export const metadata = {
  title: "DXB Stag Party - Career",
  description:
    "Join the DXB Stag Party team and build unforgettable experiences in Dubai’s event industry.",
};

import ViewRoles from "../_components/ViewRoles";
export default function Page() {
  return (
    <div className="max-w-4xl space-y-6 p-8">
      <h1 className="text-2xl font-semibold text-matalicGold sm:text-4xl">
        Work Hard. Party Smart.
      </h1>
      <p className="leading-[1.7]">
        Want to help plan the wildest weekends in Dubai? From concierge roles to
        creative marketing and operations, we’re building a team of pros who
        love unforgettable experiences as much as we do.
      </p>
      <ViewRoles />
    </div>
  );
}
