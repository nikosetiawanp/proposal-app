import EditableText from "@/components/EditableText";

export default function ProposalFooter() {
  return (
    <div className="flex justify-between px-9 py-6">
      <span className="text-zinc-900">
        <EditableText
          id={""}
          placeholder={"Project Title"}
          defaultValue={"Project Title"}
        />
      </span>
      <span className="text-zinc-900">1</span>
    </div>
  );
}
