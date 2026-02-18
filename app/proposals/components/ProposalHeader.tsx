import EditableText from "@/components/EditableText";

export default function ProposalHeader() {
  return (
    <div className="flex justify-between px-9 py-4">
      <EditableText
        id={""}
        placeholder={"Proposer's Name"}
        defaultValue={"Proposer's Name"}
      />
    </div>
  );
}
