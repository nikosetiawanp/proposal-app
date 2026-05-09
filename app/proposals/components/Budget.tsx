"use client";

import clsx from "clsx";
import TextEditable from "../../../components/TextEditable";
import {
  SortableContainer,
  SortableItem,
} from "../../../components/dndkit/Sortable";
import React, { useEffect } from "react";
import Divider from "@/components/Divider";
import SectionTitle from "./SectionTitle";
import ProposalFooter from "./ProposalFooter";
import ProposalHeader from "./ProposalHeader";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";
import { Separator } from "@/components/ui/separator";
import { getLuminance } from "@/utils/getLuminance";
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

export default function Budget({ slug }: { slug: string }) {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);
  const setProposalServices = useStore(
    proposalStore,
    (state) => state.setProposalServices,
  );

  const budgets = proposal?.services?.map((service) =>
    Number(service.budget.replace(/,/g, "")),
  );
  const totalBudget = budgets.reduce((acc, budget) => acc + Number(budget), 0);

  useEffect(() => {
    console.log(budgets);
  }, []);

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
          Budget
        </h2>

        {/* Table */}
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableHeadRow>
              <TableHeadCell className="flex-2">Service</TableHeadCell>
              <TableHeadCell className="flex-1">Budget</TableHeadCell>
            </TableHeadRow>
          </TableHead>

          {/* Items */}
          <TableBody>
            <SortableContainer
              items={proposal?.services ?? []}
              setItems={setProposalServices as any}
            >
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
                      <TableBodyRow index={index}>
                        {/* Service  */}
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

                        {/* Budget */}
                        <TableBodyCell className="ml-1 flex-1 gap-0.5">
                          <TextEditable
                            id="service"
                            placeholder="0"
                            style={{
                              fontFamily: proposal?.settings?.bodyFont,
                              fontSize: "14px",
                              color: proposal?.settings?.textColor,
                            }}
                            prefix={
                              proposal?.settings?.useCustomCurrency
                                ? proposal?.settings?.customCurrency
                                : proposal?.settings?.currency
                            }
                            value={service.budget}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/,/g, "");

                              if (raw === "") {
                                const updatedServices = proposal.services.map(
                                  (serv) =>
                                    serv.id === service.id
                                      ? { ...serv, budget: "" }
                                      : serv,
                                );

                                setProposal({
                                  ...proposal,
                                  services: updatedServices,
                                });
                                return;
                              }

                              const formatted = Number(raw).toLocaleString();

                              const updatedServices = proposal.services.map(
                                (serv) =>
                                  serv.id === service.id
                                    ? {
                                        ...serv,
                                        budget: formatted,
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
                    {/* <div className="px-10">
                      <Separator
                        style={{
                          background: proposal?.settings?.textColor,
                          opacity: 0.25,
                        }}
                      />
                    </div> */}
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
              <TableFooterCell className="ml-0.5 flex flex-1 text-[14px]">
                {proposal?.settings?.useCustomCurrency
                  ? proposal?.settings?.customCurrency
                  : proposal?.settings?.currency}
                {totalBudget.toLocaleString()}
              </TableFooterCell>
            </TableFooterRow>
          </TableFooter>
        </Table>
      </div>

      {/* <button
        className="bg-green-500"
        onClick={() => setProposal({ ...proposal, currency: "USD" })}
      >
        Change currency
      </button> */}

      {/* Footer */}
      <ProposalFooter slug={slug} />
    </div>
  );
}
