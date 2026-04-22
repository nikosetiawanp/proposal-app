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
  const theme = proposal?.settings?.theme;

  return (
    <div
      style={{
        transform: `scale(${scale / 100})`,
        width: `${PAPER_PRESETS[proposal?.settings?.paperSize]?.width}px`,
        minHeight: `${PAPER_PRESETS[proposal?.settings?.paperSize]?.height}px`,
        maxHeight: `${PAPER_PRESETS[proposal?.settings?.paperSize]?.height}px`,
        backgroundColor: proposal?.settings?.backgroundColor,
      }}
      className={clsx(
        "border-primary/0 z-0 flex h-full flex-col border-2 shadow-sm transition-all",
        // "hover:border-primary",
      )}
    >
      {children}
    </div>
  );
}
