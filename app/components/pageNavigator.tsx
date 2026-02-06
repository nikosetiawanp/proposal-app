"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import router, { useRouter } from "next/router";
import { Collapsible } from "radix-ui";
import { useCallback } from "react";
import { proposalPages } from "../lib/proposalPages";
import { ChevronDown, Eye, Layers } from "lucide-react";

export default function PageNavigator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const currentPageName = proposalPages.find(
    (page) => page.slug === currentPage,
  )?.name;
  const CurrentPageIcon = proposalPages.find(
    (page) => page.slug === currentPage,
  )?.icon;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <Collapsible.Root className="absolute top-6 left-6 z-50 flex flex-col gap-2">
      <Collapsible.Trigger
        className={clsx(
          "flex w-fit items-center gap-2 rounded-xl border border-zinc-300 bg-white p-3 font-bold text-zinc-900 shadow-xl",
          "hover:cursor-pointer hover:bg-zinc-100",
        )}
      >
        {/* <Layers className="w-5" /> */}
        {CurrentPageIcon ? <CurrentPageIcon /> : null}

        <span>{currentPageName}</span>
        <ChevronDown className="w-5 group-data-[state=open]:rotate-180" />
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden rounded-2xl border border-zinc-300 bg-zinc-100 shadow-xl">
        {/* Pages */}
        <div className="border-b border-zinc-200 bg-white p-4">
          <span className="text-[24px] font-bold text-zinc-900">Pages</span>
        </div>

        {/* Pages List */}
        <div className="flex flex-col p-4">
          <span className="text-[14px] font-bold text-zinc-500">Active</span>
          {Array.from(proposalPages).map((page, index) => {
            const active = currentPage === page.slug;
            return (
              <Link
                key={index}
                href={pathname + "?page=" + page.slug}
                className={clsx(
                  "group flex items-center justify-between gap-8 rounded-xl px-1 py-1 text-[14px] font-bold",
                  !active && "text-zinc-700 hover:bg-zinc-200",
                  active && "bg-indigo-500 text-white",
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
                    !active && "hover:bg-zinc-300",
                    active && "hover:bg-indigo-400",
                    "rounded-lg p-1 opacity-0 group-hover:opacity-100 hover:cursor-pointer",
                  )}
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
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
