"use client";

import EditableText from "@/components/EditableText";
import { defaultProposal } from "@/data/proposal/defaultProposal";
import { getLocalDBProposal } from "@/lib/proposalDB";
import { useProposalStore } from "@/stores/proposal/proposalStore";
import { Proposal } from "@/types/proposal";
import clsx from "clsx";

export default function Cover() {
  const proposal = useProposalStore((state: any) => state.proposal);
  const setProposal = useProposalStore((state: any) => state.setProposal);

  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      {/* Top */}
      <div className="px-9 py-6">
        <EditableText
          id="name"
          label="Proposer's Name"
          placeholder="Proposer's Name"
          defaultValue=""
          className="text-[24px] font-bold text-zinc-900"
        />
        <span style={{ color: proposal?.settings?.theme?.accentColor }}>
          {proposal?.settings?.theme?.accentColor}
        </span>
        <button
          className="bg-yellow-500"
          onClick={() => {
            setProposal({
              defaultProposal,
            });
          }}
        >
          Reset Proposal
        </button>
        <button
          style={{ backgroundColor: "#ef4444" }}
          onClick={() => {
            setProposal({
              ...proposal,
              settings: {
                ...proposal?.settings,
                theme: { accentColor: "#ef4444" },
              },
            });
          }}
        >
          Change to red
        </button>
        <button
          style={{ backgroundColor: "#22d3ee" }}
          onClick={() => {
            setProposal({
              ...proposal,
              settings: {
                ...proposal?.settings,
                theme: { accentColor: "#22d3ee" },
              },
            });
          }}
        >
          Change to blue
        </button>

        <button className="text-green-500" onClick={() => getLocalDBProposal()}>
          Get Proposals
        </button>
      </div>

      {/* Center */}
      <div className="flex flex-col justify-center gap-6 px-9">
        <span
          style={{ color: proposal?.settings?.theme?.accentColor }}
          className="text-4xl text-[64px] font-bold text-zinc-900"
        >
          Web Development Proposal
        </span>

        <EditableText
          id="project-title"
          label="Project title"
          placeholder="Project title"
          className="text-[32px] font-bold text-zinc-900"
          defaultValue={"Project Title"}
          onBlur={(e: any) => console.log(e.target.value)}
          // onBlur={(e: any) => {
          //   setProposal((prev: Proposal) => ({
          //     ...prev,
          //     title: e.target.value,
          //   }));
          // }}
        />
      </div>

      {/* Bottom */}
      <div className="flex items-end justify-between px-9 py-6">
        <span className="text-[20px] text-zinc-900">4 July 2026</span>
        <div className="flex flex-col gap-2">
          <span className="ml-1 text-[20px] text-zinc-900">Prepared for</span>
          <EditableText
            id="client-name"
            label="Client's name"
            placeholder="Client's Name"
            defaultValue="Client's Name"
            className="text-[20px] text-zinc-900"
          />
        </div>
      </div>
    </div>
  );
}
