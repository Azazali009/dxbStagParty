import Image from "next/image";
import { getVotesLog } from "../../../_lib/apiVotingSession";
import VotesTable from "../../../_adminComponents/VotesTable";

// meta data
export const metadata = {
  title: "Dashboard - Voting - Logs",
  description:
    "Manage and monitor DXB Stag Party voting logs in your dashboard to let guests choose activities and customize their Dubai experience.",
};

export default async function Page() {
  const votes = await getVotesLog();

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-matalicGold sm:text-4xl">
        Votes Log
      </h1>
      <VotesTable votes={votes} />
    </div>
  );
}
