"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DropdownMenu, Tabs } from "radix-ui";
import { useEffect, useState } from "react";
import {
  Eye,
  EyeClosed,
  EyeOff,
  Layers,
  Palette,
  Settings,
} from "lucide-react";
import { proposalPages } from "@/data/proposal/proposalPages";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = searchParams.get("page");

  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  useEffect(() => {
    if (!currentPage) {
      router.push(pathname + "?page=" + proposalPages[0].slug);
    }
  }, []);

  useEffect(() => {
    console.log(proposal.settings.pages);
  }, []);

  const [activeTab, setActiveTab] = useState("Pages");

  const tabsList = [
    {
      name: "Pages",
      icon: Layers,
      description:
        "Toggle active and inactive pages here. Click to preview page in the viewport.",
    },
    {
      name: "Style",
      icon: Palette,
      description: "Style your proposal here",
    },
    {
      name: "Presets",
      icon: Settings,
      description: "Change project settings here",
    },
  ];

  return (
    <Tabs.Root
      className="flex border-r border-zinc-300 bg-white"
      onValueChange={(value) => setActiveTab(value)}
    >
      <Tabs.List className="flex h-full flex-col gap-2 border-r border-zinc-300 bg-white p-3">
        {tabsList.map((tab) => {
          const active = activeTab === tab.name;
          return (
            <Tabs.Trigger
              key={tab.name}
              value={tab.name}
              className={clsx(
                "rounded-lg p-2",
                "hover:cursor-pointer",
                active && "bg-indigo-500 text-white",
                !active && "text-zinc-500 hover:bg-zinc-200",
              )}
            >
              <tab.icon className={clsx()} />
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      {/* Content Container */}
      <div className="w-[375px]">
        <div className="border-b border-zinc-200 bg-white p-4">
          <span className="text-[24px] font-bold text-zinc-900">
            {activeTab}
          </span>
          <p className="text-zinc-500">
            {tabsList.find((tab) => tab.name === activeTab)?.description}
          </p>
        </div>
        <Tabs.Content value="Pages" className="flex flex-col gap-2">
          {/* Pages List */}
          <div className="flex flex-col p-4">
            {proposalPages.map((page, index) => {
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
                    active && "bg-indigo-500 text-white hover:bg-indigo-500",
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

                  {/* Hide Unhide */}
                  <button
                    className={clsx(
                      "rounded-lg p-1 opacity-0 group-hover:opacity-100 hover:cursor-pointer disabled:group-hover:opacity-30",
                      !active &&
                        "hover:bg-zinc-300 disabled:hover:bg-zinc-300/0",
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
                              active:
                                !proposal.settings.pages[page.slug].active,
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
                    {/* {!canBeHidden && <EyeOff />} */}
                  </button>
                </Link>
              );
            })}
          </div>
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
}
