"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DropdownMenu } from "radix-ui";
import { useEffect } from "react";
import { ChevronDown, Eye } from "lucide-react";
import { proposalPages } from "@/data/proposal/proposalPages";

export default function PageNavigator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = searchParams.get("page");
  const currentPageName = proposalPages.find(
    (page) => page.slug === currentPage,
  )?.name;
  const CurrentPageIcon = proposalPages.find(
    (page) => page.slug === currentPage,
  )?.icon;

  useEffect(() => {
    if (!currentPage) {
      router.push(pathname + "?page=" + proposalPages[0].slug);
    }
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
            <span className="text-[14px] font-bold text-zinc-500">Active</span>
            {Array.from(proposalPages).map((page, index) => {
              const active = currentPage === page.slug;
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
                      // !active && "",
                      // active && "hover:bg-indigo-400",
                      "rounded-lg p-1 opacity-0 group-hover:opacity-100 hover:cursor-pointer hover:bg-zinc-300",
                    )}
                  >
                    <Eye className={clsx("w-5", active && "text-zinc-700")} />
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
