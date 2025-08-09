// import { auth } from "../_lib/auth";

import Button from "../_components/Button";
import LinkButton from "../_components/LinkButton";
import { createClient } from "../_utils/supabase/server";

export default async function Page() {
  // const { user } = await auth();
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>Welcome {user?.email}</h1>
      <div>
        <Button href="/account/vote" className={"w-fit"} variation="gold">
          Start Activity Vote
        </Button>
      </div>
    </div>
  );
}
