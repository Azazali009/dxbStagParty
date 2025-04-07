import Image from "next/image";
import { auth } from "../_lib/auth";

export default async function UserData() {
  const session = await auth();
  return (
    <li className="mt-auto flex items-center gap-2">
      <Image
        src={session ? session?.user?.image : "/images/defaultUser.png"}
        width={50}
        height={50}
        alt="user name"
        className="aspect-square w-12 rounded-full"
      />
      <p>{session ? session?.user?.name : "Guest area"}</p>
    </li>
  );
}
