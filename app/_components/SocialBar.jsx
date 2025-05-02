import AuthNav from "../_components/AuthNav";
export default function SocialBar() {
  return (
    <div className="flex items-center justify-end gap-4 px-8">
      {/* <Link href={"/"}>
        <Image
          src={instaIcon}
          width={100}
          height={100}
          alt="facebook"
          className="w-6 hover:opacity-70"
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
      </Link> */}
      <AuthNav />
    </div>
  );
}
