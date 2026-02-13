import clsx from "clsx";
import React from "react";

export default function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={clsx("text-[48px] font-bold text-zinc-900", className)}>
      {children}
    </h2>
  );
}
