"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tabs } from "radix-ui";
import { useEffect, useState } from "react";

import { Select } from "radix-ui";

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

export default function RightSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = searchParams.get("page");

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

        <Tabs.Content className="flex flex-col gap-4 p-4" value="style">
          <span className="text-[14px] font-bold text-zinc-900">Fonts</span>

          {/* Heading Font */}
          <Select.Root
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
            <div>
              <span className="text-[14px] text-zinc-900">Heading</span>
              <Select.Trigger
                value="Montserrat"
                className="flex w-full items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 text-[14px] text-zinc-900 hover:cursor-pointer hover:bg-zinc-200"
              >
                <Select.Value className="text-zinc-900" />
                <Select.Icon>
                  <ChevronDown className="w-5 text-zinc-900" />
                </Select.Icon>
              </Select.Trigger>
            </div>

            <Select.Portal>
              <Select.Content
                position="popper"
                sideOffset={4}
                className="z-100 rounded-xl border border-zinc-300 bg-white p-1 shadow-lg"
              >
                <Select.Viewport>
                  {headingFonts.map((font, index) => {
                    return (
                      <Select.Item
                        key={index}
                        value={font.value}
                        className="flex w-[var(--radix-select-trigger-width)] items-center justify-between rounded-lg p-2 text-zinc-900 hover:cursor-pointer hover:bg-zinc-100"
                        style={{ fontFamily: font.value }}
                      >
                        <Select.ItemText>{font.name}</Select.ItemText>
                        <Select.ItemIndicator>
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500">
                            <Check className="w-3 text-white" />
                          </div>
                        </Select.ItemIndicator>
                      </Select.Item>
                    );
                  })}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          {/* Body Font */}
          <Select.Root
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
            <div>
              <span className="text-[14px] text-zinc-900">Body</span>
              <Select.Trigger
                value="Montserrat"
                className="flex w-full items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 text-[14px] text-zinc-900 hover:cursor-pointer hover:bg-zinc-200"
              >
                <Select.Value className="text-zinc-900" />
                <Select.Icon>
                  <ChevronDown className="w-5 text-zinc-900" />
                </Select.Icon>
              </Select.Trigger>
            </div>

            <Select.Portal>
              <Select.Content
                position="popper"
                sideOffset={4}
                className="z-100 rounded-xl border border-zinc-300 bg-white p-1 shadow-lg"
              >
                <Select.Viewport>
                  {bodyFonts.map((font, index) => {
                    return (
                      <Select.Item
                        key={index}
                        value={font.value}
                        className="w-[var(--radix-select-trigger-width)] rounded-lg p-2 text-zinc-900 hover:cursor-pointer hover:bg-zinc-100"
                        style={{ fontFamily: font.value }}
                      >
                        <Select.ItemText>{font.name}</Select.ItemText>
                      </Select.Item>
                    );
                  })}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <Divider />
          <span className="text-[14px] font-bold text-zinc-900">
            Accent Color
          </span>
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
          <span className="text-[14px] font-bold text-zinc-900">Paper</span>

          {/* Paper Size */}
          <SimpleSelect
            data={["Letter", "A4"]}
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
            label={"Size"}
          />
          <Divider />
          <span className="text-[14px] font-bold text-zinc-900">Format</span>
          <SimpleSelect
            data={["Hour", "Day", "Week", "Month", "Year"]}
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
            label={"Time unit"}
          />

          {/* Currency */}
          <Select.Root
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
            <div>
              <span className="text-[14px] text-zinc-900">Currency</span>
              <Select.Trigger
                value={proposal?.settings?.format?.currency || "$"}
                className="flex w-full items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 text-[14px] text-zinc-900 hover:cursor-pointer hover:bg-zinc-200"
              >
                <Select.Value className="text-zinc-900" />
                <Select.Icon>
                  <ChevronDown className="w-5 text-zinc-900" />
                </Select.Icon>
              </Select.Trigger>
            </div>

            <Select.Portal>
              <Select.Content
                position="popper"
                sideOffset={4}
                className="z-100 max-h-50 overflow-y-scroll rounded-xl border border-zinc-300 bg-white p-1 shadow-lg"
              >
                <Select.Viewport className="">
                  {currencies.map((currency, index) => {
                    return (
                      <Select.Item
                        key={index}
                        value={currency.code}
                        className="flex w-[var(--radix-select-trigger-width)] items-center justify-between rounded-lg p-2 text-zinc-900 hover:cursor-pointer hover:bg-zinc-100"
                      >
                        <Select.ItemText>
                          <div className="flex justify-center gap-4">
                            <span className="font-bold">{currency.symbol}</span>
                            <span>{currency.name}</span>
                          </div>
                        </Select.ItemText>
                        <Select.ItemIndicator>
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500">
                            <Check className="w-3 text-white" />
                          </div>
                        </Select.ItemIndicator>
                      </Select.Item>
                    );
                  })}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
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
    <Select.Root value={value} onValueChange={onValueChange}>
      <div>
        <span className="text-[14px] text-zinc-900">{label}</span>
        <Select.Trigger
          value="Montserrat"
          className="flex w-full items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 text-[14px] text-zinc-900 hover:cursor-pointer hover:bg-zinc-200"
        >
          <Select.Value className="text-zinc-900" />
          <Select.Icon>
            <ChevronDown className="w-5 text-zinc-900" />
          </Select.Icon>
        </Select.Trigger>
      </div>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-100 rounded-xl border border-zinc-300 bg-white p-1 shadow-lg"
        >
          <Select.Viewport>
            {data.map((layout, index) => {
              return (
                <Select.Item
                  key={index}
                  value={layout}
                  className="flex w-[var(--radix-select-trigger-width)] items-center justify-between rounded-lg p-2 text-zinc-900 hover:cursor-pointer hover:bg-zinc-100"
                >
                  <Select.ItemText>{layout}</Select.ItemText>
                  <Select.ItemIndicator>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500">
                      <Check className="w-3 text-white" />
                    </div>
                  </Select.ItemIndicator>
                </Select.Item>
              );
            })}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
