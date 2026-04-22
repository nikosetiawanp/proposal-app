"use client";

import clsx from "clsx";
import TextEditable from "../../../components/TextEditable";
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
import { Separator } from "@/components/ui/separator";

export default function Timeline() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);
  const setProposalServices = useStore(
    proposalStore,
    (state) => state.setProposalServices,
  );
  const totalTimeMin = proposal?.services?.reduce(
    (acc, service) => acc + service.duration,
    0,
  );

  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      {/* Header */}
      <ProposalHeader />

      {/* Content */}
      <div className="flex h-full flex-col">
        {/* Center */}

        <h2
          style={{
            fontFamily: proposal?.settings?.headingFont,
            color: proposal?.settings?.accentColor,
            fontWeight: "bold",
          }}
          className="mb-4 ml-9 text-[36px] font-bold"
        >
          Timeline
        </h2>
        {/* Table */}
        <div className="flex w-full flex-col">
          {/* Table Header */}
          <div
            className="mx-9 flex items-center px-2 py-2"
            style={{
              backgroundColor: proposal?.settings?.accentColor,
            }}
          >
            <span
              className="flex-2 font-bold"
              style={{ color: proposal?.settings?.textColor }}
            >
              Service
            </span>
            <span
              className="ml-5 flex-[1] font-bold text-white"
              style={{ color: proposal?.settings?.textColor }}
            >
              Estimated Timeline
            </span>
          </div>
          {/* <div className="px-10">
            <Divider />
          </div> */}

          {/* Items */}
          <SortableContainer
            items={proposal?.services ?? []}
            setItems={setProposalServices as any}
          >
            <div className="flex flex-col">
              {proposal?.services?.map((service, index) => {
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
                      onCreate={() => {
                        const newService = {
                          id: crypto.randomUUID(),
                          title: "",
                          description: "",
                          budget: "0",
                          duration: 0,
                        };

                        const newItems = [...proposal.services];
                        newItems.splice(index + 1, 0, newService);
                        setProposalServices(newItems);
                      }}
                    >
                      <div className="mt-1 flex h-full w-full items-center">
                        {/* Item */}
                        <div className="flex-2">
                          <TextEditable
                            id="service"
                            placeholder="Service"
                            className="ml-[12px] text-[14px] text-zinc-600"
                            style={{
                              fontFamily: proposal?.settings?.bodyFont,
                              fontSize: "14px",
                              color: proposal?.settings?.textColor,
                            }}
                            value={service.title}
                            onChange={(e) => {
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

                        {/* Timeline */}
                        <div className="flex flex-[1] items-end">
                          <TextEditable
                            id="service"
                            placeholder="0"
                            className="ml-[4px] text-[14px] text-zinc-600"
                            style={{
                              fontFamily: proposal?.settings?.bodyFont,
                              fontSize: "14px",
                              color: proposal?.settings?.textColor,
                            }}
                            suffix={
                              "\u00A0" +
                              proposal?.settings?.timeUnit +
                              (service.duration > 1 ? "s" : "")
                            }
                            value={service.duration}
                            onChange={(e) => {
                              const updatedServices = proposal.services.map(
                                (serv) =>
                                  serv.id === service.id
                                    ? {
                                        ...serv,
                                        duration: Number(e.target.value),
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
                    <div className="px-9">
                      <Separator
                        style={{
                          background: proposal?.settings?.textColor,
                          opacity: 0.25,
                        }}
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </SortableContainer>

          {/* End of Row */}

          {/* Table Footer */}
          <div className="flex px-11 py-2">
            <div className="flex-2">
              <span
                className="font-bold text-zinc-900"
                style={{
                  fontFamily: proposal?.settings?.bodyFont,
                  fontSize: "14px",
                  color: proposal?.settings?.textColor,
                }}
              >
                Total
              </span>
            </div>
            <div className="ml-5 flex-[1]">
              <span
                className="font-bold text-zinc-900"
                style={{
                  fontFamily: proposal?.settings?.bodyFont,
                  fontSize: "14px",
                  color: proposal?.settings?.textColor,
                }}
              >
                {totalTimeMin}{" "}
                {proposal?.settings?.timeUnit + (totalTimeMin > 1 ? "s" : "")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <ProposalFooter />
    </div>
  );
}
