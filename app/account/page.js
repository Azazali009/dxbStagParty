import Button from "../_components/Button";
import VotingList from "../_components/VotingList";
import { getCurrentUser } from "../_lib/getCurrentUser";

export const revalidate = 0;
export default async function Page() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-4xl font-semibold text-softGold">
        Welcome{" "}
        <span className="text-matalicGold">
          {" "}
          {user?.user_metadata?.full_name || user?.email}
        </span>
      </h1>
      <VotingList user={user} />
      <div>
        <Button
          href="/account/create-vote"
          className={"w-fit"}
          variation="gold"
        >
          Start Activity Vote
        </Button>
      </div>
    </div>
  );
}
