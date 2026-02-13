import clsx from "clsx";
import { Minus, Plus } from "lucide-react";

export default function ScaleControl({
  scale,
  setScale,
}: {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
}) {
  function increment() {
    if (scale >= 120) return;
    setScale(scale + 10);
  }
  function decrement() {
    if (scale <= 80) return;
    setScale(scale - 10);
  }

  return (
    <div className="absolute top-18 right-4 z-50 flex items-center gap-4 rounded-xl border border-zinc-300 bg-white p-2 shadow-xl">
      <button
        className={clsx(
          "w-fit rounded-xl p-2 text-zinc-900",
          "hover:cursor-pointer hover:bg-zinc-100",
        )}
        onClick={() => decrement()}
      >
        <Minus />
      </button>
      <span className="font-bold text-zinc-900">{scale}%</span>
      <button
        className={clsx(
          "w-fit rounded-xl p-2 text-zinc-900",
          "hover:cursor-pointer hover:bg-zinc-100",
        )}
        onClick={() => increment()}
      >
        <Plus />
      </button>
    </div>
  );
}
