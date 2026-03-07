"use client";

import clsx from "clsx";
import { GripVertical, Trash } from "lucide-react";
import EditableText from "../../../components/EditableText";
import {
  SortableContainer,
  SortableItem,
} from "../../../components/dndkit/Sortable";
import React, { useState } from "react";
import Divider from "@/components/Divider";
import SectionTitle from "./SectionTitle";
import ProposalFooter from "./ProposalFooter";
import ProposalHeader from "./ProposalHeader";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

export default function Budget() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);
  const setProposalServices = useStore(
    proposalStore,
    (state) => state.setProposalServices,
  );
  const totalBudget = proposal?.services?.reduce(
    (acc, service) => acc + service.budget,
    0,
  );
  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      {/* Header */}
      <ProposalHeader />

      {/* Content */}
      <div className="flex h-full flex-col">
        {/* Center */}

        <SectionTitle className="ml-8">Estimated Budget</SectionTitle>

        {/* Table */}
        <div className="flex w-full flex-col">
          {/* Table Header */}
          <div className="flex px-9 py-2">
            <span className="flex-[2] font-bold text-zinc-900">Service</span>
            <span className="ml-5 flex-[1] font-bold text-zinc-900">
              Budget
            </span>
          </div>
          <div className="px-10">
            <Divider />
          </div>

          {/* Items */}
          <SortableContainer
            items={proposal?.services ?? []}
            setItems={setProposalServices as any}
          >
            <div className="flex flex-col">
              {proposal?.services?.map((service) => {
                return (
                  // Row
                  <React.Fragment key={service.id}>
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
                    >
                      <div className="mt-0.5 flex w-full">
                        {/* Service  */}
                        <div className="flex-[2]">
                          <EditableText
                            id="service"
                            label="Service"
                            placeholder="Service"
                            className="text-[14px] text-zinc-900"
                            defaultValue={service.title}
                            onBlur={(e) => {
                              const updatedServices = proposal.services.map(
                                (serv) =>
                                  serv.id === service.id
                                    ? {
                                        ...serv,
                                        title: e.target.value,
                                      }
                                    : serv,
                              );

                              setProposal({
                                ...proposal,
                                services: updatedServices,
                              });
                            }}
                          />
                        </div>

                        {/* Budget */}
                        <div className="flex-[1]">
                          <EditableText
                            id="service"
                            label="Service"
                            placeholder="Service"
                            className="text-[14px] text-zinc-900"
                            defaultValue={String(service.budget)}
                            onBlur={(e) => {
                              const updatedServices = proposal.services.map(
                                (serv) =>
                                  serv.id === service.id
                                    ? {
                                        ...serv,
                                        budget: Number(e.target.value),
                                      }
                                    : serv,
                              );

                              setProposal({
                                ...proposal,
                                services: updatedServices,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </SortableItem>
                    <div className="px-10">
                      <Divider />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </SortableContainer>

          {/* End of Row */}

          {/* Table Footer */}
          <div className="flex px-9 py-2">
            <div className="flex-[2]">
              <span className="font-bold text-zinc-900">Total</span>
            </div>
            <div className="ml-3 flex-[1]">
              <span className="font-bold text-zinc-900">
                {proposal?.currency} {totalBudget}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <button
        className="bg-green-500"
        onClick={() => setProposal({ ...proposal, currency: "USD" })}
      >
        Change currency
      </button> */}

      {/* Footer */}
      <ProposalFooter />
    </div>
  );
}
