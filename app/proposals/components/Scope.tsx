"use client";

import EditableText from "@/components/EditableText";
import clsx from "clsx";
import SectionTitle from "./SectionTitle";
import { SortableContainer, SortableItem } from "@/components/dndkit/Sortable";
import { SetStateAction, useState } from "react";
import { ArrowRight } from "lucide-react";
import ProposalFooter from "./ProposalFooter";
import ProposalHeader from "./ProposalHeader";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

export default function Scope() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);
  const setProposalServices = useStore(
    proposalStore,
    (state) => state.setProposalServices,
  );

  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      {/* Header */}
      <ProposalHeader />

      {/* Content */}
      <div className="flex h-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <SectionTitle className="ml-8">Scope</SectionTitle>
          <SortableContainer
            items={proposal?.services ?? []}
            setItems={setProposalServices as any}
          >
            <div className="flex flex-col gap-1">
              {proposal?.services?.map((service) => {
                return (
                  <SortableItem key={service.id} id={service.id}>
                    <div className="flex flex-col items-start">
                      {/* Title and Icon */}
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-fit text-zinc-900" />
                        <EditableText
                          id={""}
                          placeholder={"Service Title"}
                          defaultValue={service.title}
                          className="font-bold"
                          onBlur={(e) => {
                            const updatedServices = proposal.services.map(
                              (serv) =>
                                serv.id === service.id
                                  ? { ...serv, title: e.target.value }
                                  : serv,
                            );

                            setProposal({
                              ...proposal,
                              services: updatedServices,
                            });
                          }}
                        />
                      </div>
                      <EditableText
                        id={""}
                        placeholder={"Service Description"}
                        defaultValue={service.description}
                        as="textarea"
                        className="ml-7"
                        onBlur={(e) => {
                          const updatedServices = proposal.services.map(
                            (serv) =>
                              serv.id === service.id
                                ? { ...serv, description: e.target.value }
                                : serv,
                          );

                          setProposal({
                            ...proposal,
                            services: updatedServices,
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
                  const newService = {
                    id: crypto.randomUUID(),
                    title: "",
                    description: "",
                    budget: 0,
                    estimatedTimeMin: 0,
                    estimatedTimeMax: 0,
                    optional: false,
                  };
                  setProposalServices([...proposal.services, newService]);
                }}
              >
                + Add Service
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
