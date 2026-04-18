import TextEditable from "@/components/TextEditable";
import { proposalStore } from "@/stores/proposal/proposalStore";
import { useStore } from "zustand";

export default function ProposalHeader() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  return (
    <div
      className="flex justify-between px-9 py-4"
      style={{ fontFamily: proposal?.settings?.typography?.bodyFont }}
    >
      <TextEditable
        as="input"
        placeholder="Proposer's Name"
        className="text-[14px]"
        style={{
          fontFamily: proposal?.settings?.typography?.bodyFont,
          fontSize: "14px",
          color: proposal?.settings?.colorPalette?.textColor,
        }}
        value={proposal?.proposerName}
        onChange={(e) => {
          setProposal({
            ...proposal,
            proposerName: e.target.value,
          });
        }}
      />
    </div>
  );
}
