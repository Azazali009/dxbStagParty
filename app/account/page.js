// import { auth } from "../_lib/auth";

import { createClient } from "../_utils/supabase/server";

export default async function Page() {
  // const { user } = await auth();
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-4">
      <h1>Welcome {user?.email}</h1>
    </div>
  );
}
