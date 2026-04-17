"use client";

import TextEditable from "@/components/TextEditable";
import clsx from "clsx";
import SectionTitle from "./SectionTitle";
import { SortableContainer, SortableItem } from "@/components/dndkit/Sortable";
import { SetStateAction, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
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
          <h2
            style={{
              fontFamily: proposal?.settings?.theme?.headingFont,
              color: proposal?.settings?.theme?.accentColor,
            }}
            className="ml-9 text-[36px] font-bold"
          >
            Project Scope
          </h2>

          <SortableContainer
            items={proposal?.services ?? []}
            setItems={setProposalServices as any}
          >
            <div className="flex flex-col gap-2">
              {proposal?.services?.map((service, index) => {
                return (
                  <SortableItem
                    key={service.id}
                    id={service.id}
                    onDelete={() => {
                      setProposalServices([
                        ...proposal.services.filter(
                          (serv) => serv.id !== service.id,
                        ),
                      ]);
                    }}
                    onCreate={() => {
                      const newService = {
                        id: crypto.randomUUID(),
                        title: "",
                        description: "",
                        budget: "0",
                        estimatedTimeMin: 0,
                        estimatedTimeMax: 0,
                        optional: false,
                      };

                      const newItems = [...proposal.services];
                      newItems.splice(index + 1, 0, newService);
                      setProposalServices(newItems);
                    }}
                  >
                    <div className="flex flex-col items-start">
                      {/* Title and Icon */}
                      <div className="flex items-center">
                        {/* <span className="text-zinc-600">{index + 1}.</span> */}
                        <TextEditable
                          id={"service-title-" + index}
                          placeholder={"Service Title"}
                          value={service.title}
                          className="font-bold text-zinc-900"
                          style={{
                            fontFamily: proposal?.settings?.theme?.bodyFont,
                            color: proposal?.settings?.theme?.accentColor,
                            fontSize: "16px",
                          }}
                          onChange={(e) => {
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
                      <TextEditable
                        id={"service-description-" + index}
                        placeholder={"Service Description"}
                        value={service.description}
                        as="textarea"
                        className="text-zinc-600"
                        style={{
                          fontFamily: proposal?.settings?.theme?.bodyFont,
                          fontSize: "14px",
                        }}
                        onChange={(e) => {
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

              {/* <button
                className={clsx(
                  "ml-9 flex items-center gap-3 opacity-30",
                  "hover:cursor-pointer hover:opacity-100",
                )}
                onClick={() => {
                  const newService = {
                    id: crypto.randomUUID(),
                    title: "",
                    description: "",
                    budget: "",
                    estimatedTimeMin: 0,
                    estimatedTimeMax: 0,
                    optional: false,
                  };
                  setProposalServices([...proposal.services, newService]);
                }}
              >
                <div className="rounded-full bg-indigo-500">
                  <Plus className="text-white" />
                </div>

                <span className="text-indigo-500">Add Service</span>
              </button> */}
            </div>
          </SortableContainer>
        </div>
      </div>

      {/* Footer */}
      <ProposalFooter />
    </div>
  );
}
