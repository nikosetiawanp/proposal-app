"use client";

import { DateEditable } from "@/components/DateEditable";
import TextEditable from "@/components/TextEditable";
import { cn } from "@/lib/utils";
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
            fontFamily: proposal?.settings?.headingFont,
            color: proposal?.settings?.accentColor,
            fontWeight: "bold",
          }}
          className={clsx("text-4xl text-[64px] font-bold")}
        >
          Project <br /> Proposal
        </span>

        {/* Project Title */}
        <TextEditable
          id="project-title"
          as="input"
          placeholder="Project title"
          className="text-zinc-700"
          style={{
            fontFamily: proposal?.settings?.bodyFont,
            fontSize: "16px",
            color: proposal?.settings?.textColor,
          }}
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
        <div
          className={cn("h-full w-full rounded-xl")}
          style={{
            backgroundColor: proposal?.settings?.accentColor,
          }}
        ></div>
      </div>

      <div className="flex flex-col pb-9">
        <div className="flex items-baseline px-9">
          <span
            style={{
              fontFamily: proposal?.settings?.bodyFont,
              color: proposal?.settings?.textColor,
            }}
            className="text-[14px] text-zinc-700"
          >
            Prepared for :
          </span>
          <TextEditable
            id="client-name"
            placeholder="Client's Name"
            style={{
              fontFamily: proposal?.settings?.bodyFont,
              fontSize: "14px",
              color: proposal?.settings?.textColor,
            }}
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

        <div className="flex items-baseline px-9">
          <span
            style={{
              fontFamily: proposal?.settings?.bodyFont,
              color: proposal?.settings?.textColor,
            }}
            className="text-[14px] text-zinc-700"
          >
            Prepared by :
          </span>
          <TextEditable
            as="input"
            placeholder="Proposer's Name"
            className="text-[14px]"
            style={{
              fontFamily: proposal?.settings?.bodyFont,
              fontSize: "14px",
              color: proposal?.settings?.textColor,
            }}
            value={proposal?.proposerName}
            onChange={(e) => {
              setProposal({
                ...proposal,
                proposerName: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex items-baseline px-9 text-[14px]">
          <span
            style={{
              fontFamily: proposal?.settings?.bodyFont,
              color: proposal?.settings?.textColor,
            }}
            className="text-[14px] text-zinc-700"
          >
            Issued Date :
            <DateEditable
              className=""
              value={proposal?.date}
              onSelect={(date: Date) => {
                setProposal({
                  ...proposal,
                  date: date,
                });
              }}
              style={{
                fontFamily: proposal?.settings?.bodyFont,
                fontSize: "14px",
                color: proposal?.settings?.textColor,
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
