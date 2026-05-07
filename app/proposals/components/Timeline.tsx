"use client";

import clsx from "clsx";
import TextEditable from "../../../components/TextEditable";
import {
  SortableContainer,
  SortableItem,
} from "../../../components/dndkit/Sortable";
import React from "react";
import ProposalFooter from "./ProposalFooter";
import ProposalHeader from "./ProposalHeader";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableBodyRow,
  TableHeadRow,
  TableFooter,
  TableFooterRow,
  TableFooterCell,
} from "./ProposalTable";

export default function Timeline({ slug }: { slug: string }) {
  const proposal = useStore(proposalStore, (state) => state.proposal);

  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  const setProposalServices = useStore(
    proposalStore,
    (state) => state.setProposalServices,
  );

  const totalTime = proposal?.services?.reduce(
    (acc, service) => acc + service.duration,
    0,
  );

  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      {/* Header */}
      <ProposalHeader />

      {/* Content */}
      <div className="flex h-full flex-col">
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
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableHeadRow>
              <TableHeadCell className="flex-2">Service</TableHeadCell>

              <TableHeadCell className="flex-1">
                Estimated Timeline
              </TableHeadCell>
            </TableHeadRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            <SortableContainer
              items={proposal?.services ?? []}
              setItems={setProposalServices as any}
            >
              {proposal?.services?.map((service, index) => {
                return (
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
                      <TableBodyRow index={index}>
                        {/* Service */}
                        <TableBodyCell className="flex flex-2 items-end">
                          <TextEditable
                            id="service"
                            placeholder="Service"
                            className="ml-2 text-[14px] text-zinc-600"
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
                        </TableBodyCell>

                        {/* Timeline */}
                        <TableBodyCell className="ml-1 flex flex-1 gap-0.5">
                          <TextEditable
                            id="timeline"
                            placeholder="0"
                            className="text-[14px] text-zinc-600"
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
                        </TableBodyCell>
                      </TableBodyRow>
                    </SortableItem>
                  </React.Fragment>
                );
              })}
            </SortableContainer>
          </TableBody>

          {/* Table Footer */}
          <TableFooter lastIndex={proposal.services.length - 1}>
            <TableFooterRow>
              <TableFooterCell className="flex-2 text-[14px]">
                Total
              </TableFooterCell>

              <TableFooterCell className="flex flex-1 text-[14px]">
                {totalTime}{" "}
                {proposal?.settings?.timeUnit + (totalTime > 1 ? "s" : "")}
              </TableFooterCell>
            </TableFooterRow>
          </TableFooter>
        </Table>
      </div>

      {/* Footer */}
      <ProposalFooter slug={slug} />
    </div>
  );
}
