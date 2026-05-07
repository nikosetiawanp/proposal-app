"use client";

import clsx from "clsx";
import Layout from "../layout";
import { useEffect, useState } from "react";
import { PAPER_PRESETS } from "../../data/PaperPresets";
import ScaleControl from "./components/ScaleControl";

import { useSearchParams } from "next/navigation";

import { proposalPages } from "@/data/proposal/proposalPages";
import { proposalStore } from "@/stores/proposal/proposalStore";
import { useStore } from "zustand";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import ProposalPaper from "./components/ProposalPaper";

import TopNavbar from "./components/TopNavbar";

export default function Page() {
  const [scale, setScale] = useState(100);
  const hydrated = true;

  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

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
          <div className="scroll-hidden flex h-full w-full flex-col items-center justify-start gap-4 overflow-y-scroll bg-zinc-100 pt-6 pb-20">
            {/* Paper */}

            {proposalPages.map((page, index) => {
              const active = proposal?.settings?.pages?.find(
                (p) => p.slug === page.slug,
              )?.active;
              return (
                active && (
                  <ProposalPaper key={page.slug}>
                    {<page.component slug={page.slug} />}
                  </ProposalPaper>
                )
              );
            })}
          </div>

          {/* Right sidebar */}
          <RightSidebar />
        </div>
      </main>
    </Layout>
  );
}
