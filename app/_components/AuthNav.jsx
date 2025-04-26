import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";
import SignOutButton from "./SignOutButton";

export default async function AuthNav() {
  const session = await auth();
  return (
    <div>
      {session ? (
        <div className="flex items-center gap-4">
          <Link href={"/account"} title="Account">
            <Image
              src={session?.user?.image || "/def-user.png"}
              width={100}
              height={100}
              alt={session?.user?.name}
              className="size-8 rounded-full"
              referrerPolicy="no-referrer"
            />
          </Link>
          <SignOutButton />
        </div>
      ) : (
        <Link
          className="inline-block rounded-sm border-2 border-matalicGold bg-matalicGold px-6 py-1.5 font-semibold capitalize text-navyBlue duration-300 hover:bg-transparent hover:text-white"
          href={"/account"}
        >
          Login
        </Link>
      )}
    </div>
  );
}
