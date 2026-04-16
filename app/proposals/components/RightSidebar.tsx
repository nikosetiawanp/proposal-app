"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tabs } from "radix-ui";
import { useEffect, useState } from "react";

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

export default function RightSidebar() {
  const searchParams = useSearchParams();

  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);
  const [selectedTab, setSelectedTab] = useState("style");

  return (
    <div className="hidden w-[512px] border-l border-zinc-300 bg-white lg:block">
      {/* Font Change */}

      <Tabs.Root value={selectedTab} onValueChange={setSelectedTab}>
        <div className="border-b border-zinc-300 p-4">
          <Tabs.List className="flex rounded-xl bg-zinc-100 p-1">
            <Tabs.Trigger
              value="style"
              className="flex w-full items-center justify-center gap-2 rounded-xl p-2 text-[14px] font-bold text-zinc-500 hover:cursor-pointer hover:bg-zinc-200 data-[state=active]:bg-indigo-500 data-[state=active]:text-white data-[state=active]:hover:bg-indigo-500"
            >
              <Paintbrush className="text-[24px]" />
              Style
            </Tabs.Trigger>
            <Tabs.Trigger
              value="document"
              className="flex w-full items-center justify-center gap-2 rounded-xl p-2 text-[14px] font-bold text-zinc-500 hover:cursor-pointer hover:bg-zinc-200 data-[state=active]:bg-indigo-500 data-[state=active]:text-white data-[state=active]:hover:bg-indigo-500"
            >
              <FileTextIcon className="text-[24px]" />
              Document
            </Tabs.Trigger>
          </Tabs.List>
        </div>

        {/* Style Tab */}
        <Tabs.Content className="flex flex-col gap-4 p-4" value="style">
          <span className="font-bold">Fonts</span>

          {/* Heading Font */}
          <Field>
            <FieldLabel>Heading</FieldLabel>
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
                {headingFonts.map((font, index) => {
                  return (
                    <SelectItem
                      key={index}
                      value={font.value}
                      style={{ fontFamily: font.value }}
                    >
                      {font.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </Field>

          {/* Body Font */}
          <Field>
            <FieldLabel>Body</FieldLabel>
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
                {bodyFonts.map((font, index) => {
                  return (
                    <SelectItem
                      key={index}
                      value={font.value}
                      style={{ fontFamily: font.value }}
                    >
                      {font.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </Field>

          <Separator />
          <span className="font-bold text-zinc-900">Accent Color</span>
          <div className="grid grid-cols-6">
            {[
              "#ef4444", // red-500
              "#f97316", // orange-500
              "#eab308", // yellow-500
              "#22c55e", // green-500
              "#06b6d4", // cyan-500
              "#3b82f6", // blue-500
            ].map((color, index) => {
              const selected = proposal?.settings?.theme?.accentColor === color;
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
        </Tabs.Content>

        {/* Document Tab */}
        <Tabs.Content className="flex flex-col gap-4 p-4" value="document">
          <span className="font-bold">Paper</span>

          {/* Paper Size */}
          <Field>
            <FieldLabel>Size</FieldLabel>
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

          <Separator />
          <span className="font-bold text-zinc-900">Format</span>

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
                {["Hour", "Day", "Week", "Month", "Year"].map((size, index) => {
                  return (
                    <SelectItem key={index} value={size}>
                      {size}
                    </SelectItem>
                  );
                })}
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
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

function SimpleSelect({
  data,
  value,
  onValueChange,
  label,
}: {
  data: string[];
  value: string;
  onValueChange: any;
  label: string;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <div>
        <span className="text-[14px] text-zinc-900">{label}</span>
        <SelectTrigger
          value="Montserrat"
          className="flex w-full items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 text-[14px] text-zinc-900 hover:cursor-pointer hover:bg-zinc-200"
        >
          <SelectValue className="text-zinc-900" />
          {/* <Select.Icon>
            <ChevronDown className="w-5 text-zinc-900" />
          </Select.Icon> */}
        </SelectTrigger>
      </div>

      <SelectContent
        position="popper"
        sideOffset={4}
        className="z-100 rounded-xl border border-zinc-300 bg-white p-1 shadow-lg"
      >
        {data.map((layout, index) => {
          return (
            <SelectItem
              key={index}
              value={layout}
              className="flex w-[var(--radix-select-trigger-width)] items-center justify-between rounded-lg p-2 text-zinc-900 hover:cursor-pointer hover:bg-zinc-100"
            >
              {layout}
              {/* <SelectItemIndicator>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500">
                  <Check className="w-3 text-white" />
                </div>
              </SelectItemIndicator> */}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
