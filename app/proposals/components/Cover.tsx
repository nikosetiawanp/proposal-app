"use client";

import TextEditable from "@/components/TextEditable";
import { proposalStore } from "@/stores/proposal/proposalStore";
import clsx from "clsx";
import { useStore } from "zustand";

export default function Cover() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  return (
    <div className={clsx("flex h-full flex-col")}>
      {/* Top */}
      <div className={clsx("mt-9 flex flex-col justify-center gap-2 px-9")}>
        <span
          style={{
            fontFamily: proposal?.settings?.theme?.headingFont,
            color: proposal?.settings?.theme?.accentColor,
          }}
          className={clsx("text-4xl text-[64px] font-bold text-zinc-700")}
        >
          Project <br /> Proposal
        </span>

        <TextEditable
          id="project-title"
          label="Project title"
          placeholder="Project title"
          className="text-[14px] text-zinc-700"
          style={{ fontFamily: proposal?.settings?.theme?.bodyFont }}
          value={proposal?.title}
          onChange={(e) => {
            setProposal({
              ...proposal,
              title: e.target.value,
            });
          }}
        />
      </div>

      {/* Image */}
      <div className="my-6 h-full w-full px-9">
        <div className="h-full w-full rounded-xl bg-zinc-200"></div>
      </div>

      <div className="flex flex-col pb-9">
        <div className="flex items-center px-9">
          <span
            style={{ fontFamily: proposal?.settings?.theme?.bodyFont }}
            className="text-[16px] text-zinc-700"
          >
            Prepared for :
          </span>
          <TextEditable
            id="client-name"
            label="Client's name"
            placeholder="Client's Name"
            style={{ fontFamily: proposal?.settings?.theme?.bodyFont }}
            className="text-zinc-700"
            value={proposal?.clientName}
            onChange={(e) => {
              setProposal({
                ...proposal,
                clientName: e.target.value,
              });
            }}
          />
        </div>

        <div className="flex items-center px-9">
          <span
            style={{ fontFamily: proposal?.settings?.theme?.bodyFont }}
            className="text-[16px] text-zinc-700"
          >
            Prepared by :
          </span>
          <TextEditable
            id="client-name"
            label="Proposer's name"
            placeholder="Proposer's Name"
            className="text-[14px] text-zinc-700"
            style={{ fontFamily: proposal?.settings?.theme?.bodyFont }}
            value={proposal?.proposerName}
            onChange={(e) => {
              setProposal({
                ...proposal,
                proposerName: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex items-center px-9 text-[14px]">
          <span
            style={{ fontFamily: proposal?.settings?.theme?.bodyFont }}
            className="text-[16px] text-zinc-700"
          >
            Issued date : 24 Mar 2024
          </span>
        </div>
      </div>
    </div>
  );
}
