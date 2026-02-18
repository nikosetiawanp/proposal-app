"use client";

import clsx from "clsx";
import Layout from "../layout";
import { useState } from "react";
import { PAPER_PRESETS, PaperPreset } from "../../data/PaperPresets";
import ScaleControl from "./components/ScaleControl";

import { useSearchParams } from "next/navigation";
import { ProposalPages } from "../../data/ProposalPages";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import PageNavigator from "./components/PageNavigator";

export default function Page() {
  const [scale, setScale] = useState(100);
  const [paperSize, setPaperSize] = useState<PaperPreset>("letter");

  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");

  const CurrentPageComponent = ProposalPages.find(
    (page) => page.slug === currentPage,
  )?.component;

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
          <div
            style={{
              transform: `scale(${scale / 100})`,
              width: `${PAPER_PRESETS[paperSize].width}px`,
              height: `${PAPER_PRESETS[paperSize].height}px`,
            }}
            className={clsx(
              "z-0 flex h-full flex-col rounded-sm bg-white shadow-xl",
            )}
          >
            {CurrentPageComponent ? <CurrentPageComponent /> : null}
          </div>
        </div>

        <PageNavigator />
        <ScaleControl scale={scale} setScale={setScale} />
      </main>
    </Layout>
  );
}
