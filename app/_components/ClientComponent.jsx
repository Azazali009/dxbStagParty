"use client";

import { usePathname } from "next/navigation";

export default function ClientComponent({ children }) {
  const pathname = usePathname();
  if (!pathname.startsWith("/dashboard")) return <>{children}</>;
}
