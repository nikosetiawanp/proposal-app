import clsx from "clsx";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        {/* Demo */}
        <div className="flex h-full flex-col rounded-sm bg-white p-6">
          <span className="text-4xl font-bold text-zinc-900">
            Web Development Proposal
          </span>

          {/* Input */}
          <div className="relative flex w-fit flex-col">
            <input
              id="project-title"
              type="text"
              className={clsx(
                "peer field-sizing-content w-fit rounded-sm border-2 border-white/0 px-1 text-[16px] text-zinc-900",
                "focus:border-indigo-500 focus:bg-indigo-500/10 focus:text-indigo-500 focus:outline-0",
                "hover:cursor- hover:border-indigo-500/50",
                "selection:bg-indigo-500/50 selection:text-white",
                "transition-all",
              )}
              placeholder="Project Title"
            />
            <label
              htmlFor="project-title"
              className={clsx(
                "text-red absolute -top-7 left-0 w-fit rounded-sm bg-indigo-500 px-2 py-1 font-mono text-xs text-nowrap",
                "pointer-events-none",
                "opacity-0 peer-focus:opacity-100",
                "transition-all",
              )}
            >
              Project Title
            </label>
          </div>
        </div>
      </main>
    </div>
  );
}
