import TextEditable from "@/components/TextEditable";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

export default function ProposalFooter() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  return (
    <div className="flex justify-between px-9 py-6">
      <span className="text-zinc-900">
        <TextEditable
          id={""}
          style={{
            fontFamily: proposal?.settings?.theme?.bodyFont,
            fontSize: "14px",
          }}
          placeholder={"Project Title"}
          value={proposal?.title}
          onChange={(e) => {
            setProposal({
              ...proposal,
              title: e.target.value,
            });
          }}
        />
      </span>
      <span
        className="text-zinc-900"
        style={{
          fontFamily: proposal?.settings?.theme?.bodyFont,
          fontSize: "14px",
        }}
      >
        1
      </span>
    </div>
  );
}
