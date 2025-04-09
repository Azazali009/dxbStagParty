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
          <Link href={"/account"}>
            <Image
              src={session?.user?.image}
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
        <Link href={"/account"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="size-6 fill-neutral-700 hover:opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
