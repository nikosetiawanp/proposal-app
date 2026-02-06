import clsx from "clsx";

export default function EditableText({
  id,
  label,
  placeholder,
  defaultValue,
  className,
}: {
  id: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <div className="relative flex w-fit flex-col">
      <input
        id={id}
        type="text"
        className={clsx(
          "peer field-sizing-content w-fit rounded-sm border-2 border-white/0 px-1",
          "focus:border-indigo-500 focus:bg-indigo-500/10 focus:text-indigo-500 focus:outline-0",
          "hover:cursor- hover:border-indigo-500/70",
          "selection:bg-indigo-500/50 selection:text-white",
          "transition-all",
          className ? className : "text-[16px] text-zinc-900",
        )}
        placeholder={placeholder}
        defaultValue={defaultValue}
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
