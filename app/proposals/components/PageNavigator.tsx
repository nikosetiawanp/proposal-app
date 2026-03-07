"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DropdownMenu } from "radix-ui";
import { useEffect } from "react";
import { ChevronDown, Eye, EyeClosed } from "lucide-react";
import { proposalPages } from "@/data/proposal/proposalPages";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

export default function PageNavigator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = searchParams.get("page");
  const currentPageData = proposalPages.find(
    (page) => page.slug === currentPage,
  );

  const currentPageName = currentPageData?.name;
  const CurrentPageIcon = currentPageData?.icon;

  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  const activePages = proposalPages.filter(
    (page) => proposal?.settings?.pages?.[page.slug]?.active === true,
  );
  const inactivePages = proposalPages.filter(
    (page) => proposal?.settings?.pages?.[page.slug]?.active === false,
  );

  useEffect(() => {
    if (!currentPage) {
      router.push(pathname + "?page=" + proposalPages[0].slug);
    }
  }, []);

  useEffect(() => {
    console.log(proposal.settings.pages);
    console.log(activePages);
  }, []);

  return (
    <div className="absolute top-18 left-4 z-50 flex flex-col gap-2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          className={clsx(
            "flex w-fit items-center gap-2 rounded-xl border border-zinc-300 bg-white p-3 font-bold text-zinc-900 shadow-xl",
            "hover:cursor-pointer hover:bg-zinc-100",
          )}
        >
          {/* <Layers className="w-5" /> */}
          {CurrentPageIcon ? <CurrentPageIcon /> : null}

          <span>{currentPageName}</span>
          <ChevronDown className="w-5 group-data-[state=open]:rotate-180" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="mt-4 ml-4 overflow-hidden rounded-2xl border border-zinc-300 bg-zinc-100 shadow-xl">
          {/* Pages */}
          <div className="border-b border-zinc-200 bg-white p-4">
            <span className="text-[24px] font-bold text-zinc-900">Pages</span>
          </div>

          {/* Pages List */}
          <div className="flex flex-col p-4">
            {/* Active Pages */}
            <span className="text-[14px] font-bold text-zinc-500">Active</span>
            {activePages.map((page, index) => {
              const active = currentPage === page.slug;
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
                  <div className="flex items-center gap-4">
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
                        "hover:bg-indigo-400 hover:bg-indigo-400/0 disabled:hover:bg-none",
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
                    <Eye
                      className={clsx(
                        "w-5",
                        !active && "text-zinc-700",
                        active && "text-white",
                      )}
                    />
                  </button>
                </Link>
              );
            })}

            {/* Inactive Pages */}
            {inactivePages.length > 0 && (
              <span className="mt-4 text-[14px] font-bold text-zinc-500">
                Inactive
              </span>
            )}

            {inactivePages.map((page, index) => {
              const active = currentPage === page.slug;
              const canBeHidden = proposalPages.find(
                (p) => page.slug === p.slug,
              )?.canBeHidden;

              return (
                <Link
                  key={index}
                  href={pathname + "?page=" + page.slug}
                  className={clsx(
                    "group flex items-center justify-between gap-8 rounded-xl px-1 py-1 text-[14px] font-bold hover:bg-zinc-200",
                    !active && "text-zinc-700",
                    active && "text-indigo-500",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center p-1">
                      <page.icon className="w-5" />
                    </div>
                    {page.name}
                  </div>

                  {/* Active & Inactive Button */}
                  <button
                    className={clsx(
                      !active && "",
                      active && "hover:bg-indigo-400",
                      "rounded-lg p-1 opacity-0 group-hover:opacity-100 hover:cursor-pointer hover:bg-zinc-300",
                    )}
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
                    disabled={!canBeHidden}
                  >
                    <EyeClosed
                      className={clsx(
                        "w-5",
                        !active && "text-zinc-700",
                        active && "text-white",
                      )}
                    />{" "}
                  </button>
                </Link>
              );
            })}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
