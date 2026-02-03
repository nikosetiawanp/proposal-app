"use client";

import clsx from "clsx";
import Layout from "../layout";
import { SetStateAction, useState } from "react";

const PAPER_PRESETS = {
  letter: { width: 612, height: 792 },
  a4: { width: 595, height: 842 },
};

export default function Page() {
  const [scale, setScale] = useState(90);
  const [paper, setPaper] = useState("letter");

  return (
    <Layout>
      <main className="flex h-screen w-screen items-center justify-center bg-zinc-200 p-6">
        {/* Paper */}
        <div
          style={{
            transform: `scale(${scale / 100})`,
            width: `${PAPER_PRESETS[paper].width}px`,
            height: `${PAPER_PRESETS[paper].height}px`,
          }}
          className={clsx(
            "flex h-full flex-col rounded-sm bg-white p-8 shadow-xl",
            "h-[792px] w-[612px]",
          )}
        >
          <Cover />
        </div>
        <ScaleControl scale={scale} setScale={setScale} />
      </main>
    </Layout>
  );
}

function ScaleControl({
  scale,
  setScale,
}: {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="z-50 flex items-center gap-4 rounded-xl border border-zinc-300 bg-white p-2 shadow-xl">
      <button
        className="w-fit rounded-xl p-2 text-zinc-900"
        onClick={() => setScale(scale - 10)}
      >
        -
      </button>
      <span className="font-bold text-zinc-900">{scale}%</span>
      <button
        className="w-fit rounded-xl p-2 text-zinc-900"
        onClick={() => setScale(scale + 10)}
      >
        +
      </button>
    </div>
  );
}

function Cover() {
  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      <EditableText
        id="name"
        label="Your name"
        placeholder="Your name"
        defaultValue=""
        className="text-[24px] font-bold text-zinc-900"
      />

      <div className="flex flex-col gap-6">
        <span className="ml-2 text-4xl text-[64px] font-bold text-zinc-900">
          Web Development Proposal
        </span>

        <EditableText
          id="project-title"
          label="Project title"
          placeholder="Project title"
          className="text-[32px] font-bold text-zinc-900"
        />
      </div>

      <div className="flex items-end justify-between">
        <span className="ml-2 text-[20px] text-zinc-900">4 July 2026</span>
        <div className="flex flex-col gap-2">
          <span className="ml-2 text-[20px] text-zinc-900">Prepared for</span>
          <EditableText
            id="client-name"
            label="Client name"
            placeholder="Client Name"
            defaultValue=""
            className="text-[20px] text-zinc-900"
          />
        </div>
      </div>
    </div>
  );
}

function EditableText({
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
      <label
        htmlFor={id}
        className={clsx(
          "text-red absolute -top-8 left-0 w-fit rounded-sm bg-indigo-500 px-2 py-1 text-[16px] font-bold text-nowrap",
          "pointer-events-none",
          "opacity-0 peer-hover:opacity-70 peer-focus:opacity-100",
          "transition-all",
        )}
      >
        {label}
      </label>
    </div>
  );
}
