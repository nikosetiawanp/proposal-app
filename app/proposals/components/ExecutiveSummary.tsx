"use client";

import TextEditable from "@/components/TextEditable";
import clsx from "clsx";
import SectionTitle from "./SectionTitle";
import { SortableContainer, SortableItem } from "@/components/dndkit/Sortable";
import { SetStateAction, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import ProposalHeader from "./ProposalHeader";
import ProposalFooter from "./ProposalFooter";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

export default function ExecutiveSummary() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);
  const setProposalObjectives = useStore(
    proposalStore,
    (state) => state.setProposalObjectives,
  );

  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      {/* Header */}
      <ProposalHeader />

      {/* Content */}
      <div className="flex h-full flex-col gap-4">
        {/* Overview */}
        <div className="flex flex-col px-8">
          <h2
            style={{
              fontFamily: proposal?.settings?.headingFont,
              color: proposal?.settings?.accentColor,
            }}
            className="mb-4 text-[36px] font-bold text-zinc-600"
          >
            Executive Summary
          </h2>
          <span
            className="font-bold text-zinc-600"
            style={{
              fontFamily: proposal?.settings?.bodyFont,
              color: proposal?.settings?.accentColor,
              fontSize: "16px",
            }}
          >
            Overview
          </span>
          <TextEditable
            id={"overview"}
            placeholder={"Enter project description here"}
            value={proposal?.overview}
            className="text-wrap text-zinc-600"
            style={{
              fontFamily: proposal?.settings?.bodyFont,
              fontSize: "14px",
              color: proposal?.settings?.textColor,
            }}
            as="textarea"
            onChange={(e) => {
              setProposal({
                ...proposal,
                overview: e.target.value,
              });
            }}
          />
        </div>

        {/* Objectives */}
        <div className="flex flex-col">
          <span
            className="ml-8 font-bold text-zinc-600"
            style={{
              fontFamily: proposal?.settings?.bodyFont,
              color: proposal?.settings?.accentColor,
              fontSize: "16px",
            }}
          >
            Objectives
          </span>
          <SortableContainer
            items={proposal?.objectives ?? []}
            setItems={setProposalObjectives as any}
          >
            <div className="flex flex-col">
              {proposal?.objectives?.map((objective, index) => {
                return (
                  <SortableItem
                    key={objective.id}
                    id={objective.id}
                    onDelete={() => {
                      setProposalObjectives([
                        ...proposal.objectives.filter(
                          (obj) => obj.id !== objective.id,
                        ),
                      ]);
                    }}
                    onCreate={() => {
                      const newObjective = {
                        id: crypto.randomUUID(),
                        title: "",
                        description: "",
                      };

                      const newItems = [...proposal.objectives];
                      newItems.splice(index + 1, 0, newObjective);

                      setProposalObjectives(newItems);
                    }}
                  >
                    <div className="mt-0.5 flex items-baseline gap-1">
                      {/* <ArrowRight className="text-zinc-600" /> */}
                      <span
                        className="text-[14px]"
                        style={{
                          color: proposal?.settings?.textColor,
                        }}
                      >
                        {index + 1}.
                      </span>
                      <TextEditable
                        id={""}
                        className="text-zinc-600"
                        placeholder="Click to start writing..."
                        value={objective.description}
                        as="textarea"
                        style={{
                          fontFamily: proposal?.settings?.bodyFont,
                          fontSize: "14px",
                          color: proposal?.settings?.textColor,
                        }}
                        onChange={(e) => {
                          const updatedObjectives = proposal.objectives.map(
                            (obj) =>
                              obj.id === objective.id
                                ? { ...obj, description: e.target.value }
                                : obj,
                          );

                          setProposal({
                            ...proposal,
                            objectives: updatedObjectives,
                          });
                        }}
                      />
                    </div>
                  </SortableItem>
                );
              })}
            </div>
          </SortableContainer>
        </div>

        <div className="mx-8">
          <span
            className="font-bold text-zinc-600"
            style={{
              fontFamily: proposal?.settings?.bodyFont,
              color: proposal?.settings?.accentColor,
              fontSize: "16px",
            }}
          >
            Solution
          </span>
          <TextEditable
            id={"description"}
            placeholder={"Enter project description here"}
            value={proposal?.solution}
            className="text-wrap text-zinc-600"
            style={{
              fontFamily: proposal?.settings?.bodyFont,
              fontSize: "14px",
              color: proposal?.settings?.textColor,
            }}
            as="textarea"
            onChange={(e) => {
              setProposal({
                ...proposal,
                solution: e.target.value,
              });
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <ProposalFooter />
    </div>
  );
}
