import clsx from "clsx";

export default function Divider({ className }: { className?: string }) {
  return (
    <div
      className={clsx("h-[1px] w-full bg-zinc-300", className && className)}
    />
  );
}
