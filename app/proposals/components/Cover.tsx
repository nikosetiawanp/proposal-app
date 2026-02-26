"use client";

import EditableText from "@/components/EditableText";
import { defaultProposal } from "@/data/proposal/defaultProposal";
import { getLocalDBProposal } from "@/lib/proposalDB";
import { proposalStore } from "@/stores/proposal/proposalStore";
import { Proposal } from "@/types/proposal";
import clsx from "clsx";
import { useStore } from "zustand";

export default function Cover() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      {/* Top */}
      <div className="px-9 py-6">
        <EditableText
          id="name"
          label="Proposer's Name"
          placeholder="Proposer's Name"
          defaultValue={proposal?.proposerName}
          className="text-[24px] font-bold text-zinc-900"
          onBlur={(e) => {
            setProposal({
              ...proposal,
              proposerName: e.target.value,
            });
          }}
        />
      </div>

      {/* Center */}
      <div className="flex flex-col justify-center gap-6 px-9">
        <span className="text-4xl text-[64px] font-bold text-zinc-900">
          Web Development Proposal
        </span>

        <EditableText
          id="project-title"
          label="Project title"
          placeholder="Project title"
          className="text-[32px] font-bold text-zinc-900"
          defaultValue={proposal?.title}
          onBlur={(e) => {
            setProposal({
              ...proposal,
              title: e.target.value,
            });
          }}
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
            className="text-[20px] text-zinc-900"
            defaultValue={proposal?.clientName}
            onBlur={(e) => {
              setProposal({
                ...proposal,
                clientName: e.target.value,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
