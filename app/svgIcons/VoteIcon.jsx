import Image from "next/image";
import React from "react";
import { cn } from "../_lib/utils";

export default function VoteIcon({ className }) {
  return (
    <Image
      src={"/voteIcon.png"}
      width={200}
      height={200}
      alt="vote"
      className={cn("size-5 object-contain", className)}
    />
  );
}
