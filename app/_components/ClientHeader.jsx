"use client";

import { usePathname } from "next/navigation";

export default function ClientHeader({ children }) {
  const pathname = usePathname();
  if (pathname !== "/dashboard") return <>{children}</>;
}
