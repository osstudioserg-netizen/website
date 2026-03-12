"use client";

import CursorTrail from "./CursorTrail";

export default function CursorProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CursorTrail />
      {children}
    </>
  );
}