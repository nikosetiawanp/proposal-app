"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tabs } from "radix-ui";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Eye,
  EyeClosed,
  EyeOff,
  Layers,
  Palette,
  Settings,
} from "lucide-react";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

import { Paintbrush, FileTextIcon } from "lucide-react";

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
              className="flex w-full items-center justify-center gap-2 rounded-xl p-2 text-[14px] font-bold text-zinc-500 hover:cursor-pointer data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
            >
              <Paintbrush className="text-[24px]" />
              Style
            </Tabs.Trigger>
            <Tabs.Trigger
              value="document"
              className="flex w-full items-center justify-center gap-2 rounded-xl p-2 text-[14px] font-bold text-zinc-500 hover:cursor-pointer data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
            >
              <FileTextIcon className="text-[24px]" />
              Document
            </Tabs.Trigger>
          </Tabs.List>
        </div>

        <Tabs.Content className="p-4" value="style">
          <span className="text-zinc-900">Style</span>
        </Tabs.Content>
        <Tabs.Content className="p-4" value="document">
          <span className="text-zinc-900">Document</span>
        </Tabs.Content>
      </Tabs.Root>

      {/* {fontPairings?.map((font, index) => {
          const headingFont = proposal?.settings?.theme?.headingFont;
          const bodyFont = proposal?.settings?.theme?.bodyFont;
          const selected =
            headingFont === font.heading && bodyFont === font.body;
          return (
            <div
              key={index}
              className={clsx(
                "rounded-xl border p-4",
                !selected && "border-zinc-300",
                selected && "border-indigo-500 bg-indigo-50",
              )}
              onClick={() => {
                setProposal({
                  ...proposal,
                  settings: {
                    ...proposal?.settings,
                    theme: {
                      ...proposal?.settings?.theme,
                      headingFont: font.heading,
                      bodyFont: font.body,
                    },
                  },
                });
              }}
            >
              <span className={clsx("text-[16px] font-bold text-zinc-900")}>
                {font.heading} & {font.body}
              </span>
              <p className="text-[12px] text-zinc-500">{font.description}</p>
            </div>
          );
        })} */}
    </div>
  );
}
