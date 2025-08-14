import Link from "next/link";
import React from "react";

export default function EndVoteSession() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="relative grid min-h-dvh place-items-center overflow-hidden bg-gradient-to-b from-primary to-navyBlue px-4"
    >
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-red-400/20 blur-3xl dark:bg-red-500/15" />
      <div className="pointer-events-none absolute -bottom-28 right-12 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-500/10" />

      <div className="relative w-full max-w-xl">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/70 shadow-2xl backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/60">
          {/* top accent line */}
          <div className="absolute inset-x-0 -top-px h-px animate-wave bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              {/* Icon (ballot with X) */}
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-inset ring-red-200/50 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* ballot */}
                  <path d="M8 9h8M8 13h5" />
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
                  {/* X mark */}
                  <path d="M15.8 9.2l4 4m0-4l-4 4" />
                </svg>
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
                    Voting has ended
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                    Closed
                  </span>
                </div>

                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  This poll is no longer accepting votes. Thank you for
                  participating.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-matalicGold bg-transparent px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition will-change-transform hover:scale-95 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-matalicGold focus-visible:ring-offset-2 active:translate-y-0.5"
                  >
                    {/* ArrowLeft */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 19l-7-7 7-7" />
                      <path d="M19 12H5" />
                    </svg>
                    Go back
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* footer meta (optional) */}
          <div className="border-t border-zinc-200/60 px-6 py-4 text-xs text-zinc-500 dark:border-zinc-800/60 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              {/* clock icon */}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>Poll closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
