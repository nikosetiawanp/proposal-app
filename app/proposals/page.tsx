"use client";

import clsx from "clsx";
import Layout from "../layout";
import { useState } from "react";
import { PAPER_PRESETS, PaperPreset } from "../lib/paperPresets";
import ScaleControl from "../components/scaleControl";
import PageNavigator from "../components/pageNavigator";
import { useSearchParams } from "next/navigation";
import { proposalPages } from "../lib/proposalPages";

export default function Page() {
  const [scale, setScale] = useState(100);
  const [paperSize, setPaperSize] = useState<PaperPreset>("letter");

  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");

  const CurrentPageComponent = proposalPages.find(
    (page) => page.slug === currentPage,
  )?.component;

  return (
    <Layout>
      <main className="relative flex h-screen w-screen items-center justify-center bg-zinc-200 p-6">
        <PageNavigator />

        {/* Paper */}
        <div
          style={{
            transform: `scale(${scale / 100})`,
            width: `${PAPER_PRESETS[paperSize].width}px`,
            height: `${PAPER_PRESETS[paperSize].height}px`,
          }}
          className={clsx("flex h-full flex-col rounded-sm bg-white shadow-xl")}
        >
          {CurrentPageComponent ? <CurrentPageComponent /> : null}
        </div>
        <ScaleControl scale={scale} setScale={setScale} />
      </main>
    </Layout>
  );
}
