import { cn } from "@/lib/utils";
import ProposalHeader from "./ProposalHeader";
import ProposalFooter from "./ProposalFooter";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";
import TextEditable from "@/components/TextEditable";

export default function ThankYou({ slug }: { slug: string }) {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  return (
    <div className={cn("flex h-full flex-col justify-between")}>
      {/* Header */}
      {/* <ProposalHeader /> */}
      <div className="flex h-full flex-col items-center justify-center">
        <h2
          style={{
            fontFamily: proposal?.settings?.headingFont,
            color: proposal?.settings?.accentColor,
            fontWeight: "bold",
          }}
          className="text-[36px] font-bold"
        >
          Thank You
        </h2>

        <TextEditable
          id="proposer-address"
          as="input"
          placeholder="Proposer Address"
          style={{
            fontFamily: proposal?.settings?.bodyFont,
            fontSize: "14px",
            color: proposal?.settings?.textColor,
          }}
          value={proposal?.proposerAddress}
          onChange={(e) => {
            setProposal({
              ...proposal,
              proposerAddress: e.target.value,
            });
          }}
        />

        <TextEditable
          id="proposer-phone"
          as="input"
          placeholder="Proposer Phone"
          style={{
            fontFamily: proposal?.settings?.bodyFont,
            fontSize: "14px",
            color: proposal?.settings?.textColor,
          }}
          value={proposal?.proposerPhone}
          onChange={(e) => {
            setProposal({
              ...proposal,
              proposerPhone: e.target.value,
            });
          }}
        />

        <TextEditable
          id="proposer-website"
          as="input"
          placeholder="Proposer Website"
          style={{
            fontFamily: proposal?.settings?.bodyFont,
            fontSize: "14px",
            color: proposal?.settings?.textColor,
          }}
          value={proposal?.proposerWebsite}
          onChange={(e) => {
            setProposal({
              ...proposal,
              proposerWebsite: e.target.value,
            });
          }}
        />

        <TextEditable
          id="proposer-email"
          as="input"
          placeholder="Proposer Email"
          style={{
            fontFamily: proposal?.settings?.bodyFont,
            fontSize: "14px",
            color: proposal?.settings?.textColor,
          }}
          value={proposal?.proposerEmail}
          onChange={(e) => {
            setProposal({
              ...proposal,
              proposerEmail: e.target.value,
            });
          }}
        />
      </div>

      {/* Footer */}
      {/* <ProposalFooter slug={slug} /> */}
    </div>
  );
}
