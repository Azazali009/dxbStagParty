import NotFoundSvg from "@/public/images/404PageIcon.svg";
import Image from "next/image";
import LinkButton from "./_components/LinkButton";
export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-7xl items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 py-10">
        <Image
          src={NotFoundSvg}
          width={200}
          height={200}
          alt="Not Foudn page"
        />
        <h1 className="text-center text-xl font-medium sm:text-3xl">
          404 - Page Not Found <span className="text-white">🤔</span>
        </h1>
        <p className="text-center text-sm text-gray-600 sm:text-lg">
          Sorry, the page you are looking for does not exist.
        </p>
        <LinkButton href={"/"}>Go back home</LinkButton>
      </div>
    </main>
  );
}
