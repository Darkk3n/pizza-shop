"use client";

import { useSyncExternalStore } from "react";
import { formatElapsed } from "@/lib/helpers/format";

const MINUTE = 60_000;

// A minute-granular clock: the snapshot only changes once a minute, so React re-renders that often.
const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
};
const getMinute = () => Math.floor(Date.now() / MINUTE);
// Nothing on the server: its clock and the browser's differ, and the age would be stale anyway.
const getServerMinute = () => null;

// How long ago an order was placed ("12 min"), kept current while the dashboard stays open.
export const ElapsedTime = ({ since }: { since: string }) => {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  if (minute === null) return null;

  const minutes = Math.max(0, minute - Math.floor(Date.parse(since) / MINUTE));
  return (
    <time dateTime={since} className="tabular-nums">
      {formatElapsed(minutes)}
    </time>
  );
};
