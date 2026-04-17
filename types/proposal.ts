import { currencies } from "@/data/currencies";
import { proposalPages } from "@/data/proposal/proposalPages";

type CurrencyCode = (typeof currencies)[number]["code"];
type ProposalPageSlug = (typeof proposalPages)[number]["slug"];

export type PaperSize = {
  width: number | string;
  height: number | string;
};

export type PaperPreset = "Letter" | "A4";

export interface Proposal {
  id: string;
  userId: string;
  title: string;
  overview: string;
  solution: string;
  date: Date;
  proposerName: string;
  clientName: string;
  timeUnit: "Hour" | "Day" | "Week" | "Month" | "Year";
  currency: CurrencyCode;
  objectives: { id: string; title: string; description: string }[];
  services: {
    id: string;
    title: string;
    description: string;
    budget: string;
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
    colorPalette: {
      backgroundColor: string;
      textColor: string;
      accentColor: string;
    };
    pages: Record<ProposalPageSlug, { active: boolean; layout: string }>;
    print: {
      paperSize: "A4" | "Letter";
      orientation: "portrait" | "landscape";
    };
    format: {
      date: any;
      timeUnit: "Day" | "Week" | "Month";
      currency: CurrencyCode;
    };
  };
}
