"use client";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { cinzel } from "../layout";
import Image from "next/image";

export default function Page() {
  const { width, height } = useWindowSize();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Now we're definitely on the client
    setIsClient(true);
  }, []);

  const isValidSize =
    typeof width === "number" &&
    typeof height === "number" &&
    isFinite(width) &&
    isFinite(height);

  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden">
      {/* Render only on client to avoid hydration issues */}
      {isClient && isValidSize && (
        <div className="pointer-events-none fixed inset-0 z-10">
          <Confetti
            width={width}
            height={height}
            gravity={0.1} // default is 0.5 — lower means slower fall
            wind={0.002} // subtle side drift
            friction={0.98} // slightly less energy loss for smooth motion
            numberOfPieces={100} // adjust if needed
            tweenDuration={10000} // smoother entrance/exit
            drawShape={(ctx) => {
              ctx.beginPath();
              for (let i = 0; i < 22; i++) {
                const angle = 0.35 * i;
                const x = (0.2 + 1.5 * angle) * Math.cos(angle);
                const y = (0.2 + 1.5 * angle) * Math.sin(angle);
                ctx.lineTo(x, y);
              }
              ctx.stroke();
              ctx.closePath();
            }}
          />
        </div>
      )}

      <div className="flex flex-col items-center gap-2">
        <Image
          src={"/images/congratsIcon.webp"}
          height={200}
          width={200}
          alt="success"
          className="animate-bounce duration-1000"
        />
        <p
          className={`z-20 ${cinzel.className} text-center text-xl font-bold text-matalicGold sm:text-3xl`}
        >
          Your payment has been received
        </p>
      </div>
    </div>
  );
}
