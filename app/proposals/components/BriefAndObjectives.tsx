"use client";

import EditableText from "@/components/EditableText";
import clsx from "clsx";
import SectionTitle from "./SectionTitle";
import { SortableContainer, SortableItem } from "@/components/dndkit/Sortable";
import { SetStateAction, useState } from "react";
import { ArrowRight } from "lucide-react";
import ProposalHeader from "./ProposalHeader";
import ProposalFooter from "./ProposalFooter";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

export default function BriefAndObjectives() {
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
      <div className="flex h-full flex-col gap-8">
        {/* Brief */}
        <div className="flex flex-col gap-2 px-8">
          <SectionTitle>Brief</SectionTitle>
          <EditableText
            id={"description"}
            label={"description"}
            placeholder={"Enter project description here"}
            defaultValue={proposal?.description}
            className="text-wrap text-zinc-900"
            as="textarea"
            onBlur={(e) => {
              setProposal({
                ...proposal,
                description: e.target.value,
              });
            }}
          />
        </div>

        {/* Objectives */}
        <div className="flex flex-col gap-2">
          <SectionTitle className="ml-8">Objectives</SectionTitle>
          <SortableContainer
            items={proposal?.objectives ?? []}
            setItems={setProposalObjectives as any}
          >
            <div className="flex flex-col gap-1">
              {proposal?.objectives?.map((objective, index) => {
                return (
                  <SortableItem key={objective.id} id={objective.id}>
                    <div className="mt-0.5 flex items-center gap-2">
                      <ArrowRight className="text-zinc-900" />
                      <EditableText
                        id={""}
                        placeholder={"Click to write objective"}
                        defaultValue={objective.description}
                        as="textarea"
                        onBlur={(e) => {
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
              <button
                className="flex-start flex bg-red-500"
                onClick={() => {
                  const newObjective = {
                    id: crypto.randomUUID(),
                    title: "",
                    description: "",
                  };
                  setProposalObjectives([...proposal.objectives, newObjective]);
                }}
              >
                + Add Objective
              </button>
            </div>
          </SortableContainer>
        </div>
      </div>

      {/* Footer */}
      <ProposalFooter />
    </div>
  );
}
