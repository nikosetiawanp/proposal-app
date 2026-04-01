import EditableText from "@/components/EditableText";
import { proposalStore } from "@/stores/proposal/proposalStore";
import { useStore } from "zustand";

export default function ProposalHeader() {
  const proposal = useStore(proposalStore, (state) => state.proposal);

  return (
    <div
      className="flex justify-between px-9 py-4"
      style={{ fontFamily: proposal?.settings?.theme?.bodyFont }}
    >
      <EditableText
        id={""}
        placeholder={"Proposer's Name"}
        defaultValue={"Proposer's Name"}
      />
    </div>
  );
}
