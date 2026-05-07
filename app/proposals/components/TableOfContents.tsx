import { cn } from "@/lib/utils";
import ProposalHeader from "./ProposalHeader";
import ProposalFooter from "./ProposalFooter";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";
import { proposalPages } from "@/data/proposal/proposalPages";

export default function TableOfContents({ slug }: { slug: string }) {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);
  const activePages = proposal?.settings?.pages
    ?.filter((page) => page.active)
    .map((page) => page.slug);

  return (
    <div className={cn("flex h-full flex-col justify-between")}>
      {/* Header */}
      <ProposalHeader />
      <div className="flex h-full flex-col">
        <h2
          style={{
            fontFamily: proposal?.settings?.headingFont,
            color: proposal?.settings?.accentColor,
            fontWeight: "bold",
          }}
          className="mb-4 ml-9 text-[36px] font-bold"
        >
          Table of Contents
        </h2>

        <div className="flex flex-col gap-2 px-9">
          {proposalPages?.map((page, index) => {
            const active = proposal?.settings?.pages?.find(
              (p) => p.slug === page.slug,
            )?.active;
            const pageNumber = activePages?.indexOf(page.slug);

            return (
              active &&
              page.slug !== "cover" &&
              page.slug !== "table-of-contents" && (
                <div
                  key={index}
                  className="flex w-full items-baseline justify-between"
                >
                  <span
                    style={{
                      color: proposal?.settings?.textColor,
                      fontSize: "14px",
                    }}
                  >
                    {page.title}
                  </span>
                  <span
                    style={{
                      color: proposal?.settings?.accentColor,
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {pageNumber}
                  </span>
                </div>
              )
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <ProposalFooter slug={slug} />
    </div>
  );
}
