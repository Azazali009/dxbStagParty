import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-10 px-4 py-14">
      <h1 className="bg-gradient-to-b from-neutral-500 to-neutral-700 bg-clip-text text-3xl font-semibold text-transparent">
        Login to access your area
      </h1>
      <SignInButton />
    </div>
  );
}
