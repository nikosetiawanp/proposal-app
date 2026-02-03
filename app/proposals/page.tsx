import clsx from "clsx";
import Layout from "../layout";

export default function Page() {
  return (
    <Layout>
      <main className="flex h-screen w-screen items-center justify-center bg-zinc-200 p-6">
        <Paper>
          <CoverPage />
        </Paper>
      </main>
    </Layout>
  );
}

function Paper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        "flex h-full flex-col rounded-sm bg-white p-8",
        "h-[792px] w-[612px]",
      )}
    >
      {children}
    </div>
  );
}

function CoverPage() {
  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      <EditableText
        id="name"
        label="Your name"
        placeholder=""
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
          placeholder="Click to enter project title"
          defaultValue="Project Title"
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
            placeholder="Click to enter Client Name"
            defaultValue="Client Name"
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
  defaultValue: string;
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
        placeholder="Project Title"
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
