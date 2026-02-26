import { currencies } from "@/data/currencies";
import { proposalPages } from "@/data/proposal/proposalPages";

type CurrencyCode = (typeof currencies)[number]["code"];
type ProposalPageSlug = (typeof proposalPages)[number]["slug"];

export type PaperSize = {
  width: number | string;
  height: number | string;
};

export type PaperPreset = "letter" | "a4";

export interface Proposal {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: string;
  proposerName: string;
  clientName: string;
  timeUnit: "day" | "week" | "month";
  currency: CurrencyCode;
  objectives: string[];
  services: {
    name: string;
    description: string;
    budget: number;
    estimatedTimeMin: number;
    estimatedTimeMax: number;
    optional: boolean;
  }[];
  settings: {
    theme: {
      headingFont: string;
      bodyFont: string;
      accentColor: string;
    };
    pages: Record<ProposalPageSlug, { active: boolean; layout: string }>;
    print: {
      paperSize: "a4" | "letter";
      orientation: "portrait" | "landscape";
    };
  };
}
