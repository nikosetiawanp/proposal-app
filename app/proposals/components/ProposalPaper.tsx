import { PAPER_PRESETS } from "@/data/PaperPresets";
import { proposalStore } from "@/stores/proposal/proposalStore";
import clsx from "clsx";
import { useState } from "react";
import { useStore } from "zustand";

export default function ProposalPaper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scale, setScale] = useState(100);
  const proposal = useStore(proposalStore, (state) => state.proposal);

  return (
    <div
      style={{
        transform: `scale(${scale / 100})`,
        width: `${PAPER_PRESETS[proposal?.settings?.print?.paperSize]?.width}px`,
        minHeight: `${PAPER_PRESETS[proposal?.settings?.print?.paperSize]?.height}px`,
        maxHeight: `${PAPER_PRESETS[proposal?.settings?.print?.paperSize]?.height}px`,
      }}
      className={clsx(
        "z-0 flex h-full flex-col border border-zinc-300 bg-white",
      )}
    >
      {children}
    </div>
  );
}
