import EditableText from "@/components/EditableText";
import { useProposalThemeStore } from "@/stores/proposal/useProposalThemeStore";
import clsx from "clsx";

export default function Cover() {
  const accentColor = useProposalThemeStore((state: any) => state.accentColor);
  const setAccentColor = useProposalThemeStore(
    (state: any) => state.setAccentColor,
  );

  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      {/* Top */}
      <div className="px-9 py-6">
        <EditableText
          id="name"
          label="Proposer's Name"
          placeholder="Proposer's Name"
          defaultValue=""
          className="text-[24px] font-bold text-zinc-900"
        />
        <span style={{ color: accentColor }}>{accentColor}</span>
        <button onClick={() => setAccentColor("#16a34a")}>Change color</button>
      </div>

      {/* Center */}
      <div className="flex flex-col justify-center gap-6 px-9">
        <span
          style={{ color: accentColor }}
          className="text-4xl text-[64px] font-bold text-zinc-900"
        >
          Web Development Proposal
        </span>

        <EditableText
          id="project-title"
          label="Project title"
          placeholder="Project title"
          className="text-[32px] font-bold text-zinc-900"
          defaultValue={"Project Title"}
        />
      </div>

      {/* Bottom */}
      <div className="flex items-end justify-between px-9 py-6">
        <span className="text-[20px] text-zinc-900">4 July 2026</span>
        <div className="flex flex-col gap-2">
          <span className="ml-1 text-[20px] text-zinc-900">Prepared for</span>
          <EditableText
            id="client-name"
            label="Client's name"
            placeholder="Client's Name"
            defaultValue="Client's Name"
            className="text-[20px] text-zinc-900"
          />
        </div>
      </div>
    </div>
  );
}
