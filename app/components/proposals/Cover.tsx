import clsx from "clsx";
import EditableText from "../editableText";

export default function Cover() {
  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      {/* Top */}
      <div className="px-9 py-6">
        <EditableText
          id="name"
          label="Your name"
          placeholder="Your name"
          defaultValue=""
          className="text-[24px] font-bold text-zinc-900"
        />
      </div>

      {/* Center */}
      <div className="flex flex-col justify-center gap-6 px-9">
        <span className="text-4xl text-[64px] font-bold text-zinc-900">
          Web Development Proposal
        </span>

        <EditableText
          id="project-title"
          label="Project title"
          placeholder="Project title"
          className="text-[32px] font-bold text-zinc-900"
        />
      </div>

      {/* Bottom */}
      <div className="flex items-end justify-between px-9 py-6">
        <span className="text-[20px] text-zinc-900">4 July 2026</span>
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
