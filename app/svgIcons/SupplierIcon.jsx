import Image from "next/image";
import supplier from "./supplier.png";

export default function SupplierIcon() {
  return <Image src={supplier} width={20} height={20} alt="supplier" />;
}
