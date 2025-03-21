"use client";
import { ThreeDMarquee } from "../_components/ui/3d-marquee";
import Button from "../_components/Button";
export default function DestinationHero() {
  const images = [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHViYWl8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1459787915554-b34915863013?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1634148551170-d37d021e0cc9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1533395427226-788cee25cc7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1506645728556-ac574e628eca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1553337546-017c3075360c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1612873649383-edf91f1cf7fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1603783032802-460a687c4eef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1511091734515-e50d46c37240?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1577544728904-c1ae02851346?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGR1YmFpfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1661962790754-9a1a5b5e334a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1459788025731-a85eb8dd27cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1598607014267-279d7d1e575d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTJ8fGR1YmFpfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1598118822969-421ad3ef6c89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxkdWJhaXxlbnwwfHwwfHx8MA%3D%3D",
  ];
  return (
    <div className="relative mx-auto flex min-h-screen flex-col items-center justify-center overflow-hidden rounded-3xl">
      <h2 className="relative z-20 mx-auto max-w-4xl text-balance text-center text-2xl font-bold text-white md:text-4xl lg:text-6xl">
        This is your life and it&apos;s ending one{" "}
        <span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-4 py-1 text-white underline decoration-secondary decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
          moment
        </span>{" "}
        at a time.
      </h2>
      <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
        You are not your job, you&apos;re not how much money you have in the
        bank. You are not the car you drive. You&apos;re not the contents of
        your wallet.
      </p>

      <div className="relative z-20 flex min-w-[500px] items-center justify-center gap-4 pt-4">
        <Button className="flex-1" variation="gold">
          Join us
        </Button>
        <button className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black">
          Book Now
        </button>
      </div>

      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
