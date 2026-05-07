import TextEditable from "@/components/TextEditable";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

export default function ProposalFooter({ slug }: { slug: string }) {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  const activePages = proposal?.settings?.pages
    ?.filter((page) => page.active)
    .map((page) => page.slug);

  return (
    <div className="flex justify-between px-9 py-6">
      <span className="text-zinc-900">
        <TextEditable
          id={""}
          style={{
            fontFamily: proposal?.settings?.bodyFont,
            fontSize: "14px",
            color: proposal?.settings?.textColor,
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
          fontFamily: proposal?.settings?.bodyFont,
          fontSize: "14px",
          color: proposal?.settings?.textColor,
        }}
      >
        {activePages.indexOf(slug)}
      </span>
    </div>
  );
}
