"use client";

import clsx from "clsx";
import Layout from "../layout";
import { useEffect, useState } from "react";
import { PAPER_PRESETS } from "../../data/PaperPresets";
import ScaleControl from "./components/ScaleControl";

import { useSearchParams } from "next/navigation";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import PageNavigator from "./components/PageNavigator";
import { proposalPages } from "@/data/proposal/proposalPages";
import { useProposalStore } from "@/stores/proposal/proposalStore";
import { PaperPreset } from "@/types/proposal";
import { getLocalDBProposal } from "@/lib/proposalDB";

export default function Page() {
  const proposal = useProposalStore((state: any) => state.proposal);
  const setProposal = useProposalStore((state: any) => state.setProposal);
  const hydrated = useProposalStore((state: any) => state.hydrated);

  const [scale, setScale] = useState(100);

  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");

  const CurrentPageComponent = proposalPages.find(
    (page) => page.slug === currentPage,
  )?.component;

  useEffect(() => {
    useProposalStore.getState().hydrate();
  }, []);

  return (
    <Layout>
      <main className="relative flex h-screen w-full flex-col items-center justify-start">
        {/* Top Nav */}
        <nav className="z-50 flex w-full justify-between border-b border-b-zinc-300 bg-white px-4 py-4">
          <Link
            href="/proposals"
            className={clsx(
              "flex items-center gap-1 text-zinc-700",
              "hover:text-zinc-900",
            )}
          >
            <ChevronLeft />
            Go back
          </Link>
        </nav>

        {/* Viewport */}
        <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-zinc-200">
          {/* Paper */}
          {hydrated ? (
            <div
              style={{
                transform: `scale(${scale / 100})`,
                width: `${PAPER_PRESETS[proposal?.settings?.print?.paperSize as PaperPreset]?.width}px`,
                height: `${PAPER_PRESETS[proposal?.settings?.print?.paperSize as PaperPreset]?.height}px`,
              }}
              className={clsx(
                "z-0 flex h-full flex-col rounded-sm bg-white shadow-xl",
              )}
            >
              {CurrentPageComponent ? <CurrentPageComponent /> : null}
            </div>
          ) : (
            <span className="text-zinc-900">Loading proposal...</span>
          )}
        </div>

        <PageNavigator />
        <ScaleControl scale={scale} setScale={setScale} />
      </main>
    </Layout>
  );
}
