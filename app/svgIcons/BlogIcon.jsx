import Image from "next/image";
import blog from "./blog.png";

export default function BlogIcon() {
  return <Image src={blog} width={20} height={20} alt="supplier" />;
}
