import Spinner from "./_components/Spinner";

export default function loading() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center">
      {" "}
      <Spinner />{" "}
    </div>
  );
}
