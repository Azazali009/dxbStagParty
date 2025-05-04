"use client";
import Link from "next/link";
import PencilIcon from "../svgIcons/PencilIcon";
import TrashIcon from "../svgIcons/TrashIcon";
import Image from "next/image";
import { useTransition } from "react";
import { deletePackage } from "../_lib/packagesAction";
import SpinnerMini from "../_components/SpinnerMini";
import toast from "react-hot-toast";

export default function PackageRow({ Package }) {
  const [isPending, startTransition] = useTransition();
  function handleClick() {
    startTransition(() => {
      if (confirm("Are you sure you want to delete this package?"))
        startTransition(async () => {
          const res = await deletePackage(Package.id, Package.image);
          if (res?.error) return toast.error(res?.error);
        });
    });
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-center justify-center justify-items-center border border-gray-800 bg-navyBlue px-4 py-3 text-sm font-light last:rounded-b-md">
      <Image
        className="rounded-md"
        src={Package.image || "/default-activity-image.jpg"}
        alt={Package.name}
        width={60}
        height={60}
      />
      <p>#{Package.id}</p>
      <p>{Package.name} </p>
      <p>{Package.price_band}</p>
      <p>{Package.group_size}</p>
      <div className="flex items-center gap-2">
        <button
          disabled={isPending}
          onClick={handleClick}
          className="fill-red-600 hover:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? <SpinnerMini /> : <TrashIcon />}
        </button>
        <Link href={`#`} className="fill-blue-500 hover:opacity-80">
          <PencilIcon />
        </Link>
      </div>
    </div>
  );
}
