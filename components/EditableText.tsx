import clsx from "clsx";

export default function EditableText({
  id,
  label,
  placeholder,
  value,
  defaultValue,
  className,
  as,
  onBlur,
}: {
  id: string;
  label?: string;
  placeholder: string;
  value?: string;
  defaultValue?: string;
  className?: string;
  as?: "input" | "textarea";
  onBlur?: (e: any) => void;
}) {
  const inputStyle = clsx(
    "peer field-sizing-content w-fit rounded-sm border-2 border-white/0 outline-none",
    "focus:border-indigo-500 focus:bg-indigo-500/10 focus:text-indigo-500",
    "hover:cursor-text hover:border-indigo-500/50",
    "selection:bg-indigo-500/50 selection:text-white",
    "placeholder:text-zinc-400",
    "transition-all",
    "text-[16px] text-zinc-900",
    "-ml-1 px-1",
    className,
  );

  return (
    <div className="relative flex w-fit flex-col">
      {as === "textarea" ? (
        <textarea
          id={id}
          className={clsx("resize-none", inputStyle)}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onBlur={onBlur}
        />
      ) : (
        <input
          id={id}
          type="text"
          className={clsx(inputStyle)}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onBlur={onBlur}
        />
      )}

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
