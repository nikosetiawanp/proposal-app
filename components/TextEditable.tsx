import clsx from "clsx";
import { useRef } from "react";

type Props = {
  as?: "input" | "textarea";
  className?: string;
  style?: any;
  color?: string;
  fontFamily?: string;
  prefix?: string;
  suffix?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextEditable({
  as,
  className,
  prefix,
  suffix,
  color,
  fontFamily,
  ...props
}: Props) {
  const Component = as ? as : "input";
  const inputRef = useRef<any>(null);

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={clsx(
        "relative -ml-1 flex w-fit items-baseline gap-1 rounded-sm border-2 border-indigo-500/0 px-1",
        "focus-within:border-indigo-500 focus-within:bg-indigo-500/10 focus-within:text-indigo-500 focus-within:hover:border-indigo-500",
        "hover:border-indigo-500/70",
        "transition-all",
        className,
      )}
      {...props}
    >
      {prefix && (
        <span
          className={clsx("text-[16px]")}
          style={{
            color: color ? color : "inherit",
            fontFamily: fontFamily ? fontFamily : "inherit",
          }}
        >
          {prefix}
        </span>
      )}
      <Component
        ref={inputRef}
        style={{
          color: color ? color : "inherit",
          fontFamily: fontFamily ? fontFamily : "inherit",
        }}
        className={clsx(
          "field-sizing-content w-fit outline-none",
          "hover:cursor-text",
          "focus:text-indigo-500",
          "selection:bg-indigo-500/50 selection:text-white",
          "placeholder:text-zinc-400",
          "text-[16px]",
          "transition-all",
          as === "textarea" && "resize-none",
        )}
        {...props}
      />
      {suffix && (
        <span
          className={clsx("text-[16px]")}
          style={{
            color: color ? color : "inherit",
            fontFamily: fontFamily ? fontFamily : "inherit",
          }}
        >
          {suffix}
        </span>
      )}
      {/* {label && (
        <label
          htmlFor={id}
          className={clsx(
            "absolute -top-6 w-fit rounded-sm bg-indigo-500 px-2 py-1 text-[12px] font-bold text-nowrap",
            "pointer-events-none",
            "opacity-0 peer-focus:opacity-100",
            "transition-all",
            !as && "left-2",
            as === "input" && "left-2",
            as === "textarea" && "-left-1",
          )}
        >
          {label}
        </label>
      )} */}
    </div>
  );
}
