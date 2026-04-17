import TextEditable from "@/components/TextEditable";
import { proposalStore } from "@/stores/proposal/proposalStore";
import { useStore } from "zustand";

export default function ProposalHeader() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  return (
    <div
      className="flex justify-between px-9 py-4"
      style={{ fontFamily: proposal?.settings?.theme?.bodyFont }}
    >
      <TextEditable
        id={""}
        className="text-sm text-zinc-600"
        placeholder={"Proposer's Name"}
        value={proposal?.proposerName}
        onChange={(e) => {
          setProposal({
            ...proposal,
            clientName: e.target.value,
          });
        }}
        style={{
          fontSize: "14px",
          color: proposal?.settings?.colorPalette?.textColor,
        }}
      />
    </div>
  );
}
