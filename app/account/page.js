import { auth } from "../_lib/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="space-y-4">
      <h1>Welcome, {session?.user?.name}</h1>
    </div>
  );
}
