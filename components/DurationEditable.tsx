import clsx from "clsx";
import { useState } from "react";
import { formatDuration, parseDuration } from "@/utils/duration";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

export default function DurationEditable({
  id,
  label,
  placeholder,
  value,
  defaultValue,
  className,
  style,
  onBlur,
  onChange,
}: {
  id: string;
  label?: string;
  placeholder: string;
  value: string;
  defaultValue?: string;
  className?: string;
  style?: any;
  onBlur?: (e: any) => void;
  onChange?: (e: any) => void;
}) {
  const inputStyle = clsx(
    "peer field-sizing-content w-fit rounded-sm border-2 border-white/0 outline-none",
    "focus:border-indigo-500 focus:bg-indigo-500/10 focus:text-indigo-500",
    "hover:cursor-text hover:border-indigo-500/50",
    "selection:bg-indigo-500/50 selection:text-white",
    "placeholder:text-zinc-400",
    "transition-all",
    "text-[16px]",
    "-ml-1 px-1",
    className,
  );

  const [raw, setRaw] = useState(Number(value) || 0);
  const proposal = useStore(proposalStore, (state) => state.proposal);

  return (
    <div className="relative flex w-fit flex-col">
      <input
        id={id}
        type="text"
        className={clsx(inputStyle)}
        placeholder={placeholder}
        value={formatDuration(raw, proposal?.settings?.format?.timeUnit)}
        // defaultValue={defaultValue}
        onBlur={onBlur}
        style={style}
        onChange={(e) => {
          const clean = parseDuration(e.target.value);
          setRaw(Number(clean));
        }}
      />

      {/* <label
        htmlFor={id}
        className={clsx(
          "absolute -top-6 left-0 w-fit rounded-sm bg-indigo-500 px-2 py-1 text-[12px] font-bold text-nowrap",
          "pointer-events-none",
          "opacity-0 peer-hover:opacity-70 peer-focus:opacity-100",
          "transition-all",
        )}
      >
        {label}
      </label> */}
    </div>
  );
}
