"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function toMs(endTime) {
  // number → ms already
  if (typeof endTime === "number") return endTime;
  // Date object
  if (endTime instanceof Date) return endTime.getTime();

  const s = String(endTime || "").trim();

  // if contains timezone (Z or +hh:mm), trust it
  if (/[zZ]|[+-]\d{2}:\d{2}$/.test(s)) {
    const t = Date.parse(s);
    if (Number.isFinite(t)) return t;
  }

  // try normal parse
  const direct = Date.parse(s);
  if (Number.isFinite(direct)) return direct;

  // fallback: space → T, then treat as UTC by adding Z
  const normalized = (s.includes("T") ? s : s.replace(" ", "T")) + "Z";
  const t2 = Date.parse(normalized);
  return Number.isFinite(t2) ? t2 : NaN;
}

function format(ms) {
  if (!Number.isFinite(ms) || ms <= 0) return { h: 0, m: 0, done: true };
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  return { h, m, done: false };
}

export default function Countdown({
  endTime,
  className,
  onElapsed,
  isClosed,
  intervalMs = 1000,
}) {
  const target = useMemo(() => toMs(endTime), [endTime]);
  const [now, setNow] = useState(() => Date.now());
  const firedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  const remaining = Math.max(0, target - now);
  const { h, m, done } = format(remaining);

  useEffect(() => {
    if (done && !firedRef.current) {
      firedRef.current = true;
      onElapsed && onElapsed();
    }
  }, [done, onElapsed]);

  // if parsing totally failed, show placeholder
  if (!Number.isFinite(target)) {
    return (
      <span className={className}>
        <b>—</b>
      </span>
    );
  }
  if (isClosed)
    return (
      <span className={className}>
        <b>0h 0m</b>
      </span>
    );

  return (
    <span className={className}>
      <b className="text-matalicGold">
        {h}h {m}m
      </b>
    </span>
  );
}
