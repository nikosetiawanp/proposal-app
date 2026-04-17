"use client";

import clsx from "clsx";
import Layout from "../layout";
import { useEffect, useState } from "react";
import { PAPER_PRESETS } from "../../data/PaperPresets";
import ScaleControl from "./components/ScaleControl";

import { useSearchParams } from "next/navigation";

import Link from "next/link";
import { ChevronLeft, EllipsisVertical, Trash } from "lucide-react";
import PageNavigator from "./components/PageNavigator";
import { proposalPages } from "@/data/proposal/proposalPages";
import { proposalStore } from "@/stores/proposal/proposalStore";
import { PaperPreset } from "@/types/proposal";
import { useStore } from "zustand";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import ProposalPaper from "./components/ProposalPaper";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TopNavbar from "./components/TopNavbar";

export default function Page() {
  const [scale, setScale] = useState(100);
  const hydrated = true;

  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");

  const CurrentPageComponent = proposalPages.find(
    (page) => page.slug === currentPage,
  )?.component;

  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  // useEffect(() => {
  //   useProposalStore.getState().hydrate();
  // }, []);

  return (
    <Layout>
      <main className="relative flex h-screen w-full flex-col items-center justify-start overflow-hidden">
        {/* Top Nav */}
        <TopNavbar />

        {/* Page Wrapper */}
        <div className="flex h-full w-screen">
          {/* Left sidebar */}
          <LeftSidebar />

          {/* Viewport */}
          <div className="flex h-full w-full flex-col items-center justify-start gap-px overflow-y-scroll bg-zinc-100 pb-20">
            {/* Paper */}
            {hydrated ? (
              proposalPages.map((page, index) => {
                const active = proposal.settings.pages[page.slug].active;
                return active ? (
                  <ProposalPaper key={index}>
                    <page.component />
                  </ProposalPaper>
                ) : null;
              })
            ) : (
              <span className="text-zinc-900">Loading proposal...</span>
            )}
          </div>

          {/* Right sidebar */}
          <RightSidebar />
        </div>

        {/* <PageNavigator /> */}
        {/* <ScaleControl scale={scale} setScale={setScale} /> */}
      </main>
    </Layout>
  );
}
