"use client";

import clsx from "clsx";
import { GripVertical, Trash } from "lucide-react";
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
import { currencies } from "@/data/currencies";
import CurrencyEditable from "@/components/CurrencyEditable";
import { formatCurrency, parseCurrency } from "@/utils/currency";

export default function Budget() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);
  const setProposalServices = useStore(
    proposalStore,
    (state) => state.setProposalServices,
  );
  const totalBudget = proposal?.services?.reduce(
    (acc, service) => acc + Number(service.budget.replace(/,/g, "")),
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
            fontFamily: proposal?.settings?.theme?.headingFont,
            color: proposal?.settings?.theme?.accentColor,
          }}
          className="mb-4 ml-9 text-[36px] font-bold"
        >
          Budget
        </h2>
        {/* Table */}
        <div className="flex w-full flex-col">
          {/* Table Header */}
          <div
            className="mx-9 flex items-center px-2 py-2"
            style={{ backgroundColor: proposal?.settings?.theme?.accentColor }}
          >
            <span className="flex-[2] font-bold text-white">Service</span>
            <span className="ml-5 flex-[1] font-bold text-white">Budget</span>
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
                        <div className="flex flex-[2] items-end">
                          <TextEditable
                            id="service"
                            placeholder="Service"
                            className="ml-2 text-[14px] text-zinc-600"
                            style={{
                              fontFamily: proposal?.settings?.theme?.bodyFont,
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

                        {/* Budget */}
                        <div className="flex flex-[1] gap-[2px]">
                          <TextEditable
                            id="service"
                            placeholder="Service"
                            className="text-[14px] text-zinc-600"
                            style={{
                              fontFamily: proposal?.settings?.theme?.bodyFont,
                            }}
                            prefix={
                              currencies.find(
                                (currency) =>
                                  currency.code ===
                                  proposal?.settings?.format?.currency,
                              )?.symbol
                            }
                            value={service.budget}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/,/g, ""); // remove commas

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
                                        budget: formatted, // store formatted string
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

          {/* Table Footer */}
          <div className="flex px-11 py-2">
            <div className="flex-[2]">
              <span
                className="font-bold text-zinc-900"
                style={{
                  fontFamily: proposal?.settings?.theme?.bodyFont,
                }}
              >
                Total
              </span>
            </div>
            <div className="ml-3 flex flex-[1]">
              <span
                className="font-bold text-zinc-900"
                style={{
                  fontFamily: proposal?.settings?.theme?.bodyFont,
                }}
              >
                {
                  currencies.find(
                    (currency) =>
                      currency.code === proposal?.settings?.format?.currency,
                  )?.symbol
                }{" "}
                {totalBudget.toLocaleString()}
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
