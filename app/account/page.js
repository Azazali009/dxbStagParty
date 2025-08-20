import Button from "../_components/Button";
import StatsCard from "../_components/StatsCard";
import VotingList from "../_components/VotingList";
import { getVotingSessionsByOrganiserId } from "../_lib/apiVotingSession";
import { getBookingByUserId } from "../_lib/data-services";
import { getCurrentUser } from "../_lib/getCurrentUser";
import calenderCheck from "../svgIcons/calenderCheck.png";
import voteGold from "../svgIcons/vote-gold.png";

export const revalidate = 0;
export default async function Page() {
  const user = await getCurrentUser();
  const bookings = await getBookingByUserId(user.id);
  const votingSessions = await getVotingSessionsByOrganiserId(user.id);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-4xl font-semibold text-softGold">
        Welcome{" "}
        <span className="text-matalicGold">
          {" "}
          {user?.user_metadata?.full_name || user?.email}
        </span>
      </h1>
      <div className="grid grid-cols-2 gap-6">
        <StatsCard
          title={"Bookings"}
          count={bookings?.length || 0}
          bgColor={"#e0e7ff "}
          icon={calenderCheck}
        />
        <StatsCard
          title={"Votes sessions"}
          count={votingSessions?.length || 0}
          bgColor={"#262626 "}
          icon={voteGold}
        />
      </div>
    </div>
  );
}
