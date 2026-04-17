"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tabs } from "radix-ui";
import React, { useEffect, useMemo, useState } from "react";

import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

import {
  Paintbrush,
  FileTextIcon,
  ChevronsUpDown,
  ChevronDown,
  Check,
} from "lucide-react";
import { headingFonts, bodyFonts } from "@/data/proposal/fonts";
import { Proposal } from "@/types/proposal";
import Divider from "@/components/Divider";
import { currencies } from "@/data/currencies";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";

import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function RightSidebar() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  const accordionContentStyle = "flex flex-col gap-4 h-fit px-4";
  const accordionTriggerStyle = "font-bold px-4";

  return (
    <div className="hidden w-[512px] border-l border-zinc-300 bg-white lg:block">
      {/* Font Change */}
      {/* <Accordion type="single" collapsible> */}
      <Accordion
        type="single"
        collapsible
        defaultValue="typography"
        className="flex flex-col"
      >
        <span className="m-4 font-bold text-indigo-500">Proposal Settings</span>
        <Separator />
        <AccordionItem value="typography">
          <AccordionTrigger className={accordionTriggerStyle}>
            TYPOGRAPHY
          </AccordionTrigger>
          <AccordionContent className={accordionContentStyle}>
            {/* Heading Font */}
            <Field>
              <FieldLabel>Heading font</FieldLabel>
              <Select
                value={proposal?.settings?.theme?.headingFont}
                onValueChange={(value) => {
                  setProposal({
                    ...proposal,
                    settings: {
                      ...proposal?.settings,
                      theme: {
                        ...proposal?.settings?.theme,
                        headingFont: value,
                      },
                    },
                  });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue className="text-zinc-900" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {["Sans", "Serif", "Mono"].map((category, index) => {
                    return (
                      <React.Fragment key={index}>
                        {headingFonts.find(
                          (font) => font.category === category,
                        ) && (
                          <SelectGroup key={index}>
                            <SelectLabel>{category}</SelectLabel>
                            {headingFonts.map((font, index) => {
                              return (
                                font.category === category && (
                                  <SelectItem
                                    key={index}
                                    value={font.value}
                                    style={{ fontFamily: font.value }}
                                  >
                                    {font.name}
                                  </SelectItem>
                                )
                              );
                            })}
                          </SelectGroup>
                        )}
                        {index < 3 && <Separator />}
                      </React.Fragment>
                    );
                  })}
                </SelectContent>
              </Select>
            </Field>

            {/* Body Font */}
            <Field>
              <FieldLabel>Body font</FieldLabel>
              <Select
                value={proposal?.settings?.theme?.bodyFont}
                onValueChange={(value) => {
                  setProposal({
                    ...proposal,
                    settings: {
                      ...proposal?.settings,
                      theme: {
                        ...proposal?.settings?.theme,
                        bodyFont: value,
                      },
                    },
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue className="text-zinc-900" />
                </SelectTrigger>

                <SelectContent position="popper">
                  {["Sans", "Serif", "Mono"].map((category, index) => {
                    return (
                      <React.Fragment key={index}>
                        {bodyFonts.find(
                          (font) => font.category === category,
                        ) && (
                          <SelectGroup key={index}>
                            <SelectLabel>{category}</SelectLabel>
                            {bodyFonts.map((font, index) => {
                              return (
                                font.category === category && (
                                  <SelectItem
                                    key={index}
                                    value={font.value}
                                    style={{ fontFamily: font.value }}
                                  >
                                    {font.name}
                                  </SelectItem>
                                )
                              );
                            })}
                          </SelectGroup>
                        )}
                        {index < 3 && <Separator />}
                      </React.Fragment>
                    );
                  })}
                </SelectContent>
              </Select>
            </Field>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color-palette">
          <AccordionTrigger className={accordionTriggerStyle}>
            COLOR PALETTE
          </AccordionTrigger>
          <AccordionContent className={accordionContentStyle}>
            <div className="grid grid-cols-6">
              {[
                "#ef4444", // red-500
                "#f97316", // orange-500
                "#eab308", // yellow-500
                "#22c55e", // green-500
                "#06b6d4", // cyan-500
                "#3b82f6", // blue-500
              ].map((color, index) => {
                const selected =
                  proposal?.settings?.theme?.accentColor === color;
                return (
                  <div
                    key={index}
                    className={clsx(
                      "flex h-[40px] w-[40px] items-center justify-center rounded-full hover:cursor-pointer",
                      // selected && "border-3 border-indigo-500",
                    )}
                    style={{
                      backgroundColor: selected ? color + 80 : color,
                    }}
                    onClick={() => {
                      setProposal({
                        ...proposal,
                        settings: {
                          ...proposal?.settings,
                          theme: {
                            ...proposal?.settings?.theme,
                            accentColor: color,
                          },
                        },
                      });
                    }}
                  >
                    {selected && <Check className="text-white" />}
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="units">
          <AccordionTrigger className={accordionTriggerStyle}>
            UNITS
          </AccordionTrigger>
          <AccordionContent className={accordionContentStyle}>
            {/* Time Unit */}
            <Field>
              <FieldLabel>Time</FieldLabel>
              <Select
                value={proposal?.settings?.format?.timeUnit}
                onValueChange={(
                  value: Proposal["settings"]["format"]["timeUnit"],
                ) => {
                  setProposal({
                    ...proposal,
                    settings: {
                      ...proposal?.settings,
                      format: {
                        ...proposal?.settings?.format,
                        timeUnit: value,
                      },
                    },
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue className="text-zinc-900" />
                </SelectTrigger>

                <SelectContent position="popper">
                  {["Hour", "Day", "Week", "Month", "Year"].map(
                    (size, index) => {
                      return (
                        <SelectItem key={index} value={size}>
                          {size}
                        </SelectItem>
                      );
                    },
                  )}
                </SelectContent>
              </Select>
            </Field>

            {/* Currency */}
            <Field>
              <FieldLabel>Currency</FieldLabel>
              <Select
                value={proposal?.settings?.format?.currency}
                onValueChange={(value) => {
                  setProposal({
                    ...proposal,
                    settings: {
                      ...proposal?.settings,
                      format: {
                        ...proposal?.settings?.format,
                        currency: value,
                      },
                    },
                  });
                }}
              >
                {/* Currency */}
                <SelectTrigger
                  value={proposal?.settings?.format?.currency || "$"}
                >
                  <SelectValue />
                </SelectTrigger>

                <SelectContent position="popper" className="max-h-[240px]">
                  {currencies.map((currency, index) => {
                    return (
                      <SelectItem
                        className="flex items-baseline"
                        key={index}
                        value={currency.code}
                      >
                        <span className="font-bold">{currency.symbol}</span>
                        <span>{currency.name}</span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </Field>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="format">
          <AccordionTrigger className={accordionTriggerStyle}>
            FORMAT
          </AccordionTrigger>
          <AccordionContent className={accordionContentStyle}>
            {/* Date */}
            <Field>
              <FieldLabel>Date</FieldLabel>
              <Select
                value={proposal?.settings?.format?.date}
                onValueChange={(value) => {
                  setProposal({
                    ...proposal,
                    settings: {
                      ...proposal?.settings,
                      format: {
                        ...proposal?.settings?.format,
                        date: value as any,
                      },
                    },
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  {["d MMMM yyyy", "MMMM, d yyyy"].map((f, index) => (
                    <SelectItem key={index} value={f}>
                      {format(new Date(), f)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="document">
          <AccordionTrigger className={accordionTriggerStyle}>
            DOCUMENT
          </AccordionTrigger>
          <AccordionContent className={accordionContentStyle}>
            {/* Paper Size */}
            <Field>
              <FieldLabel>Paper size</FieldLabel>
              <Select
                value={proposal?.settings?.print?.paperSize}
                onValueChange={(
                  value: Proposal["settings"]["print"]["paperSize"],
                ) => {
                  setProposal({
                    ...proposal,
                    settings: {
                      ...proposal?.settings,
                      print: {
                        ...proposal?.settings?.print,
                        paperSize: value,
                      },
                    },
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue className="text-zinc-900" />
                </SelectTrigger>

                <SelectContent position="popper">
                  {["Letter", "A4"].map((size, index) => {
                    return (
                      <SelectItem key={index} value={size}>
                        {size}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </Field>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
