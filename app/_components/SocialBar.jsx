import AuthNav from "@/app/_components/AuthNav";
import Image from "next/image";
import Link from "next/link";
import instaIcon from "@/public/images/insta.png";
import fbIcon from "@/public/images/fb.png";
export default function SocialBar() {
  return (
    <div className="flex items-center justify-end gap-4 px-8 py-2">
      <Link href={"/"}>
        <Image
          src={instaIcon}
          width={100}
          height={100}
          alt="instagram"
          className="w-8 hover:opacity-70"
        />
      </Link>
      <Link href={"/"}>
        <Image
          src={fbIcon}
          width={100}
          height={100}
          alt="facebook"
          className="w-6 hover:opacity-70"
        />
      </Link>
      <AuthNav />
    </div>
  );
}
