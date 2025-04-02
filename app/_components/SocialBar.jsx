import Image from "next/image";
import Link from "next/link";
import whatsappIcon from "@/public/images/whatsapp.png";
import phoneIcon from "@/public/images/phone.png";
import AuthNav from "@/app/_components/AuthNav";
export default function SocialBar() {
  return (
    <div className="flex items-center justify-end gap-8 px-8 py-2">
      <Link
        href={"https://wa.me/+92311123455"}
        className="flex items-center gap-1 bg-white px-6 py-1.5 text-sm font-semibold capitalize text-neutral-600 duration-300 hover:bg-gray-300"
      >
        <Image
          src={whatsappIcon}
          alt="whatsapp chat"
          width={100}
          height={100}
          className="w-8"
        />
        whatsapp <span className="text-green-500">chat to us</span>
      </Link>
      <Link href={"#"} className="flex items-center gap-2">
        <Image
          src={phoneIcon}
          width={100}
          height={100}
          alt="phone"
          className="w-6"
        />
        Contact
      </Link>
      <AuthNav />
    </div>
  );
}
