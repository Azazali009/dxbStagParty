import VotingList from "../../_components/VotingList";
import { getCurrentUser } from "../../_lib/getCurrentUser";

export default async function Page() {
  const user = await getCurrentUser();
  return (
    <div>
      <VotingList user={user} />
    </div>
  );
}
