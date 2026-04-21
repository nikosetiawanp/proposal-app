"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Eye, EyeClosed, EyeOff, GripVertical, Plus } from "lucide-react";
import { proposalPages } from "@/data/proposal/proposalPages";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";
import { Separator } from "@/components/ui/separator";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SortableContainer, SortableItem } from "@/components/dndkit/Sortable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { currencies } from "@/data/currencies";

export default function LeftSidebar() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);
  const setProposalObjectives = useStore(
    proposalStore,
    (state) => state.setProposalObjectives,
  );
  const setProposalServices = useStore(
    proposalStore,
    (state) => state.setProposalServices,
  );

  const fieldStyle = "px-4";
  const fieldLabelStyle = "text-xs font-bold";

  const accordionTriggerStyle = "font-bold px-4 text-[12px]";
  const accordionContentStyle = "flex flex-col gap-4 h-fit";

  return (
    <div className="hidden w-lg border-r border-zinc-300 bg-white lg:block">
      <div className="p-4">
        <span className="text-primary font-bold">Content</span>
      </div>
      <Separator />

      <div className="scroll-hidden flex h-full flex-col gap-4 overflow-y-auto pb-32">
        <Accordion type="multiple">
          {/* Cover */}
          <AccordionItem value="cover">
            <AccordionTrigger className={accordionTriggerStyle}>
              COVER
            </AccordionTrigger>
            <AccordionContent className={accordionContentStyle}>
              <Field className={fieldStyle}>
                <FieldLabel className={fieldLabelStyle} htmlFor="title">
                  Project Title
                </FieldLabel>
                <Input
                  id="title"
                  placeholder="eg. Customer Onboarding Optimization"
                  value={proposal?.title}
                  onChange={(e) => {
                    setProposal({
                      ...proposal,
                      title: e.target.value,
                    });
                  }}
                />
              </Field>
              <Field className={fieldStyle}>
                <FieldLabel className={fieldLabelStyle} htmlFor="client-name">
                  Client Name
                </FieldLabel>
                <Input
                  id="client-name"
                  placeholder="John Doe"
                  value={proposal?.clientName}
                  onChange={(e) => {
                    setProposal({
                      ...proposal,
                      clientName: e.target.value,
                    });
                  }}
                />
              </Field>
              <Field className={fieldStyle}>
                <FieldLabel className={fieldLabelStyle} htmlFor="proposer-name">
                  Proposer Name
                </FieldLabel>
                <Input
                  id="proposer-name"
                  placeholder="Jane Doe"
                  value={proposal?.proposerName}
                  onChange={(e) => {
                    setProposal({
                      ...proposal,
                      proposerName: e.target.value,
                    });
                  }}
                />
              </Field>
            </AccordionContent>
          </AccordionItem>

          {/* Executive Summary */}
          <AccordionItem value="executiveSummary">
            <AccordionTrigger className={accordionTriggerStyle}>
              EXECUTIVE SUMMARY
            </AccordionTrigger>
            <AccordionContent className={accordionContentStyle}>
              <Field className={fieldStyle}>
                <FieldLabel className={fieldLabelStyle} htmlFor="overview">
                  Overview
                </FieldLabel>
                <Textarea
                  id="overview"
                  placeholder="Summarize the problem, your approach, and the expected outcome in 2–3 sentences."
                  value={proposal?.overview}
                  onChange={(e) => {
                    setProposal({
                      ...proposal,
                      overview: e.target.value,
                    });
                  }}
                  className="resize-none"
                />
              </Field>
              <div className="flex items-center justify-between px-4">
                <FieldLabel className={fieldLabelStyle} htmlFor="overview">
                  Objectives
                </FieldLabel>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => {
                    const newObjective = {
                      id: crypto.randomUUID(),
                      title: "",
                      description: "",
                    };

                    setProposalObjectives([
                      ...proposal.objectives,
                      newObjective,
                    ]);
                  }}
                >
                  <Plus />
                  <span>Add Item</span>
                </Button>
              </div>
              <SortableContainer
                items={proposal?.objectives ?? []}
                setItems={setProposalObjectives as any}
              >
                <div className="flex w-full flex-col gap-2">
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
                        <Field className="flex gap-1">
                          <FieldLabel className="text-xs">
                            Objective {index + 1}
                          </FieldLabel>
                          <Textarea
                            placeholder="State the key goals and success criteria for this project"
                            value={proposal?.objectives[index].description}
                            className="resize-none"
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
                        </Field>
                      </SortableItem>
                    );
                  })}
                </div>
              </SortableContainer>

              <Field className={fieldStyle}>
                <FieldLabel className={fieldLabelStyle} htmlFor="solution">
                  Solution
                </FieldLabel>
                <Textarea
                  id="solution"
                  value={proposal?.solution}
                  onChange={(e) => {
                    setProposal({
                      ...proposal,
                      solution: e.target.value,
                    });
                  }}
                  className="resize-none"
                />
              </Field>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="scope">
            <AccordionTrigger className={accordionTriggerStyle}>
              SCOPE
            </AccordionTrigger>
            <AccordionContent className={accordionContentStyle}>
              <div className="flex items-center justify-between px-4">
                <FieldLabel className={fieldLabelStyle} htmlFor="overview">
                  Services
                </FieldLabel>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => {
                    const newService = {
                      id: crypto.randomUUID(),
                      title: "",
                      description: "",
                      budget: "0",
                      duration: 0,
                    };

                    setProposalServices([...proposal.services, newService]);
                  }}
                >
                  <Plus />
                  <span>Add Item</span>
                </Button>
              </div>

              <SortableContainer
                items={proposal?.services}
                setItems={setProposalServices as any}
              >
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
                          duration: 0,
                        };

                        const newItems = [...proposal.services];
                        newItems.splice(index + 1, 0, newService);
                        setProposalServices(newItems);
                      }}
                    >
                      <div className="flex flex-col gap-1">
                        <Field>
                          <FieldLabel className="text-xs">
                            Service {index + 1}
                          </FieldLabel>
                          <Input
                            placeholder="Name the service provided"
                            value={service?.title}
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
                        </Field>
                        <Field>
                          <FieldLabel className="text-xs">
                            Description {index + 1}
                          </FieldLabel>
                          <Textarea
                            className="resize-none"
                            placeholder="Briefly explain what this service includes, deliverables, and how it helps achieve the project goals."
                            value={service?.description}
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
                        </Field>
                      </div>
                    </SortableItem>
                  );
                })}
              </SortableContainer>
            </AccordionContent>
          </AccordionItem>

          {/* Timeline */}
          <AccordionItem value="timeline">
            <AccordionTrigger className={accordionTriggerStyle}>
              TIMELINE
            </AccordionTrigger>
            <AccordionContent className={accordionContentStyle}>
              <div className="flex items-center justify-between px-4">
                <FieldLabel className={fieldLabelStyle} htmlFor="overview">
                  Timeline
                </FieldLabel>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => {
                    const newService = {
                      id: crypto.randomUUID(),
                      title: "",
                      description: "",
                      budget: "0",
                      duration: 0,
                    };

                    setProposalServices([...proposal.services, newService]);
                  }}
                >
                  <Plus />
                  <span>Add Item</span>
                </Button>
              </div>

              <SortableContainer
                items={proposal?.services}
                setItems={setProposalServices as any}
              >
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
                          duration: 0,
                        };

                        const newItems = [...proposal.services];
                        newItems.splice(index + 1, 0, newService);
                        setProposalServices(newItems);
                      }}
                    >
                      <div className="flex flex-col gap-1">
                        <Field className="flex-2">
                          <FieldLabel className="text-xs">
                            Service {index + 1}
                          </FieldLabel>
                          <Input
                            placeholder="Name the service provided"
                            value={service?.title}
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
                        </Field>
                        <Field className="flex-1">
                          <FieldLabel className="text-xs">
                            Duration {index + 1}
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupInput
                              placeholder="0"
                              value={service?.duration}
                              onChange={(e) => {
                                const updatedServices = proposal.services.map(
                                  (serv) =>
                                    serv.id === service.id
                                      ? {
                                          ...serv,
                                          estimatedTimeMin: Number(
                                            e.target.value,
                                          ),
                                        }
                                      : serv,
                                );

                                setProposal({
                                  ...proposal,
                                  services: updatedServices,
                                });
                              }}
                            />
                            <InputGroupAddon align="inline-end">
                              {proposal?.settings?.timeUnit}
                              {service.duration > 1 ? "s" : ""}
                            </InputGroupAddon>
                          </InputGroup>
                        </Field>
                      </div>
                    </SortableItem>
                  );
                })}
              </SortableContainer>
            </AccordionContent>
          </AccordionItem>

          {/* Budget */}
          <AccordionItem value="budget">
            <AccordionTrigger className={accordionTriggerStyle}>
              BUDGET
            </AccordionTrigger>
            <AccordionContent className={accordionContentStyle}>
              <div className="flex items-center justify-between px-4">
                <FieldLabel className={fieldLabelStyle} htmlFor="overview">
                  Budget
                </FieldLabel>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => {
                    const newService = {
                      id: crypto.randomUUID(),
                      title: "",
                      description: "",
                      budget: "0",
                      duration: 0,
                    };

                    setProposalServices([...proposal.services, newService]);
                  }}
                >
                  <Plus />
                  <span>Add Item</span>
                </Button>
              </div>

              <SortableContainer
                items={proposal?.services}
                setItems={setProposalServices as any}
              >
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
                          duration: 0,
                        };

                        const newItems = [...proposal.services];
                        newItems.splice(index + 1, 0, newService);
                        setProposalServices(newItems);
                      }}
                    >
                      <div className="flex flex-col gap-1">
                        <Field className="flex-2">
                          <FieldLabel className="text-xs">
                            Service {index + 1}
                          </FieldLabel>
                          <Input
                            placeholder="Name the service provided"
                            value={service?.title}
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
                        </Field>
                        <Field className="flex-1">
                          <FieldLabel className="text-xs">
                            Budget {index + 1}
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupAddon align="inline-start">
                              {
                                currencies.find(
                                  (currency) =>
                                    currency.code ===
                                    proposal?.settings?.currency,
                                )?.symbol
                              }
                            </InputGroupAddon>
                            <InputGroupInput
                              placeholder="0"
                              value={service?.duration}
                              onChange={(e) => {
                                const updatedServices = proposal.services.map(
                                  (serv) =>
                                    serv.id === service.id
                                      ? {
                                          ...serv,
                                          estimatedTimeMin: Number(
                                            e.target.value,
                                          ),
                                        }
                                      : serv,
                                );

                                setProposal({
                                  ...proposal,
                                  services: updatedServices,
                                });
                              }}
                            />
                          </InputGroup>
                        </Field>
                      </div>
                    </SortableItem>
                  );
                })}
              </SortableContainer>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
