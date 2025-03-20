import Link from "next/link";
import { navbar } from "./navbarData";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex items-center gap-6">
        {navbar.map((cur) => (
          <li key={cur.id}>
            <Link href={cur.href}>{cur.navItem}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
