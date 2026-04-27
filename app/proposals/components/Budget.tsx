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

export default function Budget() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);
  const setProposalServices = useStore(
    proposalStore,
    (state) => state.setProposalServices,
  );
  const accentColorLuminance = getLuminance(proposal?.settings?.accentColor);

  // const totalBudget = proposal?.services?.reduce(
  //   (acc, service) => acc + Number(service.budget.replace(/,/g, "")),
  //   0,
  // );

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
        {/* Center */}

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
        <div className="flex w-full flex-col">
          {/* Table Header */}
          <div
            className="mx-9 flex items-center px-2 py-2"
            style={{
              backgroundColor: proposal?.settings?.accentColor,
            }}
          >
            <span
              className="flex-2 font-bold text-white"
              style={{
                color:
                  accentColorLuminance < 0.4
                    ? proposal?.settings?.backgroundColor
                    : proposal?.settings?.textColor,
              }}
            >
              Service
            </span>
            <span
              className="ml-5 flex-[1] font-bold text-white"
              style={{
                color:
                  accentColorLuminance < 0.4
                    ? proposal?.settings?.backgroundColor
                    : proposal?.settings?.textColor,
              }}
            >
              Budget
            </span>
          </div>

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
                      <div className="mt-1 flex w-full">
                        {/* Service  */}
                        <div className="flex flex-2 items-end">
                          <TextEditable
                            id="service"
                            placeholder="Service"
                            className="ml-3 text-[14px] text-zinc-600"
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

                        {/* Budget */}
                        <div className="flex flex-1 gap-0.5">
                          <TextEditable
                            id="service"
                            placeholder="0"
                            className="ml-1 text-[14px] text-zinc-600"
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
                        </div>
                      </div>
                    </SortableItem>
                    <div className="px-10">
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
            <div className="ml-5 flex flex-1">
              <span
                className="font-bold text-zinc-900"
                style={{
                  fontFamily: proposal?.settings?.bodyFont,
                  fontSize: "14px",
                  color: proposal?.settings?.textColor,
                }}
              >
                {proposal?.settings?.useCustomCurrency
                  ? proposal?.settings?.customCurrency
                  : proposal?.settings?.currency}
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
