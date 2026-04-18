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

export default function LeftSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = searchParams.get("page");

  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  const fieldLabelStyle = "text-xs";

  const setProposalObjectives = useStore(
    proposalStore,
    (state) => state.setProposalObjectives,
  );

  return (
    <div className="hidden w-lg border-r border-zinc-300 bg-white lg:block">
      <div className="p-4">
        <span className="text-primary font-bold">Content</span>
      </div>
      <Separator />

      <div className="scroll-hidden flex h-full flex-col gap-4 overflow-y-auto p-4 pb-32">
        <Field>
          <FieldLabel className={fieldLabelStyle} htmlFor="title">
            Project Title
          </FieldLabel>
          <Input
            id="title"
            value={proposal?.title}
            onChange={(e) => {
              setProposal({
                ...proposal,
                title: e.target.value,
              });
            }}
          />
        </Field>
        <Field>
          <FieldLabel className={fieldLabelStyle} htmlFor="client-name">
            Client Name
          </FieldLabel>
          <Input
            id="client-name"
            value={proposal?.clientName}
            onChange={(e) => {
              setProposal({
                ...proposal,
                clientName: e.target.value,
              });
            }}
          />
        </Field>
        <Field>
          <FieldLabel className={fieldLabelStyle} htmlFor="proposer-name">
            Proposer Name
          </FieldLabel>
          <Input
            id="proposer-name"
            value={proposal?.proposerName}
            onChange={(e) => {
              setProposal({
                ...proposal,
                proposerName: e.target.value,
              });
            }}
          />
        </Field>
        <Separator />
        <Field>
          <FieldLabel className={fieldLabelStyle} htmlFor="overview">
            Overview
          </FieldLabel>
          <Textarea
            id="overview"
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
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel className={fieldLabelStyle} htmlFor="overview">
              Objectives
            </FieldLabel>
            <Button
              size="xs"
              onClick={() => {
                const newObjective = {
                  id: crypto.randomUUID(),
                  title: "",
                  description: "",
                };

                setProposalObjectives([...proposal.objectives, newObjective]);
              }}
            >
              <Plus />
              <span>Add Item</span>
            </Button>
          </div>
          {proposal?.objectives?.map((objective, index) => {
            return (
              <div className="flex gap-1">
                <GripVertical className="text-border" />
                <Textarea
                  value={proposal?.objectives[index].description}
                  className="resize-none"
                  onChange={(e) => {
                    const updatedObjectives = proposal.objectives.map((obj) =>
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
            );
          })}
        </Field>

        <Field>
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
      </div>
      {/* Pages List */}
      {/* <div className="flex flex-col p-4">
        {proposalPages?.map((page, index) => {
          const active = currentPage === page.slug;
          const hidden =
            proposal?.settings?.pages?.[page.slug]?.active === false;

          const canBeHidden = proposalPages.find(
            (p) => page.slug === p.slug,
          )?.canBeHidden;
          return (
            <Link
              key={index}
              href={pathname + "?page=" + page.slug}
              className={clsx(
                "group flex items-center justify-between gap-8 rounded-xl px-1 py-1 text-[14px] font-bold",
                !active && "text-zinc-700 hover:bg-zinc-200",
                active && "bg-primary hover:bg-primary text-white",
              )}
            >
              <div
                className={clsx(
                  "flex items-center gap-4",
                  hidden && "opacity-50",
                )}
              >
                <div className="flex items-center justify-center p-1">
                  <page.icon className="w-5" />
                </div>
                {page.name}
              </div>
              <button
                className={clsx(
                  "rounded-lg p-1 opacity-0 group-hover:opacity-100 hover:cursor-pointer disabled:group-hover:opacity-30",
                  !active && "hover:bg-zinc-300 disabled:hover:bg-zinc-300/0",
                  active &&
                    canBeHidden &&
                    "hover:bg-indigo-400 disabled:hover:bg-none",
                )}
                disabled={!canBeHidden}
                onClick={(e: any) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setProposal({
                    ...proposal,
                    settings: {
                      ...proposal?.settings,
                      pages: {
                        ...proposal?.settings?.pages,
                        [page.slug]: {
                          ...proposal.settings.pages[page.slug],
                          active: !proposal.settings.pages[page.slug].active,
                        },
                      },
                    },
                  });
                }}
              >
                {!hidden && canBeHidden && (
                  <Eye
                    className={clsx(
                      "w-5",
                      !active && "text-zinc-700",
                      active && "text-white",
                    )}
                  />
                )}

                {!hidden && !canBeHidden && (
                  <EyeOff
                    className={clsx(
                      "w-5",
                      !active && "text-zinc-700",
                      active && "text-white",
                    )}
                  />
                )}

                {hidden && (
                  <EyeClosed
                    className={clsx(
                      "w-5",
                      !active && "text-zinc-700",
                      active && "text-white",
                    )}
                  />
                )}
              </button>
            </Link>
          );
        })}
      </div> */}
    </div>
  );
}
